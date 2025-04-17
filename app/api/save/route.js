import { writeFile, readFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const data = await req.json();
  const filePath = path.join(process.cwd(), "public", "data.json");

  let existing = [];
  try {
    existing = JSON.parse(await readFile(filePath, "utf8"));
  } catch {}

  existing.push({ ...data, timestamp: new Date().toISOString() });
  await writeFile(filePath, JSON.stringify(existing, null, 2));

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
