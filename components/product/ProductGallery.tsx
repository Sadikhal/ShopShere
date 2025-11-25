"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const MotionDiv = motion.div as any;

interface ProductGalleryProps {
  images: string[];
  thumbnail: string;
  title: string;
  productId: number;
}

/**
 * ProductGallery Component
 * Interactive image gallery for product details
 * - Main image display with zoom on hover
 * - Thumbnail navigation
 * - Click thumbnails to change main image
 * - Animated transitions
 */
export const ProductGallery = ({
  images,
  thumbnail,
  title,
  productId,
}: ProductGalleryProps) => {
  // Track currently displayed image
  const [activeImage, setActiveImage] = useState(thumbnail);

  return (
    <div className="space-y-4">
      <MotionDiv
        layoutId={`product-image-${productId}`}
        className="aspect-square rounded-2xl overflow-hidden bg-bg-secondary dark:bg-bg-secondary border border-border-light dark:border-slate-700 relative group"
      >
        <Image
          src={activeImage}
          alt={title}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </MotionDiv>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImage(img)}
            className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all cursor-pointer ${activeImage === img ? "border-primary border-2" : "border-slate-200 border-1"}`}
          >
            <Image
              src={img}
              alt={`${title} view ${i + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
