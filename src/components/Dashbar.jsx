// src/components/DashBar.jsx (FINAL)
'use client';

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DashBar = ({ onLogout }) => {
  const router = useRouter();

  return (
    <nav className="bg-gray-700 py-4" role="navigation" aria-label="main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => router.push('/')} className="block">
              <Image src="/images/Logo.jpg" width={80} height={80} className="rounded-md" alt="Toba Lawfirm Logo" />
            </button>
          </div>
          <div>
            <button onClick={onLogout} className="text-white border border-white font-bold py-2 px-4 rounded hover:text-gray-700 hover:bg-white transition-colors">
              Keluar akun
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashBar;