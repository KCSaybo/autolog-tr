"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function MaintenancePage() {
  const params = useParams();
  const token = params.token as string;

  const [title, setTitle] = useState("");
  const [km, setKm] = useState("");
  const [notes, setNotes] = useState("");

  async function saveMaintenance() {
    const { error } = await supabase.from("maintenance_records").insert([
      {
        vehicle_token: token,
        title,
        km,
        notes,
      },
    ]);

    if (error) {
      alert("Hata: " + error.message);
      return;
    }

    alert("Bakım kaydı eklendi");

    window.location.href = `/vehicle/${token}`;
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Bakım Ekle</h1>

      <input
        placeholder="İşlem başlığı"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        placeholder="Km"
        value={km}
        onChange={(e) => setKm(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        placeholder="Not"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={saveMaintenance}>Bakımı Kaydet</button>
    </main>
  );
}