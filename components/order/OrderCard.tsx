"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, Box, MapPin } from "lucide-react";
import { Order } from "@/types";

const MotionDiv = motion.div as any;

// Order status progression steps
const STATUS_STEPS = [
  { id: "placed", label: "Order Placed", icon: Box },
  { id: "packed", label: "Packed", icon: Package },
  { id: "shipped", label: "Shipped", icon: Truck },
  { id: "transit", label: "In Transit", icon: MapPin },
  { id: "delivered", label: "Delivered", icon: CheckCircle },
];

/**
 * OrderCard Component
 * Displays order details and tracking information
 * - Order ID, date, and total amount
 * - List of ordered items with images
 * - Visual status tracker showing order progress
 * - Animated entrance
 */
export const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-950 rounded-xl border border-border-light dark:border-border-light overflow-hidden shadow-sm"
    >
      <div className="p-6 border-b border-border-light dark:border-border-light flex flex-col md:flex-row justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <p className="text-sm text-slate-500">Order ID</p>
          <p className="font-mono font-bold">{order.id}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Date Placed</p>
          <p className="font-medium">
            {new Date(order.date).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Total Amount</p>
          <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4 mb-8">
          {order.items.map((item) => (
            <div key={item.cartItemId} className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-md overflow-hidden bg-bg-secondary">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-text-primary">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-500">
                  Qty: {item.quantity} × ${item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-8">
          <div className="absolute top-4 left-0 w-full h-0.5 bg-border-light dark:bg-border-light -z-0 hidden md:block" />
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative z-10">
            {STATUS_STEPS.map((step, index) => {
              const currentStatusIndex = STATUS_STEPS.findIndex(
                (s) => s.id === order.status,
              );
              const isCompleted = currentStatusIndex >= index;
              const isCurrent = currentStatusIndex === index;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className={`flex md:flex-col items-center gap-3 md:gap-2 ${isCompleted ? "text-primary dark:text-primary-light" : "text-slate-400"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white dark:bg-slate-950 transition-colors ${isCompleted ? "border-[#167091] bg-indigo-50 dark:bg-indigo-900/20" : "border-slate-300 dark:border-slate-700"}`}
                  >
                    <Icon size={14} />
                  </div>
                  <span
                    className={`text-xs font-medium ${isCurrent ? "font-bold" : ""}`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};
