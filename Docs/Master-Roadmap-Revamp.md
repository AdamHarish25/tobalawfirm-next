# Master Roadmap Revamp — Toba Lawfirm Next (`tobalawfirm-next`)

> Dokumen induk sebelum implementasi apapun. Semua perubahan wajib merujuk ke phase di sini. Bahasa: Indonesia. Update dokumen ini tiap phase selesai.

<<<<<<< HEAD
**Tanggal dibuat:** 2026-10-05 (terakhir diperbarui 2026-10-05)
**Repo:** `tobalawfirm-next` — Next.js 15.5.27 + React 19.1 + Tailwind 3.4 + Firebase 12
=======
**Tanggal dibuat:** 2026-10-05
**Repo:** `tobalawfirm-next` — Next.js 15.4.4 + React 19.1 + Tailwind 3.4 + Firebase 12
>>>>>>> 381c9d69ee4128c4869f74fd5ad2fc8c498f87e2
**Tujuan utama:** Landing page (`/`) sebagai mesin revenue — naikkan konversi WA/Call, kecepatan, SEO lokal, dan kepercayaan.
**Prinsip:**
1. Revenue dulu, estetika mengikuti. Setiap perubahan harus menjawab: "apakah ini menambah chat/call?"
2. Jangan pecahkan yang jalan. Satu phase = satu PR, bisa rollback.
3. Server-first. Kurangi `'use client'` yang tidak perlu.
4. Aksesibilitas & SEO bukan opsional (1 H1, kontras AA, metadata, schema).
5. Hapus, bukan tambah. Prioritas hapus Bulma, `important:true`, JS resize, `layout="fill"`, teks dinding.

**KPI yang dipantau tiap phase:**
- Konversi: klik WA hero, klik Call header, submit lead form, scroll-depth 75%
- Perf: LCP < 2.5s (mobile 4G), CLS < 0.1, INP < 200ms, bundle JS homepage
- SEO: indexed pages, CTR `pengacara bogor`, FAQ rich result
- Kualitas: 0 TS error, 0 ESLint error, Lighthouse Perf/A11y/SEO ≥ 90

<<<<<<< HEAD
**Peta file kunci (acuan cepat) — kondisi terkini pasca Phase 3:**
- `src/app/page.tsx` — homepage 10 section, **server component + ISR 60s** (hero, about ringkas, keunggulan, layanan server, testimoni, alur, klien/tabs, visi-misi, FAQ+JSON-LD, CTA+form)
- `src/app/layout.tsx` — fonts, GA/Ads, AuthProvider, Footer, WaButton, `lang="id"`
- `src/components/Navbar.jsx` — fixed sticky + tel + CTA WA (Login tetap hidden admin), `Footer.jsx` — 4 kolom + copyright, `WaButton.jsx` — pesan kontekstual per rute
- `src/components/Tabs/Tabs.jsx` (tablist a11y), `Accordion/Accordion.jsx` + `AccordionChild.tsx` (client wrapper wajib), `StatsCounter.jsx`, `Faq/Faq.jsx`, `LeadForm.jsx` + `LeadFormLazy.jsx` (lazy firestore)
- `src/Database/WholeData.jsx` — konten terpusat + `WA_NUMBER`/`waLink()` + data testimoni/alur/FAQ/stats
- `src/firebase.jsx`, `src/Core/Authprovider.tsx` — TIDAK PERNAH disentuh selama revamp
- Nomor WA/telp global: **+62 811-1841-4832** (`6281118414832`)

## Changelog — semua keputusan & follow-up tercatat di sini

