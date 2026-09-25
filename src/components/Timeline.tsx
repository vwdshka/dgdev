"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import type { Entry, UI } from "@/lib/content";
import type { Localized } from "@/lib/i18n";
import { EASE } from "./motion";

const marker: Record<Entry["kind"], string> = {
  software: "bg-accent border-accent",
  education: "bg-ochre border-ochre",
  hospitality: "bg-olive border-olive",
  retail: "bg-brick border-brick",
};

export function Timeline({ entries, kinds }: { entries: Localized<Entry>[]; kinds: UI["kinds"] }) {
  const ref = useRef<HTMLOListElement>(null);
  // rail fills in as you scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-line md:left-[calc(13rem+5px)]" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-accent md:left-[calc(13rem+5px)]"
      />
      {entries.map((e, i) => (
        <motion.li
          key={`${e.org}-${e.when[0]}`}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.56, ease: EASE, delay: 0.05 * (i % 3) }}
          className="relative grid gap-1 pb-12 pl-8 last:pb-0 md:grid-cols-[13rem_1fr] md:gap-0 md:pl-0"
        >
          <span
            aria-hidden="true"
            className={`absolute left-0 top-1.5 size-[11px] border md:left-[13rem] ${marker[e.kind]}`}
          />
          <div className="font-mono text-[13px] md:pr-8 md:pt-0.5 md:text-right">
            {e.when.map((w) => (
              <div key={w}>{w}</div>
            ))}
            <div className="uppercase tracking-wide text-muted">{kinds[e.kind]}</div>
          </div>
          <div className="md:pl-10">
            <h3 className="text-lg font-bold leading-snug sm:text-xl">{e.title}</h3>
            <p className="mt-0.5 font-mono text-sm text-muted">
              {e.org}
              {e.place && ` · ${e.place}`}
            </p>
            <ul className="mt-3 max-w-[64ch] space-y-1.5 leading-relaxed">
              {e.points.map((pt) => (
                <li key={pt} className="relative pl-4 before:absolute before:left-0 before:text-muted before:content-['–']">
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
