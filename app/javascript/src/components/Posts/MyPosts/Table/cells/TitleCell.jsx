import routes from "constants/routes";

import React from "react";

import { Tooltip } from "neetoui";
import PropTypes from "prop-types";
import { Link, generatePath } from "react-router-dom";

import { getTruncatedTitle } from "../../utils";

const TitleCell = ({ post, title }) => {
  const { displayTitle, isTruncated } = getTruncatedTitle(title);

  const titleElement = (
    <span className="text-sm font-medium text-green-600 hover:text-green-800">
      {displayTitle}
    </span>
  );

  return (
    <Link to={generatePath(routes.posts.edit, { slug: post.slug })}>
      {isTruncated ? (
        <Tooltip content={title}>{titleElement}</Tooltip>
      ) : (
        titleElement
      )}
    </Link>
  );
};

TitleCell.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default TitleCell;
