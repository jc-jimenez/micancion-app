"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(255,255,255,0.94)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid var(--border-subtle)",
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 20px",
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20,
          background: "var(--gradient-magic)", WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>MiCancion</span>
        <span style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13, color: "var(--brand-primary)" }}>.app</span>
      </Link>
      <span style={{ flex: 1 }} />
      <Link href="/dashboard" style={{
        fontFamily: "var(--font-ui)", fontWeight: 600, fontSize: 13,
        color: "var(--text-muted)", textDecoration: "none", padding: "8px 6px",
      }}>Entrar</Link>
      <Link href="/crear" style={{
        height: 36, padding: "0 18px", borderRadius: "var(--radius-full)",
        background: "var(--gradient-magic)", color: "#fff",
        fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 13,
        display: "flex", alignItems: "center", textDecoration: "none",
        boxShadow: "var(--shadow-magic)",
      }}>Crear ✨</Link>
    </nav>
  );
}
