import routes from "constants/routes";

import React from "react";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import Avvvatars from "avvvatars-react";
import classnames from "classnames";
import {
  Book,
  Category as CategoryIcon,
  Edit,
  File,
  Logout,
  MenuHorizontal,
} from "neetoicons";
import { Button, Dropdown, Typography } from "neetoui";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

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
    isActive: pathname =>
      pathname === routes.posts.create || pathname.includes("/edit"),
  },
];

const MY_BLOG_POSTS_ITEM = {
  label: "My blog posts",
  path: routes.posts.mine,
  icon: File,
  isActive: pathname => pathname === routes.posts.mine,
};

const Sidebar = ({ isCategoriesOpen, onBookClick, onCategoryClick }) => {
  const location = useLocation();
  const userName = getFromLocalStorage("authUserName");
  const userEmail = getFromLocalStorage("authEmail");

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = routes.login;
    } catch (error) {
      logger.error(error);
    }
  };

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

  const renderUserMenu = () => (
    <div className="w-56 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
      <div className="flex items-center gap-x-2 p-3">
        <Avvvatars size={28} style="character" value={userName || "User"} />
        <div>
          <Typography className="text-gray-900" style="body2" weight="semibold">
            {userName || "User"}
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
          onClick={handleLogout}
        >
          Logout
        </Dropdown.MenuItem.Button>
      </Dropdown.Menu>
    </div>
  );

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
          {renderNavItem(MY_BLOG_POSTS_ITEM)}
        </nav>
      </div>
      <div className="flex justify-center px-2">
        <Dropdown
          closeOnSelect={false}
          placement="right-end"
          trigger="hover"
          customTarget={
            <Avvvatars size={32} style="character" value={userName || "User"} />
          }
          dropdownModifiers={[
            {
              name: "offset",
              options: { offset: [0, 8] },
            },
          ]}
        >
          {renderUserMenu()}
        </Dropdown>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  isCategoriesOpen: PropTypes.bool,
  onBookClick: PropTypes.func,
  onCategoryClick: PropTypes.func,
};

Sidebar.defaultProps = {
  isCategoriesOpen: false,
  onBookClick: () => {},
  onCategoryClick: () => {},
};

export default Sidebar;
