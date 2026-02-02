import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "tlv-gear-list";

export interface SavedProduct {
  productId: string;
  savedAt: string;
}

export function useLocalGearList() {
  const [savedProducts, setSavedProducts] = useState<SavedProduct[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedProducts));
    } catch (error) {
      // Only log errors in development to avoid exposing internal details in production
      if (import.meta.env.DEV) {
        console.error("Failed to save gear list:", error);
      }
    }
  }, [savedProducts]);

  const saveProduct = useCallback((productId: string) => {
    setSavedProducts((current) => {
      if (current.some((p) => p.productId === productId)) {
        return current;
      }
      return [...current, { productId, savedAt: new Date().toISOString() }];
    });
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setSavedProducts((current) =>
      current.filter((p) => p.productId !== productId)
    );
  }, []);

  const toggleProduct = useCallback((productId: string) => {
    setSavedProducts((current) => {
      const exists = current.some((p) => p.productId === productId);
      if (exists) {
        return current.filter((p) => p.productId !== productId);
      }
      return [...current, { productId, savedAt: new Date().toISOString() }];
    });
  }, []);

  const isProductSaved = useCallback(
    (productId: string) => {
      return savedProducts.some((p) => p.productId === productId);
    },
    [savedProducts]
  );

  const clearAll = useCallback(() => {
    setSavedProducts([]);
  }, []);

  return {
    savedProducts,
    saveProduct,
    removeProduct,
    toggleProduct,
    isProductSaved,
    clearAll,
    count: savedProducts.length,
  };
}
