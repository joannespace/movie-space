import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AuthRequire({ children }) {
  const location = useLocation();
  const state = location.state;
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={state.to ? { from: state.to, to: location } : { to: location }}
      />
    );
  }

  return children;
}

export default AuthRequire;
