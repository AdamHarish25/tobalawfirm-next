// src/app/admin/layout.tsx (FINAL - Protected Route Layout)
'use client';

import { useAuth } from '@/Core/Authprovider'; // Path sudah benar
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen bg-dark-gray flex items-center justify-center text-white">
        <p>Loading & Verifying Access...</p>
      </div>
    );
  }

  return <>{children}</>;
}