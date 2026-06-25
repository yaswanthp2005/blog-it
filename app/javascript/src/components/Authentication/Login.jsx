import routes from "constants/routes";

import React from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { Lock } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Form as NeetoUIForm, Input } from "neetoui/formik";
import { Link } from "react-router-dom";
import { setToLocalStorage } from "utils/storage";
import withTitle from "utils/withTitle";
import * as Yup from "yup";

const LOGIN_FORM_INITIAL_VALUES = { email: "", password: "" };

const LOGIN_FORM_VALIDATION_SCHEMA = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
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
            Sign In
          </Typography>
        </div>
        <div className="mb-6 text-center">
          <Link
            className="text-sm font-medium text-gray-900 underline hover:text-black"
            to={routes.signup}
          >
            Or Register Now
          </Link>
        </div>
        <NeetoUIForm
          formikProps={{
            initialValues: LOGIN_FORM_INITIAL_VALUES,
            validationSchema: LOGIN_FORM_VALIDATION_SCHEMA,
            onSubmit: handleSubmit,
          }}
        >
          <div className="flex flex-col gap-y-4">
            <Input
              label="Email"
              name="email"
              placeholder="oliver@example.com"
              type="email"
            />
            <Input
              label="Password"
              name="password"
              placeholder="********"
              type="password"
            />
            <Button
              className="!justify-center !bg-gray-900 hover:!bg-black"
              label="Sign In"
              type="submit"
            />
          </div>
        </NeetoUIForm>
      </div>
    </div>
  );
};

export default withTitle(Login, "Login");
