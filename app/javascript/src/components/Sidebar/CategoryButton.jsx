import React from "react";

import classnames from "classnames";
import { Category as CategoryIcon } from "neetoicons";
import { Button } from "neetoui";
import PropTypes from "prop-types";

const CategoryButton = ({
  isCategoriesOpen,
  isCategoryEnabled,
  onCategoryClick,
  t,
}) => (
  <Button
    disabled={!isCategoryEnabled}
    icon={CategoryIcon}
    iconSize={20}
    style="text"
    className={classnames("rounded-lg", {
      "!bg-primary-800 !text-white": isCategoriesOpen && isCategoryEnabled,
      "!text-gray-400 hover:!bg-gray-100":
        !isCategoriesOpen && isCategoryEnabled,
      "!pointer-events-none !cursor-not-allowed !text-gray-300 hover:!bg-transparent hover:!text-gray-300":
        !isCategoryEnabled,
    })}
    tooltipProps={
      isCategoryEnabled ? { content: t("sidebar.categories") } : undefined
    }
    onClick={isCategoryEnabled ? onCategoryClick : undefined}
  />
);

CategoryButton.propTypes = {
  isCategoriesOpen: PropTypes.bool.isRequired,
  isCategoryEnabled: PropTypes.bool.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default CategoryButton;
