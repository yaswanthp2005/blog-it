import React from "react";

import { MenuHorizontal } from "neetoicons";
import { Button, Dropdown } from "neetoui";
import PropTypes from "prop-types";

const MoreActionsMenu = ({ onDelete, t }) => (
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

MoreActionsMenu.propTypes = {
  onDelete: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default MoreActionsMenu;
