import React from "react";

import { POST_STATUSES } from "components/Posts/common/constants";
import { Dropdown } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const ChangeStatusDropdown = ({ isUpdating, onStatusChange }) => {
  const { t } = useTranslation();

  return (
    <Dropdown
      buttonStyle="secondary"
      disabled={isUpdating}
      label={t("posts.bulkActions.changeStatus")}
    >
      <Dropdown.Menu>
        <Dropdown.MenuItem.Button
          onClick={() => onStatusChange(POST_STATUSES.DRAFT)}
        >
          {t("posts.draft")}
        </Dropdown.MenuItem.Button>
        <Dropdown.MenuItem.Button
          onClick={() => onStatusChange(POST_STATUSES.PUBLISHED)}
        >
          {t("posts.published")}
        </Dropdown.MenuItem.Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

ChangeStatusDropdown.propTypes = {
  isUpdating: PropTypes.bool.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default ChangeStatusDropdown;
