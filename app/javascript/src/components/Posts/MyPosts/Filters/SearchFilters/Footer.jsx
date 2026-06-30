import React from "react";

import { useFormikContext } from "formik";
import { Button, Toastr } from "neetoui";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { FILTER_FORM_INITIAL_VALUES } from "../../constants";

const Footer = ({ onClose, onSubmit }) => {
  const { t } = useTranslation();
  const { resetForm } = useFormikContext();

  const handleClear = () => {
    resetForm({ values: FILTER_FORM_INITIAL_VALUES });
    onSubmit(FILTER_FORM_INITIAL_VALUES);
    Toastr.success(t("toast.filtersCleared"));
    onClose();
  };

  return (
    <div className="flex items-center gap-2">
      <Button label={t("posts.filters.done")} style="primary" type="submit" />
      <Button
        label={t("posts.filters.clearFilters")}
        style="secondary"
        onClick={handleClear}
      />
    </div>
  );
};

Footer.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Footer;
