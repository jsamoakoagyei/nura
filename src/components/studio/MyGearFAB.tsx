import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MyGearFABProps {
  count: number;
  onClick: () => void;
}

export function MyGearFAB({ count, onClick }: MyGearFABProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Button
        onClick={onClick}
        size="lg"
        className="relative h-14 w-14 rounded-full shadow-xl hover:shadow-2xl bg-primary hover:bg-sage-600 transition-all"
        aria-label={`My gear list (${count} items)`}
      >
        <Heart className="w-6 h-6 fill-primary-foreground" />
        
        {/* Count badge */}
        <AnimatePresence>
          {count > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
              className="absolute -top-1 -right-1 min-w-[22px] h-[22px] bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md px-1"
            >
              {count > 9 ? "9+" : count}
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}
