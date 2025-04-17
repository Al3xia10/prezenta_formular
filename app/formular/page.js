"use client";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Formular() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [valid, setValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nume: "",
    prenume: "",
    seria: "",
    anul: "",
    grupa: "",
    disciplina: "",
    tip: "",
  });

  useEffect(() => {
    if (!session) return signIn(); // Dacă nu este autentificat, redirecționează la login

    fetch("/api/validate-token", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => setValid(data.valid));
  }, [session]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/save", {
      method: "POST",
      body: JSON.stringify({ ...form, email: session?.user?.email }),
    });
    setSubmitted(true);
  }

  if (!valid)
    return <p className="p-6 text-red-500">Token invalid sau expirat.</p>;
  if (submitted)
    return (
      <p className="p-6 text-green-600">Prezență înregistrată cu succes.</p>
    );

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4">
      {Object.entries(form).map(([key, value]) => (
        <input
          key={key}
          name={key}
          required
          value={value}
          onChange={handleChange}
          placeholder={key.toUpperCase()}
          className="w-full p-2 border rounded"
        />
      ))}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Trimite prezența
      </button>
    </form>
  );
}
