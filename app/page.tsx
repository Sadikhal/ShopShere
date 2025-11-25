import type { Metadata } from "next";
import ProductExplorerClient from "@/components/ProductExplorerClient";
import { fetchProducts, fetchCategories } from "@/lib/api";


/**
 * Static metadata for product listing page
 */
export const metadata: Metadata = {
  title: "Shop All Products | ShopShere",
  description: "Discover amazing products across all categories. Browse our collection of electronics, fashion, home decor, and more at ShopShere.",
  openGraph: {
    title: "Shop All Products | ShopShere",
    description: "Discover amazing products across all categories.",
    type: "website",
  },
};

/**
 * Home Page
 * Uses SSR (Server-Side Rendering) to fetch and render products on the server for SEO.
 */
export default async function Home() {
  const [productsData, categories] = await Promise.all([
    fetchProducts(0, 12),
    fetchCategories(),
  ]);

  return (
    <ProductExplorerClient
      initialProducts={productsData.products}
      categories={categories}
    />
  );
}
