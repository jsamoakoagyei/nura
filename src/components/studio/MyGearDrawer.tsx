import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/data/products";
import { VERDICT_STYLES } from "@/data/products";
import { X, Trash2, GitCompare, Heart } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MyGearDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  savedProducts: Product[];
  onRemove: (productId: string) => void;
  onClearAll: () => void;
  onCompare: () => void;
  onProductClick: (product: Product) => void;
}

export function MyGearDrawer({
  isOpen,
  onOpenChange,
  savedProducts,
  onRemove,
  onClearAll,
  onCompare,
  onProductClick,
}: MyGearDrawerProps) {
  const canCompare = savedProducts.length >= 2 && savedProducts.length <= 3;

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh] focus:outline-none">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DrawerHeader className="flex-shrink-0 border-b border-border/50 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <DrawerTitle className="font-serif text-xl font-semibold">
                  My Gear List
                </DrawerTitle>
                {savedProducts.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {savedProducts.length}
                  </Badge>
                )}
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <X className="w-4 h-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          {/* Content */}
          {savedProducts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No items saved yet
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Tap the heart icon on any product to save it to your gear list
                for comparison.
              </p>
            </div>
          ) : (
            <ScrollArea className="flex-1 px-4 py-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <AnimatePresence mode="popLayout">
                  {savedProducts.map((product) => (
                    <GearCard
                      key={product.id}
                      product={product}
                      onRemove={() => onRemove(product.id)}
                      onClick={() => onProductClick(product)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          )}

          {/* Footer actions */}
          {savedProducts.length > 0 && (
            <div className="flex-shrink-0 border-t border-border/50 p-4 space-y-3">
              <Button
                onClick={onCompare}
                disabled={!canCompare}
                className="w-full h-12"
              >
                <GitCompare className="w-4 h-4 mr-2" />
                Compare {savedProducts.length > 1 ? `(${savedProducts.length})` : ""}
              </Button>
              {!canCompare && savedProducts.length === 1 && (
                <p className="text-xs text-center text-muted-foreground">
                  Save at least 2 items to compare
                </p>
              )}
              {savedProducts.length > 3 && (
                <p className="text-xs text-center text-amber-600">
                  Select up to 3 items to compare (remove some first)
                </p>
              )}
              <Button
                onClick={onClearAll}
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Clear all
              </Button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// Compact card for gear list
function GearCard({
  product,
  onRemove,
  onClick,
}: {
  product: Product;
  onRemove: () => void;
  onClick: () => void;
}) {
  const verdictStyle = VERDICT_STYLES[product.verdict];
  const hasImage = product.image && product.image.length > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      className="relative group"
    >
      <button
        onClick={onClick}
        className="w-full bg-white/80 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left"
      >
        {/* Image */}
        <div className="relative h-24 sm:h-28 w-full">
          {hasImage ? (
            <img
              src={product.image}
              alt={`${product.brand} ${product.name}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blush-100 via-azure-100 to-cream-100 flex items-center justify-center">
              <span className="text-2xl">
                {product.category === "stroller" ? "🚀" : "🚗"}
              </span>
            </div>
          )}
          
          {/* Verdict badge */}
          <Badge 
            className={`absolute top-2 right-2 text-[9px] ${verdictStyle.className} border`}
          >
            {verdictStyle.label}
          </Badge>
        </div>

        {/* Info */}
        <div className="p-2.5">
          <p className="text-[10px] font-medium text-primary uppercase tracking-wider">
            {product.brand}
          </p>
          <p className="text-sm font-medium text-foreground truncate">
            {product.name}
          </p>
        </div>
      </button>

      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute top-1 left-1 h-7 w-7 rounded-full bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-rose-50 hover:text-rose-600"
        aria-label={`Remove ${product.name}`}
      >
        <X className="w-3.5 h-3.5" />
      </Button>
    </motion.div>
  );
}
