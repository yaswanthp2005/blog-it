import { TITLE_MAX_LENGTH } from "../constants";

const formatMyPostsDateTime = ({ lastPublishedAt, status, updatedAt }) => {
  const dateTime = status === "draft" ? updatedAt : lastPublishedAt;

  if (!dateTime) {
    return "-";
  }

  const date = new Date(dateTime);
  const datePart = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
  });

  return `${datePart}, ${timePart}`;
};

const getTruncatedTitle = (title, maxLength = TITLE_MAX_LENGTH) => {
  const isTruncated = title.length > maxLength;

  return {
    displayTitle: isTruncated ? `${title.slice(0, maxLength)}...` : title,
    isTruncated,
  };
};

export { formatMyPostsDateTime, getTruncatedTitle };
