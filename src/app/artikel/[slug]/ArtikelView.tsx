"use client";

import { useEffect, useState } from "react";
import { collection, query, where, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

interface Article {
  id: string;
  title: string;
  content: string;
  slug: string;
  authorName: string;
  createdAt: string;
  featuredImageUrl?: string;
}

export default function ArticleRealtimeView({ slug }: { slug: string }) {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "articles"),
      where("slug", "==", slug),
      where("isPublished", "==", true),
      limit(1)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        setArticle(null);
      } else {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        setArticle({
          id: doc.id,
          title: data.title,
          content: data.content,
          slug: data.slug,
          authorName: data.authorName,
          createdAt: data.createdAt.toDate().toISOString(),
          featuredImageUrl: data.featuredImageUrl || undefined,
        });
      }
    });
    return () => unsubscribe();
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-dark-white flex flex-col items-center justify-center text-white p-8 text-center pt-24">
        <h1 className="text-3xl font-Playfair_Display text-red-500 mb-4">Artikel Tidak Ditemukan</h1>
        <p className="text-gray-400 mb-8">Artikel yang Anda cari mungkin telah dihapus atau belum dipublikasikan.</p>
        <Link href="/artikel" className="text-yellow-500 hover:underline">← Kembali ke daftar artikel</Link>
      </div>
    );
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const shareUrl = `https://www.tobalawfirm.my.id/artikel/${article.slug}`;

  return (
    <main className="bg-dark-white text-gray-300 font-Roboto pt-24">
      <Navbar />
      <div className="md:container mx-auto px-4 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold font-Playfair_Display text-white leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-gray-400">
              Oleh {article.authorName} • Dipublikasikan pada {formattedDate}
            </p>
          </header>
          {article.featuredImageUrl && (
            <figure className="mb-12 rounded-lg overflow-hidden shadow-2xl">
              <div className="relative w-full aspect-video md:aspect-[21/9] max-h-[450px]">
                <Image
                  src={article.featuredImageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            </figure>
          )}
          <div className="flex justify-center">
            <article
              className="prose prose-lg lg:prose-xl prose-invert max-w-none prose-headings:font-Playfair_Display"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
        <div className="text-center mt-16">
          <Link
            href="/contact"
            className="inline-block bg-yellow-500 text-black font-bold text-lg py-4 px-8 rounded hover:bg-yellow-400 transition-colors"
          >
            Mulai Konsultasi Gratis
          </Link>
        </div>
        <hr className="border-gray-700 my-12" />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <h3 className="text-white font-semibold font-Poppins">Bagikan artikel ini:</h3>
          <div className="flex items-center gap-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${article.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${article.title} ${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500"
            >
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}