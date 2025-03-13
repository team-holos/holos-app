export const fetchChatHistory = async (token) => {
    if (!token) return { error: "No token provided" };
  
    try {
      const res = await fetch("http://localhost:3000/api/chat/history/5", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!res.ok) throw new Error(`Failed to fetch history: ${res.status}`);
  
      const data = await res.json();
      return data.history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  };
  
  export const sendChatMessage = async (token, conversation) => {
    try {
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
  
      if (!res.ok) throw new Error(`Server Error: ${res.status}`);
  
      const data = await res.json();
      return data.choices?.[0]?.message?.content?.trim() || "No response available.";
    } catch (error) {
      console.error("Error fetching response:", error);
      return "⚠️ Error: Unable to fetch a response from Holi.";
    }
  };
  