import React from "react";

import { Container } from "components/commons";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { keysToCamelCase } from "neetocist";
import { NoData, Spinner, Typography } from "neetoui";
import { useParams } from "react-router-dom";
import withTitle from "utils/withTitle";

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

  const { title, description } = keysToCamelCase(post);

  return (
    <Container>
      <Typography className="mb-6 text-gray-900" style="h2" weight="semibold">
        {title}
      </Typography>
      <Typography
        className="whitespace-pre-wrap text-gray-700"
        style="body1"
        weight="normal"
      >
        {description}
      </Typography>
    </Container>
  );
};

export default withTitle(Show, SHOW_POST_TITLE);
