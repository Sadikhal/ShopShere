"use client";

import React from "react";
import { getColorClass } from "@/components/ui";

interface ProductVariantsProps {
  colors?: string[];
  sizes?: string[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

/**
 * ProductVariants Component
 * Allows users to select product variants
 * - Color selection with visual swatches
 * - Size/option selection with buttons
 * - Highlights currently selected options
 * - Shows selected values in header
 */
export const ProductVariants = ({
  colors,
  sizes,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
}: ProductVariantsProps) => {
  return (
    <div className="">
      {colors && colors.length > 0 && !colors.includes("Original") && (
        <div className="space-y-6 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-border-light dark:border-border-light">
          <span className="text-sm font-semibold text-slate-900 dark:text-text-primary block mb-3">
            Select Color:{" "}
            <span className="text-primary font-normal">{selectedColor}</span>
          </span>
          <div className="flex flex-wrap gap-3">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                title={c}
                className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${selectedColor === c ? "border-slate-900 dark:border-white scale-110" : "border-slate-300 dark:border-slate-600"}`}
              >
                <span
                  className={`w-8 h-8 rounded-full shadow-inner ${getColorClass(c)}`}
                ></span>
              </button>
            ))}
          </div>
        </div>
      )}

      {sizes && sizes.length > 0 && !sizes.includes("Standard") && (
        <div>
          <span className="text-sm font-semibold text-slate-900 dark:text-text-primary block mt-3">
            Select Size / Option:{" "}
            <span className="text-primary font-normal">{selectedSize}</span>
          </span>
          <div className="flex flex-wrap gap-3 pt-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`min-w-[3rem] px-3 h-10 rounded-lg font-medium transition-all cursor-pointer ${selectedSize === s ? "bg-primary text-white shadow-lg shadow-indigo-500/30" : "bg-white dark:bg-bg-secondary text-slate-700 dark:text-slate-300 border border-border-light dark:border-slate-700 hover:border-indigo-300"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
