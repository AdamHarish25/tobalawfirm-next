// src/components/WaButton.jsx (FINAL)
'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsAppButton = ({
  phoneNumber,
  message = "Halo, saya ingin bertanya sesuatu.",
  ariaLabel = 'Chat on WhatsApp',
}) => {
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanedPhoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="fixed bottom-5 right-5 z-50 group"
    >
      <div className="flex items-center justify-center bg-green-500 text-white rounded-full w-16 h-16 shadow-lg hover:bg-green-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out">
        <FaWhatsapp size={40}/>
      </div>
      <span className="absolute bottom-1/2 translate-y-1/2 right-full mr-4 px-3 py-2 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat di WhatsApp
      </span>
    </a>
  );
};

export default FloatingWhatsAppButton;