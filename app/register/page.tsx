"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [phone, setPhone] = useState("");

  async function registerService() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("Kayıt hatası: " + error.message);
      return;
    }

    const userId = data.user?.id;

    if (userId) {
      const { error: profileError } = await supabase
        .from("service_profiles")
        .insert([
          {
            user_id: userId,
            service_name: serviceName,
            phone,
          },
        ]);

      if (profileError) {
        alert("Profil hatası: " + profileError.message);
        return;
      }
    }

    alert("Servis hesabı oluşturuldu");
    window.location.href = "/login";
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Servis Kaydı</h1>

      <input
        placeholder="Servis adı"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        placeholder="Telefon"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        placeholder="Şifre"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={registerService}>Kayıt Ol</button>
    </main>
  );
}