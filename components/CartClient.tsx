"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CreditCard, CheckCircle, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore, useOrderStore } from "@/lib/store";
import { Button, useToast } from "@/components/ui";
import { Order } from "@/types";
import { CartItemList } from "@/components/cart/CartItemList";
import { CheckoutForm, CheckoutValues } from "@/components/cart/CheckoutForm";
import { OrderSummary } from "@/components/cart/OrderSummary";

/**
 * CartClient - Main cart and checkout flow component
 * 
 * Manages three states:
 * - Cart view: Display items with quantity controls
 * - Checkout view: Form validation with react-hook-form + Zod
 * - Success view: Order confirmation
 * 
 * Uses CSR for interactive cart management and order placement.
 */
export default function CartClient() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const { toast } = useToast();

  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleValidatedSubmit = (data: CheckoutValues) => {
    setLoading(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        items: [...items],
        total: totalPrice(),
        status: "placed",
        shippingInfo: {
          name: data.name,
          address: data.address,
          city: data.city,
          zip: data.zip,
          email: data.email,
        },
      };

      addOrder(newOrder);
      clearCart();

      setLoading(false);
      setStep("success");

      toast({
        title: "Order Placed",
        description: `Order ${newOrder.id} confirmed!`,
        type: "success",
      });
    }, 2000);
  };

  if (items.length === 0 && step === "cart") {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link href="/"><Button>Start Shopping</Button></Link>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
        </motion.div>

        <h2 className="text-3xl font-bold mb-2">Order Placed Successfully!</h2>
        <p className="text-slate-500 mb-8">
          Thank you for your purchase. You can track your order in history.
        </p>

        <div className="flex gap-4">
          <Link href="/orders"><Button>View Orders</Button></Link>
          <Link href="/"><Button variant="outline">Continue Shopping</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          {step === "cart" ? (
            <>
              <ShoppingCart /> Shopping Cart
            </>
          ) : (
            <>
              <CreditCard /> Checkout
            </>
          )}
        </h2>

        <AnimatePresence mode="wait">
          {step === "cart" ? (
            <CartItemList items={items} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
          ) : (
            <CheckoutForm 
              onSubmit={handleValidatedSubmit} 
              onValidChange={setIsFormValid} 
            />
          )}
        </AnimatePresence>
      </div>

      <div className="lg:col-span-1">
        <OrderSummary
          subtotal={totalPrice()}
          step={step}
          setStep={setStep}
          loading={loading}
          isFormValid={isFormValid}
        />
      </div>
    </div>
  );
}
