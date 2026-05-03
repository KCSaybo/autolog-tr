export default function Home() {
  return (
    <main style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>AutoLog TR</h1>

      <p>QR kodlu dijital araç bakım geçmişi sistemi</p>

      <div style={{ marginTop: 30 }}>
        <a href="/vehicles/new">
  <button style={{ padding: 12, marginRight: 10 }}>
    Servis Girişi
  </button>
</a>

        <button style={{ padding: 12 }}>
          Araç Bakım Geçmişi Görüntüle
        </button>
      </div>
    </main>
  );
}