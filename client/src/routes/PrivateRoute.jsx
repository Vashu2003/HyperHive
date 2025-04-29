import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // Import the AuthContext

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();  // Use the isAuthenticated state from the context
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children; // Render the children if the user is authenticated
}

export default PrivateRoute;
