import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import buildColumnData from "../columns";
import { COLUMN_KEYS } from "../constants";

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
