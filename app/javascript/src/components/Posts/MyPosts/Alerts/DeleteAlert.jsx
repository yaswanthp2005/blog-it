import React from "react";

import { Alert } from "neetoui";
import PropTypes from "prop-types";
import { Trans, useTranslation } from "react-i18next";

const DeleteAlert = ({ isDeleting, onClose, onSubmit, postToDelete }) => {
  const { t } = useTranslation();

  return (
    <Alert
      isOpen={Boolean(postToDelete)}
      isSubmitting={isDeleting}
      submitButtonLabel={t("common.yesDelete")}
      title={t("posts.deleteTitle")}
      message={
        <Trans
          components={{ 1: <strong /> }}
          i18nKey="posts.deleteConfirmMessage"
          values={{ title: postToDelete?.title }}
        />
      }
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

DeleteAlert.propTypes = {
  isDeleting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  postToDelete: PropTypes.shape({
    title: PropTypes.string,
  }),
};

DeleteAlert.defaultProps = {
  postToDelete: null,
};

export default DeleteAlert;
