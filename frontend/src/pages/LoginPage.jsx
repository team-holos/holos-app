import { useState, useContext, useEffect } from "react";
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
      const response = await fetch(`${API_URL}/auth/login`, {
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
      setPasswordError("Password fehlt");
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm mx-auto text-sm">
          <h1 className="max-w-sm and mx-auto">Willkommen bei Holos!</h1>
          <h2 className="text-xl mb-4 max-w-sm and mx-auto">Login</h2>
          <div className="mb-6">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-[#FFF2F2] bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput2"
              placeholder="E-Mail-Adresse"
            />
          </div>
          {emailError && <p className="text-red-900">{emailError}</p>}
          <div className="mb-6">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-[#FFF2F2] bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput2"
              placeholder="Passwort"
            />
          </div>
          {passwordError && <p className="text-red-500">{passwordError}</p>}
          <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck2"
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="exampleCheck2"
              >
                Angemeldet bleiben
              </label>
            </div>
            <a
              href="/reset"
              onClick={() => navigate("/reset")}
              className="text-gray-800"
            >
              Passwort vergessen?
            </a>
          </div>
          <div className="text-center lg:text-left">
            <button
              type="submit"
              className="inline-block px-7 py-3 bg-[#2D336B] text-[#FFF2F2] font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#7886C7] hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Login
            </button>
            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Kein Konto?
              <Link
                to="/register"
                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
              >
                Registrieren
              </Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

export default LoginPage;

