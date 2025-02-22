import { useState } from "react";
import ReactMarkdown from "react-markdown";

function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Holos AI Chat</h2>

      <input
        type="text"
        value={prompt}
        onChange={handleInputChange}
        onKeyDown={fetchResponse}
        placeholder="Type your question and press Enter..."
        disabled={loading}
        className="w-full max-w-lg p-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />

      <div className="w-full max-w-lg min-h-[150px] max-h-[400px] overflow-y-auto p-4 bg-white border border-gray-300 rounded-md shadow-sm text-gray-800">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <ReactMarkdown>{response}</ReactMarkdown>
        )}
      </div>

      <button
        onClick={resetChat}
        disabled={loading}
        className={`mt-4 px-6 py-2 text-lg font-semibold rounded-md text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Reset
      </button>
    </div>
  );
}

export default AIChat;
