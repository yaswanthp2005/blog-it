import routes from "constants/routes";

import React from "react";

import authApi from "apis/auth";
import { User } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Form as NeetoUIForm, Input } from "neetoui/formik";
import { useHistory } from "react-router-dom";
import withTitle from "utils/withTitle";
import * as Yup from "yup";

const SIGNUP_FORM_INITIAL_VALUES = {
  email: "",
  name: "",
  password: "",
  passwordConfirmation: "",
};

const SIGNUP_FORM_VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const Signup = () => {
  const history = useHistory();

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
            Sign Up
          </Typography>
        </div>
        <div className="mb-6 text-center">
          <Button
            label="Or Login Now"
            style="text"
            onClick={() => history.push(routes.login)}
          />
        </div>
        <NeetoUIForm
          formikProps={{
            initialValues: SIGNUP_FORM_INITIAL_VALUES,
            validationSchema: SIGNUP_FORM_VALIDATION_SCHEMA,
            onSubmit: handleSubmit,
          }}
        >
          <div className="flex flex-col gap-y-4">
            <Input label="Name" name="name" placeholder="Oliver" />
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
            <Input
              label="Password Confirmation"
              name="passwordConfirmation"
              placeholder="********"
              type="password"
            />
            <Button
              className="!bg-gray-900 hover:!bg-black"
              label="Register"
              type="submit"
            />
          </div>
        </NeetoUIForm>
      </div>
    </div>
  );
};

export default withTitle(Signup, "Sign up");
