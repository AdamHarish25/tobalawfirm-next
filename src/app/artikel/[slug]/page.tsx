import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/firebase';
import type { Metadata } from 'next';
import ArticleRealtimeView from './ArtikelView';

// Tipe data untuk artikel
interface Article {
    id: string;
    title: string;
    content: string;
    slug: string;
    authorName: string;
    createdAt: string;
    featuredImageUrl?: string;
}

// Fungsi getArticle untuk kebutuhan metadata (SEO)
async function getArticle(slug: string): Promise<Article | null> {
    const articlesRef = collection(db, 'articles');
    const q = query(articlesRef, where('slug', '==', slug), where('isPublished', '==', true), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const docData = querySnapshot.docs[0].data();
    return {
        id: querySnapshot.docs[0].id,
        title: docData.title,
        content: docData.content,
        slug: docData.slug,
        authorName: docData.authorName,
        createdAt: docData.createdAt.toDate().toISOString(),
        featuredImageUrl: docData.featuredImageUrl || undefined,
    } as Article;
}

// Metadata untuk SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);
    if (!article) return { title: 'Artikel Tidak Ditemukan' };
    return {
        title: article.title,
        description: article.content.replace(/<[^>]+>/g, '').substring(0, 155),
    };
}

// Komponen Server: hanya meneruskan slug ke komponen client
export default async function SingleArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <ArticleRealtimeView slug={slug} />;
}