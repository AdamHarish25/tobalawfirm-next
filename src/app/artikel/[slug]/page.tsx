// src/app/artikel/[slug]/page.tsx (FINAL & LENGKAP)

import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/firebase';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Image from 'next/image';
import Navbar from '@/components/Navbar';

// Tipe data untuk artikel
interface Article {
    id: string;
    title: string;
    content: string;
    slug: string;
    authorName: string;
    isPublished: boolean;
    createdAt: string; // ISO string
    featuredImageUrl?: string;
}

// Fungsi untuk generate metadata dinamis untuk SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const article = await getArticle(params.slug);
    if (!article) {
        return { title: 'Artikel Tidak Ditemukan' };
    }
    return {
        title: article.title,
        description: article.content.replace(/<[^>]+>/g, '').substring(0, 155), // Ambil teks dari HTML untuk deskripsi
    };
}

// Fungsi untuk mengambil data artikel di server
async function getArticle(slug: string): Promise<Article | null> {
    const articlesRef = collection(db, 'articles');
    const q = query(
        articlesRef,
        where('slug', '==', slug),
        where('isPublished', '==', true),
        limit(1)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return null;
    }

    const docData = querySnapshot.docs[0].data();
    return {
        id: querySnapshot.docs[0].id,
        title: docData.title,
        content: docData.content,
        slug: docData.slug,
        authorName: docData.authorName,
        isPublished: docData.isPublished,
        createdAt: docData.createdAt.toDate().toISOString(),
        featuredImageUrl: docData.featuredImageUrl || undefined,
    } as Article;
}

// Komponen Halaman Server (Async)
export default async function SingleArticlePage({ params }: { params: { slug: string } }) {
    const article = await getArticle(params.slug);

    if (!article) {
        return (
            <div className="min-h-screen bg-dark-white flex flex-col items-center justify-center text-white p-8 text-center pt-24">
                <h1 className="text-3xl font-Playfair_Display text-red-500 mb-4">Artikel Tidak Ditemukan</h1>
                <p className="text-gray-400 mb-8">Artikel yang Anda cari mungkin telah dihapus atau belum dipublikasikan.</p>
                <Link href="/artikel" className="text-yellow-500 hover:underline">
                    ← Kembali ke daftar artikel
                </Link>
            </div>
        );
    }

    const formattedDate = new Date(article.createdAt).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
    });

    const shareUrl = `https://www.tobalawfirm.com/artikel/${article.slug}`; // Ganti dengan domain Anda nanti

    return (
        <main className="bg-dark-white text-gray-300 font-Roboto pt-24">
            <Navbar />
            <div className="md:container mx-auto px-4 lg:px-8 py-16 md:py-24">


                <div className='max-w-5xl mx-auto lg:px-4'>
                    <header className="text-start md:text-center mb-12">
                        <h1 className="text-2xl lg:text-4xl font-bold font-Playfair_Display text-white leading-tight mb-4">
                            {article.title}
                        </h1>
                        <p className="text-gray-400">
                            Oleh {article.authorName} • Dipublikasikan pada {formattedDate}
                        </p>
                    </header>
                    {article.featuredImageUrl && (
                        <figure className="mb-12 rounded-lg overflow-hidden shadow-2xl">
                            <Image
                                src={article.featuredImageUrl}
                                alt={article.title}
                                width={1200}
                                height={600}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </figure>
                    )}

                    {/* === PERBAIKAN LAYOUT DI SINI === */}
                    {/* Div ini akan memusatkan blok 'prose' di dalamnya */}
                    <div className="flex justify-center">
                        <article
                            className="prose prose-lg max-w-4xl lg:text-justify lg:prose-xl prose-invert prose-headings:font-Playfair_Display"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </div>
                </div>
                {/* === AKHIR PERBAIKAN === */}

                <div className="text-center my-16">
                    <Link href="/contact" className="inline-block bg-yellow-500 text-black font-bold text-lg py-4 px-8 rounded hover:bg-yellow-400 transition-colors">
                        Mulai Konsultasi Gratis
                    </Link>
                </div>

                <hr className="border-gray-700 my-12" />

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                    <h3 className="text-white font-semibold font-Poppins">Bagikan artikel ini:</h3>
                    <div className="flex items-center gap-4">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors"><FaFacebook size={24} /></a>
                        <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.title}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors"><FaTwitter size={24} /></a>
                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${article.title}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors"><FaLinkedin size={24} /></a>
                        <a href={`https://api.whatsapp.com/send?text=${article.title} ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors"><FaWhatsapp size={24} /></a>
                    </div>
                </div>
            </div>
        </main>
    );
}