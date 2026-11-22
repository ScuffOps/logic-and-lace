import { Lockup } from "./Lockup";

export function Topbar() {
  return (
    <header className="topbar">
      <a href="#top" aria-label="Logic & Lace home">
        <Lockup width={168} />
      </a>
      <a className="btn btn-primary" href="#quote">
        Get a quote
      </a>
    </header>
  );
}
