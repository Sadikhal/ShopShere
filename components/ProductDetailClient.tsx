"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ShoppingCart, ArrowLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { Product } from "@/types";
import { Button, Badge, useToast } from "@/components/ui";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductVariants } from "@/components/product/ProductVariants";
import { ProductAIAssistant } from "@/components/product/ProductAIAssistant";

const MotionDiv = motion.div as any;

/**
 * ProductDetailClient Component
 * Displays detailed product information with:
 * - Product image gallery
 * - Product information (title, price, rating, stock status)
 * - Variant selection (colors, sizes)
 * - Dynamic pricing based on selected variant
 * - Add to cart functionality with visual feedback
 * - AI assistant for product questions
 */
export default function ProductDetailClient({ product }: { product: Product }) {
  // Track selected product variants
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0] || "",
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0] || "",
  );
  const [currentPrice, setCurrentPrice] = useState<number>(product.price);
  const [isAdded, setIsAdded] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const { toast } = useToast();

  // Initialize variants when product changes
  useEffect(() => {
    setSelectedColor(product.colors?.[0] || "");
    setSelectedSize(product.sizes?.[0] || "");
  }, [product]);

  // Calculate price based on selected size variant
  useEffect(() => {
    let multiplier = 1;
    // Storage size pricing
    if (selectedSize.includes("256GB")) multiplier = 1.1;
    if (selectedSize.includes("512GB")) multiplier = 1.25;
    if (selectedSize.includes("1TB")) multiplier = 1.4;
    // Clothing size pricing
    if (selectedSize === "L") multiplier = 1.05;
    if (selectedSize === "XL") multiplier = 1.1;
    if (selectedSize === "XXL") multiplier = 1.15;

    setCurrentPrice(Math.round(product.price * multiplier * 100) / 100);
  }, [selectedSize, product]);

  // Handle adding product to cart
  const handleAddToCart = () => {
    addToCart(
      { ...product, price: currentPrice },
      { color: selectedColor, size: selectedSize },
    );
    setIsAdded(true);
    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart.`,
      type: "success",
    });
    // Reset button state after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* back button  */}
      <Link href="/" className="cursor-pointer">
        <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent">
          <ArrowLeft className="mr-2" size={18} /> Back to browsing
        </Button>
      </Link>
      {/* images gallery  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductGallery
          images={product.images}
          thumbnail={product.thumbnail}
          title={product.title}
          productId={product.id}
        />
        {/* product details  */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge>{product.brand}</Badge>
              <Badge className="bg-bg-secondary text-slate-700 dark:bg-bg-secondary dark:text-slate-300">
                {product.category}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={
                      i < Math.floor(product.rating) ? "currentColor" : "none"
                    }
                    className={
                      i < Math.floor(product.rating) ? "" : "text-slate-300"
                    }
                  />
                ))}
                <span className="ml-2 text-slate-600 dark:text-slate-300 font-medium">
                  {product.rating}
                </span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-success-dark font-medium">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            {/* discount handling  */}
            <div className="text-4xl font-bold text-slate-900 dark:text-white">
              ${currentPrice.toFixed(2)}
              {product.discountPercentage > 0 && (
                <span className="text-lg font-normal text-slate-400 line-through ml-3">
                  $
                  {(
                    currentPrice /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            {product.description}
          </p>
          {/* product variants  */}
          <ProductVariants
            colors={product.colors}
            sizes={product.sizes}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
          {/* add to cart  */}
          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              className={`flex-1 h-14 text-lg gap-2 transition-all duration-300  outline-none focus:ring-0 hover:bg-success-dark ${isAdded ? "bg-success-dark hover:bg-success-hover outline-none focus:ring-0" : ""}`}
              disabled={product.stock === 0}
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                  <MotionDiv
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={24} /> Added to Cart
                  </MotionDiv>
                ) : (
                  <MotionDiv
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart size={20} /> Add to Cart
                  </MotionDiv>
                )}
              </AnimatePresence>
            </Button>
          </div>
          {/* AI assistant  */}
          <ProductAIAssistant product={product} />
        </div>
      </div>
    </div>
  );
}
