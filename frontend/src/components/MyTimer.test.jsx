import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useTimer } from 'react-timer-hook';
import useSound from 'use-sound';
import MyTimer from "./MyTimer";

// Mock useTimer hook
vi.mock('react-timer-hook', () => ({
  useTimer: vi.fn().mockReturnValue({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
    isRunning: false,
    start: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    restart: vi.fn(),
  }),
}));

// Mock useSound hook
vi.mock('use-sound', () => ({
  default: vi.fn().mockReturnValue([vi.fn(), { stop: vi.fn() }]),
}));

describe("MyTimer Button", () => {
  test("should render a button with the text 'Start'", () => {
    const expiryTimestamp = new Date();
    render(<MyTimer expiryTimestamp={expiryTimestamp} />);
    const button = screen.getByText("Start");
    expect(button).toBeInTheDocument();
  });
});
