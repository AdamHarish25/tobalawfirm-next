// src/app/service/page.tsx (FINAL)

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import type { Metadata } from 'next';
import ServiceListView from '@/components/service/ListView'; // Import komponen client yang baru
import Navbar from '@/components/Navbar';

// Tipe data untuk layanan
interface Service {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
}

// Fungsi untuk fetch data awal di server
async function getInitialServices(): Promise<Service[]> {
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
    console.error("Error fetching initial services:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: 'Layanan Kami',
  description: 'Kami menyediakan berbagai layanan hukum untuk memenuhi kebutuhan Anda',
};

// Komponen Halaman Server (Async)
export default async function ServicePage() {
  const initialServices = await getInitialServices();

  return (
    <div className="bg-dark-white min-h-screen text-white">
      <header className="w-full bg-dark-gray pt-48 pb-24 text-center">
        <h1 className="text-3xl md:text-5xl font-medium font-Playfair_Display">
          Layanan Kami
        </h1>
      </header>
      <Navbar />

      {/* Halaman Server me-render Komponen Client dan memberikan data awal sebagai props */}
      <ServiceListView initialServices={initialServices} />
    </div>
  );
}