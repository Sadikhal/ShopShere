"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Spinner } from "@/components/ui";

interface Props {
  initialProducts: Product[];
  categories: string[];
}

/**
 * ProductExplorerClient Component
 * Main product browsing interface with:
 * - Search functionality with debouncing
 * - Category filtering
 * - Price sorting (ascending/descending)
 * - Infinite scroll pagination
 * - Loading states and empty states
 */
const ProductExplorerClient = ({ initialProducts, categories }: Props) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(12);
  const [hasMore, setHasMore] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceSort, setPriceSort] = useState<"none" | "asc" | "desc">("none");

  // Search functionality with debouncing
  useEffect(() => {
    if (search === "" && selectedCategory === "all") return;

    const timer = setTimeout(() => {
      setSkip(0);
      setProducts([]);
      setHasMore(true);
      loadProducts(0, true);
    }, 500);
    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

  // infinity scroll 
  const loadProducts = async (skipVal: number, isNewSearch = false) => {
    if (isLoading) return;
    setIsLoading(true);
    const limit = 12;
    const data = await fetchProducts(skipVal, limit, selectedCategory, search);

    if (data.products.length < limit) setHasMore(false);

    setProducts((prev) => {
      const newProducts = isNewSearch
        ? data.products
        : [...prev, ...data.products];
      if (priceSort !== "none") {
        return newProducts.sort((a, b) =>
          priceSort === "asc" ? a.price - b.price : b.price - a.price,
        );
      }
      return newProducts;
    });
    setIsLoading(false);
  };

  const handleNextPage = () => {
    if (hasMore && !isLoading) {
      const nextSkip = skip + 12;
      setSkip(nextSkip);
      loadProducts(nextSkip);
    }
  };

  const lastProductRef = useInfiniteScroll(handleNextPage, isLoading);

  //  sorting 
  useEffect(() => {
    if (priceSort !== "none" && products.length > 0) {
      const sorted = [...products].sort((a, b) =>
        priceSort === "asc" ? a.price - b.price : b.price - a.price,
      );
      setProducts(sorted);
    }
  }, [priceSort]);

  return (
    <div className="space-y-6">
      {/* product filtering, searching and sorting  */}
      <ProductFilters
        search={search}
        setSearch={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceSort={priceSort}
        setPriceSort={setPriceSort}
      />
      {/* products listing  */}
      <ProductGrid
        products={products}
        isLoading={isLoading}
        lastProductRef={lastProductRef}
      />
      {/* empty products when scrolling */}
      {!hasMore && products.length > 0 && (
        <div className="text-center py-12 text-slate-500">
          You've reached the end of the list.
        </div>
      )}
      {/* empty products  */}
      {!isLoading && products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-slate-600 dark:text-slate-400">
            No products found.
          </p>
        </div>
      )}

      {isLoading && <Spinner />}
    </div>
  );
};

export default ProductExplorerClient;
