import routes from "constants/routes";

import { useEffect, useState } from "react";

import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import {
  POST_STATUSES,
  PRIMARY_ACTION_LABEL_KEYS,
} from "../../common/constants";

const usePostFormHeader = ({
  defaultPrimaryAction,
  onCancel,
  onSubmitWithStatus,
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { setTouched, validateForm, values } = useFormikContext();
  const [primaryAction, setPrimaryAction] = useState(
    defaultPrimaryAction || POST_STATUSES.PUBLISHED
  );

  const primaryActionLabel = t(PRIMARY_ACTION_LABEL_KEYS[primaryAction]);

  useEffect(() => {
    if (defaultPrimaryAction) {
      setPrimaryAction(defaultPrimaryAction);
    }
  }, [defaultPrimaryAction]);

  const handleAction = async status => {
    const errors = await validateForm();
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      setTouched({
        categoryIds: true,
        description: true,
        title: true,
      });

      return;
    }

    await onSubmitWithStatus(values, status);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();

      return;
    }

    history.push(routes.posts.index);
  };

  return {
    handleAction,
    handleCancel,
    primaryAction,
    primaryActionLabel,
    setPrimaryAction,
    t,
  };
};

export default usePostFormHeader;
