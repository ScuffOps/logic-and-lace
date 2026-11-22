import { render, screen } from "@testing-library/react";
import App from "../App";

test("services show the placeholder price when none is set", () => {
  render(<App />);
  expect(screen.getAllByText("from $—")).toHaveLength(4);
});

test("hex CTA is disabled until a link exists", () => {
  render(<App />);
  expect(screen.getByText(/Browse dev tools · coming soon/)).toHaveAttribute("aria-disabled", "true");
});

test("about facts render as a definition list", () => {
  render(<App />);
  expect(screen.getByText("Turnaround").tagName).toBe("DT");
  expect(screen.getByText("5–10 days").tagName).toBe("DD");
});
