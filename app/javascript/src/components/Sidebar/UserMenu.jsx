import React from "react";

import Avvvatars from "avvvatars-react";
import { Logout } from "neetoicons";
import { Dropdown, Typography } from "neetoui";
import PropTypes from "prop-types";

const UserMenu = ({ onLogout, t, userEmail, userName }) => (
  <div className="w-56 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
    <div className="flex items-center gap-x-2 p-3">
      <Avvvatars
        size={28}
        style="character"
        value={userName || t("common.user")}
      />
      <div>
        <Typography className="text-gray-900" style="body2" weight="semibold">
          {userName || t("common.user")}
        </Typography>
        <Typography className="text-gray-500" style="body3" weight="normal">
          {userEmail || "-"}
        </Typography>
      </div>
    </div>
    <div className="border-t border-gray-200" />
    <Dropdown.Menu>
      <Dropdown.MenuItem.Button
        className="!w-full !rounded-none"
        prefix={<Logout size={16} />}
        style="danger-text"
        onClick={onLogout}
      >
        {t("sidebar.logout")}
      </Dropdown.MenuItem.Button>
    </Dropdown.Menu>
  </div>
);

UserMenu.propTypes = {
  onLogout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  userEmail: PropTypes.string,
  userName: PropTypes.string,
};

UserMenu.defaultProps = {
  userEmail: null,
  userName: null,
};

export default UserMenu;
