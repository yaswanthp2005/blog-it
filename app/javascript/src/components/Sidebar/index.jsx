import routes from "constants/routes";

import React from "react";

import Avvvatars from "avvvatars-react";
import classnames from "classnames";
import {
  Book,
  Category as CategoryIcon,
  Edit,
  MenuHorizontal,
} from "neetoicons";
import { Button } from "neetoui";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const NAV_ITEMS = [
  {
    label: "Blog Posts",
    path: routes.posts.index,
    icon: Book,
    isActive: pathname =>
      pathname === routes.posts.index || pathname.includes("/show"),
  },
  {
    label: "New blog post",
    path: routes.posts.create,
    icon: Edit,
    isActive: pathname => pathname === routes.posts.create,
  },
];

const Sidebar = ({
  isCategoriesOpen,
  onBookClick,
  onCategoryClick,
  showCategoryIcon,
}) => {
  const location = useLocation();
  const isPostsPageActive = location.pathname === routes.posts.index;

  const renderNavItem = ({ label, onClick, path, icon, isActive }) => {
    const active = isActive(location.pathname);

    return (
      <Button
        icon={icon}
        iconSize={20}
        key={label}
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
  };

  return (
    <aside className="flex w-16 flex-shrink-0 flex-col justify-between border-r border-gray-200 bg-white py-4">
      <div className="flex flex-col items-center gap-y-4 px-2">
        <nav className="flex flex-col items-center gap-y-3">
          {renderNavItem({ ...NAV_ITEMS[0], onClick: onBookClick })}
          <Button
            className="!text-gray-400 hover:!bg-gray-100"
            icon={MenuHorizontal}
            iconSize={20}
            style="text"
            tooltipProps={{ content: "Menu" }}
          />
          {renderNavItem(NAV_ITEMS[1])}
          {showCategoryIcon && isPostsPageActive && (
            <Button
              icon={CategoryIcon}
              iconSize={20}
              style="text"
              tooltipProps={{ content: "Categories" }}
              className={classnames("rounded-lg", {
                "!bg-primary-800 !text-white": isCategoriesOpen,
                "!text-gray-400 hover:!bg-gray-100": !isCategoriesOpen,
              })}
              onClick={onCategoryClick}
            />
          )}
        </nav>
      </div>
      <div className="flex justify-center px-2">
        <Avvvatars size={32} style="character" value="BlogIt User" />
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  isCategoriesOpen: PropTypes.bool,
  onBookClick: PropTypes.func,
  onCategoryClick: PropTypes.func,
  showCategoryIcon: PropTypes.bool,
};

Sidebar.defaultProps = {
  isCategoriesOpen: false,
  onBookClick: () => {},
  onCategoryClick: () => {},
  showCategoryIcon: false,
};

export default Sidebar;
