import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import useLogout from "../hooks/useLogout.js"
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);
  const { logout } = useLogout();
  const location = useLocation();
  const hasLoggedOut = useRef(false);

  const isTokenExpired = () => {
    if (!user?.accessToken) return false;
    try {
      const base64Payload = user.accessToken.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));
      return payload.exp * 1000 < Date.now();
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (isTokenExpired() && !hasLoggedOut.current) {
      hasLoggedOut.current = true;
      logout();
    }
  }, [user]);

  if (user?.role && allowedRoles.includes(user.role)) return <Outlet />;
  if (user)
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;