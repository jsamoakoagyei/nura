import { motion, AnimatePresence } from "framer-motion";
import { Stroller } from "@/data/strollers";
import { Ruler, Scale, Baby } from "lucide-react";

interface HighlightPanelProps {
  stroller: Stroller;
}

export function HighlightPanel({ stroller }: HighlightPanelProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stroller.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 22,
          mass: 0.8
        }}
        className="w-[90%] lg:w-[70%] max-w-2xl mx-auto"
      >
        <div className="bg-white/55 backdrop-blur-xl border border-white/25 rounded-[20px] shadow-lg p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-5">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-1">
              {stroller.brand}
            </p>
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">
              {stroller.name}
            </h2>
          </div>

          {/* Highlights */}
          <div className="space-y-2 mb-6">
            {stroller.highlights.map((highlight, index) => (
              <motion.div
                key={highlight}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-sm lg:text-base">{highlight}</span>
              </motion.div>
            ))}
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-4 pt-5 border-t border-border/50">
            <div className="text-center">
              <Scale className="w-4 h-4 mx-auto mb-1.5 text-primary" />
              <p className="text-xs text-muted-foreground mb-0.5">Weight</p>
              <p className="text-sm font-medium text-foreground">{stroller.specs.weight}</p>
            </div>
            <div className="text-center">
              <Ruler className="w-4 h-4 mx-auto mb-1.5 text-primary" />
              <p className="text-xs text-muted-foreground mb-0.5">Folded</p>
              <p className="text-sm font-medium text-foreground">{stroller.specs.foldedSize}</p>
            </div>
            <div className="text-center">
              <Baby className="w-4 h-4 mx-auto mb-1.5 text-primary" />
              <p className="text-xs text-muted-foreground mb-0.5">Suitable</p>
              <p className="text-sm font-medium text-foreground">{stroller.specs.suitableAge}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
