import type { Product } from "./products";

// Placeholder gradient images until real assets are added
const placeholderImage = "";

export const infantCarSeatProducts: Product[] = [
  {
    id: "mesa-v2",
    name: "Mesa V2",
    brand: "UPPAbaby",
    category: "infant-car-seat",
    image: placeholderImage,
    lifestyleTags: ["design-forward"],
    verdict: "buy",
    bestFor: "UPPAbaby stroller owners who want seamless compatibility",
    notFor: "Budget-conscious parents – it's premium priced",
    highlights: [
      "One-click stroller attachment",
      "SMARTSecure system for easy install",
      "Premium merino wool option",
    ],
    specs: {
      Weight: "10.36 lbs",
      "Weight Limit": "4-35 lbs",
      "Height Limit": "32\"",
    },
  },
  {
    id: "cloud-g",
    name: "Cloud G",
    brand: "Cybex",
    category: "infant-car-seat",
    image: placeholderImage,
    lifestyleTags: ["design-forward", "eco-conscious"],
    verdict: "buy",
    bestFor: "Parents prioritizing lie-flat ergonomics and premium safety",
    notFor: "Those on a tight budget or needing lightweight portability",
    highlights: [
      "Lie-flat position outside car",
      "Linear side-impact protection",
      "Integrated sun canopy",
    ],
    specs: {
      Weight: "12.3 lbs",
      "Weight Limit": "4-35 lbs",
      "Height Limit": "33\"",
    },
  },
  {
    id: "keyfit-35",
    name: "KeyFit 35",
    brand: "Chicco",
    category: "infant-car-seat",
    image: placeholderImage,
    lifestyleTags: ["budget-conscious"],
    verdict: "buy",
    bestFor: "Value-seeking parents who don't want to compromise on safety",
    notFor: "Design-focused parents or those wanting premium materials",
    highlights: [
      "Trusted safety ratings",
      "Easy level indicator",
      "Compatible with many strollers",
    ],
    specs: {
      Weight: "10.3 lbs",
      "Weight Limit": "4-35 lbs",
      "Height Limit": "32\"",
    },
  },
  {
    id: "pipa-urbn",
    name: "Pipa Urbn",
    brand: "Nuna",
    category: "infant-car-seat",
    image: placeholderImage,
    lifestyleTags: ["apartment-friendly", "travel-heavy"],
    verdict: "buy",
    bestFor: "Urban parents who want flexibility without a separate base",
    notFor: "Those who prefer traditional base installation",
    highlights: [
      "No base required",
      "True lock installation",
      "Lightweight for carrying",
    ],
    specs: {
      Weight: "7.9 lbs",
      "Weight Limit": "4-35 lbs",
      "Height Limit": "32\"",
    },
  },
  {
    id: "aton-2",
    name: "Aton 2",
    brand: "Cybex",
    category: "infant-car-seat",
    image: placeholderImage,
    lifestyleTags: ["budget-conscious", "apartment-friendly"],
    verdict: "depends",
    bestFor: "Parents wanting Cybex quality at an entry-level price",
    notFor: "Those who want the latest features – it's the older model",
    highlights: [
      "Compact and lightweight",
      "Energy-absorbing shell",
      "Good value for Cybex brand",
    ],
    specs: {
      Weight: "9.3 lbs",
      "Weight Limit": "4-35 lbs",
      "Height Limit": "30\"",
    },
  },
];
