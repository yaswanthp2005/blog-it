import routes from "constants/routes";

import React, { useMemo } from "react";

import authApi from "apis/auth";
import { User } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Form as NeetoUIForm, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import withTitle from "utils/withTitle";
import * as Yup from "yup";

const SIGNUP_FORM_INITIAL_VALUES = {
  email: "",
  name: "",
  password: "",
  passwordConfirmation: "",
};

const Signup = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const signupFormValidationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string().required(t("auth.validation.nameRequired")),
        email: Yup.string()
          .email(t("auth.validation.emailInvalid"))
          .required(t("auth.validation.emailRequired")),
        password: Yup.string()
          .min(6, t("auth.validation.passwordMin"))
          .required(t("auth.validation.passwordRequired")),
        passwordConfirmation: Yup.string()
          .oneOf(
            [Yup.ref("password"), null],
            t("auth.validation.passwordsMustMatch")
          )
          .required(t("auth.validation.passwordConfirmationRequired")),
      }),
    [t]
  );

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await authApi.signup({
        email: values.email,
        name: values.name,
        password: values.password,
        password_confirmation: values.passwordConfirmation,
      });
      history.push(routes.login);
    } catch (error) {
      logger.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-center gap-x-2 text-gray-900">
          <User size={22} />
          <Typography style="h2" weight="semibold">
            {t("auth.signUp")}
          </Typography>
        </div>
        <div className="mb-6 text-center">
          <Link
            className="text-sm font-medium text-gray-900 underline hover:text-black"
            to={routes.login}
          >
            {t("auth.orLoginNow")}
          </Link>
        </div>
        <NeetoUIForm
          formikProps={{
            initialValues: SIGNUP_FORM_INITIAL_VALUES,
            validationSchema: signupFormValidationSchema,
            onSubmit: handleSubmit,
          }}
        >
          <div className="flex flex-col gap-y-4">
            <Input
              label={t("auth.name")}
              name="name"
              placeholder={t("auth.namePlaceholder")}
            />
            <Input
              label={t("auth.email")}
              name="email"
              placeholder={t("auth.emailPlaceholder")}
              type="email"
            />
            <Input
              label={t("auth.password")}
              name="password"
              placeholder={t("auth.passwordPlaceholder")}
              type="password"
            />
            <Input
              label={t("auth.passwordConfirmation")}
              name="passwordConfirmation"
              placeholder={t("auth.passwordPlaceholder")}
              type="password"
            />
            <Button
              className="!justify-center !bg-gray-900 hover:!bg-black"
              label={t("auth.register")}
              type="submit"
            />
          </div>
        </NeetoUIForm>
      </div>
    </div>
  );
};

export default withTitle(Signup, "auth.signupPageTitle");
