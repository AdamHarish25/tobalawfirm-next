// src/app/artikel/page.tsx (FINAL DENGAN LAYOUT KONSISTEN)

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

interface Article {
  id: string;
  title: string;
  slug: string;
  createdAt: { seconds: number; nanoseconds: number; };
  featuredImageUrl?: string;
}

async function getArticles(): Promise<Article[]> {
    try {
        const articlesRef = collection(db, 'articles');
        const q = query(articlesRef, where('isPublished', '==', true), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
}

export const metadata: Metadata = {
    title: 'Artikel',
    description: 'Baca artikel dan wawasan hukum terbaru dari Toba Lawfirm.',
}

export default async function ArticleListPage() {
    const articles = await getArticles();

    return (
        <div className="bg-dark-white min-h-screen text-white">
            <header className="w-full bg-dark-gray pt-48 pb-24 text-center">
                <h1 className="text-3xl md:text-5xl font-medium font-Playfair_Display">Artikel & Wawasan</h1>
            </header>
            <Navbar/>
            
            <div className="md:container mx-auto px-4 lg:px-8 py-16 lg:py-24">
                {articles.length === 0 ? (
                    <p className="text-center text-gray-400">Belum ada artikel yang dipublikasikan.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <Link href={`/artikel/${article.slug}`} key={article.id} className="block bg-dark-gray rounded-lg shadow-lg overflow-hidden group hover:shadow-yellow-500/20 transition-shadow duration-300">
                                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${article.featuredImageUrl || 'https://via.placeholder.com/400'})` }}></div>
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold font-Playfair_Display text-white mb-2 group-hover:text-yellow-500 transition-colors">{article.title}</h2>
                                    <p className="text-sm text-gray-400">
                                        {new Date(article.createdAt.seconds * 1000).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}