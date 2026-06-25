import React from "react";

import { Helmet } from "react-helmet";

const withTitle = (Component, title) => {
  const WrappedComponent = props => (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Component {...props} />
    </>
  );

  return WrappedComponent;
};

export default withTitle;
