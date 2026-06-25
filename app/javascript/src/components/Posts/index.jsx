import React from "react";

import { Container } from "components/commons";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import { keysToCamelCase } from "neetocist";
import { NoData, Spinner, Typography } from "neetoui";
import withTitle from "utils/withTitle";

import Card from "./Card";

const POSTS_LISTING_TITLE = "Blog posts";

const Posts = () => {
  const { data: posts, isLoading } = useFetchPosts();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-64 items-center justify-center">
          <Spinner />
        </div>
      );
    }

    if (!posts?.length) {
      return <NoData title="No blog posts yet" />;
    }

    const normalizedPosts = posts.map(keysToCamelCase);

    return (
      <div>
        {normalizedPosts.map(post => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    );
  };

  return (
    <Container>
      <Typography className="mb-8 text-gray-900" style="h2" weight="semibold">
        {POSTS_LISTING_TITLE}
      </Typography>
      {renderContent()}
    </Container>
  );
};

export default withTitle(Posts, POSTS_LISTING_TITLE);
