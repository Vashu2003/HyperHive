import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // (or you can check via API)
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default PrivateRoute;