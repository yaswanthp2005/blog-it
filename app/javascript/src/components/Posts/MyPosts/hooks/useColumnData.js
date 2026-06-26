import { useMemo } from "react";

import { useTranslation } from "react-i18next";

import buildColumnData from "../columns";

const useColumnData = ({ onDelete, onStatusChange }) => {
  const { t } = useTranslation();

  return useMemo(
    () => buildColumnData({ onDelete, onStatusChange, t }),
    [onDelete, onStatusChange, t]
  );
};

export default useColumnData;
