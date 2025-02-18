import { motion } from 'framer-motion';

import type { Suggestion } from './data/suggestions';

interface SuggestionCardProps extends Suggestion {
  delay?: number;
  onSelect: (text: string) => void;
}

export function SuggestionCard({
  title,
  subtitle,
  delay = 0,
  icon,
  onSelect,
}: SuggestionCardProps) {
  const Icon = icon;

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(title)}
      className="flex flex-col gap-1.5 rounded-3xl bg-[#f6f0fa] p-3.5 text-left shadow-sm 
        shadow-black/40 transition-colors duration-200 hover:bg-[#fbf3ff]"
    >
      <motion.div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-600/60 bg-gray-700/90 shadow-sm">
        <Icon size={20} className="h-8 w-8 text-white" />
      </motion.div>
      <div className="text-smooth mt-4 text-lg font-bold text-gray-700">
        {title}
      </div>
      <div className="text-sm text-muted-foreground/80">{subtitle}</div>
    </motion.button>
  );
}
