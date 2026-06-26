import routes from "constants/routes";

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { getFromLocalStorage } from "utils/storage";

import useLogout from "./useLogout";

const useSidebar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { handleLogout } = useLogout();
  const isCategoryEnabled = location.pathname === routes.posts.index;
  const userName = getFromLocalStorage("authUserName");
  const userEmail = getFromLocalStorage("authEmail");

  return {
    handleLogout,
    isCategoryEnabled,
    location,
    t,
    userEmail,
    userName,
  };
};

export default useSidebar;
