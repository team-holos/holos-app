import { useState } from "react";

function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => setPrompt(e.target.value);

  const fetchResponse = async (e) => {
    if (e.key !== "Enter" || !prompt.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "deepseek-r1-distill-qwen-7b",
          temperature: 0.7,
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const data = await res.json();
      console.log("API Response:", data);

      const responseContent =
        data.choices?.[0]?.message?.content?.trim() || "No response available.";

      setResponse(responseContent);
    } catch (err) {
      console.error("Error fetching or parsing response:", err);
      setResponse("Error: Unable to fetch or parse response.");
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