import routes from "constants/routes";

import React from "react";

import { Container } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import { keysToCamelCase } from "neetocist";
import { Button as NeetoUIButton, Typography, Spinner } from "neetoui";
import { Button, Form as NeetoUIForm } from "neetoui/formik";
import { useHistory } from "react-router-dom";
import withTitle from "utils/withTitle";

import {
  POST_FORM_INITIAL_VALUES,
  POST_FORM_VALIDATION_SCHEMA,
} from "./constants";
import Form from "./Form";

const CREATE_POST_TITLE = "New blog post";

const Create = () => {
  const history = useHistory();
  const { mutateAsync: createPost } = useCreatePost();
  const { data: categories, isLoading } = useFetchCategories();

  const categoryOptions =
    categories?.map(category => {
      const normalizedCategory = keysToCamelCase(category);

      return {
        label: normalizedCategory.name,
        value: normalizedCategory.id,
      };
    }) || [];

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const categoryIds = values.categoryIds
        .map(category => Number.parseInt(category?.value, 10))
        .filter(Number.isFinite);
      await createPost({ ...values, categoryIds });
      history.push(routes.posts.index);
    } catch (error) {
      logger.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Typography className="mb-8 text-gray-900" style="h2" weight="semibold">
        {CREATE_POST_TITLE}
      </Typography>
      {isLoading && (
        <div className="mb-6 flex h-24 items-center justify-center">
          <Spinner />
        </div>
      )}
      <NeetoUIForm
        formikProps={{
          initialValues: POST_FORM_INITIAL_VALUES,
          validationSchema: POST_FORM_VALIDATION_SCHEMA,
          onSubmit: handleSubmit,
        }}
      >
        <Form categoryOptions={categoryOptions}>
          <div className="flex items-center justify-end gap-x-3">
            <NeetoUIButton
              label="Cancel"
              style="secondary"
              onClick={() => history.push(routes.posts.index)}
            />
            <Button label="Submit" type="submit" />
          </div>
        </Form>
      </NeetoUIForm>
    </Container>
  );
};

export default withTitle(Create, CREATE_POST_TITLE);
