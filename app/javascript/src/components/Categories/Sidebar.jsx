import React, { useMemo, useState } from "react";

import classnames from "classnames";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { keysToCamelCase } from "neetocist";
import { Plus, Search } from "neetoicons";
import { Button, Input, Typography } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { filterCategoriesBySearchTerm, toggleCategorySelection } from "./utils";

const CategoriesSidebar = ({
  isOpen,
  onAddCategory,
  onSelectCategories,
  selectedCategoryIds,
}) => {
  const { t } = useTranslation();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: categories, isLoading } = useFetchCategories();

  const normalizedCategories = useMemo(
    () => (categories || []).map(keysToCamelCase),
    [categories]
  );

  const filteredCategories = filterCategoriesBySearchTerm(
    normalizedCategories,
    searchTerm
  );

  const handleCategoryClick = categoryId => {
    onSelectCategories(
      toggleCategorySelection(selectedCategoryIds, categoryId)
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-gray-100 px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <Typography
          className="tracking-wider text-gray-900"
          style="nano"
          weight="bold"
        >
          {t("categories.title")}
        </Typography>
        <div className="flex items-center gap-x-1">
          <Button
            icon={Search}
            size="small"
            style="text"
            tooltipProps={{ content: t("categories.searchCategories") }}
            onClick={() => setIsSearchVisible(state => !state)}
          />
          <Button
            icon={Plus}
            size="small"
            style="text"
            tooltipProps={{ content: t("categories.addCategory") }}
            onClick={onAddCategory}
          />
        </div>
      </div>
      {isSearchVisible && (
        <Input
          className="mb-4"
          placeholder={t("categories.searchPlaceholder")}
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
      )}
      <div className="flex flex-col gap-y-2">
        {filteredCategories.map(category => (
          <Button
            fullWidth
            key={category.id}
            label={category.name}
            style="text"
            className={classnames(
              "!justify-start rounded-md border border-black/10 px-3 py-2 text-left text-sm",
              {
                "!bg-white !text-gray-900 shadow-sm":
                  selectedCategoryIds.includes(category.id),
                "!bg-gray-200/70 !text-gray-700 hover:!bg-gray-200":
                  !selectedCategoryIds.includes(category.id),
              }
            )}
            onClick={() => handleCategoryClick(category.id)}
          />
        ))}
        {!filteredCategories.length && !isLoading && (
          <Typography className="px-2 py-2 text-gray-500" style="body3">
            {t("categories.noCategoriesFound")}
          </Typography>
        )}
      </div>
    </aside>
  );
};

CategoriesSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onAddCategory: PropTypes.func.isRequired,
  onSelectCategories: PropTypes.func.isRequired,
  selectedCategoryIds: PropTypes.arrayOf(PropTypes.number),
};

CategoriesSidebar.defaultProps = {
  selectedCategoryIds: [],
};

export default CategoriesSidebar;
