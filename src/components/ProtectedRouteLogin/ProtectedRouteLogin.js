import React from 'react';
import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { LoginContext } from '../../contexts/LoginContext';

const ProtectedRouteLoginElement = ({ element: Component, ...props  }) => {
  const { loggedIn } = useContext(LoginContext);
  return (
    !loggedIn ? <Component {...props} /> : <Navigate to="/movies" replace/>
)}

export default ProtectedRouteLoginElement;
