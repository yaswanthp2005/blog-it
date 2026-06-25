import routes from "constants/routes";

import React, { useMemo } from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { Lock } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Form as NeetoUIForm, Input } from "neetoui/formik";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { setToLocalStorage } from "utils/storage";
import withTitle from "utils/withTitle";
import * as Yup from "yup";

const LOGIN_FORM_INITIAL_VALUES = { email: "", password: "" };

const Login = () => {
  const { t } = useTranslation();

  const loginFormValidationSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .email(t("auth.validation.emailInvalid"))
          .required(t("auth.validation.emailRequired")),
        password: Yup.string().required(t("auth.validation.passwordRequired")),
      }),
    [t]
  );

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await authApi.login(values);
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email: response.data.email,
        userId: response.data.id,
        userName: response.data.name,
      });
      setAuthHeaders();
      window.location.href = routes.posts.index;
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
          <Lock size={22} />
          <Typography style="h2" weight="semibold">
            {t("auth.signIn")}
          </Typography>
        </div>
        <div className="mb-6 text-center">
          <Link
            className="text-sm font-medium text-gray-900 underline hover:text-black"
            to={routes.signup}
          >
            {t("auth.orRegisterNow")}
          </Link>
        </div>
        <NeetoUIForm
          formikProps={{
            initialValues: LOGIN_FORM_INITIAL_VALUES,
            validationSchema: loginFormValidationSchema,
            onSubmit: handleSubmit,
          }}
        >
          <div className="flex flex-col gap-y-4">
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
            <Button
              className="!justify-center !bg-gray-900 hover:!bg-black"
              label={t("auth.signIn")}
              type="submit"
            />
          </div>
        </NeetoUIForm>
      </div>
    </div>
  );
};

export default withTitle(Login, "auth.loginPageTitle");