| Tanggal | Keputusan | Status |
|---|---|---|
| 2026-10-05 | Phase 0–3 selesai di branch `phase-1-foundation` (commit `381c9d6`) | ✅ |
| 2026-10-05 | Login navbar TETAP hidden — jalur admin, bukan untuk umum | ✅ dikunci, jangan diubah |
| 2026-10-05 | Semua CTA kontak → `wa.me` langsung (tab baru, pesan kontekstual); navigasi browse tetap internal; `/contact` tetap hidup | ✅ |
| 2026-10-05 | Nomor WA/telp global diganti ke +62 811-1841-4832 — 15 titik di 7 file (`layout`, `Navbar`, `Footer`, `WholeData`, `LeadForm`, `page`, `contact`, `ServiceView`) + dokumen | ✅ build hijau |
| 2026-10-05 | HOTFIX CVE-2025-55182: `next` 15.4.4 → 15.5.27 (Netlify memblokir deploy versi rentan). Homepage 124→127 kB | ✅ silakan redeploy |
| 2026-10-05 | BUG header Accordion kosong di landing (efek Phase 2) — diperbaiki via `AccordionChild.tsx`. Aturan: jangan baca `child.props` dari wrapper Server Component | ✅ |
| OPEN | Ganti angka placeholder (trust strip, stats, testimoni, harga tab) dengan data riil + izin tertulis sebelum pasang iklan | ⏳ owner |
| OPEN | Buka Firestore rules `allow create` untuk collection `leads` (form tetap jalan via fallback WA tanpa ini) | ⏳ owner + tanpa downtime |
| OPEN | Kanonis rute `/service` vs `/layanan` (rekomendasi `/layanan`, redirect) | ⏳ owner (Phase 4) |
| OPEN | Foto tim berwarna + logo klien untuk ganti grayscale/placeholder | ⏳ owner |
=======
**Peta file kunci (acuan cepat):**
- `src/app/page.tsx` — homepage 7 section (semua client saat ini)
- `src/app/layout.tsx` — fonts, GA/Ads, AuthProvider, Footer, WaButton
- `src/app/globals.css` — tailwind + accordion CSS manual
- `src/components/Navbar.jsx`, `Footer.jsx`, `WaButton.jsx`, `Tabs/Tabs.jsx`, `Accordion/Accordion.jsx`
- `src/Database/WholeData.jsx` — konten statis terpusat
- `src/firebase.jsx`, `src/Core/Authprovider.tsx`
- `tailwind.config.ts`, `next.config.ts`, `src/app/service/page.tsx` (sudah server, contoh benar), `src/app/contact/page.tsx` (masih `next/head`, contoh salah)
>>>>>>> 381c9d69ee4128c4869f74fd5ad2fc8c498f87e2

---

## Phase 0 — Baseline & Dokumentasi ✅ DONE 2026-10-05

**Status:** ✅ Selesai. Tidak ada kode diubah di phase ini.

**Checklist:**
- [x] Inventarisasi techstack & struktur folder — 42 file sumber di `src/` (28x `.jsx`, 14x `.tsx/.ts`), 16 rute App Router
- [x] Audit outdated (Next 15 vs 16.3.6, Tailwind 3 vs 4.3, Bulma redundan, `layout="fill"`, `next/head`, breakpoint `lg:1280`, `important:true`, fetch client tanpa cache)
- [x] Audit UI/UX landing (hero generik, CTA kecil, wall-of-text, Tabs `Tipe 1/2/3`, H1 9x, grayscale, footer 2 kolom, missing testimonials/FAQ/form/JSON-LD)
- [x] Terbitkan `Docs/Master-Roadmap-Revamp.md` ini
- [x] Kunci baseline metrik (lihat tabel di bawah)

**Baseline (diukur 2026-10-05, Node v22.16.0, Next 15.4.4):**

| Metrik | Hasil |
|---|---|
| `npm run build` | ✅ Sukses ~31s, 15 rute (9 static, 3 dynamic). 2 warning ESLint: `PageProps unused` di `layanan/[slug]/page.tsx:9`, `useEffect dep loading` di `service/ListView.tsx:52` |
| `npx tsc --noEmit` | ✅ Exit 0, bersih |
| Homepage `/` First Load JS | **240 kB** (page 3.04 kB + shared 99.6 kB). Pembanding: `/about` & `/team` 120 kB, `/service` 238 kB, `/admin/*` 343 kB |
| `'use client'` | **29 file** dari ~42 file sumber — homepage `page.tsx:2` full client, mematikan SSR/SEO |
| `next/head` legacy | **6 file**: `login, register, contact, about, team, dashboard` — harusnya `export const metadata` |
| `layout="fill"` deprecated | **1 file**: `Tabs/Tabs.jsx:53` |
| `<h1` di homepage | **9x** (`page.tsx:36,58,76,82,119,128,145,161,176`) — harusnya 1x |
| `public/images/` | **33 MB total** — biang LCP: `businessmenShakingHands.jpg 11 MB`, `backgroundService.jpg 5.9 MB`, `Poster2.png 3.3 MB`, `quarrel.jpg 2.8 MB`, hero `hourglass.jpg 615 kB`. `Logo.jpg` cuma 7.5 kB (butuh SVG) |
| Env keys | ✅ Lengkap (Firebase 6 keys + Cloudinary 3 keys, isi values tidak dicek) |
| Browserslist | ⚠️ `caniuse-lite 16 months old` — jalankan `npx update-browserslist-db@latest` di Phase 1 |
| Lighthouse mobile/desktop | ⏳ Belum diukur (butuh Chrome + `next start`). Cara: `npm run build && npm start`, lalu `npx lighthouse http://localhost:3000 --view`. Target Phase 4: ≥90 semua |
| Firestore reads/bulan | ⏳ Isi manual dari Firebase Console (homepage fetch `limit 6` tiap visit tanpa cache) |

