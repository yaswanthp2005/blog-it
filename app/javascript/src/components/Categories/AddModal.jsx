import React from "react";

import { Button, Input, Modal, Typography } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const AddModal = ({ categoryName, isOpen, onCancel, onChange, onSave }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} size="small" onClose={onCancel}>
      <Modal.Header>
        <Typography style="h4" weight="semibold">
          {t("categories.newCategory")}
        </Typography>
      </Modal.Header>
      <Modal.Body>
        <Input
          label={t("categories.categoryTitle")}
          placeholder={t("categories.categoryNamePlaceholder")}
          value={categoryName}
          onChange={onChange}
        />
      </Modal.Body>
      <Modal.Footer className="neeto-ui-flex neeto-ui-items-center neeto-ui-justify-end neeto-ui-gap-2">
        <Button label={t("common.cancel")} style="text" onClick={onCancel} />
        <Button label={t("common.add")} onClick={onSave} />
      </Modal.Footer>
    </Modal>
  );
};

AddModal.propTypes = {
  categoryName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddModal;
