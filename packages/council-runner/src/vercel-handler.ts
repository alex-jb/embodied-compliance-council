import { handle_deliberation } from "./handler.js";

interface VercelRequest {
  method?: string;
  body: unknown;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelResponse {
  status(code: number): VercelResponse;
  setHeader(name: string, value: string): VercelResponse;
  json(body: unknown): VercelResponse;
  end(body?: unknown): VercelResponse;
}

export default async function vercel_handler(req: VercelRequest, res: VercelResponse): Promise<VercelResponse> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method not allowed" });
  }
  const result = await handle_deliberation(req.body);
  return res.status(result.ok ? 200 : 400).json(result);
}
