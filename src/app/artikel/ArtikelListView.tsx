"use client";

import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Article {
  id: string;
  title: string;
  slug: string;
  createdAt: { seconds: number; nanoseconds: number };
  featuredImageUrl?: string;
}

export default function ArtikelListRealtimeView() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const articlesRef = collection(db, "articles");
    const q = query(
      articlesRef,
      where("isPublished", "==", true),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const data: Article[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Article[];
        setArticles(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-dark-white min-h-screen text-white">
      <header className="w-full bg-dark-gray pt-48 pb-24 text-center">
        <h1 className="text-3xl md:text-5xl font-medium font-Playfair_Display">
          Artikel & Wawasan
        </h1>
      </header>
      <Navbar />

      <div className="md:container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        {loading ? (
          <p className="text-center text-gray-400">Memuat artikel...</p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-400">
            Belum ada artikel yang dipublikasikan.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                href={`/artikel/${article.slug}`}
                key={article.id}
                className="block bg-dark-gray rounded-lg shadow-lg overflow-hidden group hover:shadow-yellow-500/20 transition-shadow duration-300"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      article.featuredImageUrl ||
                      "https://via.placeholder.com/400"
                    })`,
                  }}
                ></div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold font-Playfair_Display text-white mb-2 group-hover:text-yellow-500 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {article.createdAt &&
                      new Date(article.createdAt.seconds * 1000).toLocaleDateString(
                        "id-ID",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
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