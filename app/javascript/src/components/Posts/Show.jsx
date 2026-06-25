import React from "react";

import Avvvatars from "avvvatars-react";
import { Container } from "components/commons";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { keysToCamelCase } from "neetocist";
import { NoData, Tag, Spinner, Typography } from "neetoui";
import { useParams } from "react-router-dom";
import withTitle from "utils/withTitle";

import { formatCreatedAt } from "./utils";

const SHOW_POST_TITLE = "Blog post";

const Show = () => {
  const { slug } = useParams();
  const { data: post, isLoading } = useShowPost(slug);

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
        <NoData title="Blog post not found" />
      </Container>
    );
  }

  const { authorName, categories, createdAt, description, title } =
    keysToCamelCase(post);

  return (
    <Container>
      <div className="mx-auto max-w-5xl pt-4">
        <div className="mb-5 flex flex-wrap gap-2">
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
        <Typography className="mb-6 text-gray-900" style="h1" weight="semibold">
          {title}
        </Typography>
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
            <Typography className="text-gray-500" style="body3" weight="normal">
              {formatCreatedAt(createdAt)}
            </Typography>
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

export default withTitle(Show, SHOW_POST_TITLE);
