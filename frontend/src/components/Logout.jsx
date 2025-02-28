import { useNavigate } from "react-router-dom";
import useAuthStore from "./store/authstore";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    useAuthStore.getState().clearToken(); // Clear token
   
    navigate("/"); // Redirect to login page
  
  };

  return <button onClick={handleLogout} className="backdrop-blur-2xl px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Logout</button>;
};


export default Logout;