import { Navigate } from "react-router-dom";
import useAuthStore from "./store/authstore";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn() ? children : <Navigate to="/" />;
};

export default PrivateRoute;