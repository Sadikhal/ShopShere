import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "@/components/ProductDetailClient";
import { fetchProductById } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate dynamic metadata for SEO
 * Creates unique title and description for each product page
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | ShopShere",
      description: "The product you're looking for could not be found.",
    };
  }

  return {
    title: `${product.title} | ShopShere`,
    description: product.description || `Buy ${product.title} at the best price. ${product.brand ? `Brand: ${product.brand}.` : ''} Rating: ${product.rating}/5.`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.thumbnail,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
      type: "website",
    },
  };
}

//  * SSR to fetch product details on the server for SEO.

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
