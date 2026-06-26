import routes from "constants/routes";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "utils/storage";

export const handleLoginSubmit = async (values, { setSubmitting }) => {
  try {
    const response = await authApi.login(values);
    setToLocalStorage({
      authToken: response.data.authenticationToken,
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

export const handleSignupSubmit = async (
  values,
  { setSubmitting },
  history
) => {
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
