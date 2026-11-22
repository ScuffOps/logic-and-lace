import { submitQuote } from "./submitQuote";

const base = { name: "A", contact: "a@b.c", needs: ["alerts"], budget: "", deadline: "", message: "hi", website: "" };

test("honeypot filled resolves ok without fetching", async () => {
  const f = vi.fn();
  expect(await submitQuote({ ...base, website: "spam" }, "https://x", f as unknown as typeof fetch)).toEqual({ ok: true });
  expect(f).not.toHaveBeenCalled();
});

test("missing endpoint returns not-configured without fetching", async () => {
  const f = vi.fn();
  expect(await submitQuote(base, undefined, f as unknown as typeof fetch)).toEqual({ ok: false, reason: "not-configured" });
  expect(f).not.toHaveBeenCalled();
});

test("2xx resolves ok, 4xx rejected, throw network", async () => {
  const ok = (async () => new Response("", { status: 200 })) as unknown as typeof fetch;
  const bad = (async () => new Response("", { status: 422 })) as unknown as typeof fetch;
  const down = (async () => {
    throw new Error("down");
  }) as unknown as typeof fetch;
  expect(await submitQuote(base, "https://x", ok)).toEqual({ ok: true });
  expect(await submitQuote(base, "https://x", bad)).toEqual({ ok: false, reason: "rejected" });
  expect(await submitQuote(base, "https://x", down)).toEqual({ ok: false, reason: "network" });
});

test("includes access_key in the body when one is configured", async () => {
  let body = "";
  const f = (async (_u: string, init?: RequestInit) => {
    body = String(init?.body);
    return new Response("", { status: 200 });
  }) as unknown as typeof fetch;
  await submitQuote(base, "https://x", f, "key-123");
  expect(JSON.parse(body).access_key).toBe("key-123");
});

test("omits access_key and the honeypot field from the body when not configured", async () => {
  let body = "";
  const f = (async (_u: string, init?: RequestInit) => {
    body = String(init?.body);
    return new Response("", { status: 200 });
  }) as unknown as typeof fetch;
  await submitQuote(base, "https://x", f);
  expect(JSON.parse(body)).not.toHaveProperty("access_key");
  expect(JSON.parse(body)).not.toHaveProperty("website");
});
