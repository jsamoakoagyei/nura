import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { ProductCarousel } from "./ProductCarousel";

interface CategorySectionProps {
  title: string;
  products: Product[];
  id: string;
}

export function CategorySection({ title, products, id }: CategorySectionProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-16 lg:mb-24"
    >
      {/* Section header */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Carousel */}
      <ProductCarousel products={products} id={id} />
    </motion.section>
  );
}
