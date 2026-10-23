// src/Database/siteConfig.ts
// ═══════════════════════════════════════════════════════════════
// PUSAT KONTAK — ubah nomor telepon/WA hanya di file ini.
// Format: kode negara tanpa "+", contoh: "6281118414832"
// Link WA, tel:, dan tampilan nomor otomatis ikut berubah.
// ═══════════════════════════════════════════════════════════════

export const WA_NUMBER = "628111841483";

// ── Helper (tidak perlu diubah) ──

export const TEL_HREF = `tel:+${WA_NUMBER}`;

export const waLink = (message?: string) =>
  message
    ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${WA_NUMBER}`;

export const WA_DISPLAY = formatPhone(WA_NUMBER);

function formatPhone(digits: string): string {
  // 6281118414832 → +62 811-1841-4832
  const cc = digits.slice(0, 2);
  const rest = digits.slice(2);
  const op = rest.slice(0, 3);
  const mid = rest.slice(3, 7);
  const last = rest.slice(7);
  return `+${cc} ${op}-${mid}-${last}`;
}
