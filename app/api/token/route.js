import { writeFile, readFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const { token } = await req.json();
  const filePath = path.join(process.cwd(), "public", "tokens.json");
  const expiresAt = Date.now() + 2 * 60 * 1000; // 2 minute
  const newToken = { token, expiresAt };

  let tokens = [];
  try {
    tokens = JSON.parse(await readFile(filePath, "utf8"));
  } catch {}

  tokens.push(newToken);
  await writeFile(filePath, JSON.stringify(tokens, null, 2));

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
