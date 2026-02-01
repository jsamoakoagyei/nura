import { motion } from "framer-motion";

interface PaginationDotsProps {
  total: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

export function PaginationDots({ total, activeIndex, onDotClick }: PaginationDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className="relative p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
          aria-label={`Go to stroller ${index + 1}`}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-muted-foreground/30"
            animate={{
              scale: activeIndex === index ? 1.3 : 1,
              backgroundColor: activeIndex === index 
                ? "hsl(202, 100%, 50%)" 
                : "hsl(202, 15%, 45%, 0.3)"
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          />
        </button>
      ))}
    </div>
  );
}
