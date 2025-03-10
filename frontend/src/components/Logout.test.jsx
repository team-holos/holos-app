import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Logout from "./Logout";
import "@testing-library/jest-dom";

describe("Logout Component", () => {
  test("renders the logout button", () => {
    render(
      <MemoryRouter>
        <Logout />
      </MemoryRouter>
    );
    // Check if the logout button is present in the document
    const logoutButton = screen.getByRole("button", { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });
});