import type { Product } from "./products";
import butterflyImage from "../assets/strollers/butterfly.png";
import cruzV2Image from "../assets/strollers/cruz-v2.png";
import yoyo2Image from "../assets/strollers/yoyo2.png";
import donkey5Image from "../assets/strollers/donkey-5.png";
import vistaV2Image from "../assets/strollers/vista-v2.png";

export const strollerProducts: Product[] = [
  {
    id: "vista-v2",
    name: "Vista V2",
    brand: "UPPAbaby",
    category: "stroller",
    image: vistaV2Image,
    lifestyleTags: ["design-forward"],
    verdict: "buy",
    bestFor: "Parents who want a premium full-size stroller that grows with the family",
    notFor: "City dwellers with limited storage or frequent public transit users",
    highlights: [
      "Smooth over uneven sidewalks",
      "Bulky fold for small trunks",
      "Great for long daily walks",
    ],
    specs: {
      Weight: "27 lbs",
      "Folded Size": "17.3\" x 25.7\" x 33\"",
      "Suitable Age": "Birth to 50 lbs",
    },
  },
  {
    id: "butterfly",
    name: "Butterfly",
    brand: "Bugaboo",
    category: "stroller",
    image: butterflyImage,
    lifestyleTags: ["apartment-friendly", "travel-heavy", "design-forward"],
    verdict: "buy",
    bestFor: "Urban parents who need portability without sacrificing quality",
    notFor: "Off-road adventures or rough terrain walks",
    highlights: [
      "Ultra-compact fold",
      "Lighter for travel",
      "Less suspension on rough terrain",
    ],
    specs: {
      Weight: "16.1 lbs",
      "Folded Size": "17.7\" x 9\" x 21.2\"",
      "Suitable Age": "6 months to 50 lbs",
    },
  },
  {
    id: "cruz-v2",
    name: "Cruz V2",
    brand: "UPPAbaby",
    category: "stroller",
    image: cruzV2Image,
    lifestyleTags: ["apartment-friendly"],
    verdict: "buy",
    bestFor: "Parents wanting UPPAbaby quality in a more compact package",
    notFor: "Those needing a double stroller or maximum storage",
    highlights: [
      "Good balance of size and features",
      "Narrower for tight spaces",
      "Simpler than Vista",
    ],
    specs: {
      Weight: "23 lbs",
      "Folded Size": "17.5\" x 25.5\" x 33\"",
      "Suitable Age": "Birth to 50 lbs",
    },
  },
  {
    id: "yoyo2",
    name: "YOYO²",
    brand: "Babyzen",
    category: "stroller",
    image: yoyo2Image,
    lifestyleTags: ["apartment-friendly", "travel-heavy"],
    verdict: "buy",
    bestFor: "Frequent flyers and public transit commuters",
    notFor: "Tall parents (handlebar height) or heavy-duty daily use",
    highlights: [
      "One-hand fold",
      "Cabin-bag approved",
      "Best for urban parents",
    ],
    specs: {
      Weight: "14.3 lbs",
      "Folded Size": "20.5\" x 7\" x 17.3\"",
      "Suitable Age": "6 months to 48 lbs",
    },
  },
  {
    id: "donkey-5",
    name: "Donkey 5",
    brand: "Bugaboo",
    category: "stroller",
    image: donkey5Image,
    lifestyleTags: ["design-forward"],
    verdict: "depends",
    bestFor: "Families with two under two or who need maximum cargo capacity",
    notFor: "Anyone with space constraints – it's the widest stroller around",
    highlights: [
      "Converts to double",
      "Widest footprint",
      "Maximum cargo space",
    ],
    specs: {
      Weight: "28.7 lbs",
      "Folded Size": "23.6\" x 23.6\" x 35.4\"",
      "Suitable Age": "Birth to 50 lbs",
    },
  },
];
