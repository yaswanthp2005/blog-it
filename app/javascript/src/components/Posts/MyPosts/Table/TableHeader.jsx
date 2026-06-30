import React from "react";

import TableActions from "./TableActions";

import BulkActions from "../BulkActions";

const TableHeader = ({
  hasSelection,
  isBulkDeleting,
  isBulkUpdating,
  onBulkDelete,
  onBulkStatusChange,
  onSearchFiltersOpen,
  selectedCount,
}) => {
  if (hasSelection) {
    return (
      <BulkActions
        isDeleting={isBulkDeleting}
        isUpdating={isBulkUpdating}
        selectedCount={selectedCount}
        onDelete={onBulkDelete}
        onStatusChange={onBulkStatusChange}
      />
    );
  }

  return <TableActions onSearchFiltersOpen={onSearchFiltersOpen} />;
};

export default TableHeader;
