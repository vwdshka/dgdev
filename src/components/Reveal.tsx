"use client";

import { MotionConfig, motion } from "framer-motion";
import { ViewTransition } from "react";

// The same entrance everywhere: a short settle upwards on ixnos-data's print-in curve.
export const EASE = [0.16, 1, 0.3, 1] as const;

export function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const slide = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" };

/** Wraps a page's content so it slides with the direction of navigation (see globals.css). */
export function PageSlide({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter={slide} exit={slide} default="none">
      {children}
    </ViewTransition>
  );
}

/** Marks an element that morphs into its twin with the same name on the next page. */
export function Morph({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.56, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
