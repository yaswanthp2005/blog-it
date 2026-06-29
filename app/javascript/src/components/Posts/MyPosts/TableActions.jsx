import React from "react";

import { Filter } from "neetoicons";
import { ActionDropdown, Button } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import ColumnFilter from "./ColumnFilter";

const TableActions = ({ onSearchFiltersOpen }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <ActionDropdown
        dropdownProps={{ strategy: "fixed" }}
        label={t("posts.filters.columns")}
        buttonProps={{
          "data-cy": "columns-dropdown-button",
          tooltipProps: { content: t("posts.filters.columns") },
        }}
      >
        <ActionDropdown.Menu>
          <ColumnFilter />
        </ActionDropdown.Menu>
      </ActionDropdown>
      <Button
        data-cy="neeto-filters-toggle-btn"
        icon={Filter}
        style="text"
        tooltipProps={{ content: t("posts.filters.searchFilters") }}
        onClick={onSearchFiltersOpen}
      />
    </div>
  );
};

TableActions.propTypes = {
  onSearchFiltersOpen: PropTypes.func.isRequired,
};

export default TableActions;
