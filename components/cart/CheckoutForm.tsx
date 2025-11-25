"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Truck, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui";

  // Zod validation schema for checkout form

const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().regex(/^\d+$/, "ZIP must be numeric"),
  card: z.string().regex(/^\d{13,19}$/, "Card number must be 13-19 digits"),
  exp: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration must be MM/YY"),
  cvc: z.string().regex(/^\d{3}$/, "CVC must be exactly 3 digits"),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;

interface Props {
  onSubmit: (data: CheckoutValues) => void;
  onValidChange: (valid: boolean) => void;
}

//  * CheckoutForm - Validation checkout form using react-hook-form and Zod 

export const CheckoutForm = ({ onSubmit, onValidChange }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
  });

  // Send validity to parent on every change
  useEffect(() => {
    onValidChange(isValid);
  }, [isValid]);

  return (
    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        key="checkout-form"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-[#e2e8f0] dark:border-[#1E293B] space-y-4"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Truck size={20} /> Shipping Information
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {/* NAME */}
          <div>
            <Input {...register("name")} placeholder="Full Name" />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <Input {...register("email")} placeholder="Email Address" />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {/* ADDRESS */}
          <div className="col-span-2">
            <Input {...register("address")} placeholder="Street Address" />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
          </div>

          {/* CITY */}
          <div>
            <Input {...register("city")} placeholder="City" />
            {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
          </div>

          {/* ZIP */}
          <div>
            <Input {...register("zip")} placeholder="ZIP Code" />
            {errors.zip && <p className="mt-1 text-sm text-red-600">{errors.zip.message}</p>}
          </div>
        </div>

        <h3 className="text-lg font-semibold flex items-center gap-2 mt-8 mb-4">
          <CreditCard size={20} /> Payment (Simulated)
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {/* CARD */}
          <div>
            <Input {...register("card")} placeholder="Card Number (Dummy Only)" />
            {errors.card && <p className="mt-1 text-sm text-red-600">{errors.card.message}</p>}
          </div>

          {/* EXP */}
          <div>
            <Input {...register("exp")} placeholder="MM/YY" />
            {errors.exp && <p className="mt-1 text-sm text-red-600">{errors.exp.message}</p>}
          </div>

          {/* CVC */}
          <div>
            <Input {...register("cvc")} placeholder="CVC" />
            {errors.cvc && <p className="mt-1 text-sm text-red-600">{errors.cvc.message}</p>}
          </div>
        </div>
      </motion.div>
    </form>
  );
};
