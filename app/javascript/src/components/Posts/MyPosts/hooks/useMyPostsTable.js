import { useMemo, useState } from "react";

import {
  useDestroyPost,
  useFetchMyPosts,
  useUpdatePost,
} from "hooks/reactQuery/usePostsApi";
import { keysToCamelCase } from "neetocist";

const useMyPostsTable = () => {
  const { data: posts, isLoading } = useFetchMyPosts();
  const { mutateAsync: updatePost } = useUpdatePost();
  const { mutateAsync: destroyPost } = useDestroyPost();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [bulkSelectedAllRows, setBulkSelectedAllRows] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (slug, status) => {
    try {
      await updatePost({ quiet: true, slug, status });
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
    } catch (error) {
      logger.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const rowData = useMemo(
    () => (posts ? posts.map(keysToCamelCase) : []),
    [posts]
  );

  const totalCount = rowData.length;
  const selectedCount = bulkSelectedAllRows
    ? totalCount
    : selectedRowKeys.length;

  return {
    bulkSelectedAllRows,
    handleDelete,
    handleStatusChange,
    isDeleting,
    isLoading,
    postToDelete,
    posts,
    rowData,
    selectedCount,
    selectedRowKeys,
    setBulkSelectedAllRows,
    setPostToDelete,
    setSelectedRowKeys,
    totalCount,
  };
};

export default useMyPostsTable;
