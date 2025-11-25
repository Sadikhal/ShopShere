import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState, OrderState } from "@/types";

/**
 * Cart Store
 * Zustand store for managing shopping cart state
 * - Persisted to localStorage as 'cart-storage'
 * - Handles adding, removing, and updating cart items
 * - Calculates total price
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Add product to cart or increment quantity if already exists
      addToCart: (product, variant) =>
        set((state) => {
          // Create unique ID based on product and selected variants
          const cartItemId = `${product.id}-${variant?.color || "default"}-${variant?.size || "default"}`;
          const existing = state.items.find((i) => i.cartItemId === cartItemId);

          // If item already in cart, increment quantity
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cartItemId === cartItemId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            };
          }

          // Otherwise, add new item to cart
          return {
            items: [
              ...state.items,
              {
                ...product,
                cartItemId,
                quantity: 1,
                selectedColor: variant?.color,
                selectedSize: variant?.size,
              },
            ],
          };
        }),

      // Remove item from cart by ID
      removeFromCart: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== cartItemId),
        })),

      // Update item quantity (minimum 1)
      updateQuantity: (cartItemId, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.cartItemId === cartItemId
              ? { ...i, quantity: Math.max(1, qty) }
              : i,
          ),
        })),

      // Clear all items from cart
      clearCart: () => set({ items: [] }),

      // Calculate total price of all items
      totalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    { name: "cart-storage" },
  ),
);

/**
 * Order Store
 * Zustand store for managing order history
 * - Persisted to localStorage as 'order-history'
 * - Stores completed orders
 */
export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],

      // Add new order to history (prepends to array)
      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),
    }),
    { name: "order-history" },
  ),
);