**Temuan kunci Phase 0 (masuk Phase 1 & 2):**
1. Bundle homepage 240 kB + 33 MB images = LCP pasti merah di 4G.
2. 29 client components + 9 H1 + 6 `next/head` = SEO & perf bocor.
3. Contoh benar sudah ada: `service/page.tsx` (server fetch + `metadata`) — jadikan pola untuk homepage di Phase 2.

---

## Phase 1 — Foundation & Tech-Debt Cleanup ✅ DONE 2026-10-05

**Tujuan:** Hilangkan error/warning, kecilkan bundle, siapkan migrasi. Nol perubahan tampilan, nol sentuhan backend. Branch: `phase-1-foundation`.

**Scope / Tasks:**
1. Hapus Bulma:
   - [x] `npm uninstall bulma` (tidak ada class Bulma di `src/`, hanya di `package.json`), grep `bulma|is-` class di `src/`, hapus import CSS jika ada — DONE, `BULMA REMOVED OK`
   - [x] Verifikasi tidak ada regresi visual — build hijau, diff hanya hapus dep
2. Hapus `important:true` + rapikan Tailwind content:
   - [x] `tailwind.config.ts`: hapus `important:true`, tambah `"./src/Core/**"` + `"./src/Database/**"` — DONE
   - [ ] Fix class yang tadinya mengandalkan `!important` (pantau saat QA visual Phase 2 — sejauh ini build + tsc bersih)
3. Fix Next deprecated API:
   - [x] `Tabs.jsx:53` `layout="fill"` → `fill + sizes="(max-width:768px)100vw,50vw"` — DONE
   - [x] 6 halaman `next/head` dibersihkan — DONE (detail di atas)
   - [x] **BUG FIX 2026-10-05 (efek samping Phase 2):** header Accordion kosong (`<h1></h1>`) di landing, normal di about. Penyebab: `Accordion.jsx` membaca `child.props.header/icon`, tapi `AccordionChild` di landing adalah Server Component → Next merender-nya di server dulu, yang sampai ke client tinggal fragment → props hilang. Di about (full client) elemen utuh → normal. Solusi: `AccordionChild` dipindah ke file sendiri `src/components/Accordion/AccordionChild.tsx` dengan `'use client'` + props diketik → elemen diteruskan by-reference beserta props. Dipakai di `page.tsx` dan `about/page.tsx`. Verifikasi via SSR HTML: `Visi` + `Misi` muncul. Aturan: JANGAN baca `child.props` dari wrapper Server Component.
   - [ ] `layout.tsx:48-68` GA/Ads `strategy="afterInteractive"` + `preconnect` — DITUNDA ke Phase 4 (butuh QA tracking, berisiko ganggu iklan jika salah)
4. Navbar CSS-first:
   - [x] Hapus `windowWidth` listener + `isClient` guard + placeholder `<li>` kosong; ganti `windowWidth<1280 ? mobile : desktop` → `<div lg:hidden>` + `<div hidden lg:grid>` (breakpoint sama 1280px, visual identik); tambah `aria-label` tombol menu + auto-close saat `pathname` berubah — DONE
   - [x] `Viewport.jsx` tidak dihapus (masih ada, tidak dipakai Navbar lagi) — hapus fisik di Phase 5 bersama TS migration
5. Hygiene:
   - [x] `Footer.jsx`: hapus `useRouter` tak terpakai + `'use client'` → jadi server component — DONE
   - [ ] Tambah `alt` deskriptif + `sizes` di semua `next/image` homepage — DITUNDA ke Phase 4 (bareng konversi WebP/AVIF)
   - [x] `tsc --noEmit` exit 0 bersih; `next build` sukses 15 rute — DONE (1 warning sisa: `ListView.tsx:52 useEffect dep loading`, pre-existing, tidak disentuh agar tidak ganggu fetch services)

