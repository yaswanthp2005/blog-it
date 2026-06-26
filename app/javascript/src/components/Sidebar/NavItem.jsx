import React from "react";

import classnames from "classnames";
import { Button } from "neetoui";
import PropTypes from "prop-types";

const NavItem = ({ active, icon, label, onClick, path }) => (
  <Button
    icon={icon}
    iconSize={20}
    style="text"
    to={path}
    tooltipProps={{ content: label }}
    className={classnames("rounded-lg", {
      "!bg-primary-800 !text-white": active,
      "!text-gray-400 hover:!bg-gray-100": !active,
    })}
    onClick={onClick}
  />
);

NavItem.propTypes = {
  active: PropTypes.bool.isRequired,
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  path: PropTypes.string.isRequired,
};

NavItem.defaultProps = {
  onClick: undefined,
};

export default NavItem;
