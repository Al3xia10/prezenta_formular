import { google } from "googleapis";
import { NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";

export async function POST(req) {
  const body = await req.json();
  const { token } = body;

  const expiresAt = Date.now() + 2 * 60 * 1000; // 2 minute
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), "credentials.json"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "AICI_IDUL_TABELULUI_TAU"; // ← vezi mai jos cum îl obții
    const sheetName = "Sheet1";

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:B`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[token, expiresAt]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Google Sheets error:", error);
    return NextResponse.json(
      { error: "Eroare la salvarea în Google Sheets" },
      { status: 500 }
    );
  }
}
