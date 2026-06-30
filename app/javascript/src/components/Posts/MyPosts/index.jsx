import React from "react";

import { Container } from "components/commons";
import { Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import withTitle from "utils/withTitle";

import BulkDeleteAlert from "./Alerts/BulkDeleteAlert";
import DeleteAlert from "./Alerts/DeleteAlert";
import AppliedFilters from "./Filters/AppliedFilters";
import SearchFilters from "./Filters/SearchFilters";
import useColumnData from "./hooks/useColumnData";
import useMyPostsTable from "./hooks/useMyPostsTable";
import PostsTable from "./Table";
import TableHeader from "./Table/TableHeader";

const MyPosts = () => {
  const { t } = useTranslation();
  const {
    appliedFilters,
    areFiltersApplied,
    handleBulkDelete,
    handleBulkStatusChange,
    handleDelete,
    handleRemoveCategory,
    handleRemoveStatus,
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
    selectedRowKeys,
    setBulkSelectedAllRows,
    setIsBulkDeleteAlertOpen,
    setIsSearchFiltersOpen,
    setPostToDelete,
    setSelectedRowKeys,
    totalCount,
    visibleColumns,
  } = useMyPostsTable();

  const columnData = useColumnData({
    onDelete: setPostToDelete,
    onStatusChange: handleStatusChange,
    visibleColumns,
  });

  const renderTableSection = () => (
    <div className="mb-4 flex items-center justify-between">
      {areFiltersApplied ? (
        <AppliedFilters
          appliedFilters={appliedFilters}
          totalCount={totalCount}
          onRemoveCategory={handleRemoveCategory}
          onRemoveStatus={handleRemoveStatus}
        />
      ) : (
        <Typography style="body2" weight="semibold">
          {t("posts.articlesCount", { count: totalCount })}
        </Typography>
      )}
      <TableHeader
        hasSelection={hasSelection}
        isBulkDeleting={isBulkDeleting}
        isBulkUpdating={isBulkUpdating}
        selectedCount={selectedCount}
        onBulkDelete={() => setIsBulkDeleteAlertOpen(true)}
        onBulkStatusChange={handleBulkStatusChange}
        onSearchFiltersOpen={() => setIsSearchFiltersOpen(true)}
      />
    </div>
  );

  return (
    <Container>
      <Typography className="mb-8 text-gray-900" style="h2" weight="semibold">
        {t("posts.myPostsTitle")}
      </Typography>
      {renderTableSection()}
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
      <SearchFilters
        filters={appliedFilters}
        isOpen={isSearchFiltersOpen}
        onClose={() => setIsSearchFiltersOpen(false)}
        onSubmit={replaceQueryParams}
      />
      <DeleteAlert
        isDeleting={isDeleting}
        postToDelete={postToDelete}
        onClose={() => setPostToDelete(null)}
        onSubmit={handleDelete}
      />
      <BulkDeleteAlert
        isDeleting={isBulkDeleting}
        isOpen={isBulkDeleteAlertOpen}
        selectedCount={selectedCount}
        onClose={() => setIsBulkDeleteAlertOpen(false)}
        onSubmit={handleBulkDelete}
      />
    </Container>
  );
};

export default withTitle(MyPosts, "posts.myPostsTitle");
