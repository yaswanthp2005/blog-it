import routes from "constants/routes";

import React, { useMemo, useState } from "react";

import { Container } from "components/commons";
import {
  useDestroyPost,
  useFetchMyPosts,
  useUpdatePost,
} from "hooks/reactQuery/usePostsApi";
import { keysToCamelCase } from "neetocist";
import { MenuHorizontal } from "neetoicons";
import {
  Alert,
  Button,
  Dropdown,
  NoData,
  Table,
  Tooltip,
  Typography,
} from "neetoui";
import { Link, generatePath } from "react-router-dom";
import withTitle from "utils/withTitle";

import { POST_STATUSES } from "./constants";
import { capitalizeStatus, formatMyPostsDateTime } from "./utils";

const MY_POSTS_TITLE = "My blog posts";
const TITLE_MAX_LENGTH = 50;
const DEFAULT_PAGE_SIZE = 10;

const MyPosts = () => {
  const { data: posts, isLoading } = useFetchMyPosts();
  const { mutateAsync: updatePost } = useUpdatePost();
  const { mutateAsync: destroyPost } = useDestroyPost();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [bulkSelectedAllRows, setBulkSelectedAllRows] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (slug, status) => {
    try {
      await updatePost({ quiet: true, slug, status });
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDelete = async () => {
    if (!postToDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await destroyPost({ quiet: true, slug: postToDelete.slug });
      setPostToDelete(null);
    } catch (error) {
      logger.error(error);
    } finally {
      setIsDeleting(false);
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
        dropdownProps={{ appendTo: () => document.body }}
        strategy="fixed"
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
            onClick={() => setPostToDelete(post)}
          >
            Delete
          </Dropdown.MenuItem.Button>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const columnData = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: false,
      render: (title, post) => (
        <Link to={generatePath(routes.posts.edit, { slug: post.slug })}>
          {renderTitle(title)}
        </Link>
      ),
    },
    {
      title: "Category",
      dataIndex: "categories",
      key: "category",
      render: categories =>
        categories.map(category => category.name).join(", "),
    },
    {
      title: "Last published at",
      dataIndex: "lastPublishedAt",
      key: "lastPublishedAt",
      render: (_, post) => formatMyPostsDateTime(post),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: status => capitalizeStatus(status),
    },
    {
      dataIndex: "actions",
      fixed: "right",
      key: "actions",
      align: "center",
      width: 80,
      render: (_, post) => renderActions(post),
    },
  ];

  const rowData = useMemo(
    () => (posts ? posts.map(keysToCamelCase) : []),
    [posts]
  );

  const totalCount = rowData.length;
  const selectedCount = bulkSelectedAllRows
    ? totalCount
    : selectedRowKeys.length;

  const renderContent = () => {
    if (!isLoading && !posts?.length) {
      return <NoData title="No blog posts yet" />;
    }

    return (
      <Table
        rowSelection
        allowRowClick={false}
        columnData={columnData}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        enableColumnFreeze={false}
        enableColumnReorder={false}
        enableColumnResize={false}
        loading={isLoading}
        rowData={rowData}
        rowKey="id"
        selectedRowKeys={selectedRowKeys}
        totalCount={totalCount}
        bulkSelectAllRowsProps={{
          allRowsSelectedMessage: `All ${totalCount} blog posts selected.`,
          clearSelectionButtonLabel: "Clear selection",
          selectAllRowButtonLabel: `Select all ${totalCount} blog posts`,
          selectAllRowMessage: `${selectedCount} blog posts selected on this page.`,
          setBulkSelectedAllRows,
        }}
        onRowSelect={setSelectedRowKeys}
      />
    );
  };

  return (
    <Container>
      <Typography className="mb-8 text-gray-900" style="h2" weight="semibold">
        {MY_POSTS_TITLE}
      </Typography>
      {renderContent()}
      <Alert
        isOpen={Boolean(postToDelete)}
        isSubmitting={isDeleting}
        submitButtonLabel="Yes, delete"
        title="Delete blog post"
        message={
          <>
            Are you sure you want to delete{" "}
            <strong>{postToDelete?.title}</strong>? This action cannot be
            undone.
          </>
        }
        onClose={() => setPostToDelete(null)}
        onSubmit={handleDelete}
      />
    </Container>
  );
};

export default withTitle(MyPosts, MY_POSTS_TITLE);
