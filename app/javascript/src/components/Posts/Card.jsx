import React from "react";

import { Typography } from "neetoui";
import PropTypes from "prop-types";

import { formatCreatedAt } from "./utils";

const Card = ({ post: { title, description, createdAt } }) => (
  <article className="border-b border-gray-200 py-6">
    <Typography className="mb-2 text-gray-900" style="h4" weight="semibold">
      {title}
    </Typography>
    <Typography
      className="mb-3 line-clamp-2 text-gray-600"
      style="body2"
      weight="normal"
    >
      {description}
    </Typography>
    <Typography className="text-gray-400" style="body3" weight="normal">
      {formatCreatedAt(createdAt)}
    </Typography>
  </article>
);

Card.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
