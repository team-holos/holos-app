import { useEffect, useState } from "react";
import useAuthStore from "./store/authstore";

const API_URL = import.meta.env.VITE_API_URL;
function Users() {
  const [users, setUsers] = useState([]);
  const { token, isLoggedIn } = useAuthStore();

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(`${API_URL}users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok === false) {
        console.log("Failed to fetch users");
        return;
      }
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);
  return (
    <>
      <h1>Users:</h1>
      <ul>
        {isLoggedIn &&
          users.map((user) => <li key={user.email}>{user.email}</li>)}
      </ul>
    </>
  );
}

export default Users;