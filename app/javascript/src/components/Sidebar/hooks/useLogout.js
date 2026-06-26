import routes from "constants/routes";

import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import { setToLocalStorage } from "utils/storage";

const useLogout = () => {
  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = routes.login;
    } catch (error) {
      logger.error(error);
    }
  };

  return { handleLogout };
};

export default useLogout;
