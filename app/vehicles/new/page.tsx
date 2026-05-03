"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { supabase } from "@/lib/supabase";

export default function NewVehiclePage() {
  const [plate, setPlate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [km, setKm] = useState("");
  const [qrLink, setQrLink] = useState("");
  const [qrImage, setQrImage] = useState("");

  async function saveVehicle() {
    const token = Math.random().toString(36).substring(2, 10);

    const vehicleData = {
      token,
      plate,
      brand,
      model,
      km,
    };

    const { error } = await supabase.from("vehicles").insert([
  {
    plate,
    brand,
    model,
    km,
    token,
  },
]);

if (error) {
  alert("Hata: " + error.message);
  return;
}

    const link = `https://autolog-tr-kaan.vercel.app/vehicle/${token}`;

    setQrLink(link);

    const qr = await QRCode.toDataURL(link);
    setQrImage(qr);
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Araç Ekle</h1>

      <input placeholder="Plaka" value={plate} onChange={(e) => setPlate(e.target.value)} style={{ display: "block", marginBottom: 10 }} />
      <input placeholder="Marka" value={brand} onChange={(e) => setBrand(e.target.value)} style={{ display: "block", marginBottom: 10 }} />
      <input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} style={{ display: "block", marginBottom: 10 }} />
      <input placeholder="Km" value={km} onChange={(e) => setKm(e.target.value)} style={{ display: "block", marginBottom: 10 }} />

      <button onClick={saveVehicle}>Araç Kaydet</button>

      {qrLink && (
        <div style={{ marginTop: 30 }}>
          <h3>QR Link:</h3>
          <a href={qrLink}>{qrLink}</a>

          <h3>QR Kod:</h3>
          <img src={qrImage} width={200} alt="Araç QR Kodu" />
        </div>
      )}
    </main>
  );
}