import React from "react";

import ActionsDropdown from "./ActionsDropdown";
import TitleCell from "./cells/TitleCell";

import { COLUMN_KEYS } from "../constants";
import { formatMyPostsDateTime } from "../utils";

const buildColumnData = ({ onDelete, onStatusChange, t }) => [
  {
    title: t("posts.table.title"),
    dataIndex: "title",
    key: COLUMN_KEYS.TITLE,
    ellipsis: false,
    render: (title, post) => <TitleCell post={post} title={title} />,
  },
  {
    title: t("posts.table.category"),
    dataIndex: "categories",
    key: COLUMN_KEYS.CATEGORY,
    render: categories => categories.map(category => category.name).join(", "),
  },
  {
    title: t("posts.table.lastPublishedAt"),
    dataIndex: "lastPublishedAt",
    key: COLUMN_KEYS.LAST_PUBLISHED_AT,
    render: (_, post) => formatMyPostsDateTime(post),
  },
  {
    title: t("posts.table.status"),
    dataIndex: "status",
    key: COLUMN_KEYS.STATUS,
    render: status => t(`posts.${status}`),
  },
  {
    dataIndex: "actions",
    fixed: "right",
    key: COLUMN_KEYS.ACTIONS,
    align: "center",
    width: 80,
    render: (_, post) => (
      <ActionsDropdown
        post={post}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
      />
    ),
  },
];

export default buildColumnData;
