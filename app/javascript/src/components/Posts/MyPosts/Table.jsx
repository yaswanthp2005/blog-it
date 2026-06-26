import React from "react";

import { NoData, Table } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { DEFAULT_PAGE_SIZE } from "../constants";

const PostsTable = ({
  columnData,
  isLoading,
  posts,
  rowData,
  selectedCount,
  selectedRowKeys,
  setBulkSelectedAllRows,
  setSelectedRowKeys,
  totalCount,
}) => {
  const { t } = useTranslation();

  if (!isLoading && !posts?.length) {
    return <NoData title={t("posts.noBlogPostsYet")} />;
  }

  return (
    <Table
      rowSelection
      allowRowClick={false}
      columnData={columnData}
      defaultPageSize={DEFAULT_PAGE_SIZE}
      enableColumnFreeze={false}
      enableColumnReorder={false}
      enableColumnResize={false}
      loading={isLoading}
      rowData={rowData}
      rowKey="id"
      selectedRowKeys={selectedRowKeys}
      totalCount={totalCount}
      bulkSelectAllRowsProps={{
        allRowsSelectedMessage: t("posts.table.allSelected", {
          count: totalCount,
        }),
        clearSelectionButtonLabel: t("common.clearSelection"),
        selectAllRowButtonLabel: t("posts.table.selectAll", {
          count: totalCount,
        }),
        selectAllRowMessage: t("posts.table.selectedOnPage", {
          count: selectedCount,
        }),
        setBulkSelectedAllRows,
      }}
      onRowSelect={setSelectedRowKeys}
    />
  );
};

PostsTable.propTypes = {
  columnData: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  posts: PropTypes.array,
  rowData: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedCount: PropTypes.number.isRequired,
  selectedRowKeys: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  setBulkSelectedAllRows: PropTypes.func.isRequired,
  setSelectedRowKeys: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
};

PostsTable.defaultProps = {
  posts: [],
};

export default PostsTable;
