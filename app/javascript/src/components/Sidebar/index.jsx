import React from "react";

import Avvvatars from "avvvatars-react";
import { Dropdown } from "neetoui";
import PropTypes from "prop-types";

import CategoryButton from "./CategoryButton";
import { MY_BLOG_POSTS_ITEM, NAV_ITEMS } from "./constants";
import DisabledMenuButton from "./DisabledMenuButton";
import useSidebar from "./hooks/useSidebar";
import NavItem from "./NavItem";
import UserMenu from "./UserMenu";

const Sidebar = ({ isCategoriesOpen, onBookClick, onCategoryClick }) => {
  const { handleLogout, isCategoryEnabled, location, t, userEmail, userName } =
    useSidebar();

  const renderNavItem = item => (
    <NavItem
      active={item.isActive(location.pathname)}
      icon={item.icon}
      key={item.labelKey}
      label={t(item.labelKey)}
      path={item.path}
      onClick={item.onClick}
    />
  );

  return (
    <aside className="flex w-16 flex-shrink-0 flex-col justify-between border-r border-gray-200 bg-white py-4">
      <div className="flex flex-col items-center gap-y-4 px-2">
        <nav className="flex flex-col items-center gap-y-3">
          {renderNavItem({ ...NAV_ITEMS[0], onClick: onBookClick })}
          <DisabledMenuButton />
          {renderNavItem(NAV_ITEMS[1])}
          <CategoryButton
            isCategoriesOpen={isCategoriesOpen}
            isCategoryEnabled={isCategoryEnabled}
            t={t}
            onCategoryClick={onCategoryClick}
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
            <Avvvatars
              size={32}
              style="character"
              value={userName || t("common.user")}
            />
          }
          dropdownModifiers={[
            {
              name: "offset",
              options: { offset: [0, 8] },
            },
          ]}
        >
          <UserMenu
            t={t}
            userEmail={userEmail}
            userName={userName}
            onLogout={handleLogout}
          />
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
