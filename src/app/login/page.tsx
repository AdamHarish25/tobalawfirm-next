// src/app/login/page.tsx (FINAL)
'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import Head from "next/head";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <>
      <Head>
        <title>Login - Toba Lawfirm</title>
        <meta name="description" content="Login sebagai admin Toba Lawfirm." />
      </Head>
      <div className="min-h-screen bg-dark-white flex items-center justify-center">
        <Link href="/" className="absolute top-4 left-4 text-yellow-500 hover:text-yellow-400">
          &lt; Kembali ke Homepage
        </Link>
        <div className="bg-dark-gray p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-white text-center mb-6 font-Playfair_Display">
            Admin Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-yellow-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-400 transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}