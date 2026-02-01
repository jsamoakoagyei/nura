// Lifestyle tags for filtering products
export const LIFESTYLE_TAGS = [
  "apartment-friendly",
  "travel-heavy",
  "budget-conscious",
  "design-forward",
  "eco-conscious",
] as const;

export type LifestyleTag = (typeof LIFESTYLE_TAGS)[number];

export type ProductCategory = "stroller" | "infant-car-seat";

export type Verdict = "buy" | "skip" | "depends";

// For Phase 2: structured review sections
export interface ReviewSection {
  title: string;
  content: string;
  rating?: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  image: string;

  // Lifestyle & filtering
  lifestyleTags: LifestyleTag[];

  // Quick verdict
  verdict: Verdict;
  bestFor: string;
  notFor: string;

  // Product details
  highlights: string[];
  specs: Record<string, string>;

  // For detail page (Phase 2)
  reviewSections?: ReviewSection[];
}

// Human-readable labels for lifestyle tags
export const LIFESTYLE_TAG_LABELS: Record<LifestyleTag, string> = {
  "apartment-friendly": "Apartment",
  "travel-heavy": "Travel",
  "budget-conscious": "Budget",
  "design-forward": "Design",
  "eco-conscious": "Eco",
};

// Human-readable labels for categories
export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  stroller: "Strollers",
  "infant-car-seat": "Car Seats",
};

// Verdict badge colors (semantic)
export const VERDICT_STYLES: Record<
  Verdict,
  { label: string; className: string }
> = {
  buy: { label: "Buy", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  skip: { label: "Skip", className: "bg-rose-100 text-rose-700 border-rose-200" },
  depends: { label: "Depends", className: "bg-amber-100 text-amber-700 border-amber-200" },
};
