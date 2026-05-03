"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Giriş hatası: " + error.message);
      return;
    }

    window.location.href = "/vehicles/new";
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Servis Girişi</h1>

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

      <button onClick={login}>Giriş Yap</button>

      <p>
        Hesabın yok mu? <a href="/register">Servis kaydı oluştur</a>
      </p>
    </main>
  );
}