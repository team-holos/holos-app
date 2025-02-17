import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RegisterPage() {
  const [setUsername] = useState(null);
  const [setPassword] = useState(null);
  const [setPasswordRetype] = useState(null);
  const [setWeight] = useState(null);
  const [setWeightError] = useState(null);
  const [setEmail] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [birthdayError, setBirthdayError] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  function validateEmail(email) {
    if (!email) {
      setEmailError("Email fehlt");
      return false;
    }
    if (
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) === false
    ) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError(null);
    return true;
  }

  function validateUsername(username) {
    if (!username) {
      setUsernameError("username fehlt");
      return false;
    }
    setUsernameError(null);
    return true;
  }
  function validateBirthday(birthday) {
    console.log(birthday);
    /* if (!birthday) {
      setBirthdayError("Geburtsdatum fehlt");
      return false;
    } */
    if (birthday > today) {
      setBirthdayError("birthday is in future");
      return false;
    }
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // Adjust age if birthday hasn't occurred this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    if (age < 16) {
      setBirthdayError("Du musst mindestens 16 Jahre alt sein!");
      return false;
    }
    setBirthdayError(null);
    return true;
  }
  function validateWeight(weight) {
    if (!weight) {
      setWeightError("Gewicht fehlt");
      return false;
    }
    setWeightError(null);
    return true;
  }
  function validatePassword(password) {
    if (!password) {
      setPasswordError("Passwort fehlt");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("Passwort muss mindestens 8 Zeichen lang sein");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError(
        "Passwort muss mindestens einen Großbuchstaben enthalten"
      );
      return false;
    }
    setPasswordError(null);
    return true;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const passwordRetype = formData.get("password-retype");
    const birthday = formData.get("birthday");
    const weight = formData.get("weight");
    // check if is valid email address, username, password, birthday
    const emailValid = validateEmail(email);
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);
    const birthdayValid = validateBirthday(birthday);
    if (
      emailValid === false ||
      usernameValid === false ||
      passwordValid === false ||
      birthdayValid === false
    ) {
      return;
    }

    /*const password = formData.get("password");
    const passwordRetype = formData.get("password-retype");

    // check if password and passwordretype match
    if (password !== passwordRetype) {
      setPasswordError("Passwords do not match");
      return;
    }
*/
    /*const today = new Date();
    today.setHours(0, 0, 0, 0);
    
*/
    /*const isAtLeast16 = (birthday) => {
      const today = new Date();
      const birth = new Date(birthday);

     
*/
    // Datepicker
    //const Example = () => {
    //return;
    //};

    const response = await fetch(`${API_URL}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, passwordRetype, birthday }),
    });

    if (!response.ok) {
      const error = await response.json();
      setErrorMessage(error.errors);
      return;
    }

    const data = await response.json();
    setSuccessMessage(data.message);
    setErrorMessage(null);
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordRetype("");
    setBirthday("");
    setWeight("");
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-w-sm mx-auto text-sm bg-[#A9B5DF] mt-10"
    >
      {successMessage && (
        <p className="bg-green-500 text-white p-2">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="bg-red-500 text-white p-2">{errorMessage}</p>
      )}
      <h1 className="text-xl mb-4 max-w-sm and mx-auto text-[#2D336B] font-extrabold">
        Registrierung
      </h1>
      <label
        htmlFor="username"
        className="text-[#2D336B] text-base pl-3 font-semibold"
      >
        Vorname:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        className="border p-2 bg-[#FFF2F2]"
        placeholder="Dein Vorname"
      />
      {usernameError && <p className="text-red-500">{usernameError}</p>}
      <label
        htmlFor="register-email"
        className="text-[#2D336B] text-base pl-3 font-semibold"
      >
        Email:
      </label>
      <input
        type="email"
        id="register-email"
        name="email"
        className="border p-2 bg-[#FFF2F2]"
        placeholder="Email Adresse"
      />
      {emailError && <p className="text-red-500">{emailError}</p>}
      <label
        htmlFor="birthday"
        className="text-text-[#2D336B] text-base pl-3 font-semibold"
      >
        Geburtsdatum:
      </label>
      <DatePicker
        className="border p-2 w-full bg-[#FFF2F2]"
        selected={birthday}
        onChange={(date) => setBirthday(date)}
        placeholderText="dd/mm/yyyy"
      />
      {birthdayError && <p className="text-red-500">{birthdayError}</p>}
      <label htmlFor="weight" className="text-[#FFF2F2]">
        Gewicht:
      </label>
      <input
        type="text"
        id="weight"
        name="weight"
        className="border p-2 bg-[#FFF2F2]"
        placeholder="Gib dein Gewicht in Kilogramm an"
      />
        <span className="font-medium" className="text-[#FFF2F2]">
          Geschlecht:
        </span>
        <div className="radio">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="female"
              checked={selectedGender === "female"}
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
              checked={selectedGender === "male"}
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
              checked={selectedGender === "diverse"}
              onChange={(e) => setSelectedGender(e.target.value)}
            />
            Divers
          </label>
        </div>
      <label htmlFor="register-password" className="text-[#FFF2F2]">
        Passwort:
      </label>
      <input
        type="password"
        id="register-password"
        name="password"
        className="border p-2 bg-[#FFF2F2]"
        placeholder="Passwort"
        minLength="8"
        maxLength="24"
      />
      {passwordError && <p className="text-red-500">{passwordError}</p>}
      <label htmlFor="register-password-retype" className="text-[#FFF2F2]">
        Passwort bestätigen:
      </label>
      <input
        type="password"
        id="register-password-retype"
        name="password-retype"
        className="border p-2 bg-[#FFF2F2]"
        placeholder="Passwort erneut eingeben"
      />
      <button
        type="submit"
        className="bg-[#2D336B] px-2 py-1 text-white font-semibold cursor-pointer hover:bg-[#7886C7]"
      >
        Register
      </button>
      <h2 className="max-w-sm and mx-auto text-[#FFF2F2]">
        <a href="/">Zurück zur Loginseite</a>
      </h2>
    </form>
  );
}

export default RegisterPage;
