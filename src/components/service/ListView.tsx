// src/components/service/ListView.tsx (FILE BARU)
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/firebase';

// Tipe data ini harus cocok dengan yang ada di page.tsx
interface Service {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
}

interface ServiceListViewProps {
    initialServices: Service[]; // Data awal dari server
}

export default function ServiceListView({ initialServices }: ServiceListViewProps) {
    // State untuk daftar layanan, diinisialisasi dengan data dari server
    const [services, setServices] = useState<Service[]>(initialServices);
    const [loading, setLoading] = useState(initialServices.length === 0); // Hanya loading jika data awal kosong

    // Efek untuk listener realtime onSnapshot
    useEffect(() => {
        const servicesRef = collection(db, "services");
        const q = query(
            servicesRef,
            where("isPublished", "==", true),
            orderBy("title", "asc")
        );

        // onSnapshot akan berjalan setiap kali ada perubahan di koleksi ini
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const servicesData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            } as Service));

            console.log("Daftar layanan di Firestore berubah, mengupdate halaman.");
            setServices(servicesData);
            if (loading) setLoading(false); // Matikan loading setelah data pertama diterima
        }, (error) => {
            console.error("Error listening to services collection:", error);
            setLoading(false);
        });

        // Fungsi cleanup: Hentikan listener saat komponen tidak lagi ditampilkan
        return () => unsubscribe();
    }, []); // Dependensi array kosong memastikan listener hanya dibuat sekali

    return (
        <div className="w-full md:container mx-auto px-4 lg:px-8 py-16 lg:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-start gap-x-8 gap-y-12">
                {loading ? (
                    <p className="col-span-full text-center text-gray-400">Loading services...</p>
                ) : services.length > 0 ? (
                    services.map((service, index) => (
                        <Link 
                            href={`/layanan/${service.slug}`} 
                            key={service.id} 
                            className="space-y-5 w-full h-full group bg-gray-600/50 hover:bg-gray-600 transition-colors duration-300 rounded-lg p-5 flex flex-col items-start text-start cursor-pointer"
                        >
                            <div className="p-5 w-fit grid place-items-center font-Playfair_Display font-bold rounded-tl-lg rounded-br-lg bg-yellow-500 text-black text-2xl relative">
                                <h1 className="absolute">{index + 1}</h1>
                            </div>
                            <h4 className="text-xl font-semibold font-Playfair_Display group-hover:text-yellow-500 transition-colors">
                                {service.title}
                            </h4>
                            {service.subtitle && <p className="text-lg text-white/60">{service.subtitle}</p>}
                        </Link>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-400">
                        Saat ini belum ada layanan yang dipublikasikan.
                    </p>
                )}
            </div>
        </div>
    );
}