import routes from "constants/routes";

import React, { useEffect, useMemo, useState } from "react";

import { useFormikContext } from "formik";
import { Check, MenuHorizontal, UpArrow } from "neetoicons";
import { ActionDropdown, Button, Dropdown, Typography } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { POST_STATUSES } from "./constants";

const PostFormHeader = ({
  defaultPrimaryAction,
  onCancel,
  onDelete,
  onPreview,
  onSubmitWithStatus,
  pageTitle,
  showMoreActions,
  showPreview,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { setTouched, validateForm, values } = useFormikContext();
  const [primaryAction, setPrimaryAction] = useState(
    defaultPrimaryAction || POST_STATUSES.PUBLISHED
  );

  const primaryActionLabels = useMemo(
    () => ({
      [POST_STATUSES.DRAFT]: t("posts.saveAsDraft"),
      [POST_STATUSES.PUBLISHED]: t("posts.publish"),
    }),
    [t]
  );

  useEffect(() => {
    if (defaultPrimaryAction) {
      setPrimaryAction(defaultPrimaryAction);
    }
  }, [defaultPrimaryAction]);

  const handleAction = async status => {
    const errors = await validateForm();
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      setTouched({
        categoryIds: true,
        description: true,
        title: true,
      });

      return;
    }

    await onSubmitWithStatus(values, status);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();

      return;
    }

    history.push(routes.posts.index);
  };

  const renderCheckPrefix = isSelected => (
    <span className="flex w-4 items-center justify-center">
      {isSelected && <Check size={16} />}
    </span>
  );

  const renderPrimaryActionMenu = () => (
    <ActionDropdown
      buttonStyle="primary"
      className="[&_.neeto-ui-btn--style-primary]:!bg-gray-900 [&_.neeto-ui-btn--style-primary]:hover:!bg-black"
      label={primaryActionLabels[primaryAction]}
      onClick={() => handleAction(primaryAction)}
    >
      <ActionDropdown.Menu>
        <ActionDropdown.MenuItem.Button
          prefix={renderCheckPrefix(primaryAction === POST_STATUSES.PUBLISHED)}
          onClick={() => setPrimaryAction(POST_STATUSES.PUBLISHED)}
        >
          {t("posts.publish")}
        </ActionDropdown.MenuItem.Button>
        <ActionDropdown.MenuItem.Button
          prefix={renderCheckPrefix(primaryAction === POST_STATUSES.DRAFT)}
          onClick={() => setPrimaryAction(POST_STATUSES.DRAFT)}
        >
          {t("posts.saveAsDraft")}
        </ActionDropdown.MenuItem.Button>
      </ActionDropdown.Menu>
    </ActionDropdown>
  );

  const renderMoreActionsMenu = () => (
    <Dropdown
      buttonStyle="text"
      customTarget={
        <Button
          icon={MenuHorizontal}
          iconSize={20}
          style="text"
          tooltipProps={{ content: t("posts.moreActions") }}
        />
      }
    >
      <Dropdown.Menu>
        <Dropdown.MenuItem.Button style="danger" onClick={onDelete}>
          {t("common.delete")}
        </Dropdown.MenuItem.Button>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <div className="mb-8 flex items-center justify-between gap-x-4">
      <Typography className="text-gray-900" style="h2" weight="semibold">
        {pageTitle}
      </Typography>
      <div className="flex items-center gap-x-3">
        {showPreview && (
          <Button
            icon={() => <UpArrow className="rotate-45" size={20} />}
            style="text"
            tooltipProps={{ content: t("common.preview") }}
            onClick={onPreview}
          />
        )}
        <Button
          label={t("common.cancel")}
          style="secondary"
          onClick={handleCancel}
        />
        {renderPrimaryActionMenu()}
        {showMoreActions && renderMoreActionsMenu()}
      </div>
    </div>
  );
};

PostFormHeader.propTypes = {
  defaultPrimaryAction: PropTypes.string,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onPreview: PropTypes.func,
  onSubmitWithStatus: PropTypes.func.isRequired,
  pageTitle: PropTypes.string.isRequired,
  showMoreActions: PropTypes.bool,
  showPreview: PropTypes.bool,
};

PostFormHeader.defaultProps = {
  defaultPrimaryAction: null,
  onCancel: null,
  onDelete: () => {},
  onPreview: () => {},
  showMoreActions: true,
  showPreview: false,
};

export default PostFormHeader;
