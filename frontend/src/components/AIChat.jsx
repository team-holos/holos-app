import { useState } from 'react';

function AIChat() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => setPrompt(e.target.value);

    const fetchResponse = async (e) => {
        if (e.key !== 'Enter' || !prompt.trim()) return;

        setLoading(true);
        try {
            const res = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) {
                throw new Error('Failed to fetch response');
            }

            const data = await res.json();
            setResponse(data.response || 'No response');
        } catch (err) {
            console.error(err);
            setResponse('Error: Unable to fetch response.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Holos AI Chat</h2>
            <input
                type="text"
                value={prompt}
                onChange={handleInputChange}
                onKeyDown={fetchResponse}
                placeholder="Type your question and press Enter..."
                disabled={loading}
                style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    marginBottom: '20px',
                }}
            />
            <div style={{ minHeight: '100px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                {loading ? 'Loading...' : response}
            </div>
        </div>
    );
}

export default AIChat;
