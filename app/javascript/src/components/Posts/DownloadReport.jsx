import React, { useEffect, useState } from "react";

import postsApi from "apis/posts";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import FileSaver from "file-saver";
import { Modal, ProgressBar, Typography } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const DownloadReport = ({ isOpen, onClose, slug }) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    setProgress(0);
    setMessage("");

    const consumer = createConsumer();

    const startGeneration = async () => {
      try {
        await postsApi.generatePdf(slug);
      } catch (error) {
        logger.error(error);
      }
    };

    subscribeToReportDownloadChannel({
      consumer,
      generatePdf: startGeneration,
      setMessage,
      setProgress,
    });

    return () => {
      consumer.disconnect();
    };
  }, [isOpen, slug]);

  useEffect(() => {
    if (!isOpen || progress !== 100) {
      return;
    }

    const savePdf = async () => {
      try {
        const { data } = await postsApi.download(slug);
        FileSaver.saveAs(data, `${slug}.pdf`);
        onClose();
      } catch (error) {
        logger.error(error);
      }
    };

    savePdf();
  }, [isOpen, onClose, progress, slug]);

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
