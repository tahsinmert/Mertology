"use client";

import { useEffect, useState } from "react";

interface ReadingProgressProps {
  /** Optional container to observe; defaults to window */
  targetId?: string;
}

export default function ReadingProgress({ targetId }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = targetId ? document.getElementById(targetId) : window;
    const isWindow = !targetId;

    const getValues = () => {
      if (isWindow) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        return { scrollTop, docHeight };
      }
      const el = target as HTMLElement | null;
      if (!el) return { scrollTop: 0, docHeight: 1 };
      return { scrollTop: el.scrollTop, docHeight: el.scrollHeight - el.clientHeight };
    };

    const handleScroll = () => {
      const { scrollTop, docHeight } = getValues();
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setProgress(pct);
    };

    handleScroll();

    if (isWindow) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }

    const el = target as HTMLElement | null;
    if (el) {
      el.addEventListener("scroll", handleScroll, { passive: true });
      const ro = new ResizeObserver(handleScroll);
      ro.observe(el);
      return () => {
        el.removeEventListener("scroll", handleScroll);
        ro.disconnect();
      };
    }
  }, [targetId]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full bg-zinc-900 dark:bg-zinc-100 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}


