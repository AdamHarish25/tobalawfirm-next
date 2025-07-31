// src/app/layanan/[slug]/page.tsx (FINAL & BENAR)

import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/firebase';
import Link from 'next/link';
import type { Metadata } from 'next';
import ServiceView from './ServiceView'; // Import komponen client yang baru

interface PageProps {
  params: { slug: string };
}

interface Service {
  id: string;
  title: string;
  content: string;
  slug: string;
  subtitle?: string;
  featuredImageUrl?: string;
}

// Fungsi getService SEKARANG HANYA MENERIMA STRING
async function getService(slug: string): Promise<Service | null> {
  const servicesRef = collection(db, 'services');
  const q = query(servicesRef, where('slug', '==', slug), where('isPublished', '==', true), limit(1));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;

  const docData = querySnapshot.docs[0].data();
  return {
    id: querySnapshot.docs[0].id,
    title: docData.title,
    content: docData.content,
    slug: docData.slug,
    subtitle: docData.subtitle,
    featuredImageUrl: docData.featuredImageUrl
  } as Service;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) {
    return { title: 'Layanan Tidak Ditemukan' };
  }
  return {
    title: service.title,
    description: service.subtitle || service.content.replace(/<[^>]+>/g, '').substring(0, 155),
  };
}

// Komponen Halaman Server (Async)
export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return (
      <div className="min-h-screen pt-24 bg-dark-white flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-3xl font-Playfair_Display text-red-500">Layanan Tidak Ditemukan</h1>
        <Link href="/service" className="mt-4 text-yellow-500 hover:underline">← Kembali ke daftar layanan</Link>
      </div>
    );
  }

  // Halaman Server me-render Komponen Client dan memberikan data sebagai props
  return <ServiceView service={service} />;
}