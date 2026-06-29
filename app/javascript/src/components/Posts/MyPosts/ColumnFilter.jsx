import React from "react";

import { Checkbox, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import useMyPostsColumnsStore from "stores/useMyPostsColumnsStore";

import { COLUMN_KEYS, TOGGLEABLE_COLUMN_KEYS } from "./constants";

const COLUMN_LABEL_KEYS = {
  [COLUMN_KEYS.TITLE]: "posts.table.title",
  [COLUMN_KEYS.CATEGORY]: "posts.table.category",
  [COLUMN_KEYS.LAST_PUBLISHED_AT]: "posts.table.lastPublishedAt",
  [COLUMN_KEYS.STATUS]: "posts.table.status",
};

const ColumnFilter = () => {
  const { t } = useTranslation();
  const { toggleColumn, visibleColumns } = useMyPostsColumnsStore();

  return (
    <div className="min-w-[12rem] p-2" data-cy="columns-dropdown-container">
      {TOGGLEABLE_COLUMN_KEYS.map(columnKey => {
        const isTitleColumn = columnKey === COLUMN_KEYS.TITLE;

        return (
          <Checkbox
            checked={visibleColumns.includes(columnKey)}
            className="neeto-ui-columns-checkbox mb-2"
            data-cy="neeto-ui-columns-checkbox"
            disabled={isTitleColumn}
            key={columnKey}
            label={
              <Typography style="body2">
                {t(COLUMN_LABEL_KEYS[columnKey])}
              </Typography>
            }
            onChange={() => toggleColumn(columnKey)}
          />
        );
      })}
    </div>
  );
};

ColumnFilter.propTypes = {};

export default ColumnFilter;
