import React, { useEffect } from "react";

import { Container } from "components/commons";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { Alert, NoData, Spinner, Toastr } from "neetoui";
import { Form as NeetoUIForm } from "neetoui/formik";
import { Trans, useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getFromLocalStorage } from "utils/storage";
import withTitle from "utils/withTitle";

import { POST_FORM_VALIDATION_SCHEMA } from "../common/constants";
import Form from "../common/Form";
import { buildCategoryOptions, buildInitialValues } from "../common/utils";
import useEditPost from "../hooks/useEditPost";
import PostFormHeader from "../PostFormHeader";

const Edit = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const currentUserId = getFromLocalStorage("authUserId");
  const { data: post, isLoading: isPostLoading } = useShowPost(slug);
  const { data: categories, isLoading: isCategoriesLoading } =
    useFetchCategories();

  const {
    handleDelete,
    handlePreview,
    handleSubmitWithStatus,
    isDeleteAlertOpen,
    isDeleting,
    setIsDeleteAlertOpen,
  } = useEditPost();

  const normalizedPost = post || null;
  const isUnauthorized =
    normalizedPost && normalizedPost.userId !== currentUserId;

  useEffect(() => {
    if (isUnauthorized) {
      Toastr.error(t("posts.unauthorized"));
    }
  }, [isUnauthorized, t]);

  const categoryOptions = buildCategoryOptions(categories);

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
          validationSchema: POST_FORM_VALIDATION_SCHEMA,
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
