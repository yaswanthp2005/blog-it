import routes from "constants/routes";

import { useState } from "react";

import { useDestroyPost, useUpdatePost } from "hooks/reactQuery/usePostsApi";
import { generatePath, useHistory, useParams } from "react-router-dom";

import { buildCategoryIds, buildPreviewPost } from "../common/utils";

const useEditPost = post => {
  const history = useHistory();
  const { slug } = useParams();
  const { mutateAsync: updatePost } = useUpdatePost();
  const { mutateAsync: destroyPost } = useDestroyPost();
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handlePreview = formValues => {
    history.push(generatePath(routes.posts.show, { slug }), {
      isPreview: true,
      previewPost: buildPreviewPost(formValues, post),
    });
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

  return {
    handleDelete,
    handlePreview,
    handleSubmitWithStatus,
    isDeleteAlertOpen,
    isDeleting,
    setIsDeleteAlertOpen,
  };
};

export default useEditPost;
