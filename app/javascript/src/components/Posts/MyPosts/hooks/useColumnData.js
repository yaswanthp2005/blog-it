import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import { COLUMN_KEYS } from "../constants";
import buildColumnData from "../Table/columns";

const useColumnData = ({ onDelete, onStatusChange, visibleColumns }) => {
  const { t } = useTranslation();

  return useMemo(() => {
    const columns = buildColumnData({ onDelete, onStatusChange, t });

    return columns.filter(
      ({ key }) => key === COLUMN_KEYS.ACTIONS || visibleColumns.includes(key)
    );
  }, [onDelete, onStatusChange, t, visibleColumns]);
};

export default useColumnData;
