import routes from "constants/routes";

import React from "react";

import Avvvatars from "avvvatars-react";
import { Container } from "components/commons";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { Edit } from "neetoicons";
import { Button, NoData, Spinner, Tag, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { generatePath, useHistory, useParams } from "react-router-dom";
import { getFromLocalStorage } from "utils/storage";
import withTitle from "utils/withTitle";

import { POST_STATUSES } from "./constants";
import { formatPublishedDate } from "./utils";

const Show = () => {
  const history = useHistory();
  const { slug } = useParams();
  const { t } = useTranslation();
  const { data: post, isLoading } = useShowPost(slug);
  const currentUserId = getFromLocalStorage("authUserId");

  if (isLoading) {
    return (
      <Container>
        <div className="flex h-64 items-center justify-center">
          <Spinner />
        </div>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container>
        <NoData title={t("posts.notFound")} />
      </Container>
    );
  }

  const {
    authorName,
    categories,
    description,
    lastPublishedAt,
    status,
    title,
    userId,
  } = post;

  const isOwnPost = userId === currentUserId;
  const isDraft = status === POST_STATUSES.DRAFT;

  const handleEdit = () => {
    history.push(generatePath(routes.posts.edit, { slug }));
  };

  return (
    <Container>
      <div className="mx-auto max-w-5xl pt-4">
        <div className="mb-5 flex flex-wrap gap-2">
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
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
            <Typography
              className="min-w-0 break-words text-gray-900"
              style="h1"
              weight="semibold"
            >
              {title}
            </Typography>
            {isDraft && (
              <Tag
                className="!border-red-300 !bg-white !text-red-600"
                label={t("posts.draft")}
                style="default"
                type="outline"
              />
            )}
          </div>
          {isOwnPost && (
            <Button
              className="flex-shrink-0"
              icon={Edit}
              iconSize={20}
              style="text"
              tooltipProps={{ content: t("common.edit") }}
              onClick={handleEdit}
            />
          )}
        </div>
        <div className="mb-10 flex items-center gap-x-3">
          <Avvvatars size={44} style="character" value={authorName} />
          <div>
            <Typography
              className="text-gray-800"
              style="body2"
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
        <Typography
          className="whitespace-pre-wrap leading-8 text-gray-700"
          style="body1"
          weight="normal"
        >
          {description}
        </Typography>
      </div>
    </Container>
  );
};

export default withTitle(Show, "posts.showTitle");
