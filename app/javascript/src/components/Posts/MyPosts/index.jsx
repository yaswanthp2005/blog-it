import React from "react";

import { Container } from "components/commons";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import withTitle from "utils/withTitle";

import DeleteAlert from "./DeleteAlert";
import useColumnData from "./hooks/useColumnData";
import useMyPostsTable from "./hooks/useMyPostsTable";
import PostsTable from "./Table";

const MyPosts = () => {
  const { t } = useTranslation();
  const {
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
  } = useMyPostsTable();

  const columnData = useColumnData({
    onDelete: setPostToDelete,
    onStatusChange: handleStatusChange,
  });

  return (
    <Container>
      <Typography className="mb-8 text-gray-900" style="h2" weight="semibold">
        {t("posts.myPostsTitle")}
      </Typography>
      <PostsTable
        columnData={columnData}
        isLoading={isLoading}
        posts={posts}
        rowData={rowData}
        selectedCount={selectedCount}
        selectedRowKeys={selectedRowKeys}
        setBulkSelectedAllRows={setBulkSelectedAllRows}
        setSelectedRowKeys={setSelectedRowKeys}
        totalCount={totalCount}
      />
      <DeleteAlert
        isDeleting={isDeleting}
        postToDelete={postToDelete}
        onClose={() => setPostToDelete(null)}
        onSubmit={handleDelete}
      />
    </Container>
  );
};

export default withTitle(MyPosts, "posts.myPostsTitle");
