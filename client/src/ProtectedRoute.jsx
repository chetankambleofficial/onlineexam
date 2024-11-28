import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user data from localStorage

  // Check if user is logged in and if the role matches
  if (!user || user.role !== role) {
    // Redirect to the corresponding login page based on the role
    const redirectTo = role === 'lecturer' ? 'llogin' : 'slogin';
    return <Navigate to={`/${redirectTo}`} />; // Redirect to the correct login page
  }

  return children; // Allow access to the route if logged in and role matches
};

export default ProtectedRoute;
