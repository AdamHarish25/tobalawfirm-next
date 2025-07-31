// tailwind.config.ts (VERSI FINAL - Ditransformasi untuk Next.js & TypeScript)

import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
  content: [
    // Path yang benar dan lebih spesifik untuk Next.js App Router
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    screens: { // Screens Anda sudah benar, kita salin langsung
      xs: "0px",
      sm: "540px",
      md: "768px",
      lg: "1280px",
      xl: "1580px",
      "2xl": "1806px",
    },
    extend: {
      // Menggunakan CSS Variables dari next/font yang di-setup di layout.tsx
      fontFamily: {
        Poppins: ["var(--font-poppins)", "sans-serif"],
        Roboto: ["var(--font-roboto)", "sans-serif"],
        Playfair_Display: ["var(--font-playfair)", "serif"],
      },
      gridTemplateColumns: {
        SL: "auto 1fr",
      },
      gridTemplateRows: {
        SL: "auto 1fr",
        "8": "repeat(8, minmax(0, 1fr))", // Key '8' harus dalam string di objek
      },
      colors: {
        "dark-gray": "#282a2d",
        "dark-white": "#1b1c1e",
      },
      backgroundImage: {
        // PENTING: Pindahkan gambar ke folder `public/images/`
        // dan referensikan dari root (diawali dengan '/')
        'background1': "url('/images/background.jpg')",
        'background2': "url('/images/hourglass.jpg')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;