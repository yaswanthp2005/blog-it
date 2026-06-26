import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Button, Dropdown } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { POST_STATUSES } from "../constants";

const ActionsDropdown = ({ onDelete, onStatusChange, post }) => {
  const { t } = useTranslation();
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
            onClick={() => onStatusChange(post.slug, POST_STATUSES.PUBLISHED)}
          >
            {t("posts.publish")}
          </Dropdown.MenuItem.Button>
        ) : (
          <Dropdown.MenuItem.Button
            onClick={() => onStatusChange(post.slug, POST_STATUSES.DRAFT)}
          >
            {t("posts.unpublish")}
          </Dropdown.MenuItem.Button>
        )}
        <Dropdown.MenuItem.Button style="danger" onClick={() => onDelete(post)}>
          {t("common.delete")}
        </Dropdown.MenuItem.Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

ActionsDropdown.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default ActionsDropdown;
