import routes from "constants/routes";

import { useCreatePost as useCreatePostMutation } from "hooks/reactQuery/usePostsApi";
import { useHistory } from "react-router-dom";

import { buildCategoryIds } from "../common/utils";

const useCreatePost = () => {
  const history = useHistory();
  const { mutateAsync: createPost } = useCreatePostMutation();

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

  return { handleSubmitWithStatus };
};

export default useCreatePost;
