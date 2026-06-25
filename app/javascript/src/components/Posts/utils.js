const formatDraftSavedAt = savedAt => {
  const date = new Date(savedAt);
  const time = date
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
    })
    .replace(" ", "");

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `${time}, ${formattedDate}`;
};

const formatPublishedDate = publishedAt => {
  if (!publishedAt) {
    return null;
  }

  return new Date(publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatPublishedDateTime = publishedAt => {
  if (!publishedAt) {
    return "-";
  }

  const date = new Date(publishedAt);
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

const formatMyPostsDateTime = ({ lastPublishedAt, status, updatedAt }) => {
  const dateTime = status === "draft" ? updatedAt : lastPublishedAt;

  return formatPublishedDateTime(dateTime);
};

const capitalizeStatus = status =>
  status ? status.charAt(0).toUpperCase() + status.slice(1) : "";

const buildCategoryIds = categoryIds =>
  categoryIds
    .map(category => Number.parseInt(category?.value, 10))
    .filter(Number.isFinite);

const buildCategoryOptions = categories =>
  categories?.map(category => ({
    label: category.name,
    value: category.id,
  })) || [];

export {
  buildCategoryIds,
  buildCategoryOptions,
  capitalizeStatus,
  formatDraftSavedAt,
  formatMyPostsDateTime,
  formatPublishedDate,
  formatPublishedDateTime,
};
