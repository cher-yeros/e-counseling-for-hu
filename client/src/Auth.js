import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const Auth = ({ only }) => {
  const location = useLocation();
  const currentUser = useSelector((state) => state.user.currentUser);

  //console.log(only, currentUser.role);
  return currentUser ? (
    only?.includes(currentUser?.role) ? (
      <Outlet />
    ) : (
      <Navigate
        to={`/${currentUser.role}`}
        state={{ from: location }}
        replace
      />
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default Auth;
