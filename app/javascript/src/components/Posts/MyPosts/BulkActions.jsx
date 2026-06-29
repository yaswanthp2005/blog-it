import React from "react";

import { POST_STATUSES } from "components/Posts/constants";
import { Button, Dropdown, Typography } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const ChangeStatusDropdown = ({ isUpdating, onStatusChange }) => {
  const { t } = useTranslation();

  return (
    <Dropdown
      buttonStyle="secondary"
      disabled={isUpdating}
      label={t("posts.bulkActions.changeStatus")}
    >
      <Dropdown.Menu>
        <Dropdown.MenuItem.Button
          onClick={() => onStatusChange(POST_STATUSES.DRAFT)}
        >
          {t("posts.draft")}
        </Dropdown.MenuItem.Button>
        <Dropdown.MenuItem.Button
          onClick={() => onStatusChange(POST_STATUSES.PUBLISHED)}
        >
          {t("posts.published")}
        </Dropdown.MenuItem.Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

ChangeStatusDropdown.propTypes = {
  isUpdating: PropTypes.bool.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

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
