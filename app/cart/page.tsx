import type { Metadata } from "next";
import CartClient from "@/components/CartClient";

//   Static metadata for cart page
export const metadata: Metadata = {
  title: "Shopping Cart | ShopShere",
  description: "Review your cart items and proceed to checkout. Manage quantities and complete your purchase.",
};

//  CSR (Client-Side Rendering) for dynamic user interactions.

export default function CartPage() {
  return <CartClient />;
}
