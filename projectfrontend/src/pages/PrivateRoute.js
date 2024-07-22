import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  
  let sessionStorageToken = sessionStorage.getItem("userDetails");

  if (sessionStorageToken) {
    if (location.pathname === "/") {
      return <Navigate to="/reels" />;
    } else {
      return children;
    }
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;