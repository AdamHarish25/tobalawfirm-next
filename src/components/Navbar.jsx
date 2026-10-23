// src/components/Navbar.jsx (PHASE 1 - CSS-first responsive, no JS resize)
'use client';

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Database } from "@/Database/WholeData";
import { TEL_HREF, WA_DISPLAY } from "@/Database/siteConfig";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Tutup sidebar otomatis saat pindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Kunci scroll body saat drawer terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape untuk tutup drawer
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const className = {
    container: "w-full fixed top-0 inset-x-0 z-40 px-4 sm:px-6 lg:px-10 py-3 sm:py-4 font-Roboto bg-black/70 backdrop-blur-md border-b border-white/10",
    mobile: "w-full flex items-center justify-between gap-3",
    desktop: "w-full grid grid-cols-3 place-items-center text-white gap-10",
    logo: "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg",
    icon: "p-3 rounded-full bg-gray-500/70 text-base group-hover:bg-transparent group-hover:border border-white transform duration-200",
    contactButton: "flex items-center gap-3 group text-[15px]",
    mobileWa: "flex items-center justify-center w-11 h-11 rounded-full bg-gold text-black hover:bg-gold-soft transition-colors duration-200",
    mobileMenuTrigger: `flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-white hover:border-gold hover:text-gold transition-colors duration-200 ${isOpen ? "opacity-0 pointer-events-none" : ""}`,
    triggerBox: "flex items-center gap-2 text-white",
    navigationList: "flex items-center gap-8 text-white/70",
    navigationMenu: "text-sm list-none cursor-pointer hover:text-white transform duration-100",
    overlay: `fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`,
    sidebar: `fixed inset-y-0 right-0 z-50 w-[86vw] max-w-sm bg-dark-white border-l border-gold/20 shadow-[0_0_60px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out lg:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`,
    sidebarAccent: "absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/25 to-transparent",
    sidebarHeader: "flex items-center justify-between px-6 py-5 border-b border-white/10",
    closeButton: "flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-white/70 hover:text-gold hover:border-gold/50 transition-colors duration-200",
    sidebarMenu: "group flex items-center justify-between py-3.5 border-b border-white/5 font-Playfair_Display text-xl transition-colors duration-200",
    sidebarFooter: "px-6 pb-8 pt-4 border-t border-white/10 space-y-4",
  };

  const Data = Database.NavbarData;

  return (
    <>
    <div className={className.container}>
      {/* TAMPILAN MOBILE: visible di bawah lg, hidden di desktop */}
      <div className={`${className.mobile} lg:hidden`}>
        <Link href="/">
          <Image src={Data.logo} alt="Toba Lawfirm Logo" width={56} height={56} className={className.logo} priority />
        </Link>
        <div className={className.triggerBox}>
          {Data.button.external ? (
            <a href={Data.button.link} target="_blank" rel="noopener noreferrer" aria-label={Data.button.title} className={className.mobileWa}>
              {Data.button.icon}
            </a>
          ) : (
            <button onClick={() => router.push(Data.button.link)} aria-label={Data.button.title} className={className.mobileWa}>
              {Data.button.icon}
            </button>
          )}
          <button onClick={() => setIsOpen(true)} className={className.mobileMenuTrigger} aria-label="Buka menu navigasi" aria-expanded={isOpen} aria-controls="mobile-nav">
            <AiOutlineMenu size={22} />
          </button>
        </div>
      </div>
      {/* TAMPILAN DESKTOP: hidden di mobile, grid di lg+ */}
      <div className={`${className.desktop} hidden lg:grid`}>
        <Link href="/">
          <Image src={Data.logo} alt="Toba Lawfirm Logo" width={64} height={64} className={className.logo} priority />
        </Link>
        <ul className={className.navigationList}>
          {Data.navigateList.map((data) => (
            <li key={data.link}>
              <Link href={data.link} className={`${className.navigationMenu} ${pathname === data.link ? "text-white border-b-2" : ""}`}>
                {data.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-6 text-white/70 group">
          <a href={TEL_HREF} className="hidden xl:block text-sm text-white/70 hover:text-white transition-colors">
            {WA_DISPLAY}
          </a>
          {Data.button.external ? (
            <a href={Data.button.link} target="_blank" rel="noopener noreferrer" className={className.contactButton}>
              <div className={className.icon}>{Data.button.icon}</div>
              <p>{Data.button.title}</p>
            </a>
          ) : (
            <button onClick={() => router.push(Data.button.link)} className={className.contactButton}>
              <div className={className.icon}>{Data.button.icon}</div>
              <p>{Data.button.title}</p>
            </button>
          )}
          <Link className="text-white/70 invisible group-hover:visible group-hover:text-white text-sm mx-2 hover:underline" href="/login">
            Login
          </Link>
        </div>
      </div>
    </div>

    {/* OVERLAY gelap saat drawer terbuka — di luar container navbar supaya fixed benar-benar ke viewport */}
    <div className={className.overlay} onClick={() => setIsOpen(false)} aria-hidden="true" />

    {/* DRAWER mobile premium */}
    <aside id="mobile-nav" className={className.sidebar} aria-hidden={!isOpen}>
      <div className={className.sidebarAccent} aria-hidden="true" />
      <div className="flex flex-col h-full">
        <div className={className.sidebarHeader}>
          <div className="flex items-center gap-3">
            <Image src={Data.logo} alt="Toba Lawfirm Logo" width={40} height={40} className="w-10 h-10 rounded-lg" />
            <span className="font-Playfair_Display text-lg text-white">Toba Lawfirm</span>
          </div>
          <button onClick={() => setIsOpen(false)} className={className.closeButton} aria-label="Tutup menu navigasi">
            <AiOutlineClose size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="space-y-0">
            {Data.navigateList.map((data, idx) => (
              <li
                key={data.link}
                style={{ transitionDelay: isOpen ? `${70 + idx * 45}ms` : "0ms" }}
                className={`transition-all duration-300 ease-out ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}`}
              >
                <Link
                  href={data.link}
                  onClick={() => setIsOpen(false)}
                  className={`${className.sidebarMenu} ${pathname === data.link ? "text-gold" : "text-white/85 hover:text-gold"}`}
                >
                  <span className="flex items-center gap-3">
                    {pathname === data.link && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                    {data.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={className.sidebarFooter}>
          <a href={TEL_HREF} className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors duration-200">
            {WA_DISPLAY}
          </a>
          {Data.button.external ? (
            <a href={Data.button.link} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-gold text-black font-semibold text-sm py-3.5 rounded hover:bg-gold-soft transition-colors duration-200">
              {Data.button.title}
            </a>
          ) : (
            <button onClick={() => router.push(Data.button.link)} className="block w-full text-center bg-gold text-black font-semibold text-sm py-3.5 rounded hover:bg-gold-soft transition-colors duration-200">
              {Data.button.title}
            </button>
          )}
          <Link href="/login" onClick={() => setIsOpen(false)} className="block text-center text-sm text-white/45 hover:text-white underline underline-offset-4 transition-colors duration-200">
            Login
          </Link>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Navbar;
