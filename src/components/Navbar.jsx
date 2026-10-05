// src/components/Navbar.jsx (PHASE 1 - CSS-first responsive, no JS resize)
'use client';

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Database } from "@/Database/WholeData";
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


  const className = {
    container: "w-full fixed top-0 inset-x-0 px-10 z-40 py-4 font-Roboto bg-black/70 backdrop-blur-md border-b border-white/10",
    mobile: "w-full flex items-center justify-between gap-10",
    desktop: "w-full grid grid-cols-3 place-items-center text-white gap-10",
    logo: "w-16 h-16 rounded-lg",
    icon: "p-3 rounded-full bg-gray-500/70 text-base group-hover:bg-transparent group-hover:border border-white transform duration-200",
    contactButton: "flex items-center gap-3 group text-[15px]",
    triggerBox: "flex items-center gap-8 text-white",
    navigationList: "flex items-center gap-8 text-white/70",
    navigationMenu: "text-sm list-none cursor-pointer hover:text-white transform duration-100",
    sidebar: `fixed inset-y-0 right-0 bg-white shadow-xl shadow-gray-400 p-14 w-72 ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out space-y-5 text-black z-50`,
    sidebarTrigger: "text-2xl",
    sidebarMenu: "hover:text-yellow-500 list-none cursor-pointer text-lg transform duration-200",
    closeButton: `absolute right-5 top-5 hover:text-xl transform duration-200 text-lg z-10`,
  };

  const Data = Database.NavbarData;

  return (
    <div className={className.container}>
      {/* TAMPILAN MOBILE: visible di bawah lg (1280px, sama seperti sebelumnya), hidden di desktop */}
      <div className={`${className.mobile} lg:hidden`}>
        <Link href="/">
          <Image src={Data.logo} alt="Toba Lawfirm Logo" width={64} height={64} className={className.logo} priority />
        </Link>
        <div className={className.triggerBox}>
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
          <button onClick={() => setIsOpen(!isOpen)} className={className.sidebarTrigger} aria-label="Buka menu navigasi">
            <AiOutlineMenu />
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
          <a href="tel:+628111072535" className="hidden xl:block text-sm text-white/70 hover:text-white transition-colors">
            +62 811-1072-535
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
      <aside className={className.sidebar}>
        <button onClick={() => setIsOpen(!isOpen)} className={className.closeButton} aria-label="Tutup menu navigasi">
          <AiOutlineClose />
        </button>
        <ul className="space-y-5">
          {Data.navigateList.map((data) => (
            <li
              key={data.link}
              onClick={() => {
                router.push(data.link);
                setIsOpen(false);
              }}
              className={`${className.sidebarMenu} ${pathname === data.link ? "text-yellow-500" : ""}`}
            >
              {data.title}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Navbar;