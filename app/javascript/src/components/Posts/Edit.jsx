import routes from "constants/routes";

import React, { useEffect, useMemo, useState } from "react";

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
import { Trans, useTranslation } from "react-i18next";
import { generatePath, useHistory, useParams } from "react-router-dom";
import { getFromLocalStorage } from "utils/storage";
import withTitle from "utils/withTitle";

import { getPostFormValidationSchema } from "./constants";
import Form from "./Form";
import PostFormHeader from "./PostFormHeader";
import { buildCategoryIds, buildCategoryOptions } from "./utils";

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
  const { t } = useTranslation();
  const currentUserId = getFromLocalStorage("authUserId");
  const { data: post, isLoading: isPostLoading } = useShowPost(slug);
  const { data: categories, isLoading: isCategoriesLoading } =
    useFetchCategories();
  const { mutateAsync: updatePost } = useUpdatePost();
  const { mutateAsync: destroyPost } = useDestroyPost();
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const validationSchema = useMemo(() => getPostFormValidationSchema(t), [t]);

  const normalizedPost = post ? keysToCamelCase(post) : null;
  const isUnauthorized =
    normalizedPost && normalizedPost.userId !== currentUserId;

  useEffect(() => {
    if (isUnauthorized) {
      Toastr.error(t("posts.unauthorized"));
    }
  }, [isUnauthorized, t]);

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
        <NoData title={t("posts.notFound")} />
      </Container>
    );
  }

  if (isUnauthorized) {
    return (
      <Container>
        <NoData title={t("posts.unauthorized")} />
      </Container>
    );
  }

  return (
    <Container mainClassName="bg-gray-50">
      <NeetoUIForm
        formikProps={{
          enableReinitialize: true,
          initialValues: buildInitialValues(normalizedPost),
          validationSchema,
          onSubmit: () => {},
        }}
      >
        <PostFormHeader
          showPreview
          defaultPrimaryAction={normalizedPost.status}
          pageTitle={t("posts.editTitle")}
          onDelete={() => setIsDeleteAlertOpen(true)}
          onPreview={handlePreview}
          onSubmitWithStatus={handleSubmitWithStatus}
        />
        <Form categoryOptions={categoryOptions} />
      </NeetoUIForm>
      <Alert
        isOpen={isDeleteAlertOpen}
        isSubmitting={isDeleting}
        submitButtonLabel={t("common.yesDelete")}
        title={t("posts.deleteTitle")}
        message={
          <Trans
            components={{ 1: <strong /> }}
            i18nKey="posts.deleteConfirmMessage"
            values={{ title: normalizedPost.title }}
          />
        }
        onClose={() => setIsDeleteAlertOpen(false)}
        onSubmit={handleDelete}
      />
    </Container>
  );
};

export default withTitle(Edit, "posts.editTitle");
