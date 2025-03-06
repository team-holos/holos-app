import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AIChat from "./AIChat";

// Mocking für `fetch` erstellen
global.fetch = vi.fn();

beforeEach(() => {
  localStorage.setItem("token", "mocked-token");
  fetch.mockClear();
});

describe("AIChat Component", () => {
  test("renders the chat title when authenticated", async () => {
    // Mock für den Chat-History-API-Call
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        history: [{ role: "assistant", content: "Hello!" }],
      }),
    });

    render(<AIChat onClose={() => {}} />);

    await waitFor(() =>
      expect(screen.getByText("Holos AI Chat")).toBeInTheDocument()
    );
  });

  test("sends a message and gets a response", async () => {
    // Mock für Chat-History
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ history: [] }),
    });

    // Mock für die AI-Antwort
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: "AI Response" } }],
      }),
    });

    render(<AIChat onClose={() => {}} />);

    const input = screen.getByPlaceholderText("Type your question...");
    fireEvent.change(input, { target: { value: "What is Holos?" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() =>
      expect(screen.getByText("AI Response")).toBeInTheDocument()
    );
  });
});
