import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated }) => {
  console.log('isAuthenticated:', isAuthenticated);
  
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;