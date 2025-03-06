import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TrainingPlan from "./TrainingPlan";

// Mock für localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => 'fake-token'),
    setItem: vi.fn()
  },
  writable: true
});

describe("TrainingPlan Komponente", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock für den initialen API-Aufruf, der in useEffect ausgeführt wird
    global.fetch = vi.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          Monday: "Rest",
          Tuesday: "Rest",
          Wednesday: "Rest",
          Thursday: "Rest",
          Friday: "Rest",
          Saturday: "Rest",
          Sunday: "Rest"
        })
      })
    );
    window.alert = vi.fn(); // Mock für `alert()`, um Fehler zu vermeiden
  });

  test("rendert den Komponenten-Titel", async () => {
    render(<TrainingPlan trainingPlan={{}} setTrainingPlan={() => {}} />);
    expect(screen.getByText("Your Training Plan")).toBeInTheDocument();
    // Warten, bis useEffect abgeschlossen ist
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  test("zeigt alle Wochentage an", async () => {
    render(<TrainingPlan trainingPlan={{}} setTrainingPlan={() => {}} />);
    
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    days.forEach((day) => {
      expect(screen.getByText(`${day}:`)).toBeInTheDocument();
    });
    // Warten, bis useEffect abgeschlossen ist
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  test("holt und setzt den Trainingsplan aus der API", async () => {
    // Spezifische Testdaten für diesen Test
    global.fetch = vi.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          Monday: "Push",
          Tuesday: "Pull",
          Wednesday: "Legs",
          Thursday: "Rest",
          Friday: "Cardio",
          Saturday: "Full Body",
          Sunday: "Rest"
        })
      })
    );

    const setTrainingPlanMock = vi.fn();
    render(<TrainingPlan trainingPlan={{}} setTrainingPlan={setTrainingPlanMock} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/training/training-plan/1",
        expect.objectContaining({
          headers: { Authorization: "Bearer fake-token" }
        })
      );
    });

    // Überprüfen, ob die Werte korrekt angezeigt werden
    expect(screen.getByDisplayValue("Push")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Pull")).toBeInTheDocument();
    
    // Überprüfen, ob `setTrainingPlan` mit den abgerufenen Daten aufgerufen wurde
    await waitFor(() => {
      expect(setTrainingPlanMock).toHaveBeenCalled();
    });
  });

  test("erlaubt das Ändern des Trainingstyps", async () => {
    render(<TrainingPlan trainingPlan={{}} setTrainingPlan={() => {}} />);
    
    // Warten, bis die initiale API-Anfrage abgeschlossen ist
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    
    const mondaySelect = screen.getAllByRole("combobox")[0];
    fireEvent.change(mondaySelect, { target: { value: "Push" } });
    
    expect(mondaySelect).toHaveValue("Push");
  });

  test("rendert den Speicher-Button und sendet API-Anfrage beim Speichern", async () => {
    // Mock für den initialen API-Aufruf in useEffect
    global.fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          Monday: "Rest",
          Tuesday: "Rest",
          Wednesday: "Rest",
          Thursday: "Rest",
          Friday: "Rest",
          Saturday: "Rest",
          Sunday: "Rest"
        })
      })
    );
    
    // Mock für die Speicher-API-Anfrage
    global.fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      })
    );

    const setTrainingPlanMock = vi.fn();
    render(<TrainingPlan trainingPlan={{}} setTrainingPlan={setTrainingPlanMock} />);

    // Warten, bis die initiale API-Anfrage abgeschlossen ist
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const saveButton = screen.getByRole("button", { name: "Save Plan" });
    fireEvent.click(saveButton);

    // Warten, bis die Speicher-API-Anfrage abgeschlossen ist
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenLastCalledWith(
        "http://localhost:3000/api/training/training-plan",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            "Authorization": "Bearer fake-token"
          })
        })
      );
    });

    // Überprüfen, ob `alert()` aufgerufen wurde
    expect(window.alert).toHaveBeenCalledWith("Training Plan Saved!");
  });
});
