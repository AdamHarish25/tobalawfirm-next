// src/components/WaButton.jsx (PHASE 2 - pesan kontekstual per halaman + indikator online)
'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const messageByPath = [
  { match: (p) => p.startsWith('/layanan') || p.startsWith('/service'), message: "Halo, saya tertarik dengan layanan hukum Anda. Bisa berikan info lebih lanjut?" },
  { match: (p) => p.startsWith('/artikel'), message: "Halo, saya membaca artikel Anda dan ingin konsultasi lebih lanjut." },
  { match: (p) => p.startsWith('/team') || p.startsWith('/about'), message: "Halo, saya ingin berkenalan dan diskusi kebutuhan hukum saya." },
  { match: (p) => p.startsWith('/contact'), message: "Halo, saya ingin membuat janji konsultasi." },
];

const FloatingWhatsAppButton = ({
  phoneNumber,
  message = "Halo, saya tertarik dengan layanan Anda. Bisa berikan info lebih lanjut?",
  ariaLabel = 'Chat WhatsApp Toba Lawfirm',
}) => {
  const pathname = usePathname();
  const contextual = messageByPath.find((m) => pathname && m.match(pathname))?.message ?? message;

  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(contextual);
  const whatsappUrl = `https://wa.me/${cleanedPhoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="fixed bottom-5 right-5 z-50 group"
    >
      <span className="relative flex items-center justify-center bg-green-500 text-white rounded-full w-16 h-16 shadow-lg hover:bg-green-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out">
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-400 border-2 border-white"></span>
        </span>
        <FaWhatsapp size={40} />
      </span>
      <span className="absolute bottom-1/2 translate-y-1/2 right-full mr-4 px-3 py-2 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat di WhatsApp — Online
      </span>
    </a>
  );
};

export default FloatingWhatsAppButton;
