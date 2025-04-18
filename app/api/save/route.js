import { appendToSheet } from "@/lib/sheets";

export async function POST(req) {
  const body = await req.json();

  const { nume, prenume, seria, anul, grupa, disciplina, tip, email } = body;

  const row = [
    new Date().toLocaleString("ro-RO"),
    nume,
    prenume,
    seria,
    anul,
    grupa,
    disciplina,
    tip,
    email,
  ];

  try {
    await appendToSheet(row);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Eroare la scrierea în Google Sheets:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
