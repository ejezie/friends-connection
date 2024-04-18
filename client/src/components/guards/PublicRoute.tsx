import { DASHBOARD } from "@/routes/CONSTANTS";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/index";

const PublicRoutes = () => {
  const { auth } = useAuth();
  return auth ? <Navigate to={DASHBOARD} replace /> : <Outlet />;
};

export default PublicRoutes;
