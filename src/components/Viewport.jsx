// src/components/Viewport.jsx (FINAL - SSR SAFE)
'use client';

import { useEffect, useState } from "react";

const getInitialWindowSize = () => ({
  innerWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
  innerHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
});

export const useViewport = () => {
  const [windowSize, setWindowSize] = useState(getInitialWindowSize());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    function handleWindowResize() {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleWindowResize);
    
    // Panggil sekali untuk memastikan state terupdate setelah initial render
    handleWindowResize(); 

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return { windowSize };
};