**Hasil verifikasi Phase 1 (vs baseline Phase 0):**
| Metrik | Baseline | Sesudah | Delta |
|---|---|---|---|
| Build | ✅ 31s, 2 warnings | ✅ sukses, 1 warning | −1 warning (`PageProps` hilang? cek ulang saat QA — `ListView` sisa) |
| TSC | exit 0 | exit 0 | tetap bersih |
| `/` First Load | 240 kB | 239 kB | −1 kB |
| `/contact` | 1.6 kB / 120 kB | 171 B / 119 kB | −90% page JS (jadi server) |
| `/about` | 1.56 kB | 1.26 kB | −19% |
| `/team` | 1.5 kB | 1.16 kB | −23% |
| Backend disentuh? | — | **NOL** — `firebase.jsx`, `Authprovider`, Firestore calls, env, admin CRUD tidak ada di diff | ✅ |

**Files tersentuh:** `package.json`, `tailwind.config.ts`, `src/components/Tabs/Tabs.jsx`, `src/app/contact/page.tsx`, `src/components/Navbar.jsx`, `src/components/Viewport.jsx`, `src/components/Footer.jsx`, `src/app/layout.tsx`

**Exit criteria:** Build hijau, 0 warning `layout fill` / `next/head`, visual identik (screenshot before/after), bundle tidak naik.

**Risiko & mitigasi:** Class Bulma tersembunyi → grep + QA klik semua rute `/, /service, /about, /team, /artikel, /contact, /login, /admin`.

---

## Phase 2 — Landing CRO Quick Wins ✅ DONE 2026-10-05

**Tujuan:** Klik WA/Call naik tanpa redesign total. Branch: `phase-1-foundation` (lanjut).

**Scope / Tasks:**
1. Server-ize homepage:
   - [x] `src/app/page.tsx` ditulis ulang: hapus `'use client'` + `useRouter/useState/useEffect` → server component + `export const revalidate = 60` + `metadata` SEO. Fetch services pindah ke server (`where isPublished + orderBy title + limit 6`, pola sama dengan `service/page.tsx`). `Tabs/Accordion/Navbar` (client) tetap diimpor — didukung RSC.
   - [x] `Suspense` + `ServicesSkeleton` 6 cards (`animate-pulse`, `aria-busy`), error state (null) dengan CTA `Coba Lagi → /service` + `Hubungi Kami`, empty state jika 0 layanan.
   - [x] **Bug kritis diperbaiki:** kartu layanan homepage dulu push `/services/:id` (rute tidak ada → 404). Sekarang fetch `slug` + link `/layanan/:slug`, fallback `/service`. Semua tombol `router.push` diganti `<Link>`.
2. Sticky header + CTA persisten:
   - [x] Navbar `absolute` → `fixed + bg-black/70 backdrop-blur-md border-b` — CTA selalu visible saat scroll.
   - [x] `Login` TETAP hidden (`invisible group-hover:visible`) — keputusan owner 2026-10-05: jalur admin, bukan untuk umum. Tidak diubah.
<<<<<<< HEAD
   - [x] Tambah `tel:+6281118414832` (desktop `xl+`) di header. Nomor WA/telp global diganti ke +62 811-1841-4832 (2026-10-05).
=======
   - [x] Tambah `tel:+628111072535` (desktop `xl+`) di header.
>>>>>>> 381c9d69ee4128c4869f74fd5ad2fc8c498f87e2
3. Hero rewrite:
   - [x] H1 `Penuhi semua kebutuhan investigasi...` → `Pengacara Bisnis & Litigasi Terpercaya di Bogor` (keyword + lokasi). Sub 2 kalimat benefit + konsultasi gratis. CTA `text-xs p-4` → `text-sm font-semibold px-8 py-4`. Overlay `bg-black/50` → gradient `from-black/70 via-black/50`. Trust strip 3 item (`★4.9, 100+ kasus, <5 mnt` — GANTI dengan angka riil sebelum iklan!). H1 lain → H2/H3 (1 H1 per page).
4. Token warna premium:
   - [x] `tailwind.config` tambah `gold #C9A86A/soft/deep`; hero CTA + ikon + badge + footer CTA pakai `bg-gold`. Sisa `yellow-500` dimigrasi bertahap Phase 3–4.
   - [x] Kontras: `text-white/60` → `/75` di paragraf homepage; `lang="en"` → `"id"` di `layout.tsx`.
