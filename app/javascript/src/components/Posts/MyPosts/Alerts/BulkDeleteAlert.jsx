import React from "react";

import { Alert, Typography } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const BulkDeleteAlert = ({
  isDeleting,
  isOpen,
  onClose,
  onSubmit,
  selectedCount,
}) => {
  const { t } = useTranslation();

  return (
    <Alert
      isOpen={isOpen}
      isSubmitting={isDeleting}
      submitButtonLabel={t("common.yesDelete")}
      title={t("posts.bulkActions.deleteTitle")}
      message={
        <Typography>
          {t("posts.bulkActions.deleteMessage", { count: selectedCount })}
        </Typography>
      }
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

BulkDeleteAlert.propTypes = {
  isDeleting: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedCount: PropTypes.number.isRequired,
};

export default BulkDeleteAlert;
