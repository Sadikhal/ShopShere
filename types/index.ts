/**
 * Type Definitions
 * Central location for all TypeScript interfaces and types
 */

/**
 * Product Interface
 * Represents a product from the API with enriched variant data
 */
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  colors?: string[]; // Available color options
  sizes?: string[]; // Available size/storage options
}

/**
 * CartItem Interface
 * Extends Product with cart-specific properties
 */
export interface CartItem extends Product {
  cartItemId: string; // Unique ID: productId-color-size
  quantity: number; // Number of items
  selectedColor?: string; // User's selected color
  selectedSize?: string; // User's selected size
}

/**
 * Order Interface
 * Represents a completed order
 */
export interface Order {
  id: string; // Order ID (e.g., ORD-1234)
  date: string; // ISO date string
  items: CartItem[]; // Products in the order
  total: number; // Total price
  status: "placed" | "packed" | "shipped" | "transit" | "delivered";

  shippingInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
  };
}


/**
 * UserState Interface
 * User preferences and settings
 */
export interface UserState {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

/**
 * CartState Interface
 * Zustand store state for shopping cart
 */
export interface CartState {
  items: CartItem[];
  addToCart: (
    product: Product,
    variant?: { color?: string; size?: string },
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

/**
 * OrderState Interface
 * Zustand store state for order history
 */
export interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
}

/**
 * ToastProps Interface
 * Props for toast notification component
 */
export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  type?: "default" | "success" | "error";
  onDismiss: (id: string) => void;
}
