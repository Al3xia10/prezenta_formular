"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode"; // Importăm corect qrcode pentru generarea QR

export default function Home() {
  const [token, setToken] = useState("");
  const [qrUrl, setQrUrl] = useState(""); // State pentru URL-ul QR

  useEffect(() => {
    const generatedToken = Math.random().toString(36).substr(2, 8);
    setToken(generatedToken);

    const fullUrl = `${window.location.origin}/formular?token=${generatedToken}`;

    // Generăm codul QR ca URL de imagine
    QRCode.toDataURL(fullUrl)
      .then((url) => {
        setQrUrl(url); // Setăm URL-ul imaginii QR
      })
      .catch((err) => {
        console.error("Error generating QR code:", err);
      });

    // Salvează token-ul temporar
    fetch("/api/token", {
      method: "POST",
      body: JSON.stringify({ token: generatedToken }),
    });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-50 px-4 text-center">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Scanează codul QR pentru prezență
      </h1>

      {qrUrl && (
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <img src={qrUrl} alt="QR Code" className="w-48 h-48" />{" "}
          {/* Afișăm imaginea QR */}
        </div>
      )}

      <p className="text-sm text-gray-500">
        Cod generat pentru: <span className="font-mono">{token}</span>
      </p>
    </main>
  );
}
