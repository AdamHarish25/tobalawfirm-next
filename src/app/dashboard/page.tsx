// src/app/dashboard/page.tsx (FINAL & LENGKAP)
'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth, db } from "@/firebase";
import AdminArticleList from "@/components/admin/AdminArticleList";
import AdminServiceList from "@/components/admin/AdminServiceList";
import { collection, deleteDoc, doc, DocumentData, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { useAuth } from "@/Core/Authprovider";
import Head from "next/head";

export default function DashboardPage() {
  const router = useRouter();
  const { currentUser, loading: authLoading } = useAuth();

  const [articles, setArticles] = useState<DocumentData[]>([]); // Ganti any[]
  const [services, setServices] = useState<DocumentData[]>([]); // Ganti any[]
  const [loadingData, setLoadingData] = useState(true);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const articlesRef = collection(db, "articles");
      const servicesRef = collection(db, "services");
      const qArticles = query(articlesRef, orderBy("createdAt", "desc"));
      const qServices = query(servicesRef, orderBy("createdAt", "desc"));
      
      const [articlesSnapshot, servicesSnapshot] = await Promise.all([
        getDocs(qArticles),
        getDocs(qServices),
      ]);

      const articlesData = articlesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const servicesData = servicesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setArticles(articlesData);
      setServices(servicesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data.");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/login');
    } else if (currentUser) {
      fetchData();
    }
  }, [currentUser, authLoading, router]);

  const handleEdit = (id: string) => router.push(`/admin/edit-article/${id}`);
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure? This action cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "articles", id));
        toast.success("Article deleted successfully!");
        fetchData();
      } catch (error) { console.error("Failed to delete article:", error); toast.error("Failed to delete article."); }
    }
  };
  const handleTogglePublish = async (id: string, newStatus: boolean) => {
    try {
      await updateDoc(doc(db, "articles", id), { isPublished: newStatus });
      toast.success(`Article status updated to ${newStatus ? "Published" : "Draft"}.`);
      fetchData();
    } catch (error) { console.error("Failed to update status:", error); toast.error("Failed to update status."); }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) { console.error("Error logging out:", error); }
  };
  const handleEditService = (id: string) => router.push(`/admin/edit-service/${id}`);
  const handleDeleteService = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      await deleteDoc(doc(db, "services", id));
      toast.success("Service deleted successfully.");
      fetchData();
    }
  };
  const handleToggleServicePublish = async (id: string, newStatus: boolean) => {
    await updateDoc(doc(db, "services", id), { isPublished: newStatus });
    toast.success(`Service status updated to ${newStatus ? "Published" : "Draft"}.`);
    fetchData();
  };

  if (authLoading || !currentUser) {
    return <div className="min-h-screen flex justify-center items-center bg-dark-gray text-white">Verifying Access...</div>;
  }

  return (
    <>
      <Head>
        <title>Dashboard - Toba Lawfirm</title>
      </Head>
      <div className="min-h-screen bg-dark-gray text-white p-8">
        <div className="max-w-4xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold font-Playfair_Display">TobaLaw Dashboard</h1>
            <button onClick={handleLogout} className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-500 transition-colors">
              Logout
            </button>
          </header>
          <section>
            <p className="mb-4">Welcome, <span className="font-bold text-yellow-500">{currentUser.email}</span>!</p>
            <div className="bg-dark-white p-6 rounded-lg flex gap-4">
              <Link href="/admin/create-article" className="inline-block bg-yellow-500 text-black font-bold py-3 px-6 rounded hover:bg-yellow-400">
                + Create New Article
              </Link>
              <Link href="/admin/create-service" className="inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded hover:bg-blue-400">
                + Create New Service
              </Link>
            </div>
            <AdminArticleList articles={articles} loading={loadingData} onEdit={handleEdit} onDelete={handleDelete} onTogglePublish={handleTogglePublish} />
            <AdminServiceList services={services} loading={loadingData} onEdit={handleEditService} onDelete={handleDeleteService} onTogglePublish={handleToggleServicePublish} />
          </section>
        </div>
      </div>
    </>
  );
}