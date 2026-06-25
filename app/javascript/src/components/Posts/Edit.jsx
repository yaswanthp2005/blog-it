import routes from "constants/routes";

import React, { useEffect, useState } from "react";

import { Container, Toastr } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import {
  useDestroyPost,
  useShowPost,
  useUpdatePost,
} from "hooks/reactQuery/usePostsApi";
import { keysToCamelCase } from "neetocist";
import { Alert, NoData, Spinner } from "neetoui";
import { Form as NeetoUIForm } from "neetoui/formik";
import { generatePath, useHistory, useParams } from "react-router-dom";
import { getFromLocalStorage } from "utils/storage";
import withTitle from "utils/withTitle";

import { POST_FORM_VALIDATION_SCHEMA } from "./constants";
import Form from "./Form";
import PostFormHeader from "./PostFormHeader";
import { buildCategoryIds, buildCategoryOptions } from "./utils";

const EDIT_POST_TITLE = "Edit blog post";
const UNAUTHORIZED_MESSAGE = "You are not authorized to edit this post";

const buildInitialValues = post => ({
  categoryIds: post.categories.map(category => ({
    label: category.name,
    value: category.id,
  })),
  description: post.description,
  title: post.title,
});

const Edit = () => {
  const history = useHistory();
  const { slug } = useParams();
  const currentUserId = getFromLocalStorage("authUserId");
  const { data: post, isLoading: isPostLoading } = useShowPost(slug);
  const { data: categories, isLoading: isCategoriesLoading } =
    useFetchCategories();
  const { mutateAsync: updatePost } = useUpdatePost();
  const { mutateAsync: destroyPost } = useDestroyPost();
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const normalizedPost = post ? keysToCamelCase(post) : null;
  const isUnauthorized =
    normalizedPost && normalizedPost.userId !== currentUserId;

  useEffect(() => {
    if (isUnauthorized) {
      Toastr.error(UNAUTHORIZED_MESSAGE);
    }
  }, [isUnauthorized]);

  const categoryOptions = buildCategoryOptions(
    categories?.map(keysToCamelCase)
  );

  const handleSubmitWithStatus = async (values, status) => {
    try {
      await updatePost({
        slug,
        ...values,
        categoryIds: buildCategoryIds(values.categoryIds),
        status,
      });

      history.push(routes.posts.index);
    } catch (error) {
      logger.error(error);
    }
  };

  const handlePreview = () => {
    history.push(generatePath(routes.posts.show, { slug }));
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await destroyPost({ slug });
      setIsDeleteAlertOpen(false);
      history.push(routes.posts.mine);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isPostLoading || isCategoriesLoading) {
    return (
      <Container>
        <div className="flex h-64 items-center justify-center">
          <Spinner />
        </div>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container>
        <NoData title="Blog post not found" />
      </Container>
    );
  }

  if (isUnauthorized) {
    return (
      <Container>
        <NoData title={UNAUTHORIZED_MESSAGE} />
      </Container>
    );
  }

  return (
    <Container mainClassName="bg-gray-50">
      <NeetoUIForm
        formikProps={{
          enableReinitialize: true,
          initialValues: buildInitialValues(normalizedPost),
          validationSchema: POST_FORM_VALIDATION_SCHEMA,
          onSubmit: () => {},
        }}
      >
        <PostFormHeader
          showPreview
          defaultPrimaryAction={normalizedPost.status}
          pageTitle={EDIT_POST_TITLE}
          onDelete={() => setIsDeleteAlertOpen(true)}
          onPreview={handlePreview}
          onSubmitWithStatus={handleSubmitWithStatus}
        />
        <Form categoryOptions={categoryOptions} />
      </NeetoUIForm>
      <Alert
        isOpen={isDeleteAlertOpen}
        isSubmitting={isDeleting}
        submitButtonLabel="Yes, delete"
        title="Delete blog post"
        message={
          <>
            Are you sure you want to delete{" "}
            <strong>{normalizedPost.title}</strong>? This action cannot be
            undone.
          </>
        }
        onClose={() => setIsDeleteAlertOpen(false)}
        onSubmit={handleDelete}
      />
    </Container>
  );
};

export default withTitle(Edit, EDIT_POST_TITLE);
