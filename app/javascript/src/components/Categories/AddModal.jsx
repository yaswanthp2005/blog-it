import React from "react";

import { Button, Input, Modal, Typography } from "neetoui";
import PropTypes from "prop-types";

const AddModal = ({ categoryName, isOpen, onCancel, onChange, onSave }) => (
  <Modal isOpen={isOpen} size="small" onClose={onCancel}>
    <Modal.Header>
      <Typography style="h4" weight="semibold">
        New category
      </Typography>
    </Modal.Header>
    <Modal.Body>
      <Input
        label="Category title"
        placeholder="Enter category name"
        value={categoryName}
        onChange={onChange}
      />
    </Modal.Body>
    <Modal.Footer className="neeto-ui-flex neeto-ui-items-center neeto-ui-justify-end neeto-ui-gap-2">
      <Button label="Cancel" style="text" onClick={onCancel} />
      <Button label="Add" onClick={onSave} />
    </Modal.Footer>
  </Modal>
);

AddModal.propTypes = {
  categoryName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddModal;
