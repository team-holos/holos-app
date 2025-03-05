import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WaterTracker from "./WaterTracker";

describe("WaterTracker Button", () => {
    test("should render a button with the text 'Wasser getrunken (+250ml)'", () => {
        render(<WaterTracker />);
        const button = screen.getByRole("button", { name: "Wasser getrunken (+250ml)" });
        expect(button).toBeInTheDocument();
    });
    });