5. WaButton:
   - [x] Indikator online (ping dot) + tooltip `Online` + pesan kontekstual per rute (`layanan/service, artikel, team/about, contact`) via `usePathname`, `aria-label` Indonesia.
6. Footer 2→4 kolom:
   - [x] Tambah kolom Jam Operasional + kolom Konsultasi Gratis (WA + tel). Social hover → gold. Copyright bar + Privacy/Terms. `<div>` → `<footer>` + `aria-label` sosmed. Data di `WholeData.FooterData.hours/bottom`.

**Hasil verifikasi Phase 2 (vs Phase 1):**
| Metrik | Phase 1 | Phase 2 | Delta |
|---|---|---|---|
| `/` page JS | 3.06 kB | **1.09 kB** | −64% |
| `/` First Load | 239 kB | **120 kB** | **−50%** (setara `/about`) |
| ISR | — | `1m` (kolom Revalidate) | Firestore reads turun drastis |
| TSC / Build | hijau | hijau (1 warning pre-existing `ListView`) | tetap |
| Backend disentuh? | — | **NOL** — query sama, hanya pindah client→server | ✅ |

---

## Phase 3 — Trust & Content ✅ DONE 2026-10-05

**Tujuan:** Jawab "kenapa harus Toba?" dalam 30 detik scroll. Branch: `phase-1-foundation` (lanjut).

**Scope / Tasks:**
1. Potong wall-of-text `page_2`:
   - [x] Homepage: 4 paragraf → `excerpt` 2 kalimat + 4 bullet + `StatsCounter` count-up (`IntersectionObserver`, `src/components/StatsCounter.jsx`) + CTA → `/about`. Full subtitle tetap di `/about` (backlog Phase 6).
   - [ ] Ganti `profile.jpg grayscale` dengan foto tim asli berwarna — TUNDA (butuh foto + izin owner)
   - [ ] Angka stats/trust/testimoni/harga = PLACEHOLDER, wajib ganti data riil + izin tertulis sebelum iklan
2. Perbaiki `page_5 Tabs`:
   - [x] `Tipe 1/2/3` → `Pengacara Tetap / Kasus Insidentil / Pendampingan Pengadaan` + harga + CTA per tab (`WholeData.page_5`)
   - [x] `Tabs.jsx` ditulis ulang: `tablist/tab/tabpanel`, `aria-*`, keyboard Arrow/Home/End, hapus pola `disabled`-untuk-active
3. Perbaiki `page_6 Accordion`:
   - [x] Isi jadi kartu bernomor lega; header icon 40px→26px (CSS tetap di `globals.css`, modulasi ditunda Phase 5). BUG header kosong diperbaiki via `AccordionChild.tsx` (detail di Phase 1)
   - [ ] `aria-expanded` di Accordion Visi/Misi — BELUM (menyusul, pola sudah ada di Faq)
4. Tambah section baru (di bawah layanan, di atas Klien Kami):
   - [x] `HomeTestimonials` (3 kartu quote + bintang — PLACEHOLDER) + `HomeSteps` (Alur 3 langkah + CTA). Logo klien ditunda (butuh aset owner)
   - [x] `HomeFaq` (6 FAQ + JSON-LD `FAQPage`) via `src/components/Faq/Faq.jsx` (grid-rows animation, `aria-expanded`)
5. `page_7` CTA final:
   - [x] `LeadForm` (nama + WA + kebutuhan) → `addDoc(leads)` best-effort + fallback selalu redirect WA prefilled + `sonner`. Firestore chunk di-lazy via `LeadFormLazy.jsx` (`dynamic ssr:false` dalam wrapper client — `ssr:false` langsung di Server Component DILARANG Next)
   - [x] Tombol ganda WA + Tel di bawah form

**Files tersentuh:** `src/app/page.tsx`, `src/Database/WholeData.jsx`, `src/components/Tabs/Tabs.jsx`, `src/components/Accordion/AccordionChild.tsx` (baru), `src/components/StatsCounter.jsx` (baru), `src/components/Faq/Faq.jsx` (baru), `src/components/LeadForm.jsx` + `LeadFormLazy.jsx` (baru)

**Hasil verifikasi Phase 3:**
| Metrik | Phase 2 | Phase 3 | Delta |
|---|---|---|---|
| `/` First Load | 120 kB | **124 kB** | +4 kB (form firestore di-lazy, tidak ikut initial) |
| TSC / Build | hijau | hijau | tetap |

