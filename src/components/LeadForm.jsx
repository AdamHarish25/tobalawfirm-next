// src/components/LeadForm.jsx — form mini: simpan ke Firestore (best-effort) lalu lanjut ke WA.
// Jika rules Firestore belum mengizinkan `leads` create, form tetap jalan via fallback WA.
'use client';

import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { toast } from 'sonner';

const WA_NUMBER = '6281118414832';

const LeadForm = ({ source = 'homepage' }) => {
  const [nama, setNama] = useState('');
  const [noWa, setNoWa] = useState('');
  const [kebutuhan, setKebutuhan] = useState('');
  const [sending, setSending] = useState(false);

  const toWaUrl = () => {
    const text = `Halo Toba Law Firm, saya ${nama || '(nama)'}. No WA saya ${noWa || '(nomor)'}. Kebutuhan: ${kebutuhan || '(belum diisi)'}. Mohon info konsultasi gratis.`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama.trim() || !kebutuhan.trim()) {
      toast.error('Mohon isi nama dan kebutuhan Anda.');
      return;
    }
    setSending(true);
    try {
      await addDoc(collection(db, 'leads'), {
        nama: nama.trim(),
        noWa: noWa.trim(),
        kebutuhan: kebutuhan.trim(),
        source,
        createdAt: serverTimestamp(),
      });
      toast.success('Terkirim! Melanjutkan ke WhatsApp...');
    } catch (err) {
      console.error('Lead save failed, fallback to WA:', err);
      toast.success('Melanjutkan ke WhatsApp...');
    } finally {
      setSending(false);
      window.open(toWaUrl(), '_blank', 'noopener,noreferrer');
    }
  };

  const inputCls = "w-full p-3 md:p-4 bg-dark-white text-white rounded-lg border border-white/15 focus:outline-none focus:border-gold placeholder:text-white/30";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto text-left space-y-4 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
      <div>
        <label htmlFor="lead-nama" className="block text-sm text-white/70 mb-2">Nama Anda</label>
        <input id="lead-nama" type="text" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="cth: Budi Santoso" className={inputCls} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="lead-wa" className="block text-sm text-white/70 mb-2">No. WhatsApp</label>
        <input id="lead-wa" type="tel" value={noWa} onChange={(e) => setNoWa(e.target.value)} placeholder="cth: 0812xxxxxxx" className={inputCls} autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="lead-need" className="block text-sm text-white/70 mb-2">Kebutuhan hukum Anda</label>
        <textarea id="lead-need" value={kebutuhan} onChange={(e) => setKebutuhan(e.target.value)} placeholder="cth: Sengketa kontrak dengan vendor..." rows={3} className={inputCls} />
      </div>
      <button type="submit" disabled={sending} className="w-full bg-gold text-black font-bold text-base py-4 rounded-lg hover:bg-gold-soft disabled:bg-gray-500 transition-colors">
        {sending ? 'Mengirim...' : 'Kirim & Lanjut ke WhatsApp →'}
      </button>
      <p className="text-xs text-white/40 text-center">Data Anda rahasia dan dilindungi kode etik advokat.</p>
    </form>
  );
};

export default LeadForm;
