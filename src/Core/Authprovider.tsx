// src/Core/Authprovider.tsx (FINAL & LENGKAP)
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth'; // Import tipe 'User' dari Firebase
import { auth } from '@/firebase';

// Langkah 1: Definisikan tipe untuk nilai konteks
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

// Langkah 2: Buat konteks dengan tipe yang benar dan nilai default yang sesuai
const AuthContext = createContext<AuthContextType>({ 
  currentUser: null, 
  loading: true 
});

export function useAuth() {
  return useContext(AuthContext);
}

// Langkah 3: Definisikan tipe untuk props (children)
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Langkah 4: Beri tipe pada state currentUser
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user); // 'user' di sini sudah memiliki tipe User | null
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}