import { motion } from 'framer-motion';

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="font-syne font-bold text-8xl text-accent-mint"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        SK
      </motion.h1>

      <div className="w-64 h-[2px] bg-surface mt-8 overflow-hidden rounded-full">
        <motion.div
          className="h-full bg-accent-mint"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          onAnimationComplete={onComplete}
        />
      </div>
    </motion.div>
  );
}
