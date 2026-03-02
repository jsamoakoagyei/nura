import { memo } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

interface ProductCardProps {
  product: Product;
  offset: number;
  isActive: boolean;
  onClick: () => void;
  onDetailOpen?: (product: Product) => void;
}

export const ProductCard = memo(function ProductCard({ product, offset, isActive, onClick, onDetailOpen }: ProductCardProps) {
  const absOffset = Math.abs(offset);
  const scale = 1 - absOffset * 0.08;
  const opacity = 1 - absOffset * 0.3;
  const rotateY = offset * -6;
  const translateX = offset * 120;
  const translateY = absOffset * 6;
  const zIndex = 10 - absOffset;

  const hasImage = product.image && product.image.length > 0;

  const handleClick = () => {
    if (isActive && onDetailOpen) {
      onDetailOpen(product);
    } else {
      onClick();
    }
  };

  return (
    <motion.div
      layout
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
      role="button"
      tabIndex={0}
      aria-label={`${product.brand} ${product.name}${isActive ? ', click to view details' : ''}`}
      className="absolute left-1/2 cursor-pointer"
      style={{ zIndex, transformStyle: "preserve-3d" }}
      animate={{ x: translateX - 140, y: translateY, scale, opacity, rotateY }}
      transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.8 }}
      whileHover={isActive ? { scale: 1.02 } : {}}
    >
      <div className={`w-[min(280px,80vw)] h-[340px] lg:w-[320px] lg:h-[380px] rounded-3xl overflow-hidden shadow-2xl ${isActive ? "ring-4 ring-primary/20" : ""}`}>
        <div className={`relative w-full h-full ${hasImage ? "bg-gradient-to-br from-azure-100 to-azure-200" : ""}`}>
          {hasImage ? (
            <img src={product.image} alt={`${product.brand} ${product.name}`} className="w-full h-full object-cover" loading="lazy" width={320} height={380} />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <ProductImagePlaceholder category={product.category} className="absolute inset-0" />
              <div className="relative z-10 w-24 h-24 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center mb-4">
                <span className="text-4xl">🚗</span>
              </div>
              <p className="relative z-10 text-sm text-muted-foreground text-center">Image coming soon</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground shadow-sm">{product.brand}</span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-serif text-xl lg:text-2xl font-semibold text-white drop-shadow-lg">{product.name}</h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
