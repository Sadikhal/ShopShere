import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Product } from "@/types";
import { getColorClass } from "@/components/ui";

const MotionDiv = motion.div as any;

/**
 * ProductCard Component
 * Displays product information in a card format with:
 * - Product image with hover zoom effect
 * - Discount badge
 * - Title, category, price, and rating
 * - Available color swatches
 * - Animated entrance and hover effects
 */
export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/product/${product.id}`} className="block group cursor-pointer">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-slate-950 rounded-xl overflow-hidden border border-border-light dark:border-border-light shadow-sm hover:shadow-xl transition-all duration-300 mb-6"
      >
        {/* Product Image Container */}
        <div className="relative aspect-4/3 overflow-hidden bg-bg-secondary dark:bg-slate-900">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {product.discountPercentage > 0 && (
            <span className="absolute top-2 left-2 bg-success text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-10">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>
        {/* Product Information */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-md font-bold text-slate-900 dark:text-text-primary line-clamp-1">
              {product.title}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
            {product.category}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-col mt-2">
              <span className="text-lg font-bold text-primary dark:text-primary-light">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-slate-400 line-through">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex flex-col ">
              <div className="flex items-center gap-1 text-accent-yellow">
                <Star size={14} fill="currentColor" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {product.rating}
                </span>
              </div>
              {product.colors &&
                product.colors.length > 0 &&
                !product.colors.includes("Original") && (
                  <div className="flex items-center gap-1 mt-3 h-4">
                    {product.colors.slice(0, 4).map((c, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full border border-border-light dark:border-slate-600 ${getColorClass(c)}`}
                        title={c}
                      />
                    ))}
                    {product.colors.length > 4 && (
                      <span className="text-[10px] text-slate-400">
                        +{product.colors.length - 4}
                      </span>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      </MotionDiv>
    </Link>
  );
};
