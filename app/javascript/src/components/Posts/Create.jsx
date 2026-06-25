import routes from "constants/routes";

import React from "react";

import { Container } from "components/commons";
import { useCreatePost } from "hooks/reactQuery/usePostsApi";
import { Button as NeetoUIButton, Typography } from "neetoui";
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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createPost(values);
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
      <NeetoUIForm
        formikProps={{
          initialValues: POST_FORM_INITIAL_VALUES,
          validationSchema: POST_FORM_VALIDATION_SCHEMA,
          onSubmit: handleSubmit,
        }}
      >
        <Form>
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
