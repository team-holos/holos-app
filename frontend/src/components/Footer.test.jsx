import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import Footer from "./Footer";
import"@testing-library/jest-dom";


describe("Footer", () => {
  test("should render footer component", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toHaveClass("fixed bg-[#7886C7] bottom-0 w-full border-l-0 border-r-0 rounded-none");
  });
});