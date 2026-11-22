export type QuotePayload = {
  name: string;
  contact: string;
  needs: string[];
  budget: string;
  deadline: string;
  message: string;
  /** Honeypot: humans never see or fill this. */
  website: string;
};

export type SubmitResult = { ok: true } | { ok: false; reason: "not-configured" | "network" | "rejected" };

export async function submitQuote(
  payload: QuotePayload,
  endpoint: string | undefined,
  fetchImpl: typeof fetch = fetch,
): Promise<SubmitResult> {
  if (payload.website.trim() !== "") return { ok: true };
  if (!endpoint) return { ok: false, reason: "not-configured" };
  try {
    const res = await fetchImpl(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...payload, needs: payload.needs.join(", ") }),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "rejected" };
  } catch {
    return { ok: false, reason: "network" };
  }
}
