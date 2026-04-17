"use client";

import { useEffect, useRef, useState } from "react";

type Props = { value: string };

function parse(raw: string) {
  const m = raw.match(/^(\d+)(.*)$/);
  return m ? { num: parseInt(m[1]!, 10), suffix: m[2] ?? "" } : { num: 0, suffix: raw };
}

export function AnimatedCounter({ value }: Props) {
  const { num, suffix } = parse(value);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setStarted(true);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 2400;
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * num));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, num]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
