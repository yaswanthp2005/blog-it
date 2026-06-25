import React from "react";

import classnames from "classnames";
import Sidebar from "components/Sidebar";
import PropTypes from "prop-types";

const Container = ({
  children,
  isCategoriesOpen,
  leftSidebar,
  mainClassName,
  onBookClick,
  onCategoryClick,
}) => (
  <div className="flex min-h-screen bg-white">
    <Sidebar
      isCategoriesOpen={isCategoriesOpen}
      onBookClick={onBookClick}
      onCategoryClick={onCategoryClick}
    />
    {leftSidebar}
    <main
      className={classnames("flex-1 overflow-y-auto px-12 py-8", mainClassName)}
    >
      {children}
    </main>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  isCategoriesOpen: PropTypes.bool,
  leftSidebar: PropTypes.node,
  mainClassName: PropTypes.string,
  onBookClick: PropTypes.func,
  onCategoryClick: PropTypes.func,
};

Container.defaultProps = {
  isCategoriesOpen: false,
  leftSidebar: null,
  mainClassName: "",
  onBookClick: () => {},
  onCategoryClick: () => {},
};

export default Container;
