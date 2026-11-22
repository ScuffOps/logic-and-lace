import { render, screen, within } from "@testing-library/react";
import App from "../App";

test("topbar quote link precedes the sidebar nav in DOM order", () => {
  render(<App />);
  const [first] = screen.getAllByRole("link", { name: "Get a quote" });
  const nav = screen.getByRole("navigation", { name: "Sections" });
  expect(first.compareDocumentPosition(nav) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

test("sidebar nav has the four section links", () => {
  render(<App />);
  const nav = screen.getByRole("navigation", { name: "Sections" });
  expect(within(nav).getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual([
    "#work",
    "#services",
    "#devtools",
    "#about",
  ]);
});

test("shop links without an href render as coming soon, not anchors", () => {
  render(<App />);
  expect(screen.getByText(/Etsy · coming soon/)).not.toHaveAttribute("href");
});

test("lockup image uses the brand file with alt text", () => {
  render(<App />);
  expect(screen.getAllByRole("img", { name: "Logic & Lace" })[0]).toHaveAttribute(
    "src",
    expect.stringContaining("/brand/lnl-lockup-dark-1200"),
  );
});
