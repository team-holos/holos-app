import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navigation from "./Navigation";

describe("Navigation", () => {
    test("should render a form with a select element", () => {
        render(<Navigation />);
        const form = screen.getByRole("form");
        const select = screen.getByRole("combobox");
        expect(form).toBeInTheDocument();
        expect(select).toBeInTheDocument();
    });

    test("should render a select element with options", () => {
        render(<Navigation />);
        const options = screen.getAllByRole("option");
        expect(options).toHaveLength(6);
        expect(options[0]).toHaveTextContent("Select a page...");
        expect(options[1]).toHaveTextContent("Dashboard");
        expect(options[1]).toHaveTextContent("Ernährung");
        expect(options[2]).toHaveTextContent("Fitness");
        expect(options[3]).toHaveTextContent("Mentale Gesundheit");
        expect(options[4]).toHaveTextContent("Entspannung");
        expect(options[5]).toHaveTextContent("Einstellungen");
    });
});