import React from "react";

import BulkActions from "./BulkActions";
import TableActions from "./TableActions";

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
