"use client";

import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { CartItem } from "@/types";

const MotionDiv = motion.div as any;

interface CartItemListProps {
  items: CartItem[];
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
}
// cart handling
export const CartItemList = ({
  items,
  updateQuantity,
  removeFromCart,
}: CartItemListProps) => {
  return (
    <MotionDiv
      key="cart-list"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      {/* cart items  */}
      {items.map((item) => (
        <div
          key={item.cartItemId}
          className="flex gap-4 bg-white dark:bg-slate-950 p-4 rounded-xl border border-[#e2e8f0] dark:border-[#1E293B] shadow-sm"
        >
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover rounded-md bg-[#f1f5f9]"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-bold text-lg">{item.title}</h3>
              {/* remove item from cart  */}
              <button
                onClick={() => removeFromCart(item.cartItemId)}
                className="text-slate-400 hover:text-red-500 cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-2">
              {item.selectedColor &&
                item.selectedColor !== "Default" &&
                `Color: ${item.selectedColor} `}
              {item.selectedColor &&
                item.selectedColor !== "Default" &&
                item.selectedSize &&
                item.selectedSize !== "Standard" &&
                " | "}
              {item.selectedSize &&
                item.selectedSize !== "Standard" &&
                `Size: ${item.selectedSize} `}
            </p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-3 border border-[#e2e8f0] dark:border-slate-700 rounded-md p-1">
                {/* lower the quantity  */}
                <button
                  onClick={() =>
                    updateQuantity(item.cartItemId, item.quantity - 1)
                  }
                  className="p-1 hover:bg-[#f1f5f9] dark:hover:bg-[#1E293B] rounded cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-medium w-4 text-center">
                  {item.quantity}
                </span>
                {/* add quantity  */}
                <button
                  onClick={() =>
                    updateQuantity(item.cartItemId, item.quantity + 1)
                  }
                  className="p-1 hover:bg-[#f1f5f9] dark:hover:bg-[#1E293B] rounded cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="font-bold text-lg">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </MotionDiv>
  );
};
