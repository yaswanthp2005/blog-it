import routes from "constants/routes";

import React from "react";

import Avvvatars from "avvvatars-react";
import classnames from "classnames";
import { Book, Edit, MenuHorizontal } from "neetoicons";
import { Link, useLocation } from "react-router-dom";

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

const Sidebar = () => {
  const location = useLocation();

  const renderNavItem = ({ label, path, icon: Icon, isActive }) => {
    const active = isActive(location.pathname);

    return (
      <Link
        key={label}
        title={label}
        to={path}
        className={classnames(
          "flex items-center justify-center rounded-lg p-2.5 transition-colors",
          {
            "bg-primary-800 text-white": active,
            "text-gray-400 hover:bg-gray-100": !active,
          }
        )}
      >
        <Icon size={20} />
      </Link>
    );
  };

  return (
    <aside className="flex w-16 flex-shrink-0 flex-col justify-between border-r border-gray-200 bg-white py-4">
      <nav className="flex flex-col items-center gap-y-3 px-2">
        {renderNavItem(NAV_ITEMS[0])}
        <button
          disabled
          className="flex cursor-not-allowed items-center justify-center rounded-lg p-2.5 text-gray-400"
          title="Menu"
          type="button"
        >
          <MenuHorizontal size={20} />
        </button>
        {renderNavItem(NAV_ITEMS[1])}
      </nav>
      <div className="flex justify-center px-2">
        <Avvvatars size={32} style="character" value="BlogIt User" />
      </div>
    </aside>
  );
};

export default Sidebar;
