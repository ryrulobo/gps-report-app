import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const loginToken = localStorage.getItem("login_token");

  if (!loginToken) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
}
