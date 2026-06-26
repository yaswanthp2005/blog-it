import React from "react";

import ActionsDropdown from "./ActionsDropdown";
import TitleCell from "./TitleCell";
import { formatMyPostsDateTime } from "./utils";

const buildColumnData = ({ onDelete, onStatusChange, t }) => [
  {
    title: t("posts.table.title"),
    dataIndex: "title",
    key: "title",
    ellipsis: false,
    render: (title, post) => <TitleCell post={post} title={title} />,
  },
  {
    title: t("posts.table.category"),
    dataIndex: "categories",
    key: "category",
    render: categories => categories.map(category => category.name).join(", "),
  },
  {
    title: t("posts.table.lastPublishedAt"),
    dataIndex: "lastPublishedAt",
    key: "lastPublishedAt",
    render: (_, post) => formatMyPostsDateTime(post),
  },
  {
    title: t("posts.table.status"),
    dataIndex: "status",
    key: "status",
    render: status => t(`posts.${status}`),
  },
  {
    dataIndex: "actions",
    fixed: "right",
    key: "actions",
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
