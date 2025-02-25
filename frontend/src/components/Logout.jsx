import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from storage
    navigate("/"); // Redirect to login page
  };

  return <button onClick={handleLogout} className="backdrop-blur-2xl px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Logout</button>;
};

export default Logout;