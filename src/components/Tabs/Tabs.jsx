// src/components/Tabs/Tabs.jsx (FINAL)
'use client';

import { useState } from "react";
import Image from "next/image";

const Tabs = ({ tabs }) => {
  const [currentTab, setCurrentTab] = useState("1");

  const className = {
    container: "m-0 md:w-full mx-auto md:container",
    tabs: "flex justify-between items-center",
    tabButton: "w-full py-4 border-b border-b-white/40 text-white/60 hover:text-white hover:border-b-white disabled:border-b-white disabled:text-white transition-colors duration-200",
    title: "font-semibold font-Playfair_Display mb-5 text-2xl text-white",
    content: "py-12 font-light text-lg text-justify text-white/80",
    gridBox: "grid grid-cols-1 md:grid-cols-2 gap-20 items-center",
    imgContainer: "relative w-full h-auto aspect-video",
    img: "grayscale rounded object-cover",
  };

  const handleTabClick = (e) => {
    setCurrentTab(e.currentTarget.id);
  };

  return (
    <div className={className.container}>
      <div className={className.tabs}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            id={String(tab.id)}
            className={className.tabButton}
            disabled={currentTab === String(tab.id)}
            onClick={handleTabClick}
          >
            {tab.tabTitle}
          </button>
        ))}
      </div>
      <div className={className.content}>
        {tabs.map((tab, i) => (
          <div key={i}>
            {currentTab === String(tab.id) && (
              <div className={className.gridBox}>
                <div>
                  <p className={className.title}>{tab.title}</p>
                  <p>{tab.content}</p>
                </div>
                <div className={className.imgContainer}>
                  <Image 
                    src={tab.img} 
                    alt={tab.title} 
                    layout="fill"
                    className={className.img}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;