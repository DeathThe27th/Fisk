export async function readApiResponse<T>(response: Response, fallback: string): Promise<T> {
  const text = await response.text();
  let body: unknown = null;

  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(response.ok
      ? "Fisk returned an unreadable response. Try again."
      : `${fallback} (HTTP ${response.status}). The research service returned a page instead of data.`);
  }

  if (!response.ok) {
    const message = body && typeof body === "object" && "error" in body && typeof body.error === "string"
      ? body.error
      : fallback;
    throw new Error(message);
  }

  return body as T;
}
