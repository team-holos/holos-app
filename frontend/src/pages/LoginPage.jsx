import { useState } from "react";
import useAuthStore from "../components/store/authstore";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { token, setToken, isLoggedIn } = useAuthStore();
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const response = await fetch(`${API_URL}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok === false) {
      const error = await response.json();
      setErrorMessage(error.message);
      return;
    }
    const data = await response.json();
    setSuccessMessage(data.message);
    console.log("Token:", data.token);
    setToken(data.token);
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {successMessage && (
        <p className="bg-green-500 text-white p-2">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="bg-red-500 text-white p-2">{errorMessage}</p>
      )}

      {isLoggedIn() && (
        <div>
          <p className="bg-green-500 text-white p-2">You are logged in</p>
          <p className="bg-gray-200 fixed">{token}</p>
          <button>logout</button>
        </div>
      )}
      <h1 class="max-w-sm and mx-auto">Willkommen bei Holos!</h1>
      <h2 className="text-xl mb-4 max-w-sm and mx-auto">Login</h2>
      <label htmlFor="email" class="max-w-sm and mx-auto">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        className="border p-2"
        placeholder="Email address"
      />
      <label htmlFor="password" class="max-w-sm and mx-auto">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        className="border p-2"
        placeholder="Password"
      />
      <button
        type="submit"
        className="bg-red-500 px-4 py-2 text-white font-semibold"
      >
        Login
      </button>
      <h2 class="max-w-sm and mx-auto"><a href="/register">Noch kein Account<br/>
      (link zur Registrierung)<br/></a>
      </h2>
      <h2 class="max-w-sm and mx-auto">Passwort vergessen?</h2>
    </form>
  );
}

export default LoginPage;