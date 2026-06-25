import React from "react";

import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const withTitle = (Component, titleKey) => {
  const WrappedComponent = props => {
    const { t } = useTranslation();

    return (
      <>
        <Helmet>
          <title>{t(titleKey)}</title>
        </Helmet>
        <Component {...props} />
      </>
    );
  };

  return WrappedComponent;
};

export default withTitle;
