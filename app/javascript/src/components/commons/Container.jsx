import React from "react";

import Sidebar from "components/Sidebar";
import PropTypes from "prop-types";

const Container = ({
  children,
  isCategoriesOpen,
  leftSidebar,
  onBookClick,
  onCategoryClick,
  showCategoryIcon,
}) => (
  <div className="flex min-h-screen bg-white">
    <Sidebar
      isCategoriesOpen={isCategoriesOpen}
      showCategoryIcon={showCategoryIcon}
      onBookClick={onBookClick}
      onCategoryClick={onCategoryClick}
    />
    {leftSidebar}
    <main className="flex-1 overflow-y-auto px-12 py-8">{children}</main>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  isCategoriesOpen: PropTypes.bool,
  leftSidebar: PropTypes.node,
  onBookClick: PropTypes.func,
  onCategoryClick: PropTypes.func,
  showCategoryIcon: PropTypes.bool,
};

Container.defaultProps = {
  isCategoriesOpen: false,
  leftSidebar: null,
  onBookClick: () => {},
  onCategoryClick: () => {},
  showCategoryIcon: false,
};

export default Container;
