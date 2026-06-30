import React from "react";

import { Check } from "neetoicons";
import { ActionDropdown } from "neetoui";
import PropTypes from "prop-types";

import { POST_STATUSES } from "../common/constants";

const CheckPrefix = ({ isSelected }) => (
  <span className="flex w-4 items-center justify-center">
    {isSelected && <Check size={16} />}
  </span>
);

CheckPrefix.propTypes = {
  isSelected: PropTypes.bool.isRequired,
};

const PrimaryActionMenu = ({
  onAction,
  primaryAction,
  primaryActionLabel,
  setPrimaryAction,
  t,
}) => (
  <ActionDropdown
    buttonStyle="primary"
    className="[&_.neeto-ui-btn--style-primary]:!bg-gray-900 [&_.neeto-ui-btn--style-primary]:hover:!bg-black"
    label={primaryActionLabel}
    onClick={() => onAction(primaryAction)}
  >
    <ActionDropdown.Menu>
      <ActionDropdown.MenuItem.Button
        prefix={
          <CheckPrefix isSelected={primaryAction === POST_STATUSES.PUBLISHED} />
        }
        onClick={() => setPrimaryAction(POST_STATUSES.PUBLISHED)}
      >
        {t("posts.publish")}
      </ActionDropdown.MenuItem.Button>
      <ActionDropdown.MenuItem.Button
        prefix={
          <CheckPrefix isSelected={primaryAction === POST_STATUSES.DRAFT} />
        }
        onClick={() => setPrimaryAction(POST_STATUSES.DRAFT)}
      >
        {t("posts.saveAsDraft")}
      </ActionDropdown.MenuItem.Button>
    </ActionDropdown.Menu>
  </ActionDropdown>
);

PrimaryActionMenu.propTypes = {
  onAction: PropTypes.func.isRequired,
  primaryAction: PropTypes.string.isRequired,
  primaryActionLabel: PropTypes.string.isRequired,
  setPrimaryAction: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default PrimaryActionMenu;
