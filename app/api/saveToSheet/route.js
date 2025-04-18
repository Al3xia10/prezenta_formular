import { google } from "googleapis";

const sheets = google.sheets("v4");

export async function POST(req) {
  const body = await req.json();

  const { nume, prenume, seria, anul, grupa, disciplina, tip, email, token } =
    body;

  // Verifică token-ul
  const response = await fetch("https://your-api.com/validate-token", {
    // API-ul de validare token
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  const data = await response.json();
  if (!data.valid) {
    return new Response(JSON.stringify({ success: false }), { status: 400 });
  }

  // Setează Google Sheets API
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = await auth.getClient();

  const spreadsheetId = "your_spreadsheet_id_here"; // ID-ul Google Sheets
  const range = "Sheet1!A2:H2"; // Range-ul unde vrei să salvezi datele

  try {
    await sheets.spreadsheets.values.append({
      auth: client,
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [[nume, prenume, seria, anul, grupa, disciplina, tip, email]],
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Eroare la salvare." }),
      { status: 500 }
    );
  }
}
