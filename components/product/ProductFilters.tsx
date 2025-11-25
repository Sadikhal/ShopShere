"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui";

interface ProductFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  priceSort: "none" | "asc" | "desc";
  setPriceSort: (value: "none" | "asc" | "desc") => void;
}

/**
 * ProductFilters Component
 * Filter and search controls for product browsing
 * - Search bar with icon
 * - Category dropdown filter
 * - Price sorting (low to high, high to low)
 * - Sticky positioning for easy access while scrolling
 */
export const ProductFilters = ({
  search,
  setSearch,
  categories,
  selectedCategory,
  setSelectedCategory,
  priceSort,
  setPriceSort,
}: ProductFiltersProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-white dark:bg-slate-950 p-4 rounded-xl shadow-sm border border-border-light dark:border-border-light sticky top-20 z-40">
      <div className="relative w-full lg:w-96">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 outline-none"
          size={18}
        />
        <Input
          placeholder="Search products..."
          className="pl-10 focus:ring-[#1E293B]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-3 w-full lg:w-auto">
        <select
          className="h-10 px-3 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-2 focus:ring-[#1a2422] outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          className="h-10 px-3 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm focus:ring-2 focus:ring-[#1a2522] outline-none"
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value as any)}
        >
          <option value="none">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};
