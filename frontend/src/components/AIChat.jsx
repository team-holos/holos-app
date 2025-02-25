import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

function AIChat({ onClose }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  // Define fetchChatHistory BEFORE using it in useEffect
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
        console.error("Failed to fetch chat history:", historyRes.status);
      }
    } catch (err) {
      console.error("Error fetching chat history:", err);
    }
  };

  // UseEffect that checks authentication & fetches history
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (token) {
      fetchChatHistory();
    }
  }, []);

  // Hide chat if not authenticated
  if (!isAuthenticated) return null;

  const handleInputChange = (e) => setPrompt(e.target.value);

  const fetchResponse = async (e) => {
    if (e.key !== "Enter" || !prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const token = localStorage.getItem("token");

      // Create a copy of chat history & append new user message
      const updatedConversation = [
        ...chatHistory,
        { role: "user", content: prompt },
      ];

      // Send updated chat history to AI
      const res = await fetch("http://127.0.0.1:1234/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "qwen2.5-7b-instruct-1m",
          messages: updatedConversation,
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
      console.error("Error fetching or parsing response:", err);
      setResponse("⚠️ Error: Unable to fetch a response from Holi.");
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
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
        onClick={onClose}
      >
        ❌
      </button>

      {/* Chat Header */}
      <h2 className="text-lg font-bold mb-2 text-center">Holos AI Chat</h2>

      {/* Chat Messages */}
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
        {loading && <p className="text-gray-500">Loading...</p>}
      </div>

      {/* Input Box */}
      <input
        type="text"
        value={prompt}
        onChange={handleInputChange}
        onKeyDown={fetchResponse}
        placeholder="Type your question..."
        disabled={loading}
        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
      />

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
