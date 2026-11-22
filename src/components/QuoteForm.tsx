import { useId, useState, type FormEvent } from "react";
import { site } from "../data/site";
import { submitQuote, type SubmitResult } from "../lib/submitQuote";
import { SectionHead } from "./SectionHead";

type Errors = Partial<Record<"name" | "contact" | "needs" | "message", string>>;

const COPY = {
  name: "Please add your name.",
  contact: "How should we reach you?",
  needs: "Pick at least one.",
  message: "Tell us a little about the stream.",
  success: "Got it. We reply within 2 days.",
  notConfigured: "Quote form isn't connected yet. Email us instead.",
  failed: "Couldn't send. Try again in a minute or email us.",
};

function statusText(r: SubmitResult): string {
  if (r.ok) return COPY.success;
  return r.reason === "not-configured" ? COPY.notConfigured : COPY.failed;
}

export function QuoteForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [needs, setNeeds] = useState<string[]>([]);
  const uid = useId();

  function toggleNeed(n: string) {
    setNeeds((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const payload = {
      name: get("name"),
      contact: get("contact"),
      needs,
      budget: get("budget"),
      deadline: get("deadline"),
      message: get("message"),
      website: get("website"),
    };
    const next: Errors = {};
    if (!payload.name) next.name = COPY.name;
    if (!payload.contact) next.contact = COPY.contact;
    if (needs.length === 0) next.needs = COPY.needs;
    if (!payload.message) next.message = COPY.message;
    setErrors(next);
    setStatus("");
    if (Object.keys(next).length > 0) return;
    setSending(true);
    const result = await submitQuote(payload, import.meta.env.VITE_FORM_ENDPOINT);
    setSending(false);
    setStatus(statusText(result));
    if (result.ok) {
      form.reset();
      setNeeds([]);
    }
  }

  const field = (key: keyof Errors) => ({
    className: errors[key] ? "field invalid" : "field",
    describedBy: errors[key] ? `${key}-err` : undefined,
  });

  return (
    <>
      <SectionHead id="quote" title="Get a quote" />
      <form className="form" noValidate onSubmit={onSubmit}>
        <div className={field("name").className}>
          <label htmlFor={`${uid}-name`}>Name</label>
          <input id={`${uid}-name`} name="name" placeholder="How should we address you?" aria-describedby={field("name").describedBy} />
          {errors.name && <p id="name-err" className="err">{errors.name}</p>}
        </div>
        <div className={field("contact").className}>
          <label htmlFor={`${uid}-contact`}>Email or Discord</label>
          <input id={`${uid}-contact`} name="contact" placeholder="you@example.com or @handle" aria-describedby={field("contact").describedBy} />
          {errors.contact && <p id="contact-err" className="err">{errors.contact}</p>}
        </div>
        <fieldset className={`${field("needs").className} full`} aria-describedby={field("needs").describedBy}>
          <legend>What do you need?</legend>
          <div className="chips">
            {site.form.needs.map((n) => (
              <label key={n} className="chip chip-check" data-on={needs.includes(n) || undefined}>
                <input type="checkbox" name="needs" value={n} checked={needs.includes(n)} onChange={() => toggleNeed(n)} />
                {n}
              </label>
            ))}
          </div>
          {errors.needs && <p id="needs-err" className="err">{errors.needs}</p>}
        </fieldset>
        <div className="field">
          <label htmlFor={`${uid}-budget`}>
            Budget<i>optional</i>
          </label>
          <select id={`${uid}-budget`} name="budget" defaultValue="">
            <option value="">Not sure yet</option>
            {site.form.budgets.slice(1).map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${uid}-deadline`}>
            Deadline<i>optional</i>
          </label>
          <input id={`${uid}-deadline`} name="deadline" type="date" />
        </div>
        <div className={`${field("message").className} full`}>
          <label htmlFor={`${uid}-message`}>Tell us about your channel</label>
          <textarea
            id={`${uid}-message`}
            name="message"
            placeholder="Links to your channel or current overlay, colours you love, anything we should match…"
            aria-describedby={field("message").describedBy}
          />
          {errors.message && <p id="message-err" className="err">{errors.message}</p>}
        </div>
        <div className="hp" aria-hidden="true">
          <label htmlFor={`${uid}-website`}>Website</label>
          <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="full submit">
          <button className="btn btn-primary" type="submit" disabled={sending}>
            Send quote request
          </button>
          <p>No account, no payment yet. We reply within 2 days.</p>
        </div>
        <p className={status ? "ok full show" : "ok full"} role="status">
          {status}
        </p>
      </form>
    </>
  );
}
