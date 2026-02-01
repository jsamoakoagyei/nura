import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/data/products";
import { LIFESTYLE_TAG_LABELS, VERDICT_STYLES } from "@/data/products";
import { Ruler, Scale, Baby, Shield, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductHighlightPanelProps {
  product: Product;
}

export function ProductHighlightPanel({ product }: ProductHighlightPanelProps) {
  const verdictStyle = VERDICT_STYLES[product.verdict];
  
  // Choose icon based on category
  const specIcons = product.category === "stroller" 
    ? [Scale, Ruler, Baby] 
    : [Scale, Shield, Car];
  
  const specEntries = Object.entries(product.specs).slice(0, 3);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 22,
          mass: 0.8,
        }}
        className="w-[90%] lg:w-[70%] max-w-2xl mx-auto"
      >
        <div className="bg-white/55 backdrop-blur-xl border border-white/25 rounded-[20px] shadow-lg p-6 lg:p-8">
          {/* Header with verdict badge */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="text-sm font-medium text-primary uppercase tracking-wider">
                {product.brand}
              </p>
              <Badge className={`text-[10px] ${verdictStyle.className} border`}>
                {verdictStyle.label}
              </Badge>
            </div>
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">
              {product.name}
            </h2>
          </div>

          {/* Lifestyle tags */}
          {product.lifestyleTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {product.lifestyleTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-azure-100 text-azure-700 rounded-full text-xs font-medium"
                >
                  {LIFESTYLE_TAG_LABELS[tag]}
                </span>
              ))}
            </div>
          )}

          {/* Best for / Not for */}
          <div className="space-y-2 mb-5 text-sm">
            <div className="flex items-start gap-2">
              <span className="shrink-0 text-emerald-500">✓</span>
              <span className="text-muted-foreground">{product.bestFor}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="shrink-0 text-rose-400">✗</span>
              <span className="text-muted-foreground">{product.notFor}</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-2 mb-6">
            {product.highlights.map((highlight, index) => (
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
            {specEntries.map(([label, value], index) => {
              const Icon = specIcons[index] || Scale;
              return (
                <div key={label} className="text-center">
                  <Icon className="w-4 h-4 mx-auto mb-1.5 text-primary" />
                  <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
