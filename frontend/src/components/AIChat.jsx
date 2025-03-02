import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

function AIChat({ onClose }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  // Abrufen des Chatverlaufs
  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const historyRes = await fetch(
        "http://localhost:3000/api/chat/history/5",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (historyRes.ok) {
        const historyData = await historyRes.json();
        const formattedHistory = historyData.history.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));
        setChatHistory(formattedHistory);
      } else {
        console.error("Fehler beim Abrufen des Chatverlaufs:", historyRes.status);
      }
    } catch (err) {
      console.error("Fehler beim Laden des Chatverlaufs:", err);
    }
  };

  // Überprüfung der Authentifizierung & Abrufen des Verlaufs
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (token) {
      fetchChatHistory();
    }
  }, []);

  // Chat ausblenden, wenn nicht authentifiziert
  if (!isAuthenticated) return null;

  const handleInputChange = (e) => setPrompt(e.target.value);

  const fetchResponse = async (e) => {
    if (e.key !== "Enter" || !prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const token = localStorage.getItem("token");

      // Kopie des Chatverlaufs erstellen und neue Nachricht hinzufügen
      const updatedConversation = [
        ...chatHistory,
        { role: "user", content: prompt },
      ];

      // Chatverlauf an die KI senden
      const res = await fetch("http://127.0.0.1:1234/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "qwen2.5-7b-instruct-1m",
          messages: updatedConversation,
          temperature: 0.1,
          max_tokens: 200,
        }),
      });

      if (!res.ok) {
        console.error("HTTP-Fehler:", res.status, res.statusText);
        throw new Error(`Serverfehler (${res.status}): ${res.statusText}`);
      }

      const data = await res.json();
      console.log("API Antwort:", data);

      let responseContent =
        data.choices?.[0]?.message?.content?.trim() || "Keine Antwort verfügbar.";

      await fetch("http://localhost:3000/api/chat/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: 5,
          messages: [
            ...updatedConversation,
            { role: "assistant", content: responseContent },
          ],
        }),
      });

      setChatHistory([
        ...updatedConversation,
        { role: "assistant", content: responseContent },
      ]);
      setResponse(responseContent);
    } catch (err) {
      console.error("Fehler beim Abrufen oder Verarbeiten der Antwort:", err);
      setResponse("⚠️ Fehler: Keine Antwort von Holi verfügbar.");
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setPrompt("");
    setResponse("");
    setChatHistory([]);
  };

  return (
    <div className="fixed bottom-16 right-8 w-80 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      {/* Schließen-Button */}
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
        onClick={onClose}
      >
        ❌
      </button>

      {/* Chat-Header */}
      <h2 className="text-lg font-bold mb-2 text-center">Holos KI-Chat</h2>

      {/* Chat-Nachrichten */}
      <div className="w-full min-h-[100px] max-h-[300px] overflow-y-auto p-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-800">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-md ${
              msg.role === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-100 text-left"
            }`}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
        {loading && <p className="text-gray-500">Lädt...</p>}
      </div>

      {/* Eingabefeld */}
      <input
        type="text"
        value={prompt}
        onChange={handleInputChange}
        onKeyDown={fetchResponse}
        placeholder="Gib deine Frage ein..."
        disabled={loading}
        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
      />

      {/* Zurücksetzen-Button */}
      <button
        onClick={resetChat}
        disabled={loading}
        className={`mt-2 w-full px-4 py-2 text-sm font-semibold rounded-md text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Zurücksetzen
      </button>

      {/* Holi-Beschreibung */}
      <p className="mt-2 text-xs text-gray-600 text-center">
        Holi ist dein KI-Assistent und hilft dir bei Ernährung, Fitness und Tagebuchführung.
      </p>
    </div>
  );
}

export default AIChat;
