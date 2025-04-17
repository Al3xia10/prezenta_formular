"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function Home() {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const token = Math.random().toString(36).substr(2, 8); // Token unic
    const url = `${window.location.origin}/formular?token=${token}`;
    QRCode.toDataURL(url).then(setQrUrl);

    // Salvează token-ul temporar
    fetch("/api/token", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-2xl font-bold">Scanează codul QR pentru prezență</h1>
      {qrUrl && <img src={qrUrl} alt="QR Code" className="w-64" />}
    </main>
  );
}
