import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { site } from "../data/site";

test("clicking a tile opens a dialog and Escape closes it, returning focus", async () => {
  render(<App />);
  const tile = screen.getByRole("button", { name: /^LinkHub,/ });
  await userEvent.click(tile);
  expect(screen.getByRole("dialog", { name: "LinkHub" })).toBeInTheDocument();
  await userEvent.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(tile).toHaveFocus();
});

test("placeholder tile without a link shows no img and only the commission anchor", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: /^Sticker sheet,/ }));
  const dialog = screen.getByRole("dialog");
  expect(dialog.querySelector("img")).toBeNull();
  expect(dialog.querySelectorAll("a")).toHaveLength(1);
});

test("filter state survives opening and closing the lightbox", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: "Panels" }));
  await userEvent.click(screen.getByRole("button", { name: /^Twitch panels,/ }));
  await userEvent.keyboard("{Escape}");
  expect(screen.getByRole("button", { name: "Panels" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getAllByRole("button", { name: /, Panels$/ })).toHaveLength(site.work.filter((w) => w.category === "panels").length);
});

test("focus returns to the trigger even when the click did not focus it", async () => {
  const { fireEvent } = await import("@testing-library/react");
  render(<App />);
  const tile = screen.getByRole("button", { name: /^LinkHub,/ });
  fireEvent.click(tile);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  fireEvent.keyDown(document, { key: "Escape" });
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(tile).toHaveFocus();
});

test("commission CTA closes the lightbox and focuses the quote form's Name field", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: /^LinkHub,/ }));
  await userEvent.click(screen.getByRole("link", { name: "Commission something like this" }));
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(screen.getByLabelText("Name")).toHaveFocus();
});
