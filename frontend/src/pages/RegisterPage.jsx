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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-w-sm mx-auto text-sm bg-[#A9B5DF] mt-10"
    >
      {successMessage && <p className="bg-green-500 text-white p-2">{successMessage}</p>}
      {errorMessage && <p className="bg-red-500 text-white p-2">{errorMessage}</p>}

      <h1 className="text-xl mb-4 max-w-sm mx-auto text-[#2D336B] font-extrabold">Registrierung</h1>

      <label htmlFor="username" className="text-[#2D336B] text-base pl-3 font-semibold">
        Vorname:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 bg-[#FFF2F2]"
        placeholder="Dein Vorname"
      />
      {usernameError && <p className="text-red-500">{usernameError}</p>}

      <label htmlFor="register-email" className="text-[#2D336B] text-base pl-3 font-semibold">
        Email:
      </label>
      <input
        type="email"
        id="register-email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 bg-[#FFF2F2]"
        placeholder="Email Adresse"
      />
      {emailError && <p className="text-red-500">{emailError}</p>}

      <label htmlFor="birthday" className="text-[#2D336B] text-base pl-3 font-semibold">
        Geburtsdatum:
      </label>
      <input
        type="date"
        id="birthday"
        name="birthday"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        className="border p-2 w-full bg-[#FFF2F2]"
      />
      {birthdayError && <p className="text-red-500">{birthdayError}</p>}

      <label htmlFor="weight" className="text-[#2D336B] text-base pl-3 font-semibold">
        Gewicht:
      </label>
      <input
        type="text"
        id="weight"
        name="weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="border p-2 bg-[#FFF2F2]"
        placeholder="Gib dein Gewicht in Kilogramm an"
      />
      {weightError && <p className="text-red-500">{weightError}</p>}

      <label htmlFor="height" className="text-[#2D336B] text-base pl-3 font-semibold">
        Größe:
      </label>
      <input
        type="text"
        id="height"
        name="height"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="border p-2 bg-[#FFF2F2]"
        placeholder="Gib deine Körpergröße in cm an"
      />
      {heightError && <p className="text-red-500">{heightError}</p>}

      <div className="flex gap-4">
        <span className="font-medium text-[#2D336B]">
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
      </div>

      <label htmlFor="register-password" className="text-[#2D336B] text-base pl-3 font-semibold">
        Passwort:
      </label>
      <input
        type="password"
        id="register-password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 bg-[#FFF2F2]"
        placeholder="Passwort"
        minLength="8"
        maxLength="24"
      />
      {passwordError && <p className="text-red-500">{passwordError}</p>}

      <label htmlFor="register-password-retype" className="text-[#2D336B] text-base pl-3 font-semibold">
        Passwort bestätigen:
      </label>
      <input
        type="password"
        id="register-password-retype"
        name="password-retype"
        value={passwordRetype}
        onChange={(e) => setPasswordRetype(e.target.value)}
        className="border p-2 bg-[#FFF2F2]"
        placeholder="Passwort erneut eingeben"
      />
      {passwordRetypeError && <p className="text-red-500">{passwordRetypeError}</p>}

      <button type="submit" className="bg-[#2D336B] px-2 py-1 text-white font-semibold cursor-pointer hover:bg-[#7886C7]">
        Register
      </button>

      <h2 className="max-w-sm mx-auto text-[#2D336B]">
        <Link to="/">Zurück zur Loginseite</Link>
      </h2>
    </form>
  );
}

export default RegisterPage;