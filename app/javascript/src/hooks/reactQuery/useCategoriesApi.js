import QUERY_KEYS from "constants/query";

import categoriesApi from "apis/categories";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useFetchCategories = () =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: async () => {
      const { data } = await categoriesApi.fetch();

      return data.categories;
    },
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async payload => categoriesApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.CATEGORIES]);
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
    },
  });
};
