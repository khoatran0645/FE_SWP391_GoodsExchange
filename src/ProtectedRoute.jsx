import React from "react";
import { Navigate } from "react-router-dom";
import useStore from "./app/store";
import PropTypes from "prop-types";
const ProtectedRoute = ({ roles, element }) => {
  const userInfo = useStore((state) => state.userInfo);
  const auth = useStore((state) => state.auth);

  if (!auth) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
  }

  if (!roles.includes(userInfo?.data?.role)) {
    // Redirect to access denied if user role is not authorized
    return <Navigate to="/access-denied" />;
  }

  return element;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  element: PropTypes.node.isRequired,
};
