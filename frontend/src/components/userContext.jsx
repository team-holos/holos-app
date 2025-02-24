import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
        console.error("Login error:", error);
        if (error.message === "Email not registered") {
          setEmailError("Email ist nicht registriert");
        } else {
          setErrorMessage(error.message);
        }
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);
      setSuccessMessage("Login erfolgreich");
      setToken(data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Network error:", error);
      setErrorMessage("Es gab ein Problem mit der Verbindung.");
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};