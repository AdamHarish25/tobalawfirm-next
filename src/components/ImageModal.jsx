// src/components/ImageModal.jsx (FINAL)
'use client';

import React, { useEffect } from "react";
import { FaTimes, FaWhatsapp } from "react-icons/fa";
import Link from "next/link"; // Menggunakan Link dari Next.js

const ImageModal = ({ isOpen, onClose, imageUrl, altText, urlTarget }) => {
  if (!isOpen) {
    return null;
  }

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-dark-gray p-4 rounded-lg shadow-2xl max-w-4xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white text-black rounded-full p-2 hover:scale-110 transition-transform"
          aria-label="Close image viewer"
        >
          <FaTimes />
        </button>
        <div className="relative group">
          <Link href={urlTarget} target="_blank" rel="noopener noreferrer">
            <img
              src={imageUrl}
              alt={altText || "Service Detail Image"}
              className="w-full h-full object-contain max-h-[calc(90vh-2rem)]"
            />
          </Link>
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          >
            <div className="text-center text-white p-6 bg-dark-gray rounded-lg shadow-lg">
              <FaWhatsapp size={40} className="mx-auto mb-3 text-green-400" />
              <p className="font-semibold text-lg">Klik untuk Konsultasi via WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;