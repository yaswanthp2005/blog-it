import React from "react";

import { Input, Select } from "neetoui/formik";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const Form = ({ categoryOptions, statusOptions }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full space-y-4">
      <div className="w-full">
        <Input
          className="w-full"
          label={t("posts.table.title")}
          name="title"
          placeholder={t("posts.filters.titlePlaceholder")}
        />
      </div>
      <div className="w-full">
        <Select
          isClearable
          isMulti
          isSearchable
          className="w-full"
          label={t("posts.table.category")}
          name="categoryIds"
          options={categoryOptions}
          placeholder={t("posts.filters.categoryPlaceholder")}
        />
      </div>
      <div className="w-full">
        <Select
          className="w-full"
          isClearable={false}
          label={t("posts.table.status")}
          name="status"
          options={statusOptions}
        />
      </div>
    </div>
  );
};

const optionPropType = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  })
);

Form.propTypes = {
  categoryOptions: optionPropType.isRequired,
  statusOptions: optionPropType.isRequired,
};

export default Form;
