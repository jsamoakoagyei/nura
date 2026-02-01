import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { VERDICT_STYLES } from "@/data/products";
import { X, Scale, Ruler, Baby, Shield, Car } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CompareDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  onProductClick: (product: Product) => void;
}

export function CompareDrawer({
  isOpen,
  onOpenChange,
  products,
  onProductClick,
}: CompareDrawerProps) {
  if (products.length === 0) return null;

  // Get all unique spec keys from all products
  const allSpecKeys = Array.from(
    new Set(products.flatMap((p) => Object.keys(p.specs)))
  );

  // Determine icon based on first product's category
  const category = products[0]?.category || "stroller";
  const specIcons: Record<string, typeof Scale> = {
    Weight: Scale,
    "Weight Limit": Scale,
    "Folded Size": Ruler,
    "Suitable Age": Baby,
    "Height Limit": category === "stroller" ? Baby : Car,
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[95vh] h-[95vh] focus:outline-none">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DrawerHeader className="flex-shrink-0 border-b border-border/50 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle className="font-serif text-xl font-semibold">
                  Compare Products
                </DrawerTitle>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {products.length} product{products.length > 1 ? "s" : ""}
                </p>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <X className="w-4 h-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          {/* Comparison content */}
          <ScrollArea className="flex-1">
            <div className="min-w-max">
              {/* Products header row */}
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
                <div className="grid" style={{ gridTemplateColumns: `120px repeat(${products.length}, minmax(140px, 1fr))` }}>
                  <div className="p-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Product
                  </div>
                  {products.map((product) => (
                    <ProductHeader
                      key={product.id}
                      product={product}
                      onClick={() => onProductClick(product)}
                    />
                  ))}
                </div>
              </div>

              {/* Verdict row */}
              <CompareRow label="Verdict">
                {products.map((product) => {
                  const verdictStyle = VERDICT_STYLES[product.verdict];
                  return (
                    <div key={product.id} className="flex justify-center">
                      <Badge className={`${verdictStyle.className} border text-xs`}>
                        {verdictStyle.label}
                      </Badge>
                    </div>
                  );
                })}
              </CompareRow>

              {/* Best For row */}
              <CompareRow label="Best For" isHighlight>
                {products.map((product) => (
                  <p key={product.id} className="text-xs text-foreground leading-relaxed">
                    {product.bestFor}
                  </p>
                ))}
              </CompareRow>

              {/* Not For row */}
              <CompareRow label="Not For">
                {products.map((product) => (
                  <p key={product.id} className="text-xs text-muted-foreground leading-relaxed">
                    {product.notFor}
                  </p>
                ))}
              </CompareRow>

              {/* Specs rows */}
              {allSpecKeys.map((specKey, index) => {
                const Icon = specIcons[specKey] || Shield;
                return (
                  <CompareRow 
                    key={specKey} 
                    label={specKey} 
                    icon={Icon}
                    isHighlight={index % 2 === 0}
                  >
                    {products.map((product) => (
                      <p key={product.id} className="text-sm font-medium text-foreground text-center">
                        {product.specs[specKey] || "—"}
                      </p>
                    ))}
                  </CompareRow>
                );
              })}

              {/* Highlights row */}
              <div className="grid border-t border-border/50" style={{ gridTemplateColumns: `120px repeat(${products.length}, minmax(140px, 1fr))` }}>
                <div className="p-3 flex items-start">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Highlights
                  </span>
                </div>
                {products.map((product) => (
                  <div key={product.id} className="p-3 border-l border-border/30">
                    <ul className="space-y-1.5">
                      {product.highlights.map((highlight, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-start gap-1.5 text-xs text-muted-foreground"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary shrink-0 mt-1.5" />
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// Product header with image
function ProductHeader({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) {
  const hasImage = product.image && product.image.length > 0;

  return (
    <button
      onClick={onClick}
      className="p-3 border-l border-border/30 hover:bg-muted/30 transition-colors text-center"
    >
      {/* Image */}
      <div className="relative w-full h-20 mb-2 rounded-lg overflow-hidden bg-muted/50">
        {hasImage ? (
          <img
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blush-100 via-azure-100 to-cream-100 flex items-center justify-center">
            <span className="text-xl">
              {product.category === "stroller" ? "🚀" : "🚗"}
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <p className="text-[10px] font-medium text-primary uppercase tracking-wider">
        {product.brand}
      </p>
      <p className="text-sm font-semibold text-foreground">
        {product.name}
      </p>
    </button>
  );
}

// Comparison row component
function CompareRow({
  label,
  icon: Icon,
  isHighlight,
  children,
}: {
  label: string;
  icon?: typeof Scale;
  isHighlight?: boolean;
  children: React.ReactNode[];
}) {
  const count = children.length;
  
  return (
    <div 
      className={`grid border-t border-border/50 ${isHighlight ? "bg-muted/20" : ""}`}
      style={{ gridTemplateColumns: `120px repeat(${count}, minmax(140px, 1fr))` }}
    >
      <div className="p-3 flex items-center gap-2">
        {Icon && <Icon className="w-3.5 h-3.5 text-primary" />}
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      </div>
      {children.map((child, index) => (
        <div 
          key={index} 
          className="p-3 border-l border-border/30 flex items-center justify-center"
        >
          {child}
        </div>
      ))}
    </div>
  );
}
