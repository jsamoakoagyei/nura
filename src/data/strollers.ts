import butterflyImage from "../assets/strollers/butterfly.png";
import cruzV2Image from "../assets/strollers/cruz-v2.png";
import yoyo2Image from "../assets/strollers/yoyo2.png";

export interface Stroller {
  id: string;
  name: string;
  brand: string;
  image: string;
  highlights: string[];
  specs: {
    weight: string;
    foldedSize: string;
    suitableAge: string;
  };
}

export const strollers: Stroller[] = [
  {
    id: "vista-v2",
    name: "Vista V2",
    brand: "UPPAbaby",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&h=600&fit=crop",
    highlights: [
      "Smooth over uneven sidewalks",
      "Bulky fold for small trunks",
      "Great for long daily walks"
    ],
    specs: {
      weight: "27 lbs",
      foldedSize: "17.3\" x 25.7\" x 33\"",
      suitableAge: "Birth to 50 lbs"
    }
  },
  {
    id: "butterfly",
    name: "Butterfly",
    brand: "Bugaboo",
    image: butterflyImage,
    highlights: [
      "Ultra-compact fold",
      "Lighter for travel",
      "Less suspension on rough terrain"
    ],
    specs: {
      weight: "16.1 lbs",
      foldedSize: "17.7\" x 9\" x 21.2\"",
      suitableAge: "6 months to 50 lbs"
    }
  },
  {
    id: "cruz-v2",
    name: "Cruz V2",
    brand: "UPPAbaby",
    image: cruzV2Image,
    highlights: [
      "Good balance of size and features",
      "Narrower for tight spaces",
      "Simpler than Vista"
    ],
    specs: {
      weight: "23 lbs",
      foldedSize: "17.5\" x 25.5\" x 33\"",
      suitableAge: "Birth to 50 lbs"
    }
  },
  {
    id: "yoyo2",
    name: "YOYO²",
    brand: "Babyzen",
    image: yoyo2Image,
    highlights: [
      "One-hand fold",
      "Cabin-bag approved",
      "Best for urban parents"
    ],
    specs: {
      weight: "14.3 lbs",
      foldedSize: "20.5\" x 7\" x 17.3\"",
      suitableAge: "6 months to 48 lbs"
    }
  },
  {
    id: "donkey-5",
    name: "Donkey 5",
    brand: "Bugaboo",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop",
    highlights: [
      "Converts to double",
      "Widest footprint",
      "Maximum cargo space"
    ],
    specs: {
      weight: "28.7 lbs",
      foldedSize: "23.6\" x 23.6\" x 35.4\"",
      suitableAge: "Birth to 50 lbs"
    }
  }
];
