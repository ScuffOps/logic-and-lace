import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const tilePattern = /, (Overlays|Alerts|Widgets & chatboxes|Panels|Websites|Art)$/;

test("All chip is pressed by default and shows seven tiles", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getAllByRole("button", { name: tilePattern })).toHaveLength(7);
});

test("choosing Websites shows only website tiles and moves aria-pressed", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: "Websites" }));
  expect(screen.getByRole("button", { name: "Websites" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false");
  expect(screen.getAllByRole("button", { name: /, Websites$/ })).toHaveLength(1);
});

test("featured tile carries the FEATURED tag and wide class", () => {
  render(<App />);
  const tile = screen.getByRole("button", { name: /^Neon Shoreline stream kit,/ });
  expect(tile).toHaveClass("wide");
  expect(tile).toHaveTextContent("FEATURED");
});
