import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { LIFESTYLE_TAG_LABELS, VERDICT_STYLES } from "@/data/products";
import { Scale, Ruler, Baby, Shield, Car, X, Check } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SaveButton } from "./SaveButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { feedbackSave, feedbackUnsave } from "@/lib/feedback";

interface ProductDetailDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export function ProductDetailDrawer({
  product,
  isOpen,
  onOpenChange,
  isSaved,
  onToggleSave,
}: ProductDetailDrawerProps) {
  if (!product) return null;

  const verdictStyle = VERDICT_STYLES[product.verdict];
  
  // Choose icon based on category
  const specIcons = product.category === "stroller" 
    ? [Scale, Ruler, Baby] 
    : [Scale, Shield, Car];
  
  const specEntries = Object.entries(product.specs);
  
  // Placeholder gradient for products without images
  const hasImage = product.image && product.image.length > 0;

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] focus:outline-none">
        <div className="overflow-y-auto pb-safe">
          {/* Close button */}
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10 rounded-full bg-white/80 backdrop-blur-sm"
            >
              <X className="w-4 h-4" />
            </Button>
          </DrawerClose>

          {/* Product Image */}
          <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-t-[10px]">
            {hasImage ? (
              <img
                src={product.image}
                alt={`${product.brand} ${product.name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blush-100 via-azure-100 to-cream-100 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-3xl">
                    {product.category === "stroller" ? "🚀" : "🚗"}
                  </span>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            {/* Header */}
            <DrawerHeader className="p-0 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">
                      {product.brand}
                    </span>
                    <Badge className={`text-[10px] ${verdictStyle.className} border`}>
                      {verdictStyle.label}
                    </Badge>
                  </div>
                  <DrawerTitle className="font-serif text-2xl lg:text-3xl font-semibold text-foreground text-left">
                    {product.name}
                  </DrawerTitle>
                </div>
                <SaveButton
                  isSaved={isSaved}
                  onToggle={onToggleSave}
                  size="lg"
                />
              </div>
            </DrawerHeader>

            {/* Lifestyle tags */}
            {product.lifestyleTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
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
            <div className="space-y-3 mb-6 p-4 bg-muted/30 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-emerald-700 mb-0.5">Best for</p>
                  <p className="text-sm text-foreground">{product.bestFor}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center mt-0.5">
                  <X className="w-3 h-3 text-rose-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-rose-700 mb-0.5">Not for</p>
                  <p className="text-sm text-foreground">{product.notFor}</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <Accordion type="single" collapsible defaultValue="highlights" className="mb-6">
              <AccordionItem value="highlights" className="border-none">
                <AccordionTrigger className="text-sm font-semibold py-3 hover:no-underline">
                  Key Highlights
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {product.highlights.map((highlight, index) => (
                      <motion.div
                        key={highlight}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-sm">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Specs */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3">Specifications</h3>
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-xl">
                {specEntries.slice(0, 3).map(([label, value], index) => {
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

            {/* Save Button (Full width) */}
            <Button
              onClick={() => {
                if (isSaved) {
                  feedbackUnsave();
                } else {
                  feedbackSave();
                }
                onToggleSave();
              }}
              variant={isSaved ? "outline" : "default"}
              className="w-full h-12"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Saved to My Gear
                </>
              ) : (
                <>
                  <motion.span
                    initial={false}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    ♡
                  </motion.span>
                  <span className="ml-2">Save to My Gear</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
