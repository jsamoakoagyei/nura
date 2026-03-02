import { useState, useCallback } from "react";
import type { Product } from "@/data/products";

export function useStudioDrawers() {
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isGearDrawerOpen, setIsGearDrawerOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const handleDetailOpen = useCallback((product: Product) => {
    setDetailProduct(product);
    setIsDetailOpen(true);
  }, []);

  const handleDetailClose = useCallback(() => {
    setIsDetailOpen(false);
    setTimeout(() => setDetailProduct(null), 300);
  }, []);

  const handleGearDrawerOpen = useCallback(() => {
    setIsGearDrawerOpen(true);
  }, []);

  const handleCompareOpen = useCallback(() => {
    setIsGearDrawerOpen(false);
    setIsCompareOpen(true);
  }, []);

  const handleProductClickFromDrawer = useCallback((product: Product) => {
    setIsGearDrawerOpen(false);
    setIsCompareOpen(false);
    setTimeout(() => {
      setDetailProduct(product);
      setIsDetailOpen(true);
    }, 200);
  }, []);

  return {
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
  };
}
