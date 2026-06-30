import { POST_STATUSES } from "../common/constants";

const COLUMN_KEYS = {
  TITLE: "title",
  CATEGORY: "category",
  LAST_PUBLISHED_AT: "lastPublishedAt",
  STATUS: "status",
  ACTIONS: "actions",
};

const DEFAULT_VISIBLE_COLUMNS = [
  COLUMN_KEYS.TITLE,
  COLUMN_KEYS.CATEGORY,
  COLUMN_KEYS.LAST_PUBLISHED_AT,
  COLUMN_KEYS.STATUS,
  COLUMN_KEYS.ACTIONS,
];

const TOGGLEABLE_COLUMN_KEYS = [
  COLUMN_KEYS.TITLE,
  COLUMN_KEYS.CATEGORY,
  COLUMN_KEYS.LAST_PUBLISHED_AT,
  COLUMN_KEYS.STATUS,
];

const FILTER_FORM_INITIAL_VALUES = {
  title: "",
  categoryIds: [],
  status: "",
};

const STATUS_FILTER_OPTIONS = [
  { labelKey: "posts.filters.allStatuses", value: "" },
  { labelKey: "posts.draft", value: POST_STATUSES.DRAFT },
  { labelKey: "posts.published", value: POST_STATUSES.PUBLISHED },
];

export {
  COLUMN_KEYS,
  DEFAULT_VISIBLE_COLUMNS,
  FILTER_FORM_INITIAL_VALUES,
  STATUS_FILTER_OPTIONS,
  TOGGLEABLE_COLUMN_KEYS,
};
