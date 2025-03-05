import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TrainingPlan from "./TrainingPlan";

describe("TrainingPlan Component", () => {
  test("renders the component title", () => {
    render(<TrainingPlan trainingPlan={{}} setTrainingPlan={() => {}} />);
    expect(screen.getByText("Your Training Plan")).toBeInTheDocument();
  });

  test("displays all weekdays", () => {
    render(<TrainingPlan trainingPlan={{}} setTrainingPlan={() => {}} />);
    
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    days.forEach((day) => {
      expect(screen.getByText(`${day}:`)).toBeInTheDocument();
    });
  });

  test("has default Rest option for each day", () => {
    render(<TrainingPlan trainingPlan={{}} setTrainingPlan={() => {}} />);
    
    const selects = screen.getAllByRole("combobox");
    selects.forEach((select) => {
      expect(select).toHaveValue("Rest");
    });
  });
  

  test("allows changing workout type", () => {
    render(<TrainingPlan trainingPlan={{}} setTrainingPlan={() => {}} />);
    
    const mondaySelect = screen.getAllByRole("combobox")[0];

    
    fireEvent.change(mondaySelect, { target: { value: "Push" } });
    expect(mondaySelect).toHaveValue("Push");
  });

  test("renders save button", () => {
    render(<TrainingPlan trainingPlan={{}} setTrainingPlan={() => {}} />);
    
    const saveButton = screen.getByRole("button", { name: "Save Plan" });
    expect(saveButton).toBeInTheDocument();
  });
});

///