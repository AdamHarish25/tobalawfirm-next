// src/app/layout.tsx (FINAL)

import type { Metadata } from "next";
import { Playfair_Display, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/Core/Authprovider"; // Path diupdate
import { Toaster } from "sonner";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/WaButton";

// Konfigurasi Font
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Toba Lawfirm - Layanan Hukum Profesional",
    template: "%s - Toba Lawfirm",
  },
  description: "Kantor Hukum kami terdiri dari tim advokat & legal consultant mempunyai integritas tinggi yang mampu dan berpengalaman menangani berbagai perkara hukum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${roboto.variable}`}>
      <head>
        {/* Google Scripts */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-17278154266" />
        <Script id="google-ads-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17278154266');
          `}
        </Script>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-014BKHX7WQ" />
        <Script id="google-analytics-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-014BKHX7WQ');
          `}
        </Script>
      </head>
      <body className="bg-dark-white font-Roboto">
        <AuthProvider>
          <Toaster richColors theme="dark" />
          <main className="w-screen overflow-hidden relative">
            {children}
          </main>
          <Footer />
          <FloatingWhatsAppButton
            phoneNumber="628111072535"
            message="Halo, saya tertarik dengan layanan Anda. Bisa berikan info lebih lanjut?"
          />
        </AuthProvider>
      </body>
    </html>
  );
}