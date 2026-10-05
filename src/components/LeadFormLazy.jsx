// src/components/LeadFormLazy.jsx — wrapper client agar LeadForm (firestore-heavy)
// bisa di-load malas dengan ssr:false. Diimpor statis dari Server Component.
'use client';

import dynamic from 'next/dynamic';

const LeadForm = dynamic(() => import('./LeadForm'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-4 animate-pulse" aria-label="Memuat form kontak">
      <div className="h-12 bg-gray-600/50 rounded-lg" />
      <div className="h-12 bg-gray-600/50 rounded-lg" />
      <div className="h-24 bg-gray-600/50 rounded-lg" />
      <div className="h-12 bg-gray-600/50 rounded-lg" />
    </div>
  ),
});

const LeadFormLazy = (props) => <LeadForm {...props} />;

export default LeadFormLazy;
