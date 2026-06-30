import { getFromLocalStorage } from "utils/storage";

export const subscribeToReportDownloadChannel = ({
  consumer,
  generatePdf,
  setMessage,
  setProgress,
}) => {
  const userId = getFromLocalStorage("authUserId");
  const reportDownloadSubscription = consumer.subscriptions.create(
    {
      channel: "ReportDownloadChannel",
      pubsub_token: userId,
    },
    {
      connected() {
        setMessage("Connected the Cables...");
        generatePdf();
      },
      received(data) {
        const { notice, progress } = data;
        setMessage(notice);
        setProgress(progress);
      },
    }
  );

  return reportDownloadSubscription;
};
