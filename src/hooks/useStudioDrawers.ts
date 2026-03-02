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
    // Wait 300ms before clearing the product data so the drawer's closing
    // animation can finish while still showing content. Clearing immediately
    // would cause a visible flash of empty content as the drawer slides out.
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
    // A 200ms delay lets the current drawer's exit animation complete before
    // opening the detail drawer. Without this, both drawers would try to
    // animate simultaneously, causing visual glitches and z-index conflicts.
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
