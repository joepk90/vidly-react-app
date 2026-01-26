import { Navigate, Outlet, useLocation } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = () => {
  const location = useLocation();
  const user = auth.getCurrentUser();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
