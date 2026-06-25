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

export const useFetchMyPosts = () =>
  useQuery({
    queryKey: [QUERY_KEYS.MY_POSTS],
    queryFn: async () => {
      const { data } = await postsApi.fetch({ mine: true });

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
      const { data } = await postsApi.create(payload);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async payload => {
      const { data } = await postsApi.update(payload);

      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.POST, variables.slug]);
    },
  });
};

export const useDestroyPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async payload => {
      const { data } = await postsApi.destroy(payload);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.MY_POSTS]);
    },
  });
};
