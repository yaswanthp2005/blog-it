import routes from "constants/routes";

import React from "react";

import { Tag, Typography } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link, generatePath } from "react-router-dom";

import { formatPublishedDate } from "./utils";
import VoteControls from "./VoteControls";

const Card = ({
  post: {
    authorName,
    categories,
    isBloggable,
    lastPublishedAt,
    netVoteCount,
    slug,
    title,
    userVote,
  },
}) => {
  const { t } = useTranslation();

  return (
    <article className="border-b border-gray-200 py-6">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Link to={generatePath(routes.posts.show, { slug })}>
              <Typography
                className="text-gray-900 hover:text-primary-800"
                style="h4"
                weight="semibold"
              >
                {title}
              </Typography>
            </Link>
            {isBloggable && (
              <Tag
                className="!border-gray-300 !bg-white !text-gray-800"
                label={t("posts.blogIt")}
                style="secondary"
                type="outline"
              />
            )}
          </div>
          <div className="mb-3 flex flex-wrap gap-2">
            {categories.map(category => (
              <Tag
                className="!border-green-200 !bg-green-100 !text-black"
                key={category.id}
                label={category.name}
                style="success"
                type="solid"
              />
            ))}
          </div>
          <div className="flex flex-col gap-y-0.5">
            <Typography
              className="text-gray-700"
              style="body3"
              weight="semibold"
            >
              {authorName}
            </Typography>
            {lastPublishedAt && (
              <Typography
                className="text-gray-500"
                style="body3"
                weight="normal"
              >
                {formatPublishedDate(lastPublishedAt)}
              </Typography>
            )}
          </div>
        </div>
        <VoteControls
          netVoteCount={netVoteCount}
          slug={slug}
          userVote={userVote}
        />
      </div>
    </article>
  );
};

Card.propTypes = {
  post: PropTypes.shape({
    authorName: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    isBloggable: PropTypes.bool,
    lastPublishedAt: PropTypes.string,
    netVoteCount: PropTypes.number,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    userVote: PropTypes.string,
  }).isRequired,
};

export default Card;
