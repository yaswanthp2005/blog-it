import React from "react";

import Sidebar from "components/Sidebar";
import PropTypes from "prop-types";

const Container = ({ children }) => (
  <div className="flex min-h-screen bg-white">
    <Sidebar />
    <main className="flex-1 overflow-y-auto px-12 py-8">{children}</main>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
