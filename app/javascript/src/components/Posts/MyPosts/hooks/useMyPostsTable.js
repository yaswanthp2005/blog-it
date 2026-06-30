import { useMemo, useState } from "react";

import {
  useBulkDestroyPosts,
  useBulkUpdatePosts,
  useDestroyPost,
  useFetchMyPosts,
  useUpdatePost,
} from "hooks/reactQuery/usePostsApi";
import useQueryParams from "hooks/useQueryParams";
import { useHistory } from "react-router-dom";
import useMyPostsColumnsStore from "stores/useMyPostsColumnsStore";

import {
  buildMyPostsRequestParams,
  buildURL,
  filtersFromQueryParams,
  hasAppliedFilters,
} from "../utils";

const useMyPostsTable = () => {
  const history = useHistory();
  const queryParams = useQueryParams();
  const appliedFilters = filtersFromQueryParams(queryParams);
  const requestParams = buildMyPostsRequestParams(queryParams);
  const { data: posts, isLoading } = useFetchMyPosts(requestParams);
  const { mutateAsync: updatePost } = useUpdatePost();
  const { mutateAsync: bulkUpdatePosts } = useBulkUpdatePosts();
  const { mutateAsync: bulkDestroyPosts } = useBulkDestroyPosts();
  const { mutateAsync: destroyPost } = useDestroyPost();
  const visibleColumns = useMyPostsColumnsStore(state => state.visibleColumns);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [bulkSelectedAllRows, setBulkSelectedAllRows] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);
  const [isBulkDeleteAlertOpen, setIsBulkDeleteAlertOpen] = useState(false);
  const [isSearchFiltersOpen, setIsSearchFiltersOpen] = useState(false);

  const replaceQueryParams = filters => {
    history.replace(buildURL(filters));
  };

  const handleRemoveTitle = () =>
    replaceQueryParams({ ...appliedFilters, title: "" });

  const handleRemoveStatus = () =>
    replaceQueryParams({ ...appliedFilters, status: "" });

  const handleRemoveCategory = categoryId =>
    replaceQueryParams({
      ...appliedFilters,
      categoryIds: appliedFilters.categoryIds.filter(id => id !== categoryId),
    });

  const handleStatusChange = async (slug, status) => {
    try {
      await updatePost({ slug, status });
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDelete = async () => {
    if (!postToDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await destroyPost({ quiet: true, slug: postToDelete.slug });
      setPostToDelete(null);
      setSelectedRowKeys(previousKeys =>
        previousKeys.filter(key => key !== postToDelete.id)
      );
    } catch (error) {
      logger.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const selectedPosts = useMemo(() => {
    if (!posts?.length) {
      return [];
    }

    if (bulkSelectedAllRows) {
      return posts;
    }

    return posts.filter(post => selectedRowKeys.includes(post.id));
  }, [bulkSelectedAllRows, posts, selectedRowKeys]);

  const handleBulkStatusChange = async status => {
    if (!selectedPosts.length) {
      return;
    }

    try {
      setIsBulkUpdating(true);
      await bulkUpdatePosts({
        slugs: selectedPosts.map(({ slug }) => slug),
        status,
      });
      setSelectedRowKeys([]);
      setBulkSelectedAllRows(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsBulkUpdating(false);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedPosts.length) {
      return;
    }

    try {
      setIsBulkDeleting(true);
      await bulkDestroyPosts({
        slugs: selectedPosts.map(({ slug }) => slug),
      });
      setIsBulkDeleteAlertOpen(false);
      setSelectedRowKeys([]);
      setBulkSelectedAllRows(false);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsBulkDeleting(false);
    }
  };

  const rowData = useMemo(() => posts || [], [posts]);

  const totalCount = rowData.length;
  const selectedCount = bulkSelectedAllRows
    ? totalCount
    : selectedRowKeys.length;
  const hasSelection = selectedCount > 0;
  const areFiltersApplied = hasAppliedFilters(appliedFilters);

  return {
    appliedFilters,
    areFiltersApplied,
    bulkSelectedAllRows,
    handleBulkDelete,
    handleBulkStatusChange,
    handleDelete,
    handleRemoveCategory,
    handleRemoveStatus,
    handleRemoveTitle,
    handleStatusChange,
    hasSelection,
    isBulkDeleteAlertOpen,
    isBulkDeleting,
    isBulkUpdating,
    isDeleting,
    isLoading,
    isSearchFiltersOpen,
    postToDelete,
    posts,
    replaceQueryParams,
    rowData,
    selectedCount,
    selectedPosts,
    selectedRowKeys,
    setBulkSelectedAllRows,
    setIsBulkDeleteAlertOpen,
    setIsSearchFiltersOpen,
    setPostToDelete,
    setSelectedRowKeys,
    totalCount,
    visibleColumns,
  };
};

export default useMyPostsTable;
