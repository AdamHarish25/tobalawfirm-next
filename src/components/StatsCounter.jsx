// src/components/StatsCounter.jsx — angka animasi count-up saat masuk viewport
'use client';

import { useEffect, useRef, useState } from 'react';

const useCountUp = (target, started, duration = 1500) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);
  return value;
};

const StatItem = ({ stat, started }) => {
  const value = useCountUp(stat.value, started);
  return (
    <div className="text-center space-y-1">
      <p className="text-3xl lg:text-4xl font-bold font-Playfair_Display text-gold">
        {value}{stat.suffix}
      </p>
      <p className="text-sm text-white/60">{stat.label}</p>
    </div>
  );
};

const StatsCounter = ({ stats }) => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
      {stats.map((stat, i) => (
        <StatItem key={i} stat={stat} started={started} />
      ))}
    </div>
  );
};

export default StatsCounter;
