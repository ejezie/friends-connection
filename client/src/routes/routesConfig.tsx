import { Routes, Route } from "react-router-dom";
import { LoginPage, DashboardPage } from "@/pages";
import { LOGIN, DASHBOARD } from "./CONSTANTS";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getDefaultTheme } from "@/redux/slices/theme.slice";
import { useEffect } from "react";

import { ProtectedRoute, PublicRoute } from "@/components";

const RouterConfig = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  // get user default theme setting
  useEffect(() => {
    const body = document.body;
    if (!sessionStorage.getItem("default-theme-set")) {
      dispatch(getDefaultTheme());
      sessionStorage.setItem("default-theme-set", "true");
    }
    isDarkMode
      ? body.classList.add("dark-mode")
      : body.classList.remove("dark-mode");
  }, [dispatch, isDarkMode]);

  return (
    <div>
      <Routes>
        {/* Public routes should be placed in here */}
        <Route path={LOGIN} element={<PublicRoute />}>
          {/* Auth pages */}
          <Route path={LOGIN} element={<LoginPage />} />
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          {/* Protected routes should be placed in here */}
          <Route path={DASHBOARD} element={<DashboardPage />} />
        </Route>

        {/* 404 page */}
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </div>
  );
};

export default RouterConfig;
