// SkeletonRow.tsx
import { motion } from "framer-motion";

export const SkeletonRow = () => (
  <motion.div
    layout
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 5 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="grid grid-cols-1 sm:grid-cols-[140px_1fr_90px_160px] px-6 py-4 border-b rounded-lg sm:rounded-none gap-2 sm:gap-0"
  >
    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse sm:h-6"></div>
    <div className="h-4 w-full max-w-xs bg-gray-200 rounded animate-pulse sm:h-6"></div>
    <div className="h-4 w-10 bg-gray-200 rounded animate-pulse sm:h-6"></div>
    <div className="flex gap-2">
      <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </motion.div>
);
