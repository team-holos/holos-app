import { useState } from "react";

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
      const res = await fetch("/api/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "deepseek-r1-distill-qwen-7b",
          prompt: `You are Holi, an AI assistant. **Do not reflect on your responses. Do not explain how you respond. Do not include meta-thinking like "<think>" or "I should respond with...".** Always reply **directly** to the user's input with a concise, clear answer.\n\nUser: ${prompt}\n\nHoli:`,
          temperature: 0.1,
          max_tokens: 100,
          stop: ["User:", "Holi:", "</think>", "I should respond"],
        }),
      });

      if (!res.ok) {
        console.error("HTTP Error:", res.status, res.statusText);
        throw new Error(`Server Error (${res.status}): ${res.statusText}`);
      }

      const data = await res.json();
      console.log("API Response:", data);

      let responseContent =
        data.choices?.[0]?.text?.trim() || "No response available.";
      responseContent = responseContent
        .replace(/<\/?think>/gi, "")
        .replace(/I should respond.*/gi, "")
        .trim();

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
    <div style={{ padding: "20px" }}>
      <h2>Holos AI Chat</h2>
      <input
        type="text"
        value={prompt}
        onChange={handleInputChange}
        onKeyDown={fetchResponse}
        placeholder="Type your question and press Enter..."
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />
      <div
        style={{
          minHeight: "100px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "10px",
        }}
      >
        {loading ? "Loading..." : response}
      </div>
      <button
        onClick={resetChat}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default AIChat;
