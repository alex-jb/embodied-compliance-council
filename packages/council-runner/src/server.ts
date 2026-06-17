import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { handle_deliberation } from "./handler.js";

const DEFAULT_PORT = 3030;
const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

async function read_body(req: IncomingMessage): Promise<string> {
  return new Promise((resolve_body, reject_body) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve_body(Buffer.concat(chunks).toString("utf-8")));
    req.on("error", reject_body);
  });
}

function send_json(res: ServerResponse, status: number, payload: unknown): void {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    ...CORS_HEADERS,
  });
  res.end(JSON.stringify(payload));
}

export async function handle_request(req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (req.method === "OPTIONS") {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }
  if (req.method === "GET" && req.url === "/health") {
    send_json(res, 200, { ok: true, service: "council-runner" });
    return;
  }
  if (req.method !== "POST" || req.url !== "/api/deliberate") {
    send_json(res, 404, { ok: false, error: "not found" });
    return;
  }
  let body: unknown;
  try {
    const text = await read_body(req);
    body = JSON.parse(text);
  } catch {
    send_json(res, 400, { ok: false, error: "invalid JSON body" });
    return;
  }
  const result = await handle_deliberation(body);
  send_json(res, result.ok ? 200 : 400, result);
}

export function start_server(port: number = DEFAULT_PORT): void {
  const server = createServer((req, res) => {
    handle_request(req, res).catch((err) => {
      send_json(res, 500, { ok: false, error: err instanceof Error ? err.message : String(err) });
    });
  });
  server.listen(port, () => {
    console.log(`council-runner server listening on http://localhost:${port}`);
    console.log(`POST http://localhost:${port}/api/deliberate`);
    console.log(`GET  http://localhost:${port}/health`);
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port_arg = process.argv.find((a, i) => process.argv[i - 1] === "--port");
  start_server(port_arg ? Number(port_arg) : DEFAULT_PORT);
}
