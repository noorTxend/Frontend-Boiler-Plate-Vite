import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Navigate, Outlet } from "react-router-dom";
import QuickAccessButton from "@/components/QuickAccessButton";
import { logout } from "@/redux/slices/authSlice";

const ProtectedRoute: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const SESSION_DATA = sessionStorage.getItem("AccessCode");

  useEffect(() => {
    if (!isAuthenticated || !SESSION_DATA) {
      dispatch(logout());
    }
  }, [isAuthenticated, SESSION_DATA, dispatch]);

  if (!isAuthenticated || !SESSION_DATA) {
    dispatch(logout());
    sessionStorage.removeItem("AccessCode");
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <>
      <QuickAccessButton />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