**Catatan backend (PENTING, belum merusak — tapi butuh 1x sentuhan rules):**
- `LeadForm` menulis ke collection baru `leads`. Jika Firestore rules belum allow create → form tetap jalan via fallback WA, tapi data tidak tersimpan. Minta admin Firebase: `allow create: if true` di `leads` (tanpa read/update/delete publik) — 2 menit di console, tanpa downtime.

**Follow-up 2026-10-05 (keputusan owner: semua CTA kontak → WA langsung):**
- `WholeData.jsx`: tambah `WA_NUMBER` + `waLink(pesan)` terpusat. Semua CTA kontak (hero primer `Konsultasi Gratis`, navbar `Hubungi Kami`, 3 CTA tab, tombol Alur) → `wa.me` dengan pesan prefilled kontekstual, dibuka di tab baru (`external: true`).
- Navigasi browse tetap internal: `Lihat Layanan`, `Tentang Kami`, kartu layanan → detail, link footer/menu. Halaman `/contact` tetap ada (dijangkau via Privacy/Terms + URL langsung).

---

## Phase 4 — Performance, SEO Lokal, Aksesibilitas

**Tujuan:** Lighthouse ≥90 semua, SEO Bogor menang.

**Scope / Tasks:**
1. Images & fonts:
   - [ ] Konversi `public/images/*.jpg` ke WebP/AVIF, tambah `sizes`, `placeholder="blur"` untuk hero; `Logo.jpg` → SVG
   - [ ] Audit 3 fonts: pertahankan `Playfair_Display + Inter/Roboto` saja, hapus 1 font; `display:swap`, `preload` hanya hero font
   - [ ] `next.config.ts`: tambah `formats:['image/avif','image/webp']`, `minimumCacheTTL`, perluas `remotePatterns` jika perlu
2. SEO teknis:
   - [ ] `sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`, `twitter-image`, canonical per page
   - [ ] `layout.tsx` metadata: `title.template`, `description`, `keywords`, `openGraph`, `alternates`, `verification`
   - [ ] JSON-LD `LegalService` (nama, alamat Madison Square, tel, areaServed Bogor, openingHours) di `layout` atau `/contact`
   - [ ] Perbaiki duplikasi rute: audit `/service` vs `/layanan/[slug]` — pilih 1 kanonis, redirect satunya (`next.config.ts redirects`)
3. A11y & form:
   - [ ] Satu H1 per page, heading order, `section aria-labelledby`, focus-visible gold, skip-to-content link
   - [ ] Kontras audit manual, `aria` di Accordion/Tabs/WA, `iframe maps` beri `title`
4. Observability:
   - [ ] GA events: `cta_wa_hero`, `cta_call_header`, `lead_submit`, `faq_open`; `web-vitals` report ke GA

**Exit criteria:** Lighthouse mobile Perf/A11y/Best/SEO ≥90, Rich Results + Sitemap valid, First Load JS homepage turun vs baseline.

---

## Phase 5 — Modernisasi Stack (Setelah revenue stabil)

**Tujuan:** Naik ke stack 2026 tanpa rewrite besar.

