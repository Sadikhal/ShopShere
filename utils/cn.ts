/**
 * Utility Functions
 * Helper functions for styling and color mapping
 */

import { Product } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn (className) Utility
 * Merges Tailwind CSS classes intelligently
 * Combines clsx for conditional classes and tailwind-merge to resolve conflicts
 *
 * @param inputs - Class names or conditional class objects
 * @returns Merged className string
 *
 * Example:
 * cn('px-4 py-2', isActive && 'bg-blue-500', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * getColorClass Utility
 * Maps color names to Tailwind CSS background classes
 * Used for product variant color swatches
 *
 * @param colorName - Color name (e.g., "Red", "Blue", "Space Grey")
 * @returns Tailwind background class string
 *
 * Supports:
 * - Basic colors (black, white, red, blue, etc.)
 * - Material names (oak, walnut, tortoise)
 * - Tech colors (space grey, midnight green)
 */
export const getColorClass = (colorName: string) => {
  if (!colorName) return "bg-bg-tertiary";

  const normalized = colorName.toLowerCase();

  // Dark colors
  if (
    normalized.includes("black") ||
    normalized.includes("midnight") ||
    normalized.includes("ink")
  )
    return "bg-slate-900";

  // Light colors
  if (normalized.includes("white") || normalized.includes("starlight"))
    return "bg-white border border-slate-300";

  // Primary colors
  if (normalized.includes("red") || normalized.includes("crimson"))
    return "bg-danger";
  if (
    normalized.includes("blue") ||
    normalized.includes("navy") ||
    normalized.includes("azure")
  )
    return "bg-blue-700";
  if (
    normalized.includes("green") ||
    normalized.includes("emerald") ||
    normalized.includes("olive")
  )
    return "bg-green-600";
  if (normalized.includes("yellow") || normalized.includes("gold"))
    return "bg-yellow-400";

  // Neutral colors
  if (
    normalized.includes("silver") ||
    normalized.includes("grey") ||
    normalized.includes("gray")
  )
    return "bg-slate-400";

  // Accent colors
  if (normalized.includes("rose") || normalized.includes("pink"))
    return "bg-rose-400";
  if (
    normalized.includes("purple") ||
    normalized.includes("violet") ||
    normalized.includes("lavender")
  )
    return "bg-purple-600";
  if (normalized.includes("orange") || normalized.includes("coral"))
    return "bg-orange-500";

  // Material colors
  if (
    normalized.includes("brown") ||
    normalized.includes("tan") ||
    normalized.includes("leopard") ||
    normalized.includes("khaki")
  )
    return "bg-amber-800";
  if (normalized.includes("beige") || normalized.includes("cream"))
    return "bg-[#F5F5DC] border border-slate-300";
  if (normalized.includes("tortoise")) return "bg-amber-900";

  // Default fallback
  return "bg-slate-300";
};


/**
 * Enrich Product with Variants
 * Adds color and size options based on product category
 * Since the API doesn't provide variants, I generate them 
 */
export const enrichProduct = (product: any): Product => {
  let colors: string[] = [];
  let sizes: string[] = [];

  const category = product.category?.toLowerCase() || "";

  // Clothing & Fashion
  if (
    category.includes("shirt") ||
    category.includes("dress") ||
    category.includes("top") ||
    category.includes("women") ||
    category.includes("men") ||
    category.includes("fashion")
  ) {
    if (category.includes("shoe") || category.includes("sneaker")) {
      sizes = ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11"];
    } else if (
      category.includes("watch") ||
      category.includes("jewel") ||
      category.includes("bag") ||
      category.includes("glass")
    ) {
      sizes = ["One Size"];
    } else {
      sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    }

    if (category.includes("bag") || category.includes("leather")) {
      colors = ["Black", "Brown", "Tan", "Red"];
    } else if (category.includes("jewel") || category.includes("watch")) {
      colors = ["Gold", "Silver", "Rose Gold", "Black"];
    } else if (category.includes("glass")) {
      colors = ["Black", "Tortoise", "Gold", "Silver"];
    } else {
      colors = ["Black", "White", "Navy", "Red", "Green", "Beige"];
    }
  }
  // Electronics
  else if (
    category.includes("phone") ||
    category.includes("laptop") ||
    category.includes("tablet") ||
    category.includes("mobile") ||
    category.includes("electronic")
  ) {
    sizes = ["128GB", "256GB", "512GB", "1TB"];
    colors = [
      "Space Grey",
      "Silver",
      "Gold",
      "Midnight Green",
      "Phantom Black",
    ];
  }
  // Home, Furniture & Decor
  else if (
    category.includes("furniture") ||
    category.includes("decoration") ||
    category.includes("home")
  ) {
    sizes = ["Standard"];
    colors = ["Oak", "Walnut", "White", "Black", "Grey"];
  }
  // Beauty, Groceries & Skin Care
  else if (
    category.includes("beauty") ||
    category.includes("skin") ||
    category.includes("fragrance") ||
    category.includes("grocer")
  ) {
    sizes = ["Standard", "Large Pack"];
    colors = ["Original"];
  }
  // Automotive & Misc
  else {
    sizes = ["Standard"];
    colors = ["Original", "Black", "Red", "Blue"];
  }

  // Ensure unique values
  colors = [...new Set(colors)];
  sizes = [...new Set(sizes)];

  return {
    ...product,
    colors,
    sizes,
  };
};