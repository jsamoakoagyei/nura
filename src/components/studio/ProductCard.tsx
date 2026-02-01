import { motion } from "framer-motion";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  offset: number; // -2, -1, 0, 1, 2
  isActive: boolean;
  onClick: () => void;
  onDetailOpen?: (product: Product) => void;
}

export function ProductCard({ product, offset, isActive, onClick, onDetailOpen }: ProductCardProps) {
  // Calculate transform properties based on offset
  const absOffset = Math.abs(offset);
  const scale = 1 - absOffset * 0.08;
  const opacity = 1 - absOffset * 0.3;
  const rotateY = offset * -6;
  const translateX = offset * 120;
  const translateY = absOffset * 6;
  const zIndex = 10 - absOffset;

  // Placeholder gradient for products without images
  const hasImage = product.image && product.image.length > 0;

  const handleClick = () => {
    if (isActive && onDetailOpen) {
      // If active card is clicked, open detail drawer
      onDetailOpen(product);
    } else {
      // Otherwise navigate to this card
      onClick();
    }
  };

  return (
    <motion.div
      layout
      onClick={handleClick}
      className="absolute left-1/2 cursor-pointer"
      style={{
        zIndex,
        transformStyle: "preserve-3d",
      }}
      animate={{
        x: translateX - 140, // Center the card (card is 280px wide)
        y: translateY,
        scale,
        opacity,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 22,
        mass: 0.8,
      }}
      whileHover={isActive ? { scale: 1.02 } : {}}
    >
      <div
        className={`w-[280px] h-[340px] lg:w-[320px] lg:h-[380px] rounded-3xl overflow-hidden shadow-2xl ${
          isActive ? "ring-4 ring-primary/20" : ""
        }`}
      >
        {/* Image or Placeholder */}
        <div className={`relative w-full h-full ${
          hasImage 
            ? "bg-gradient-to-br from-azure-100 to-azure-200" 
            : "bg-gradient-to-br from-blush-100 via-azure-100 to-cream-100"
        }`}>
          {hasImage ? (
            <img
              src={product.image}
              alt={`${product.brand} ${product.name}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            // Placeholder content for products without images
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <div className="w-24 h-24 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center mb-4">
                <span className="text-4xl">🚗</span>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Image coming soon
              </p>
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          
          {/* Brand badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground shadow-sm">
              {product.brand}
            </span>
          </div>
          
          {/* Name at bottom */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="font-serif text-xl lg:text-2xl font-semibold text-white drop-shadow-lg">
              {product.name}
            </h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
