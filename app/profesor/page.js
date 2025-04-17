import { readFile } from "fs/promises";
import path from "path";
import { saveAs } from "file-saver";
import XLSX from "xlsx";

export default async function Profesor() {
  // Citirea datelor din fișierul JSON
  const filePath = path.join(process.cwd(), "public", "data.json");
  const data = JSON.parse(await readFile(filePath, "utf8"));

  // Funcția de export în Excel
  const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data); // Transformă datele într-un sheet Excel
    const wb = XLSX.utils.book_new(); // Creează un nou workbook
    XLSX.utils.book_append_sheet(wb, ws, "Prezență"); // Adaugă sheet-ul în workbook
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" }); // Scrie workbook-ul într-un buffer
    const file = new Blob([excelBuffer], {
      bookType: "xlsx",
      type: "application/octet-stream",
    }); // Creează fișierul Excel
    saveAs(file, "prezenta.xlsx"); // Salvează fișierul cu numele "prezenta.xlsx"
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista prezențe</h1>

      {/* Buton pentru export în Excel */}
      <button
        onClick={() => exportToExcel(data)} // Apelarea funcției de export
        className="px-4 py-2 mb-4 bg-green-600 text-white rounded"
      >
        Exportă Excel
      </button>

      {/* Tabelul cu prezențele */}
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            {Object.keys(data[0] || {}).map((key) => (
              <th key={key} className="border p-2 text-left">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t">
              {Object.values(row).map((val, j) => (
                <td key={j} className="p-2 border">
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
