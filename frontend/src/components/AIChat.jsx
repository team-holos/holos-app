import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

function AIChat({ onClose }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Redirect if not authenticated
  if (!isAuthenticated) return null;

  const handleInputChange = (e) => setPrompt(e.target.value);

  const fetchResponse = async (e) => {
    if (e.key !== "Enter" || !prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const historyRes = await fetch(
        "http://localhost:3000/api/chat/history/5",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const historyData = await historyRes.json();

      const conversation = historyData.history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      conversation.push({ role: "user", content: prompt });

      const res = await fetch("http://127.0.0.1:1234/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "qwen2.5-7b-instruct-1m",
          messages: conversation,
          temperature: 0.3,
          max_tokens: 200,
        }),
      });

      if (!res.ok) {
        console.error("HTTP Error:", res.status, res.statusText);
        throw new Error(`Server Error (${res.status}): ${res.statusText}`);
      }

      const data = await res.json();
      console.log("API Response:", data);

      let responseContent =
        data.choices?.[0]?.message?.content?.trim() || "No response available.";

      await fetch("http://localhost:3000/api/chat/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          user_id: 5,
          messages: [
            { role: "user", content: prompt },
            { role: "assistant", content: responseContent },
          ],
        }),
      });

      setResponse(responseContent);
    } catch (err) {
      console.error("Error fetching or parsing response:", err);
      setResponse("⚠️ Error: Unable to fetch a response from Holi.");
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setPrompt("");
    setResponse("");
  };

  return (
    <div className="fixed bottom-16 right-8 w-80 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        onClick={onClose} // Call onClose when X is clicked
      >
        ❌
      </button>

      {/* Chat Header */}
      <h2 className="text-lg font-bold mb-2 text-center">Holos AI Chat</h2>

      {/* Input Box */}
      <input
        type="text"
        value={prompt}
        onChange={handleInputChange}
        onKeyDown={fetchResponse}
        placeholder="Type your question..."
        disabled={loading}
        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Chat Response Box */}
      <div className="w-full min-h-[100px] max-h-[300px] overflow-y-auto p-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-800 mt-2">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <ReactMarkdown>{response}</ReactMarkdown>
        )}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetChat}
        disabled={loading}
        className={`mt-2 w-full px-4 py-2 text-sm font-semibold rounded-md text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Reset
      </button>

      {/* Holi Description */}
      <p className="mt-2 text-xs text-gray-600 text-center">
        Holi is your AI assistant, ready to help with nutrition, fitness, and
        journaling.
      </p>
    </div>
  );
}

export default AIChat;

