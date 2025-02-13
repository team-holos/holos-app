import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RegisterPage() {
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [birthdayError, setBirthdayError] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    // check if is valid email address
    if (
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) === false
    ) {
      setEmailError("Invalid email address");
      return;
    }
    const password = formData.get("password");
    const passwordRetype = formData.get("password-retype");

    // check if password and passwordretype match
    if (password !== passwordRetype) {
      setPasswordError("Passwords do not match");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (birthday > today) {
      setBirthdayError("birthday is in future");
      return;
    }

    const isAtLeast16 = (birthday) => {
      const today = new Date();
      const birth = new Date(birthday);

      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();

      // Adjust age if birthday hasn't occurred this year
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
      ) {
        age--;
      }

      return age >= 16;
    };

    // Datepicker
    //const Example = () => {
    //return;
    //};

    const response = await fetch(`${API_URL}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, passwordRetype }),
    });

    if (response.ok === false) {
      const error = await response.json();
      setErrorMessage(error.errors);
      return;
    }

    const data = await response.json();
    setSuccessMessage(data.message);

    setEmailError(null);
    setPasswordError(null);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-w-sm mx-auto text-sm"
    >
      {successMessage && (
        <p className="bg-green-500 text-white p-2">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="bg-red-500 text-white p-2">{errorMessage}</p>
      )}
      <h1 className="text-xl mb-4 max-w-sm and mx-auto">Register</h1>
      <label htmlFor="username">Vorname:</label>
      <input
        type="text"
        id="username"
        name="username"
        className="border p-2"
        placeholder="deine Vorname"
      />
      <label htmlFor="register-email">Email:</label>
      <input
        type="email"
        id="register-email"
        name="email"
        className="border p-2"
        placeholder="EMail Adress"
      />
      <label htmlFor="birthday">Geburtsdatum:</label>
      <DatePicker
        className="border p-2 w-full"
        selected={birthday}
        onChange={(date) => setBirthday(date)}
      />
      {emailError && <p className="text-red-500">{emailError}</p>}
      <form className="flex gap-4">
        <span className="font-medium">Geschlecht:</span> 
        <div className="radio">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="female"
              checked={selectedGender==="female"}
              onChange={(e) => setSelectedGender(e.target.value)}
            />
            Weiblich
          </label>
        </div>
        <div className="radio">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="male"
              checked={selectedGender==="male"}
              onChange={(e) => setSelectedGender(e.target.value)}
            />
            Männlich
          </label>
        </div>
        <div className="radio">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="diverse"
              checked={selectedGender==="diverse"}
              onChange={(e) => setSelectedGender(e.target.value)}
            />
            Divers
          </label>
        </div>
      </form>
      <label htmlFor="register-password">Password</label>
      <input
        type="password"
        id="register-password"
        name="password"
        className="border p-2"
        placeholder="Password"
        minLength="8"
        maxLength="24"
      />

      <label htmlFor="register-password-retype">Retype Password</label>
      <input
        type="password"
        id="register-password-retype"
        name="password-retype"
        className="border p-2"
        placeholder="Password retype"
      />
      {passwordError && <p className="text-red-500">{passwordError}</p>}
      <button
        type="submit"
        className="bg-green-500 px-2 py-1 text-white font-semibold cursor-pointer"
      >
        Register
      </button>
      <h2 class="max-w-sm and mx-auto">
        <a href="/">Zurück zur Loginseite</a>
      </h2>
    </form>
  );
}

export default RegisterPage;
