"use client";

import { motion } from "framer-motion";
import { EASE } from "./Reveal";

// Top-to-bottom flow: each row is one layer, data moves down. Works at any width, so phones
// don't get a squashed left-to-right chart.
export function Diagram({ rows }: { rows: string[][] }) {
  return (
    <ol className="flex flex-col items-center rounded-sm border border-line bg-raised px-4 py-8 sm:px-8">
      {rows.map((row, i) => (
        <li key={row.join()} className="flex w-full flex-col items-center">
          {i > 0 && (
            <span aria-hidden="true" className="flex flex-col items-center">
              <motion.span
                className="block h-7 w-px origin-top bg-accent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease: EASE, delay: i * 0.12 }}
              />
              <svg viewBox="0 0 10 6" className="-mt-px h-1.5 w-2.5 fill-accent">
                <path d="M0 0h10L5 6z" />
              </svg>
            </span>
          )}
          <motion.div
            className="mt-1 flex flex-wrap justify-center gap-2 first:mt-0"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: EASE, delay: i * 0.12 }}
          >
            {row.map((node) => (
              <span key={node} className="rounded-sm border border-line bg-bg px-3 py-2 text-center font-mono text-[13px] shadow-[0_1px_0_var(--line)]">
                {node}
              </span>
            ))}
          </motion.div>
        </li>
      ))}
    </ol>
  );
}
