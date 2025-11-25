"use client";

import { Product } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  lastProductRef: (node: HTMLDivElement) => void;
}

/**
 * ProductGrid Component
 * Responsive masonry grid layout for product cards
 * - Responsive columns
 * - Infinite scroll support via lastProductRef
 * - Optimized for visual balance
 */
export const ProductGrid = ({
  products,
  isLoading,
  lastProductRef,
}: ProductGridProps) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {products.map((product, index) => (
        <div
          key={`${product.id}-${index}`}
          ref={index === products.length - 1 ? lastProductRef : null}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
