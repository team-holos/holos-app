import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuthStore from "../components/store/authstore";

const API_URL = import.meta.env.VITE_API_URL.endsWith("/")
  ? import.meta.env.VITE_API_URL.slice(0, -1)
  : import.meta.env.VITE_API_URL;

function LoginPage() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { setToken, isLoggedIn, clearToken } = useAuthStore();
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    if (!emailValid || !passwordValid) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        if (error.message === "Email not registered") {
          setEmailError("Email ist nicht registriert");
        } else {
          setErrorMessage(error.message);
        }
        return;
      }

      const data = await response.json();
      setSuccessMessage("Login erfolgreich");
      setToken(data.token);
      localStorage.setItem("user_id", data.user_id);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Es gab ein Problem mit der Verbindung.");
    }
  }

  function validateEmail(email) {
    if (!email) {
      setEmailError("Email fehlt");
      return false;
    }
    setEmailError(null);
    return true;
  }

  function validatePassword(password) {
    if (!password) {
      setPasswordError("Passwort fehlt");
      return false;
    }
    setPasswordError(null);
    return true;
  }

  if (isLoggedIn()) {
    return <Navigate to="/dashboard" />;
  }

  function handleLogout() {
    clearToken();
    setSuccessMessage(null);
    setErrorMessage(null);
    window.location.reload();
  }

  return (
    <div className="flex items-center justify-center min-h-screen max-w-md mx-auto">
      <div className="flex flex-col gap-4 max-w-sm mx-auto text-sm bg-[#A9B5DF] p-4 rounded shadow-md">
        {successMessage && <p className="bg-green-500 text-white p-2">{successMessage}</p>}
        {errorMessage && <p className="bg-red-500 text-white p-2">{errorMessage}</p>}

        {isLoggedIn() ? (
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <p className="bg-green-500 text-white p-2">Du bist eingeloggt!</p>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 text-white font-semibold mt-4">
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm mx-auto text-sm">
            <h1 className="text-xl text-center">Willkommen bei Holos!</h1>
            <h2 className="text-lg mb-4 text-center">Login</h2>

            <div className="mb-4">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-[#FFF2F2] border border-gray-300 rounded transition focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="E-Mail-Adresse"
              />
              {emailError && <p className="text-red-900">{emailError}</p>}
            </div>

            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-[#FFF2F2] border border-gray-300 rounded transition focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Passwort"
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 border border-gray-300 rounded bg-white checked:bg-blue-600 checked:border-blue-600 transition duration-200"
                />
                <label className="ml-2 text-gray-800">Angemeldet bleiben</label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-7 py-3 bg-[#2D336B] text-white font-medium text-sm uppercase rounded shadow-md hover:bg-[#7886C7] transition duration-150"
            >
              Login
            </button>

            <p className="text-sm font-semibold mt-2 text-center">
              Kein Konto?
              <Link to="/register" className="text-red-600 hover:text-red-700 ml-1">
                Registrieren
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
