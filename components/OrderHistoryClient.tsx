"use client";

import React, { useEffect, useState } from "react";
import { Box } from "lucide-react";
import { useOrderStore } from "@/lib/store";
import { OrderCard } from "@/components/order/OrderCard";

/**
 * OrderHistoryClient Component
 * Displays user's order history with:
 * - List of past orders
 * - Empty state when no orders exist
 * - Order details for each order
 */
export default function OrderHistoryClient() {
  const orders = useOrderStore((state) => state.orders);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex p-6 bg-bg-secondary dark:bg-bg-secondary rounded-full mb-4">
          <Box size={48} className="text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-text-primary mb-2">
          No orders yet
        </h2>
        <p className="text-slate-500">
          Looks like you haven't bought anything yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
