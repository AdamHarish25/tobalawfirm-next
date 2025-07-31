// src/app/register/page.tsx (FINAL)
'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import Head from 'next/head';

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register - Toba Lawfirm</title>
        <meta name="description" content="Daftar sebagai admin Toba Lawfirm untuk mengelola konten dan layanan." />
      </Head>
      <div className="min-h-screen bg-dark-white flex items-center justify-center">
        <Link href="/" className="absolute top-4 left-4 text-yellow-500 hover:text-yellow-400">
          &lt; Kembali ke Homepage
        </Link>
        <Link href="/login" className="absolute top-4 right-4 text-yellow-500 hover:text-yellow-400">
          Login Admin &gt;
        </Link>
        <div className="bg-dark-gray p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-white text-center mb-6 font-Playfair_Display">
            Register Admin
          </h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600" required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600" required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-400 disabled:bg-gray-500">
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}