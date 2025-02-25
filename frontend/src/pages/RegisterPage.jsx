import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL.endsWith("/")
  ? import.meta.env.VITE_API_URL.slice(0, -1)
  : import.meta.env.VITE_API_URL;

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");
  const [birthday, setBirthday] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordRetypeError, setPasswordRetypeError] = useState(null);
  const [birthdayError, setBirthdayError] = useState(null);
  const [weightError, setWeightError] = useState(null);
  const [heightError, setHeightError] = useState(null);
  const [genderError, setGenderError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function validateEmail(email) {
    if (!email) {
      setEmailError("Email fehlt");
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError(null);
    return true;
  }

  function validateUsername(username) {
    if (!username) {
      setUsernameError("Username fehlt");
      return false;
    }
    setUsernameError(null);
    return true;
  }

  function validateBirthday(birthday) {
    const today = new Date();
    const birth = new Date(birthday);
    if (!birthday) {
      setBirthdayError("Geburtsdatum fehlt");
      return false;
    }
    if (birth > today) {
      setBirthdayError("Geburtsdatum liegt in der Zukunft");
      return false;
    }

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
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
    if (isNaN(weight)) {
      setWeightError("Gewicht muss eine Zahl sein");
      return false;
    }
    setWeightError(null);
    return true;
  }

  function validateHeight(height) {
    if (!height) {
      setHeightError("Größe fehlt");
      return false;
    }
    if (isNaN(height)) {
      setHeightError("Größe muss eine Zahl sein");
      return false;
    }
    setHeightError(null);
    return true;
  }

  function validateGender(gender) {
    if (!selectedGender) {
      setGenderError("Geschlecht fehlt");
      return false;
    }
    setGenderError(null);
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
      setPasswordError("Passwort muss mindestens einen Großbuchstaben enthalten");
      return false;
    }
    setPasswordError(null);
    return true;
  }

  function validatePasswordRetype(password, passwordRetype) {
    if (password !== passwordRetype) {
      setPasswordRetypeError("Passwörter stimmen nicht überein");
      return false;
    }
    setPasswordRetypeError(null);
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("API URL:", API_URL);

    const emailValid = validateEmail(email);
    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);
    const birthdayValid = validateBirthday(birthday);
    const weightValid = validateWeight(weight);
    const heightValid = validateHeight(height);
    const genderValid = validateGender(selectedGender);
    const passwordRetypeValid = validatePasswordRetype(password, passwordRetype);

    if (
      emailValid === false ||
      usernameValid === false ||
      passwordValid === false ||
      birthdayValid === false ||
      weightValid === false ||
      heightValid === false ||
      genderValid === false ||
      passwordRetypeValid === false
    ) {
      return;
    }

    const requestBody = {
      email,
      username,
      password,
      birthday,
      weight,
      height,
      gender: selectedGender,
    };

    console.log("Sending Request:", requestBody);

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Server Response Error:", error);
      setErrorMessage(error.message || "Fehler beim Registrieren.");
      return;
    }

    const data = await response.json();
    console.log("Registrierung erfolgreich:", data);
    setSuccessMessage(data.message);
    setErrorMessage(null);

    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordRetype("");
    setBirthday("");
    setWeight("");
    setHeight("");
    setSelectedGender("");
  }

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto text-sm">
      {successMessage && <p className="bg-green-500 text-white p-2">{successMessage}</p>}
      {errorMessage && <p className="bg-red-500 text-white p-2">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm mx-auto text-sm">
        <h1 className="max-w-sm mx-auto text-[#2D336B] font-extrabold">Registrierung</h1>
        <label htmlFor="username" className="text-[#2D336B] text-base pl-3 font-semibold">
          Vorname:
          {usernameError && <span className="text-red-500 ml-2">{usernameError}</span>}
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-[#FFF2F2] bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Dein Vorname"
        />

        <label htmlFor="register-email" className="text-[#2D336B] text-base pl-3 font-semibold">
          Email:
          {emailError && <span className="text-red-500 ml-2">{emailError}</span>}
        </label>
        <input
          type="email"
          id="register-email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-[#FFF2F2] bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Email Adresse"
        />

        <label htmlFor="birthday" className="text-[#2D336B] text-base pl-3 font-semibold">
          Geburtsdatum:
          {birthdayError && <span className="text-red-500 ml-2">{birthdayError}</span>}
        </label>
        <input
          type="date"
          id="birthday"
          name="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-[#FFF2F2] bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        />

        <label htmlFor="weight" className="text-[#2D336B] text-base pl-3 font-semibold">
          Gewicht:
          {weightError && <span className="text-red-500 ml-2">{weightError}</span>}
        </label>
        <input
          type="text"
          id="weight"
          name="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-[#FFF2F2] bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Gib dein Gewicht in Kilogramm an"
        />

        <label htmlFor="height" className="text-[#2D336B] text-base pl-3 font-semibold">
          Größe:
          {heightError && <span className="text-red-500 ml-2">{heightError}</span>}
        </label>
        <input
          type="text"
          id="height"
          name="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-[#FFF2F2] bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Gib deine Körpergröße in cm an"
        />

        <div className="flex gap-4">
          <span className="font-medium text-[#2D336B]">Geschlecht:</span>
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
        </div>
        {genderError && <p className="text-red-500">{genderError}</p>}

        <label htmlFor="register-password" className="text-[#2D336B] text-base pl-3 font-semibold">
          Passwort:
          {passwordError && <span className="text-red-500 ml-2">{passwordError}</span>}
        </label>
        <input
          type="password"
          id="register-password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-[#FFF2F2] bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Passwort"
          minLength="8"
          maxLength="24"
        />

        <label htmlFor="register-password-retype" className="text-[#2D336B] text-base pl-3 font-semibold">
          Passwort bestätigen:
          {passwordRetypeError && <span className="text-red-500 ml-2">{passwordRetypeError}</span>}
        </label>
        <input
          type="password"
          id="register-password-retype"
          name="password-retype"
          value={passwordRetype}
          onChange={(e) => setPasswordRetype(e.target.value)}
          className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-[#FFF2F2] bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Passwort erneut eingeben"
        />

        <button type="submit" className="inline-block px-7 py-3 bg-[#2D336B] text-[#FFF2F2] font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-[#7886C7] hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          Register
        </button>

        <p className="text-sm font-semibold mt-2 pt-1 mb-0">
          Bereits ein Konto?
          <Link to="/" className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
            Zurück zur Loginseite
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;