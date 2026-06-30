import React from "react";

import { Container } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Spinner } from "neetoui";
import { Form as NeetoUIForm } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import withTitle from "utils/withTitle";

import {
  POST_FORM_INITIAL_VALUES,
  POST_FORM_VALIDATION_SCHEMA,
} from "../common/constants";
import Form from "../common/Form";
import { buildCategoryOptions } from "../common/utils";
import useCreatePost from "../hooks/useCreatePost";
import PostFormHeader from "../PostFormHeader";

const Create = () => {
  const { t } = useTranslation();
  const { handleSubmitWithStatus } = useCreatePost();
  const { data: categories, isLoading } = useFetchCategories();

  const categoryOptions = buildCategoryOptions(categories);

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
          validationSchema: POST_FORM_VALIDATION_SCHEMA,
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
