// src/app/layanan/[slug]/ServiceView.tsx (FILE BARU)
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import ImageModal from '@/components/ImageModal';
import Navbar from '@/components/Navbar';

// Tipe data untuk props yang diterima dari halaman server
interface Service {
    id: string;
    title: string;
    content: string;
    slug: string;
    subtitle?: string;
    featuredImageUrl?: string;
}

interface ServiceViewProps {
    service: Service;
}

export default function ServiceView({ service }: ServiceViewProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const waMe = "https://wa.me/628111072535";

    return (
        <>
            <main className="bg-dark-white text-gray-300 font-Roboto">
                <header
                    className="h-[50vh] flex items-center justify-center text-center text-white bg-cover bg-center bg-black/50 bg-blend-darken pt-24"
                    style={{ backgroundImage: `url(${service.featuredImageUrl || '/images/backgroundService.jpg'})` }}
                >
                    <div className="md:container mx-auto px-4 lg:px-8">
                        <h1 className="text-4xl lg:text-5xl font-bold font-Playfair_Display leading-tight">{service.title}</h1>
                    </div>
                </header>
                <Navbar />

                <div className="md:container mx-auto px-4 lg:px-8 py-16 md:py-24">
                    <div className='max-w-4xl mx-auto mb-12'>
                        <div className="flex justify-center">
                            <article
                                className="prose prose-lg lg:prose-xl max-w-none prose-invert prose-headings:font-Playfair_Display"
                                dangerouslySetInnerHTML={{ __html: service.content }}
                            />
                        </div>
                        <div className="text-center my-16 px-5 lg:px-0">
                            <Link href="/contact" className="inline-block bg-yellow-500 text-black font-bold text-base lg:text-lg py-4 px-6 lg:px-8 rounded hover:bg-yellow-400 transition-colors">
                                Mulai Konsultasi dengan kami Gratis!
                            </Link>
                        </div>
                    </div>

                    <div className="mt-8 text-center space-y-5 grid grid-cols-1 place-items-center">
                        <h2 className="text-2xl font-bold">Mungkin Anda juga tertarik</h2>

                        <div className="relative group cursor-pointer" onClick={() => window.open(waMe, '_blank')}>
                            <Image src="/images/Poster2.png" alt="Poster Layanan" width={500} height={700} className="rounded-3xl border-2 border-yellow-500" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl">
                                <div className="text-center text-white p-4">
                                    <FaWhatsapp size={40} className="mx-auto mb-3 text-green-400" />
                                    <p className="font-semibold text-lg">Klik untuk Konsultasi via WhatsApp</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-yellow-500 text-black font-semibold py-4 px-8 rounded-lg shadow-lg text-lg hover:bg-yellow-400 transition-colors"
                        >
                            Lihat Gambar Selengkapnya
                        </button>
                    </div>
                </div>
            </main>
            {/* Komponen Modal untuk menampilkan gambar penuh */}
            <ImageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                imageUrl="/images/Poster2.png"
                altText="Poster Layanan Perceraian"
                urlTarget={waMe}
            />
        </>
    );
}