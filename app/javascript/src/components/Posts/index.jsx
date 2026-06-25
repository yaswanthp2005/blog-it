import routes from "constants/routes";

import React from "react";

import { Container } from "components/commons";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import { keysToCamelCase } from "neetocist";
import { Button, NoData, Spinner, Typography } from "neetoui";
import { Link } from "react-router-dom";
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
      <div className="mb-8 flex items-center justify-between gap-x-4">
        <Typography className="text-gray-900" style="h2" weight="semibold">
          {POSTS_LISTING_TITLE}
        </Typography>
        <Link to={routes.posts.create}>
          <Button label="Add new blog post" style="primary" />
        </Link>
      </div>
      {renderContent()}
    </Container>
  );
};

export default withTitle(Posts, POSTS_LISTING_TITLE);
