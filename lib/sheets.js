import { google } from "googleapis";
import path from "path";
import { readFile } from "fs/promises";

export async function appendToSheet(dataArray) {
  const credentialsPath = path.join(process.cwd(), "lib", "credentials.json");
  const credentials = JSON.parse(await readFile(credentialsPath, "utf8"));

  const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
  const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    scopes
  );

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = "1AXaSKFvYT2LFboGCrZdsdNlzbH87EMAq9Mh-VW8lUbc"; // ID-ul tău

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Prezențe!A1", // sau schimbă "Prezențe" dacă ai alt nume la sheet
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [dataArray],
    },
  });
}
