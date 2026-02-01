import { motion } from "framer-motion";
import type { LifestyleTag, ProductCategory } from "@/data/products";
import { LIFESTYLE_TAGS, LIFESTYLE_TAG_LABELS, CATEGORY_LABELS } from "@/data/products";

interface LifestyleFiltersProps {
  selectedTags: LifestyleTag[];
  onTagToggle: (tag: LifestyleTag) => void;
  onClearAll: () => void;
  selectedCategory: ProductCategory | "all";
  onCategoryChange: (category: ProductCategory | "all") => void;
}

const categories: (ProductCategory | "all")[] = ["all", "stroller", "infant-car-seat"];

export function LifestyleFilters({
  selectedTags,
  onTagToggle,
  onClearAll,
  selectedCategory,
  onCategoryChange,
}: LifestyleFiltersProps) {
  return (
    <div className="space-y-4 mb-10">
      {/* Category tabs */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 p-1 bg-white/60 backdrop-blur-sm rounded-full border border-white/30 shadow-sm">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            const label = category === "all" ? "All" : CATEGORY_LABELS[category];
            
            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="category-pill"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lifestyle filter chips */}
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
          {/* All/Clear chip */}
          <button
            onClick={onClearAll}
            className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-colors ${
              selectedTags.length === 0
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-white/60 text-muted-foreground border-white/30 hover:bg-white/80"
            }`}
          >
            All
          </button>

          {/* Lifestyle tags */}
          {LIFESTYLE_TAGS.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                  isSelected
                    ? "bg-azure-500 text-white border-azure-500"
                    : "bg-white/60 text-muted-foreground border-white/30 hover:bg-white/80"
                }`}
              >
                {LIFESTYLE_TAG_LABELS[tag]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
