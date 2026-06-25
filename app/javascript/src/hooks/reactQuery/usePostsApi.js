import QUERY_KEYS from "constants/query";

import postsApi from "apis/posts";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useFetchPosts = params =>
  useQuery({
    queryKey: [QUERY_KEYS.POSTS, params],
    queryFn: async () => {
      const { data } = await postsApi.fetch(params);

      return data.posts;
    },
  });

export const useShowPost = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.POST, slug],
    queryFn: async () => {
      const { data } = await postsApi.show(slug);

      return data.post;
    },
    enabled: !!slug,
  });

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async payload => {
      await postsApi.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
    },
  });
};
