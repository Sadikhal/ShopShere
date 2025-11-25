import type { Metadata } from "next";
import OrderHistoryClient from "@/components/OrderHistoryClient";


//  Static metadata for order history page

export const metadata: Metadata = {
  title: "Order History | ShopShere",
  description: "View your past orders, track shipments, and review order details.",
};

export default function OrdersPage() {
  return <OrderHistoryClient />;
}
