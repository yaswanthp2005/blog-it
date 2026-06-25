import routes from "constants/routes";

import React, { useMemo } from "react";

import { Container } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import { keysToCamelCase } from "neetocist";
import { Spinner } from "neetoui";
import { Form as NeetoUIForm } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import withTitle from "utils/withTitle";

import {
  getPostFormValidationSchema,
  POST_FORM_INITIAL_VALUES,
} from "./constants";
import Form from "./Form";
import PostFormHeader from "./PostFormHeader";
import { buildCategoryIds, buildCategoryOptions } from "./utils";

const Create = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { mutateAsync: createPost } = useCreatePost();
  const { data: categories, isLoading } = useFetchCategories();

  const validationSchema = useMemo(() => getPostFormValidationSchema(t), [t]);

  const categoryOptions = buildCategoryOptions(
    categories?.map(keysToCamelCase)
  );

  const buildPayload = values => ({
    ...values,
    categoryIds: buildCategoryIds(values.categoryIds),
  });

  const handleSubmitWithStatus = async (values, status) => {
    try {
      const payload = { ...buildPayload(values), status };

      await createPost(payload);
      history.push(routes.posts.index);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Container mainClassName="bg-gray-50">
      {isLoading && (
        <div className="mb-6 flex h-24 items-center justify-center">
          <Spinner />
        </div>
      )}
      <NeetoUIForm
        formikProps={{
          initialValues: POST_FORM_INITIAL_VALUES,
          validationSchema,
          onSubmit: () => {},
        }}
      >
        <PostFormHeader
          pageTitle={t("posts.createTitle")}
          showMoreActions={false}
          onSubmitWithStatus={handleSubmitWithStatus}
        />
        <Form categoryOptions={categoryOptions} />
      </NeetoUIForm>
    </Container>
  );
};

export default withTitle(Create, "posts.createTitle");
