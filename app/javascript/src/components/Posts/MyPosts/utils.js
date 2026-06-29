import routes from "constants/routes";

import { filterNonNull, serializeKeysToSnakeCase } from "neetocist";
import { stringify } from "qs";

import { FILTER_FORM_INITIAL_VALUES } from "./constants";

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

const getTruncatedTitle = (title, maxLength = 50) => {
  const isTruncated = title.length > maxLength;

  return {
    displayTitle: isTruncated ? `${title.slice(0, maxLength)}...` : title,
    isTruncated,
  };
};

const extractValue = value => {
  if (value && typeof value === "object") {
    return value.value ?? "";
  }

  return value ?? "";
};

const extractCategoryIds = categoryIds => {
  if (!Array.isArray(categoryIds)) {
    return [];
  }

  return categoryIds.map(extractValue).filter(Boolean).map(String);
};

const filtersFromQueryParams = ({
  title = "",
  categoryIds,
  status = "",
} = {}) => ({
  title,
  categoryIds: extractCategoryIds(categoryIds),
  status: extractValue(status),
});

const buildQueryParams = ({ title, categoryIds, status } = {}) => {
  const ids = extractCategoryIds(categoryIds);
  const statusValue = extractValue(status);

  return serializeKeysToSnakeCase(
    filterNonNull({
      title: extractValue(title).trim() || null,
      categoryIds: ids.length ? ids : null,
      status: statusValue || null,
    })
  );
};

const buildURL = (params = {}) => {
  const queryString = stringify(buildQueryParams(params));

  return queryString
    ? `${routes.posts.mine}?${queryString}`
    : routes.posts.mine;
};

const buildMyPostsRequestParams = queryParams => {
  const filters = filtersFromQueryParams(queryParams);

  return {
    mine: true,
    ...buildQueryParams(filters),
  };
};

const hasAppliedFilters = (filters = FILTER_FORM_INITIAL_VALUES) =>
  Boolean(
    filters.title?.trim() ||
      extractCategoryIds(filters.categoryIds).length ||
      filters.status
  );

export {
  buildMyPostsRequestParams,
  buildQueryParams,
  buildURL,
  extractCategoryIds,
  extractValue,
  filtersFromQueryParams,
  formatMyPostsDateTime,
  getTruncatedTitle,
  hasAppliedFilters,
};
