// src/components/Tabs/Tabs.jsx (PHASE 3 - tablist a11y + harga + CTA per tab)
'use client';

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const Tabs = ({ tabs }) => {
  const [activeId, setActiveId] = useState(String(tabs[0]?.id ?? "1"));
  const tabRefs = useRef({});

  const className = {
    container: "m-0 md:w-full mx-auto md:container",
    tabs: "flex justify-between items-center gap-2 overflow-x-auto",
    tabButton: "w-full whitespace-nowrap py-4 px-2 border-b border-b-white/40 text-white/60 hover:text-white hover:border-b-white aria-selected:border-b-white aria-selected:text-white transition-colors duration-200",
    title: "font-semibold font-Playfair_Display mb-5 text-2xl text-white",
    content: "py-12 font-light text-lg text-justify text-white/80",
    gridBox: "grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center",
    imgContainer: "relative w-full h-auto aspect-video",
    img: "grayscale rounded object-cover",
    price: "inline-block mt-6 text-gold font-semibold font-Roboto text-lg",
  };

  const focusTab = (id) => {
    tabRefs.current[id]?.focus();
  };

  const handleKeyDown = (e, id) => {
    const ids = tabs.map((t) => String(t.id));
    const i = ids.indexOf(String(id));
    if (e.key === "ArrowRight") {
      const next = ids[(i + 1) % ids.length];
      setActiveId(next);
      focusTab(next);
    } else if (e.key === "ArrowLeft") {
      const prev = ids[(i - 1 + ids.length) % ids.length];
      setActiveId(prev);
      focusTab(prev);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveId(ids[0]);
      focusTab(ids[0]);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveId(ids[ids.length - 1]);
      focusTab(ids[ids.length - 1]);
    }
  };

  return (
    <div className={className.container}>
      <div className={className.tabs} role="tablist" aria-label="Jenis layanan klien">
        {tabs.map((tab) => {
          const id = String(tab.id);
          const selected = activeId === id;
          return (
            <button
              key={id}
              ref={(el) => { tabRefs.current[id] = el; }}
              role="tab"
              id={`tab-${id}`}
              aria-selected={selected}
              aria-controls={`panel-${id}`}
              tabIndex={selected ? 0 : -1}
              className={className.tabButton}
              onClick={() => setActiveId(id)}
              onKeyDown={(e) => handleKeyDown(e, id)}
            >
              {tab.tabTitle}
            </button>
          );
        })}
      </div>
      <div className={className.content}>
        {tabs.map((tab) => {
          const id = String(tab.id);
          if (activeId !== id) return null;
          return (
            <div
              key={id}
              role="tabpanel"
              id={`panel-${id}`}
              aria-labelledby={`tab-${id}`}
              tabIndex={0}
              className={className.gridBox}
            >
              <div>
                <p className={className.title}>{tab.title}</p>
                <p>{tab.content}</p>
                {tab.price && <p className={className.price}>{tab.price}</p>}
                {tab.cta && (
                  <div className="mt-4">
                    {tab.cta.external ? (
                      <a href={tab.cta.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-gold text-black font-semibold text-base py-3 px-6 rounded hover:bg-gold-soft transition-colors">
                        {tab.cta.title}
                      </a>
                    ) : (
                      <Link href={tab.cta.link} className="inline-block bg-gold text-black font-semibold text-base py-3 px-6 rounded hover:bg-gold-soft transition-colors">
                        {tab.cta.title}
                      </Link>
                    )}
                  </div>
                )}
              </div>
              <div className={className.imgContainer}>
                <Image
                  src={tab.img}
                  alt={tab.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={className.img}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
