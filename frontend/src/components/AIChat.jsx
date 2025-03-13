import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { fetchChatHistory, sendChatMessage } from "../api/chatApi";

function AIChat({ onClose }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  // Prüfe Token & lade Chat-Historie
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (token) {
      fetchChatHistory(token).then((history) => {
        if (!history.error) setChatHistory(history);
      });
    }
  }, []);

  if (!isAuthenticated) return null;

  const handleInputChange = (e) => setPrompt(e.target.value);

  const handleSendMessage = async (e) => {
    if (e.key !== "Enter" || !prompt.trim()) return;

    setLoading(true);
    const token = localStorage.getItem("token");
    const updatedConversation = [...chatHistory, { role: "user", content: prompt }];

    const aiResponse = await sendChatMessage(token, updatedConversation);
    setChatHistory([...updatedConversation, { role: "assistant", content: aiResponse }]);
    setResponse(aiResponse);
    setPrompt("");
    setLoading(false);
  };

  const resetChat = () => {
    setPrompt("");
    setResponse("");
    setChatHistory([]);
  };

  return (
    <div className="fixed bottom-16 right-8 w-80 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <button className="absolute top-2 right-2 text-gray-600 hover:text-red-500" onClick={onClose}>
        ❌
      </button>
      <h2 className="text-lg font-bold mb-2 text-center">Holos AI Chat</h2>

      <div className="w-full min-h-[100px] max-h-[300px] overflow-y-auto p-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-800">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`mb-2 p-2 rounded-md ${msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}>
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
        {loading && <p className="text-gray-500">Loading...</p>}
      </div>

      <input
        type="text"
        value={prompt}
        onChange={handleInputChange}
        onKeyDown={handleSendMessage}
        placeholder="Type your question..."
        disabled={loading}
        className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
      />

      <button onClick={resetChat} disabled={loading} className="mt-2 w-full px-4 py-2 text-sm font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600">
        Reset
      </button>

      <p className="mt-2 text-xs text-gray-600 text-center">
        Holi is your AI assistant, ready to help with nutrition, fitness, and journaling.
      </p>
    </div>
  );
}

export default AIChat;
