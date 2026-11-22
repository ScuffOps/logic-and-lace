import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the Work heading inside main", () => {
  render(<App />);
  expect(screen.getByRole("main")).toContainElement(screen.getByRole("heading", { name: "Work" }));
});
