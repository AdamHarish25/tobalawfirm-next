// src/app/contact/page.tsx (FINAL)
'use client';

import React from 'react';
import Head from 'next/head';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '@/components/Navbar';

const ContactCard = ({ icon, title, text, link, buttonText }: { icon: React.ReactNode, title: string, text: string, link: string, buttonText: string }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-8 bg-dark-gray rounded-lg shadow-lg hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300"
  >
    <div className="flex items-center text-yellow-500 mb-4">
      <div className="p-3 bg-yellow-500/10 rounded-full mr-4">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold font-Playfair_Display text-white">{title}</h3>
    </div>
    <p className="text-gray-400 mb-4">{text}</p>
    <span className="font-semibold text-yellow-500">{buttonText} →</span>
  </a>
);

export default function ContactPage() {
  const address = "Madison Square SHC 2/51 kota wisata, Gn. putri, Bogor, Jawa Barat 16720";
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d247.8331064186213!2d106.96137559664943!3d-6.351343323943316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1751106576584!5m2!1sen!2sid`;
  const waMe = "https://wa.me/628111072535";

  return (
    <>
      <Head>
        <title>Kontak Kami - Toba Lawfirm</title>
        <meta name="description" content="Hubungi Toba Lawfirm untuk konsultasi hukum profesional." />
      </Head>
      <Navbar />

      <div className="bg-dark-white min-h-screen text-white font-Roboto">
        <header className="w-full text-center py-36 bg-dark-gray">
          <h1 className="text-3xl md:text-4xl font-bold font-Playfair_Display">Kontak Kami</h1>
          <p className="text-lg text-gray-400 mt-4">Kami disini untuk membantu Anda. Hubungi kami kapan saja, tanpa biaya.</p>
        </header>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <ContactCard
                icon={<FaWhatsapp size={24} />}
                title="Hubungi Kami via WhatsApp"
                text="Dapatkan respons cepat untuk pertanyaan Anda. Kami tersedia selama jam kerja."
                link={waMe}
                buttonText="Chat Sekarang"
              />
              {/* <ContactCard
                icon={<FaEnvelope size={24} />}
                title="Kirim Email kepada Kami"
                text="Untuk pertanyaan mendetail, dokumen hukum, atau komunikasi formal."
                link="mailto:tobalawfirm01@tobalaw.my.id"
                buttonText="Email Kami"
              /> */}
            </div>
            <div className="bg-dark-gray p-8 rounded-lg shadow-lg">
              <div className="flex items-start text-yellow-500 mb-4">
                <div className="p-3 bg-yellow-500/10 rounded-full mr-4">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold font-Playfair_Display text-white">Kunjungi Kantor Kami</h3>
                  <p className="text-gray-400 mt-2">{address}</p>
                </div>
              </div>
              <div className="mt-6 rounded-lg overflow-hidden">
                <iframe
                  src={mapEmbedUrl}
                  className="w-full h-80 border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}