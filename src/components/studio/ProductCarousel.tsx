import { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, PanInfo } from "framer-motion";
import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { PaginationDots } from "./PaginationDots";
import { ProductHighlightPanel } from "./ProductHighlightPanel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCarouselProps {
  products: Product[];
  id: string; // Unique ID for keyboard event handling
  onDetailOpen?: (product: Product) => void;
}

export function ProductCarousel({ products, id, onDetailOpen }: ProductCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragX = useMotionValue(0);

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      setActiveIndex((current) => {
        if (direction === "prev") {
          return current === 0 ? products.length - 1 : current - 1;
        }
        return current === products.length - 1 ? 0 : current + 1;
      });
    },
    [products.length]
  );

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Reset index when products change
  useEffect(() => {
    setActiveIndex(0);
  }, [products]);

  // Handle drag end
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      navigate("prev");
    } else if (info.offset.x < -threshold) {
      navigate("next");
    }
  };

  // Calculate offset for each product relative to active
  const getOffset = (index: number): number => {
    const diff = index - activeIndex;
    // Handle wrapping for smooth circular navigation
    if (diff > products.length / 2) return diff - products.length;
    if (diff < -products.length / 2) return diff + products.length;
    return diff;
  };

  const activeProduct = products[activeIndex];

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No products match the selected filters
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Carousel container */}
      <div
        className="relative w-full max-w-4xl mx-auto overflow-hidden"
        style={{ perspective: "1200px", perspectiveOrigin: "center" }}
      >
        {/* Navigation buttons */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("prev")}
          className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white"
          aria-label="Previous product"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("next")}
          className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white"
          aria-label="Next product"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Draggable area */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          style={{ x: dragX }}
          className="relative h-[380px] lg:h-[420px] cursor-grab active:cursor-grabbing"
        >
          {/* Cards */}
          <div className="absolute inset-0 flex items-center justify-center">
            {products.map((product, index) => {
              const offset = getOffset(index);
              // Only render visible cards (within range of -2 to 2)
              if (Math.abs(offset) > 2) return null;

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  offset={offset}
                  isActive={offset === 0}
                  onClick={() => goToIndex(index)}
                  onDetailOpen={onDetailOpen}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Pagination */}
        <PaginationDots
          total={products.length}
          activeIndex={activeIndex}
          onDotClick={goToIndex}
        />
      </div>

      {/* Highlight Panel */}
      <div className="mt-8 w-full">
        <ProductHighlightPanel product={activeProduct} />
      </div>
    </div>
  );
}
