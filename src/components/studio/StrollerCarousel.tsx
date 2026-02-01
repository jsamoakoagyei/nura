import { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useAnimation, PanInfo } from "framer-motion";
import { strollers, Stroller } from "@/data/strollers";
import { StrollerCard } from "./StrollerCard";
import { PaginationDots } from "./PaginationDots";
import { HighlightPanel } from "./HighlightPanel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StrollerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const dragX = useMotionValue(0);

  const navigate = useCallback((direction: "prev" | "next") => {
    setActiveIndex((current) => {
      if (direction === "prev") {
        return current === 0 ? strollers.length - 1 : current - 1;
      }
      return current === strollers.length - 1 ? 0 : current + 1;
    });
  }, []);

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        navigate("prev");
      } else if (e.key === "ArrowRight") {
        navigate("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  // Scroll wheel navigation
  useEffect(() => {
    let lastScrollTime = 0;
    const scrollThrottle = 300; // ms between scroll actions

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime < scrollThrottle) return;
      
      // Only respond to horizontal scroll or significant vertical scroll
      if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 50) {
        lastScrollTime = now;
        if (e.deltaX > 0 || e.deltaY > 0) {
          navigate("next");
        } else {
          navigate("prev");
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [navigate]);

  // Handle drag end
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      navigate("prev");
    } else if (info.offset.x < -threshold) {
      navigate("next");
    }
  };

  // Calculate offset for each stroller relative to active
  const getOffset = (index: number): number => {
    const diff = index - activeIndex;
    // Handle wrapping for smooth circular navigation
    if (diff > strollers.length / 2) return diff - strollers.length;
    if (diff < -strollers.length / 2) return diff + strollers.length;
    return diff;
  };

  const activeStroller = strollers[activeIndex];

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
          aria-label="Previous stroller"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("next")}
          className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white"
          aria-label="Next stroller"
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
            {strollers.map((stroller, index) => {
              const offset = getOffset(index);
              // Only render visible cards (within range of -2 to 2)
              if (Math.abs(offset) > 2) return null;
              
              return (
                <StrollerCard
                  key={stroller.id}
                  stroller={stroller}
                  offset={offset}
                  isActive={offset === 0}
                  onClick={() => goToIndex(index)}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Pagination */}
        <PaginationDots
          total={strollers.length}
          activeIndex={activeIndex}
          onDotClick={goToIndex}
        />
      </div>

      {/* Highlight Panel */}
      <div className="mt-8 w-full">
        <HighlightPanel stroller={activeStroller} />
      </div>
    </div>
  );
}