<<<<<<< HEAD
**HOTFIX keamanan 2026-10-05 (didahulukan dari Phase 5 karena Netlify memblokir deploy):**
- Netlify menolak deploy: Next.js 15.4.4 terdampak CVE-2025-55182 (RCE kritis, lihat https://ntl.fyi/cve-2025-55182).
- Upgrade `next 15.4.4 → 15.5.27` + `eslint-config-next` sejajar (tetap di major 15, tanpa lompat ke 16). React 19.1.0 tidak diubah.
- Verifikasi: `tsc` bersih, `build` hijau 15 rute. Homepage 124→127 kB (+3 kB framework), ISR tetap. Silakan redeploy Netlify.

**INSIDEN deploy 2026-10-05 (merge conflict ke-push, build Netlify gagal):**
- Penyebab: `git pull` membuat merge commit `50cb5e1` yang meng-commit marker konflik (`<<<<<<< HEAD`) di 5 file (nomor WA lama vs baru) — Netlify ikut build kode rusak itu.
- Perbaikan: resolve semua hunk (sisi nomor baru dipertahankan), verifikasi `grep` marker + nomor lama = nol, `tsc` + `build` hijau, commit `0938559` + push normal.
- Aturan: JANGAN `git pull` saat branch divergen karena amend — pakai `fetch` + periksa dulu, atau `pull --rebase`. Jangan pernah push/commit file bermarker (cek `grep -r "<<<<<<<" src/` sebelum push).

=======
>>>>>>> 381c9d69ee4128c4869f74fd5ad2fc8c498f87e2
**Scope / Tasks:**
1. [ ] Upgrade `next 15.4.4 → 16.3.x` via `npx @next/codemod`, uji `turbopack`, perbaiki breaking `fetch/cache`
2. [ ] Migrasi `tailwind 3.4 → 4.3`: `npx @tailwindcss/upgrade`, pindah token ke CSS `@theme` (`gold`, fonts, breakpoints kembali standar `sm/md/lg/xl`), hapus `tailwind.config.ts` jika sudah setara, ganti `@tailwind` directives → `@import "tailwindcss"`
3. [ ] TS penuh: rename `WholeData.jsx, Navbar.jsx, Footer.jsx, firebase.jsx` → `.ts/.tsx`, ketatkan `strict`, hapus `any` implisit
4. [ ] Ganti `jest` → `vitest` (opsional) + tambah test smoke homepage (render H1, CTA WA href benar)
5. [ ] Evaluasi `Tiptap 3` + `Firebase 12` rules/indexes: pastikan composite index `services isPublished+title` ada, rules `leads` hanya create, rate-limit

**Exit criteria:** Build + semua rute lolos, tidak ada `tailwind.config` legacy (atau terdokumentasi kenapa dipertahankan), changelog ditulis.

**Jangan dikerjakan sebelum Phase 2–4 selesai** kecuali ada CVE.

---

## Phase 6 — Iterasi & Eksperimen (Ongoing)

- [ ] A/B test hero: `video vs image`, `H1 benefit vs H1 keyword`, `CTA WA vs CTA Form`
- [ ] Musiman: banner `Sengketa Bisnis Akhir Tahun`, `Pendampingan Pengadaan`, artikel SEO `/artikel` internal link ke `/service`
- [ ] Dashboard sederhana: leads/minggu per sumber (hero, footer, artikel, WA float) — pakai GA + Firestore `leads.createdAt+source`
- [ ] Bulanan: review search console, perbaiki artikel CTR rendah, tambah 1 FAQ dari pertanyaan WA riil

---

## Aturan PR per Phase

1. Judul PR: `[Phase-N] judul singkat` + link ke section dokumen ini.
2. Sertakan: before/after screenshot mobile+desktop, Lighthouse delta, file yang diubah.
3. Dilarang campur phase (misal Phase 1 jangan selipkan redesign hero).
4. Update checklist di dokumen ini di PR yang sama (centang `[x]`).

<<<<<<< HEAD
## Keputusan yang masih butuh input owner (ringkas — detail di Changelog atas)

- [x] Nomor WA & jam operasional resmi → DONE: +62 811-1841-4832 (2026-10-05)
- [ ] Angka trust riil, stats, testimoni + izin tertulis — jangan pakai dummy di production
- [ ] Harga `Mulai dari Rp` per layanan — tampilkan atau `Hubungi untuk estimasi`?
- [ ] Kanonis rute `/service` vs `/layanan` (Phase 4)
- [ ] Foto tim berwarna + logo klien
- [ ] Rules `leads` create di Firebase console

---

*Status terkini: Phase 0–3 + hotfix keamanan selesai di branch `phase-1-foundation`. Next: Phase 4 (Lighthouse ≥90, WebP/AVIF, sitemap, SEO Bogor).*
=======
## Keputusan yang masih butuh input owner

- [ ] Angka trust riil (kasus, rating, tahun) — jangan pakai dummy di production
- [ ] Harga `Mulai dari Rp` per layanan — tampilkan atau `Hubungi untuk estimasi`?
- [ ] Kanonis rute: pertahankan `/service` atau `/layanan`? (rekomendasi: `/layanan` untuk SEO ID, redirect `/service`)
- [ ] Foto tim & testimoni yang boleh publik + izin tertulis
- [ ] Nomor WA & jam operasional resmi untuk header/footer/schema

---

*Next step setelah dokumen ini: isi baseline Phase 0, lalu mulai Phase 1 task #1 (uninstall Bulma).*
>>>>>>> 381c9d69ee4128c4869f74fd5ad2fc8c498f87e2
