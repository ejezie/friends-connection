import { LOGIN } from "@/routes/CONSTANTS";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/index";

const ProtectedRoute = () => {
  const { auth } = useAuth();

  return auth ? <Outlet /> : <Navigate to={LOGIN} replace />;
};

export default ProtectedRoute;
