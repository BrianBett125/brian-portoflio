"use client";

import { useEffect, useRef, useState } from "react";

export type Metric = {
  /** Final numeric value to count up to. */
  value: number;
  /** Rendered after the number, e.g. "+" or "%". */
  suffix?: string;
  label: string;
};

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Counter({ metric }: { metric: Metric }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced motion: snap straight to the final value, no animation.
    if (prefersReducedMotion()) {
      setDisplay(metric.value);
      return;
    }

    // Guard against environments without IntersectionObserver (older jsdom):
    // fall back to showing the final value immediately.
    if (typeof IntersectionObserver === "undefined") {
      setDisplay(metric.value);
      return;
    }

    const run = () => {
      if (started.current) return;
      started.current = true;

      const duration = 1100;
      let startTs = 0;
      let raf = 0;

      const tick = (ts: number) => {
        if (!startTs) startTs = ts;
        const progress = Math.min((ts - startTs) / duration, 1);
        // easeOutCubic for a snappy settle.
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(eased * metric.value));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [metric.value]);

  return (
    <div
      ref={ref}
      className="bento-card rounded-2xl p-5 text-center sm:p-6"
    >
      <p className="count-tabular text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {display}
        {metric.suffix ?? ""}
      </p>
      <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground-secondary sm:text-sm">
        {metric.label}
      </p>
    </div>
  );
}

export default function MetricsBand({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Counter key={metric.label} metric={metric} />
      ))}
    </div>
  );
}
