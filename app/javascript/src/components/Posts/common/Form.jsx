import React from "react";

import { Input, Select } from "neetoui/formik";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import DescriptionField from "./DescriptionField";

const Form = ({ categoryOptions }) => {
  const { t } = useTranslation();

  return (
    <div className="neeto-ui-shadow-s neeto-ui-rounded-lg border border-gray-200 bg-white p-8">
      <div className="flex flex-col gap-y-6">
        <Input
          required
          label={t("posts.form.title")}
          name="title"
          placeholder={t("posts.form.titlePlaceholder")}
        />
        <Select
          isMulti
          isSearchable
          required
          addButtonLabel=""
          className="[&_.neeto-ui-react-select__add-btn]:!hidden"
          label={t("posts.form.category")}
          name="categoryIds"
          options={categoryOptions}
          placeholder={t("posts.form.categoryPlaceholder")}
        />
        <DescriptionField />
      </div>
    </div>
  );
};

Form.propTypes = {
  categoryOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    })
  ).isRequired,
};

export default Form;
