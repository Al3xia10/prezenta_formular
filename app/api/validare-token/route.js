import { readFile, writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const { token } = await req.json();
  const filePath = path.join(process.cwd(), "public", "tokens.json");
  try {
    const data = JSON.parse(await readFile(filePath, "utf8"));
    const now = Date.now();
    const found = data.find((t) => t.token === token && t.expiresAt > now);
    return new Response(JSON.stringify({ valid: !!found }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ valid: false }), { status: 200 });
  }
}
