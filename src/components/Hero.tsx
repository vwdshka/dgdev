"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile, type UI } from "@/lib/content";
import { EASE } from "./Reveal";

const COMMAND = "whoami";

// Types the command once, like the terminal header on my GitHub profile.
function useTyped(text: string, skip: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (skip) return;
    const id = setInterval(() => setN((i) => (i >= text.length ? i : i + 1)), 90);
    return () => clearInterval(id);
  }, [text, skip]);
  return skip ? text.length : n;
}

// A line that prints in: clipped from below, settling 8px into place.
function Line({ children, i, className }: { children: React.ReactNode; i: number; className?: string }) {
  return (
    <motion.span
      className={`block ${className ?? ""}`}
      initial={{ clipPath: "inset(0 0 100% 0)", y: 8 }}
      animate={{ clipPath: "inset(0 0 -20% 0)", y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.75 + i * 0.09 }}
    >
      {children}
    </motion.span>
  );
}

export function Hero({ t, facts }: { t: UI["hero"]; facts: string[][] }) {
  const reduce = useReducedMotion() ?? false;
  const typed = useTyped(COMMAND, reduce);
  const done = typed >= COMMAND.length;
  const ref = useRef<HTMLElement>(null);

  function onPointerMove(e: React.PointerEvent) {
    const box = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--x", `${e.clientX - box.left}px`);
    ref.current!.style.setProperty("--y", `${e.clientY - box.top}px`);
  }

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative isolate overflow-hidden border-b border-line"
    >
      <div aria-hidden="true" className="dots absolute inset-0 -z-10" />
      <div aria-hidden="true" className="dots-lit absolute inset-0 -z-10" />
      <div aria-hidden="true" className="drift absolute -top-1/3 right-[-20%] -z-10 size-[70vmax]" />
      <div aria-hidden="true" className="drift-2 absolute -bottom-1/2 left-[-25%] -z-10 size-[60vmax]" />

      <div className="mx-auto grid max-w-5xl gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1fr_20rem] lg:items-end lg:pb-28 lg:pt-32">
        <div>
          <p className="font-mono text-sm text-muted">
            <span className="text-accent">~/kifissia</span> <span aria-hidden="true">$</span>{" "}
            <span className="text-ink">{COMMAND.slice(0, typed)}</span>
            {!done && <span className="caret ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent" />}
          </p>
          <motion.p
            className="mt-1 font-mono text-sm text-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: done ? 1 : 0 }}
            transition={{ duration: 0.2, delay: 0.15 }}
          >
            {t.output}
            {done && <span className="caret ml-1 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent" />}
          </motion.p>

          <h1 className="mt-10 text-[clamp(2.6rem,8.5vw,5.5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
            {profile.name.split(" ").map((word, i) => (
              <Line key={word} i={i}>
                {word}
              </Line>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.56, ease: EASE, delay: 1.1 }}
          >
            <p className="mt-8 max-w-xl text-lg leading-relaxed sm:text-xl">
              {t.lede}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex h-11 items-center gap-2 rounded-sm bg-accent px-6 font-semibold text-accent-ink no-underline transition duration-150 ease-out hover:brightness-110 active:scale-[0.97]"
              >
                {t.cta}
                <span aria-hidden="true">↓</span>
              </a>
              <a
                href={profile.github}
                className="inline-flex h-11 items-center rounded-sm border border-line px-5 font-mono text-sm no-underline transition-colors duration-150 hover:border-ink hover:bg-ink hover:text-bg"
              >
                github/{profile.githubUser}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.dl
          className="border-t-2 border-ink pt-4 font-mono text-[13px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.56, ease: EASE, delay: 1.3 }}
        >
          {facts.map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-2 py-1.5">
              <dt className="shrink-0 uppercase tracking-wide text-muted">{k}</dt>
              <span aria-hidden="true" className="leader" />
              <dd className="whitespace-nowrap text-right">{v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
