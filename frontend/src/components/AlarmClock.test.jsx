import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AlarmClock from "./AlarmClock";

describe("AlarmClock Button", () => {
    test("should render a button with the text 'Alarm stellen'", () => {
        render(<AlarmClock />);
        const button = screen.getByRole("button", { name: "Alarm stellen" });
        expect(button).toBeInTheDocument();
    });

    test("should alert when setting alarm without time and sound", () => {
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
        render(<AlarmClock />);
        const button = screen.getByRole("button", { name: "Alarm stellen" });
        fireEvent.click(button);
        expect(alertMock).toHaveBeenCalledWith("Bitte stelle eine Zeit und einen Sound ein.");
        alertMock.mockRestore();
    });
});