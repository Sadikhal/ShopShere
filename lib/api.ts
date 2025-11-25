/**
 * API Module
 * Handles all external API calls to dummyjson.com
 * - Fetches products with pagination, search, and filtering
 * - Enriches products with variant data (colors, sizes)
 * - Fetches individual product details
 * - Fetches available categories
 */

import axios from "axios";
import { Product } from "@/types";
import { enrichProduct } from "@/utils/cn";

const API_URL = "https://dummyjson.com/products";

/**
 * Fetch Products
 * Retrieves products from API with optional filtering
 * @param skip - Number of products to skip (for pagination)
 * @param limit - Maximum number of products to return
 * @param category - Filter by category (optional)
 * @param search - Search query (optional)
 * @returns Promise with products array and total count
 */
export const fetchProducts = async (
  skip: number = 0,
  limit: number = 20,
  category?: string,
  search?: string,
): Promise<{ products: Product[]; total: number }> => {
  try {
    let url = `${API_URL}`;
    const params: any = { limit, skip };

    // Use search endpoint if search query provided
    if (search) {
      url = `${API_URL}/search`;
      params.q = search;
    }
    // Use category endpoint if category filter provided
    else if (category && category !== "all") {
      url = `${API_URL}/category/${category}`;
    }

    const response = await axios.get(url, { params });
    // Enrich all products with variant data
    const enrichedProducts = response.data.products.map(enrichProduct);

    return { products: enrichedProducts, total: response.data.total };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0 };
  }
};

/**
 * Fetch Product by ID
 * Retrieves a single product's details
 * @param id - Product ID
 */
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return enrichProduct(response.data);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

/**
 * Fetch Categories
 * Retrieves all available product categories
 * @returns Promise with array of category names
 */
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    if (Array.isArray(response.data)) {
      return response.data.map((c: any) =>
        typeof c === "string" ? c : c.slug || c.name,
      );
    }
    return [];
  } catch (error) {
    return [];
  }
};
