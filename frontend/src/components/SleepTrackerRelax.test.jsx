import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SleepTrackerRelax from "./SleepTrackerRelax";

describe("SleepTrackerRelax", () => {
  it("should calculate and display sleep duration", () => {
    render(<SleepTrackerRelax />);
    const startTimeInput = screen.getByLabelText("Einschlafzeit");
    const endTimeInput = screen.getByLabelText("Aufwachzeit");
    const saveButton = screen.getByText("Schlafdauer und Daten speichern");

    fireEvent.change(startTimeInput, { target: { value: "22:00" } });
    fireEvent.change(endTimeInput, { target: { value: "06:00" } });
    fireEvent.click(saveButton);

    expect(screen.getByText("Schlafdauer: 8h 0m")).toBeInTheDocument();
  });

  it("should update and display average sleep duration", () => {
    render(<SleepTrackerRelax />);
    const startTimeInput = screen.getByLabelText("Einschlafzeit");
    const endTimeInput = screen.getByLabelText("Aufwachzeit");
    const saveButton = screen.getByText("Schlafdauer und Daten speichern");

    fireEvent.change(startTimeInput, { target: { value: "22:00" } });
    fireEvent.change(endTimeInput, { target: { value: "06:00" } });
    fireEvent.click(saveButton);

    fireEvent.change(startTimeInput, { target: { value: "23:00" } });
    fireEvent.change(endTimeInput, { target: { value: "07:00" } });
    fireEvent.click(saveButton);

    expect(screen.getByText("Durchschnittliche Schlafdauer")).toBeInTheDocument();
    expect(screen.getByText("8h 30m")).toBeInTheDocument();
  });

  it("should display sleep history", () => {
    render(<SleepTrackerRelax />);
    const startTimeInput = screen.getByLabelText("Einschlafzeit");
    const endTimeInput = screen.getByLabelText("Aufwachzeit");
    const saveButton = screen.getByText("Schlafdauer und Daten speichern");
    const sleepQualitySelect = screen.getByLabelText("Schlafqualität");
    const moodSelect = screen.getByLabelText("Stimmung");

    fireEvent.change(startTimeInput, { target: { value: "22:00" } });
    fireEvent.change(endTimeInput, { target: { value: "06:00" } });
    fireEvent.change(sleepQualitySelect, { target: { value: "gut" } });
    fireEvent.change(moodSelect, { target: { value: "gut" } });
    fireEvent.click(saveButton);

    expect(screen.getByText("Schlafhistorie")).toBeInTheDocument();
    expect(screen.getByText("Einschlafzeit: 22:00, Aufwachzeit: 06:00, Schlafdauer: 8h 0m, Schlafqualität: gut, Stimmung: gut")).toBeInTheDocument();
  });

  it("should call onSleepDataSaved with correct data", () => {
    const mockOnSleepDataSaved = vi.fn();
    render(<SleepTrackerRelax onSleepDataSaved={mockOnSleepDataSaved} />);
    const startTimeInput = screen.getByLabelText("Einschlafzeit");
    const endTimeInput = screen.getByLabelText("Aufwachzeit");
    const saveButton = screen.getByText("Schlafdauer und Daten speichern");

    fireEvent.change(startTimeInput, { target: { value: "22:00" } });
    fireEvent.change(endTimeInput, { target: { value: "06:00" } });
    fireEvent.click(saveButton);

    expect(mockOnSleepDataSaved).toHaveBeenCalledWith({
      startTime: "22:00",
      endTime: "06:00",
      duration: "8h 0m",
      sleepQuality: "",
      mood: "",
    });
  });
});