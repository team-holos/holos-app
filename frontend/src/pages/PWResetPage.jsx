import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { Link } from "react-router-dom";

function ResetPasswordPage() {
    const [message, setMessage] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        const email = event.target.email.value;

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setMessage("Ungültige E-Mail-Adresse");
            return;
        }

        const response = await fetch(`${API_URL}auth/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        setMessage(response.ok ? data.message : data.errors);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm mx-auto text-sm">
            {message && <p className="p-2 bg-gray-200">{message}</p>}
            <h1 className="text-xl mb-4">Passwort zurücksetzen</h1>
            <label>Email</label>
            <input type="email" name="email" className="border p-2" placeholder="Email Adresse" />
            <button type="submit" className="bg-blue-500 px-2 py-1 text-white font-semibold">Passwort zurücksetzen</button>
        </form>
    );
}

export default ResetPasswordPage;