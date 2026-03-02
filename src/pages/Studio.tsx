import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategorySection } from "@/components/studio/CategorySection";
import { LifestyleFilters } from "@/components/studio/LifestyleFilters";
import { ProductDetailDrawer } from "@/components/studio/ProductDetailDrawer";
import { MyGearFAB } from "@/components/studio/MyGearFAB";
import { MyGearDrawer } from "@/components/studio/MyGearDrawer";
import { CompareDrawer } from "@/components/studio/CompareDrawer";
import { Button } from "@/components/ui/button";
import { useLocalGearList } from "@/hooks/useLocalGearList";
import { useStudioDrawers } from "@/hooks/useStudioDrawers";
import { ROUTES } from "@/lib/constants";
import type { LifestyleTag, ProductCategory, Product } from "@/data/products";
import { CATEGORY_LABELS } from "@/data/products";
import { strollerProducts } from "@/data/strollersEnhanced";
import { infantCarSeatProducts } from "@/data/infantCarSeats";

const allProducts: Product[] = [...strollerProducts, ...infantCarSeatProducts];

export default function Studio() {
  const [selectedTags, setSelectedTags] = useState<LifestyleTag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");

  const {
    detailProduct,
    isDetailOpen,
    isGearDrawerOpen,
    setIsGearDrawerOpen,
    isCompareOpen,
    setIsCompareOpen,
    handleDetailOpen,
    handleDetailClose,
    handleGearDrawerOpen,
    handleCompareOpen,
    handleProductClickFromDrawer,
  } = useStudioDrawers();

  const {
    savedProducts: savedProductIds,
    toggleProduct,
    removeProduct,
    isProductSaved,
    clearAll,
    count: savedCount,
  } = useLocalGearList();

  const savedProducts = useMemo(() => {
    return savedProductIds
      .map((saved) => allProducts.find((p) => p.id === saved.productId))
      .filter((p): p is Product => p !== undefined);
  }, [savedProductIds]);

  const handleTagToggle = useCallback((tag: LifestyleTag) => {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]
    );
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedTags([]);
  }, []);

  const handleCategoryChange = useCallback((category: ProductCategory | "all") => {
    setSelectedCategory(category);
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (selectedCategory !== "all" && product.category !== selectedCategory) return false;
      if (selectedTags.length > 0) return selectedTags.every((tag) => product.lifestyleTags.includes(tag));
      return true;
    });
  }, [selectedTags, selectedCategory]);

  const strollers = filteredProducts.filter((p) => p.category === "stroller");
  const carSeats = filteredProducts.filter((p) => p.category === "infant-car-seat");
  const showStrollers = selectedCategory === "all" || selectedCategory === "stroller";
  const showCarSeats = selectedCategory === "all" || selectedCategory === "infant-car-seat";

  return (
    <div className="min-h-screen bg-gradient-to-b from-azure-50 via-background to-blush-50">
      <Navbar />

      <main id="main-content" className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 lg:mb-12"
          >
            <Link to={ROUTES.HOME}>
              <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>

            <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-semibold text-foreground mb-4">
              The Baby Gear Studio
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore baby gear through real parent experiences. Swipe to discover what works in everyday life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <LifestyleFilters
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              onClearAll={handleClearAll}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {showStrollers && strollers.length > 0 && (
              <CategorySection title={CATEGORY_LABELS["stroller"]} products={strollers} id="strollers" onDetailOpen={handleDetailOpen} />
            )}
            {showCarSeats && carSeats.length > 0 && (
              <CategorySection title={CATEGORY_LABELS["infant-car-seat"]} products={carSeats} id="car-seats" onDetailOpen={handleDetailOpen} />
            )}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">No products match your filters</p>
                <Button variant="outline" onClick={handleClearAll}>Clear filters</Button>
              </div>
            )}
          </motion.div>

          {filteredProducts.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-center text-sm text-muted-foreground mt-8"
            >
              Tap a product to view details • Swipe to explore
            </motion.p>
          )}
        </div>
      </main>

      <Footer />

      <MyGearFAB count={savedCount} onClick={handleGearDrawerOpen} />

      <ProductDetailDrawer
        product={detailProduct}
        isOpen={isDetailOpen}
        onOpenChange={(open) => { if (!open) handleDetailClose(); }}
        isSaved={detailProduct ? isProductSaved(detailProduct.id) : false}
        onToggleSave={() => { if (detailProduct) toggleProduct(detailProduct.id); }}
      />

      <MyGearDrawer
        isOpen={isGearDrawerOpen}
        onOpenChange={setIsGearDrawerOpen}
        savedProducts={savedProducts}
        onRemove={removeProduct}
        onClearAll={clearAll}
        onCompare={handleCompareOpen}
        onProductClick={handleProductClickFromDrawer}
      />

      <CompareDrawer
        isOpen={isCompareOpen}
        onOpenChange={setIsCompareOpen}
        products={savedProducts.slice(0, 3)}
        onProductClick={handleProductClickFromDrawer}
      />
    </div>
  );
}
