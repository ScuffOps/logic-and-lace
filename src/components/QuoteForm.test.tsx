import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuoteForm } from "./QuoteForm";

test("empty submit shows the required errors and links them", async () => {
  render(<QuoteForm />);
  await userEvent.click(screen.getByRole("button", { name: "Send quote request" }));
  expect(screen.getByText("Please add your name.")).toBeInTheDocument();
  expect(screen.getByLabelText("Name")).toHaveAttribute("aria-describedby", "name-err");
  expect(screen.getByText("Pick at least one.")).toBeInTheDocument();
});

test("with no endpoint configured a valid submit shows the not-connected message", async () => {
  vi.stubEnv("VITE_FORM_ENDPOINT", "");
  render(<QuoteForm />);
  await userEvent.type(screen.getByLabelText("Name"), "Fox");
  await userEvent.type(screen.getByLabelText("Email or Discord"), "fox@example.test");
  await userEvent.click(screen.getByRole("checkbox", { name: "Alerts & scenes" }));
  await userEvent.type(screen.getByLabelText("Tell us about your channel"), "cozy art stream");
  await userEvent.click(screen.getByRole("button", { name: "Send quote request" }));
  expect(screen.getByRole("status")).toHaveTextContent("Quote form isn't connected yet. Email us instead.");
  vi.unstubAllEnvs();
});
