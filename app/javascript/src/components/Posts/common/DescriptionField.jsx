import React from "react";

import { useFormikContext } from "formik";
import { Textarea } from "neetoui/formik";
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

export default DescriptionField;
