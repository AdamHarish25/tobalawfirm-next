// src/app/service/page.tsx (FINAL DENGAN LAYOUT KONSISTEN)

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

interface Service {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
}

async function getServices(): Promise<Service[]> {
  try {
    const servicesRef = collection(db, "services");
    const q = query(servicesRef, where("isPublished", "==", true), orderBy("title", "asc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      slug: doc.data().slug,
      subtitle: doc.data().subtitle,
    }));
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Layanan Kami',
  description: 'Kami menyediakan berbagai layanan hukum untuk memenuhi kebutuhan Anda',
};

export default async function ServicePage() {
  const services = await getServices();

  return (
    <div className="bg-dark-white min-h-screen text-white">
      <header className="w-full bg-dark-gray pt-48 pb-24 text-center">
        <h1 className="text-3xl md:text-5xl font-medium font-Playfair_Display">
          Layanan Kami
        </h1>
      </header>
      <Navbar/>
      
      <div className="w-full md:container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-start gap-x-8 gap-y-12">
            {services.length > 0 ? (
            services.map((service, index) => (
                <Link href={`/layanan/${service.slug}`} key={service.id} className="space-y-5 w-full h-full group bg-gray-600/50 hover:bg-gray-600 transition-colors duration-300 rounded-lg p-5 flex flex-col items-start text-start cursor-pointer">
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
    </div>
  );
}