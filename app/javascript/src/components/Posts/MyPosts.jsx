import routes from "constants/routes";

import React from "react";

import { Container } from "components/commons";
import {
  useDestroyPost,
  useFetchMyPosts,
  useUpdatePost,
} from "hooks/reactQuery/usePostsApi";
import { keysToCamelCase } from "neetocist";
import { MenuHorizontal } from "neetoicons";
import {
  Button,
  Dropdown,
  NoData,
  Spinner,
  Tooltip,
  Typography,
} from "neetoui";
import { Link, generatePath } from "react-router-dom";
import withTitle from "utils/withTitle";

import { POST_STATUSES } from "./constants";
import { capitalizeStatus, formatMyPostsDateTime } from "./utils";

const MY_POSTS_TITLE = "My blog posts";
const TITLE_MAX_LENGTH = 50;

const MyPosts = () => {
  const { data: posts, isLoading } = useFetchMyPosts();
  const { mutateAsync: updatePost } = useUpdatePost();
  const { mutateAsync: destroyPost } = useDestroyPost();

  const handleStatusChange = async (slug, status) => {
    try {
      await updatePost({ quiet: true, slug, status });
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDelete = async slug => {
    try {
      await destroyPost({ quiet: true, slug });
    } catch (error) {
      logger.error(error);
    }
  };

  const renderTitle = title => {
    const isTruncated = title.length > TITLE_MAX_LENGTH;
    const displayTitle = isTruncated
      ? `${title.slice(0, TITLE_MAX_LENGTH)}...`
      : title;

    const titleElement = (
      <span className="text-sm font-medium text-green-600 hover:text-green-800">
        {displayTitle}
      </span>
    );

    if (isTruncated) {
      return <Tooltip content={title}>{titleElement}</Tooltip>;
    }

    return titleElement;
  };

  const renderActions = post => {
    const isDraft = post.status === POST_STATUSES.DRAFT;

    return (
      <Dropdown
        buttonStyle="text"
        customTarget={
          <Button
            icon={MenuHorizontal}
            iconSize={20}
            style="text"
            tooltipProps={{ content: "Actions" }}
          />
        }
      >
        <Dropdown.Menu>
          {isDraft ? (
            <Dropdown.MenuItem.Button
              onClick={() =>
                handleStatusChange(post.slug, POST_STATUSES.PUBLISHED)
              }
            >
              Publish
            </Dropdown.MenuItem.Button>
          ) : (
            <Dropdown.MenuItem.Button
              onClick={() => handleStatusChange(post.slug, POST_STATUSES.DRAFT)}
            >
              Unpublish
            </Dropdown.MenuItem.Button>
          )}
          <Dropdown.MenuItem.Button
            style="danger"
            onClick={() => handleDelete(post.slug)}
          >
            Delete
          </Dropdown.MenuItem.Button>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

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
      <div className="inline-block min-w-full">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border-b border-r border-gray-300 bg-gray-100 px-4 py-2.5 text-left text-xs font-bold uppercase leading-4 text-gray-800">
                Title
              </th>
              <th className="border-b border-r border-gray-300 bg-gray-100 px-4 py-2.5 text-left text-xs font-bold uppercase leading-4 text-gray-800">
                Category
              </th>
              <th className="border-b border-r border-gray-300 bg-gray-100 px-4 py-2.5 text-left text-xs font-bold uppercase leading-4 text-gray-800">
                Last published at
              </th>
              <th className="border-b border-r border-gray-300 bg-gray-100 px-4 py-2.5 text-left text-xs font-bold uppercase leading-4 text-gray-800">
                Status
              </th>
              <th className="border-b border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-xs font-bold uppercase leading-4 text-gray-800" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {normalizedPosts.map(post => (
              <tr key={post.id}>
                <td className="border-r border-gray-300 px-4 py-2.5">
                  <Link
                    to={generatePath(routes.posts.show, { slug: post.slug })}
                  >
                    {renderTitle(post.title)}
                  </Link>
                </td>
                <td className="border-r border-gray-300 px-4 py-2.5 text-sm text-gray-800">
                  {post.categories.map(category => category.name).join(", ")}
                </td>
                <td className="border-r border-gray-300 px-4 py-2.5 text-sm text-gray-800">
                  {formatMyPostsDateTime(post)}
                </td>
                <td className="border-r border-gray-300 px-4 py-2.5 text-sm text-gray-800">
                  {capitalizeStatus(post.status)}
                </td>
                <td className="px-4 py-2.5 text-center">
                  {renderActions(post)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Container>
      <Typography className="mb-8 text-gray-900" style="h2" weight="semibold">
        {MY_POSTS_TITLE}
      </Typography>
      {renderContent()}
    </Container>
  );
};

export default withTitle(MyPosts, MY_POSTS_TITLE);
