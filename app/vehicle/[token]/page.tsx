"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function VehicleHistoryPage() {
  const params = useParams();
  const token = params.token as string;

  const [vehicle, setVehicle] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: vehicleData, error: vehicleError } = await supabase
        .from("vehicles")
        .select("*")
        .eq("token", token)
        .single();

      if (vehicleError) {
        console.log(vehicleError);
        return;
      }

      setVehicle(vehicleData);

      const { data: recordsData, error: recordsError } = await supabase
        .from("maintenance_records")
        .select("*")
        .eq("vehicle_token", token)
        .order("created_at", { ascending: false });

      if (recordsError) {
        console.log(recordsError);
        return;
      }

      setRecords(recordsData || []);
    }

    fetchData();
  }, [token]);

  if (!vehicle) {
    return (
      <main style={{ padding: 40 }}>
        <h1>AutoLog TR</h1>
        <p>Yükleniyor...</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>AutoLog TR</h1>
      <h2>Dijital Araç Bakım Geçmişi</h2>

      <hr />

      <h3>Araç Bilgisi</h3>
      <p>Plaka: {vehicle.plate}</p>
      <p>Marka: {vehicle.brand}</p>
      <p>Model: {vehicle.model}</p>
      <p>Km: {vehicle.km}</p>

      <button
        style={{ marginTop: 20, padding: 10 }}
        onClick={() => {
          window.location.href = `/maintenance/${token}`;
        }}
      >
        Bakım Ekle
      </button>

      <h3 style={{ marginTop: 30 }}>Bakım Geçmişi</h3>

      {records.length > 0 ? (
        records.map((record) => (
          <div key={record.id} style={{ marginBottom: 15 }}>
            <p>
              <b>{record.title}</b>
            </p>
            <p>Km: {record.km}</p>
            <p>Not: {record.notes}</p>
            <p>Tarih: {new Date(record.created_at).toLocaleString("tr-TR")}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>Henüz bakım kaydı yok.</p>
      )}
    </main>
  );
}