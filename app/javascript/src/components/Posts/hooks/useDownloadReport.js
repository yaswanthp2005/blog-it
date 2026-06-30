import { useEffect, useState } from "react";

import postsApi from "apis/posts";
import createConsumer from "channels/consumer";
import { subscribeToReportDownloadChannel } from "channels/reportDownloadChannel";
import FileSaver from "file-saver";

const useDownloadReport = ({ isOpen, onClose, slug }) => {
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

  return { message, progress };
};

export default useDownloadReport;
