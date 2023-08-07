import React from 'react';
import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { LoginContext } from '../../contexts/LoginContext';

const ProtectedRouteElement = ({ element: Component, ...props  }) => {
  const { loggedIn } = useContext(LoginContext);
  return (
    loggedIn ? <Component {...props} /> : <Navigate to="/signin" replace/>
)}

export default ProtectedRouteElement;
