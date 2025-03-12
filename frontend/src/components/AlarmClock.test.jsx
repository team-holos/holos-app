import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AlarmClock from "./AlarmClock";

describe("AlarmClock Button", () => {
    test("should render a button with the text 'Alarm stellen'", () => {
        render(<AlarmClock />);
        const button = screen.getByRole("button", { name: "Alarm stellen" });
        expect(button).toBeInTheDocument();
    });
});