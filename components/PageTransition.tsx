"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

/**
 * Wraps page content in a gentle enter transition that re-runs on every
 * route change (keyed by pathname), giving smooth cross-page motion.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
