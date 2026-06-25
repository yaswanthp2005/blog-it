import React from "react";

import { useFormikContext } from "formik";
import { Input, Select, Textarea } from "neetoui/formik";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { MAX_DESCRIPTION_LENGTH } from "./constants";

const DescriptionField = () => {
  const { t } = useTranslation();
  const { values } = useFormikContext();
  const descriptionLength = values.description?.length || 0;

  return (
    <div>
      <div className="neeto-ui-input__label-wrapper mb-1 flex items-center justify-between">
        <label className="neeto-ui-label neeto-ui-label--required">
          {t("posts.form.description")}
        </label>
        <p className="neeto-ui-input__max-length">
          {descriptionLength}/{MAX_DESCRIPTION_LENGTH}
        </p>
      </div>
      <Textarea
        required
        maxLength={MAX_DESCRIPTION_LENGTH}
        name="description"
        placeholder={t("posts.form.descriptionPlaceholder")}
        resize="vertical"
        rows={12}
      />
    </div>
  );
};

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
