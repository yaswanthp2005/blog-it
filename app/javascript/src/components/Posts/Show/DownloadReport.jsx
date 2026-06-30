import React from "react";

import { Modal, ProgressBar, Typography } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import useDownloadReport from "../hooks/useDownloadReport";

const DownloadReport = ({ isOpen, onClose, slug }) => {
  const { t } = useTranslation();
  const { message, progress } = useDownloadReport({ isOpen, onClose, slug });

  return (
    <Modal
      closeOnEsc={progress === 100}
      closeOnOutsideClick={progress === 100}
      isOpen={isOpen}
      size="small"
      onClose={onClose}
    >
      <Modal.Header>
        <Typography style="h4" weight="semibold">
          {t("posts.pdf.downloadTitle")}
        </Typography>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <Typography className="text-gray-700" style="body2">
            {message || t("posts.pdf.preparing")}
          </Typography>
          <ProgressBar progressPercentage={progress} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

DownloadReport.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
};

export default DownloadReport;
