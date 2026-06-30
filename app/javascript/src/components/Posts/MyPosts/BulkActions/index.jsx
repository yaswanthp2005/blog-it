import React from "react";

import { Button, Typography } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import ChangeStatusDropdown from "./ChangeStatusDropdown";

const BulkActions = ({
  isDeleting,
  isUpdating,
  onDelete,
  onStatusChange,
  selectedCount,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-4">
      <Typography style="body2" weight="semibold">
        {t("posts.bulkActions.selected", { count: selectedCount })}
      </Typography>
      <ChangeStatusDropdown
        isUpdating={isUpdating}
        onStatusChange={onStatusChange}
      />
      <Button
        disabled={isDeleting || isUpdating}
        label={t("common.delete")}
        style="danger"
        onClick={onDelete}
      />
    </div>
  );
};

BulkActions.propTypes = {
  isDeleting: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  selectedCount: PropTypes.number.isRequired,
};

export default BulkActions;
