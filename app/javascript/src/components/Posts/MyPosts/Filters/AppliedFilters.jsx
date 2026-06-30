import React from "react";

import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { Tag, Typography } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { STATUS_FILTER_OPTIONS } from "../constants";

const AppliedFilters = ({
  appliedFilters,
  onRemoveCategory,
  onRemoveStatus,
  totalCount,
}) => {
  const { t } = useTranslation();
  const { data: categories = [] } = useFetchCategories();

  const { categoryIds = [], status, title } = appliedFilters;
  const hasTitle = Boolean(title?.trim());

  const categoryNameById = categories.reduce((acc, { id, name }) => {
    acc[String(id)] = name;

    return acc;
  }, {});

  const statusOption = STATUS_FILTER_OPTIONS.find(
    option => option.value && option.value === status
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Typography className="text-gray-700" style="body2">
        {hasTitle ? (
          <>
            {t("posts.resultsFor", { count: totalCount })}
            <Typography component="span" style="body2" weight="semibold">
              {`"${title.trim()}"`}
            </Typography>
          </>
        ) : (
          t("posts.resultsCount", { count: totalCount })
        )}
      </Typography>
      {categoryIds.map(categoryId => (
        <Tag
          key={categoryId}
          label={categoryNameById[categoryId] ?? categoryId}
          style="secondary"
          type="solid"
          onClose={() => onRemoveCategory(categoryId)}
        />
      ))}
      {statusOption && (
        <Tag
          label={t(statusOption.labelKey)}
          style="danger"
          type="outline"
          onClose={onRemoveStatus}
        />
      )}
    </div>
  );
};

AppliedFilters.propTypes = {
  appliedFilters: PropTypes.shape({
    categoryIds: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  totalCount: PropTypes.number.isRequired,
  onRemoveCategory: PropTypes.func.isRequired,
  onRemoveStatus: PropTypes.func.isRequired,
};

export default AppliedFilters;
