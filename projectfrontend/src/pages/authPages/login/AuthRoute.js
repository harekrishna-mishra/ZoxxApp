import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  let sessionStorageToken = sessionStorage.getItem("userDetails");

  if (sessionStorageToken) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default AuthRoute;
