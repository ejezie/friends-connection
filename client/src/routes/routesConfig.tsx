import { Routes, Route } from "react-router-dom";
import { LoginPage, DashboardPage } from "@/pages";
import { LOGIN, DASHBOARD } from "./CONSTANTS";
import { useAppDispatch } from "@/hooks";
import { getDefaultTheme } from "@/redux/slices/theme.slice";
import { useEffect } from "react";

import { ProtectedRoute, PublicRoute } from "@/components";

const RouterConfig = () => {
  const dispatch = useAppDispatch();

  // get user default theme setting
  useEffect(() => {
    if (!sessionStorage.getItem("default-theme-set")) {
      dispatch(getDefaultTheme());
      sessionStorage.setItem("default-theme-set", "true");
    }
  }, [dispatch]);

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
