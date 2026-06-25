import routes from "constants/routes";

import React from "react";

import { Tag, Typography } from "neetoui";
import PropTypes from "prop-types";
import { Link, generatePath } from "react-router-dom";

import { formatCreatedAt } from "./utils";

const Card = ({ post: { authorName, categories, createdAt, slug, title } }) => (
  <article className="border-b border-gray-200 py-6">
    <Link to={generatePath(routes.posts.show, { slug })}>
      <Typography
        className="mb-3 text-gray-900 hover:text-primary-800"
        style="h4"
        weight="semibold"
      >
        {title}
      </Typography>
    </Link>
    <div className="mb-3 flex flex-wrap gap-2">
      {categories.map(category => (
        <Tag
          className="!border-green-200 !bg-green-100 !text-green-800"
          key={category.id}
          label={category.name}
          style="success"
          type="solid"
        />
      ))}
    </div>
    <div className="flex flex-col gap-y-0.5">
      <Typography className="text-gray-700" style="body3" weight="semibold">
        {authorName}
      </Typography>
      <Typography className="text-gray-500" style="body3" weight="normal">
        {formatCreatedAt(createdAt)}
      </Typography>
    </div>
  </article>
);

Card.propTypes = {
  post: PropTypes.shape({
    authorName: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
