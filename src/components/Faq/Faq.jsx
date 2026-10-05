// src/components/Faq/Faq.jsx — accordion FAQ dengan aria yang benar
'use client';

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Faq = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {items.map((item, idx) => {
        const open = openIndex === idx;
        return (
          <div key={idx} className={`rounded-xl border transition-colors ${open ? 'border-gold/60 bg-white/5' : 'border-white/10 bg-white/[0.02] hover:border-white/25'}`}>
            <button
              onClick={() => setOpenIndex(open ? -1 : idx)}
              aria-expanded={open}
              aria-controls={`faq-panel-${idx}`}
              id={`faq-button-${idx}`}
              className="w-full flex items-center justify-between gap-4 text-left p-5 md:p-6"
            >
              <span className="text-white font-medium md:text-lg">{item.q}</span>
              <span className={`shrink-0 w-9 h-9 grid place-items-center rounded-full transition-all duration-300 ${open ? 'bg-gold text-black rotate-180' : 'bg-white/10 text-white'}`}>
                <FaChevronDown />
              </span>
            </button>
            <div
              id={`faq-panel-${idx}`}
              role="region"
              aria-labelledby={`faq-button-${idx}`}
              className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 md:px-6 pb-5 md:pb-6 text-white/70 leading-relaxed">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Faq;
