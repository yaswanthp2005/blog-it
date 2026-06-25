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
import { Trans, useTranslation } from "react-i18next";
import { Link, generatePath } from "react-router-dom";
import withTitle from "utils/withTitle";

import { POST_STATUSES } from "./constants";
import { formatMyPostsDateTime } from "./utils";

const TITLE_MAX_LENGTH = 50;
const DEFAULT_PAGE_SIZE = 10;

const MyPosts = () => {
  const { t } = useTranslation();
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
            tooltipProps={{ content: t("common.actions") }}
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
              {t("posts.publish")}
            </Dropdown.MenuItem.Button>
          ) : (
            <Dropdown.MenuItem.Button
              onClick={() => handleStatusChange(post.slug, POST_STATUSES.DRAFT)}
            >
              {t("posts.unpublish")}
            </Dropdown.MenuItem.Button>
          )}
          <Dropdown.MenuItem.Button
            style="danger"
            onClick={() => setPostToDelete(post)}
          >
            {t("common.delete")}
          </Dropdown.MenuItem.Button>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const columnData = useMemo(
    () => [
      {
        title: t("posts.table.title"),
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
        title: t("posts.table.category"),
        dataIndex: "categories",
        key: "category",
        render: categories =>
          categories.map(category => category.name).join(", "),
      },
      {
        title: t("posts.table.lastPublishedAt"),
        dataIndex: "lastPublishedAt",
        key: "lastPublishedAt",
        render: (_, post) => formatMyPostsDateTime(post),
      },
      {
        title: t("posts.table.status"),
        dataIndex: "status",
        key: "status",
        render: status => t(`posts.${status}`),
      },
      {
        dataIndex: "actions",
        fixed: "right",
        key: "actions",
        align: "center",
        width: 80,
        render: (_, post) => renderActions(post),
      },
    ],
    [t]
  );

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
      return <NoData title={t("posts.noBlogPostsYet")} />;
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
          allRowsSelectedMessage: t("posts.table.allSelected", {
            count: totalCount,
          }),
          clearSelectionButtonLabel: t("common.clearSelection"),
          selectAllRowButtonLabel: t("posts.table.selectAll", {
            count: totalCount,
          }),
          selectAllRowMessage: t("posts.table.selectedOnPage", {
            count: selectedCount,
          }),
          setBulkSelectedAllRows,
        }}
        onRowSelect={setSelectedRowKeys}
      />
    );
  };

  return (
    <Container>
      <Typography className="mb-8 text-gray-900" style="h2" weight="semibold">
        {t("posts.myPostsTitle")}
      </Typography>
      {renderContent()}
      <Alert
        isOpen={Boolean(postToDelete)}
        isSubmitting={isDeleting}
        submitButtonLabel={t("common.yesDelete")}
        title={t("posts.deleteTitle")}
        message={
          <Trans
            components={{ 1: <strong /> }}
            i18nKey="posts.deleteConfirmMessage"
            values={{ title: postToDelete?.title }}
          />
        }
        onClose={() => setPostToDelete(null)}
        onSubmit={handleDelete}
      />
    </Container>
  );
};

export default withTitle(MyPosts, "posts.myPostsTitle");
