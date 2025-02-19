import { useState } from "react";
import useAuthStore from "../components/store/authstore";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL.endsWith("/")
  ? import.meta.env.VITE_API_URL.slice(0, -1)
  : import.meta.env.VITE_API_URL;

function LoginPage() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { setToken, isLoggedIn, clearToken } = useAuthStore();

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.message);
        return;
      }

      const data = await response.json();
      setSuccessMessage("Login erfolgreich");
      setToken(data.token);
    } catch (error) {
      setErrorMessage("Es gab ein Problem mit der Verbindung.");
    }
  }

  function handleLogout() {
    clearToken();
    setSuccessMessage(null);
    setErrorMessage(null);
    window.location.reload();
  }

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto text-sm">
      {successMessage && (
        <p className="bg-green-500 text-white p-2">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="bg-red-500 text-white p-2">{errorMessage}</p>
      )}

      {isLoggedIn() ? (
        <div className="bg-gray-100 p-4 rounded shadow-md">
          <p className="bg-green-500 text-white p-2">Du bist eingeloggt!</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 text-white font-semibold mt-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <h1 className="text-xl mb-4 text-center">Willkommen bei Holos!</h1>
          <h2 className="text-lg font-bold">Login</h2>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="border p-2"
            placeholder="Email address"
          />
          <label htmlFor="password">Passwort</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border p-2"
            placeholder="Passwort"
          />
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 text-white font-semibold"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <Link to="/register" className="text-blue-500">
              Noch kein Account? Registrieren
            </Link>
          </div>
          <div className="text-center mt-2">
            <Link to="/reset" className="text-blue-500">
              Passwort vergessen?
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}

export default LoginPage;

