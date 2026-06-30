import React from "react";

import { UpArrow } from "neetoicons";
import { Button, Typography } from "neetoui";
import PropTypes from "prop-types";

import usePostFormHeader from "./hooks/usePostFormHeader";
import MoreActionsMenu from "./MoreActionsMenu";
import PrimaryActionMenu from "./PrimaryActionMenu";

const PostFormHeader = ({
  defaultPrimaryAction,
  onCancel,
  onDelete,
  onPreview,
  onSubmitWithStatus,
  pageTitle,
  showMoreActions,
  showPreview,
}) => {
  const {
    handleAction,
    handleCancel,
    handlePreview,
    primaryAction,
    primaryActionLabel,
    setPrimaryAction,
    t,
  } = usePostFormHeader({
    defaultPrimaryAction,
    onCancel,
    onPreview,
    onSubmitWithStatus,
  });

  return (
    <div className="mb-8 flex items-center justify-between gap-x-4">
      <Typography className="text-gray-900" style="h2" weight="semibold">
        {pageTitle}
      </Typography>
      <div className="flex items-center gap-x-3">
        {showPreview && (
          <Button
            icon={() => <UpArrow className="rotate-45" size={20} />}
            style="text"
            tooltipProps={{ content: t("common.preview") }}
            onClick={handlePreview}
          />
        )}
        <Button
          label={t("common.cancel")}
          style="secondary"
          onClick={handleCancel}
        />
        <PrimaryActionMenu
          primaryAction={primaryAction}
          primaryActionLabel={primaryActionLabel}
          setPrimaryAction={setPrimaryAction}
          t={t}
          onAction={handleAction}
        />
        {showMoreActions && <MoreActionsMenu t={t} onDelete={onDelete} />}
      </div>
    </div>
  );
};

PostFormHeader.propTypes = {
  defaultPrimaryAction: PropTypes.string,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onPreview: PropTypes.func,
  onSubmitWithStatus: PropTypes.func.isRequired,
  pageTitle: PropTypes.string.isRequired,
  showMoreActions: PropTypes.bool,
  showPreview: PropTypes.bool,
};

PostFormHeader.defaultProps = {
  defaultPrimaryAction: null,
  onCancel: null,
  onDelete: () => {},
  onPreview: () => {},
  showMoreActions: true,
  showPreview: false,
};

export default PostFormHeader;
