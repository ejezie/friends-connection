import { Routes, Route } from "react-router-dom";
import { LoginPage, DashboardPage } from "@/pages";
import { LOGIN, DASHBOARD } from "./CONSTANTS";

import { ProtectedRoute, PublicRoute } from "@/components";

const RouterConfig = () => {
  return (
    <div>
      <Routes>
        {/* Public routes should be placed in here */}
        <Route path="/" element={<PublicRoute />}>
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
