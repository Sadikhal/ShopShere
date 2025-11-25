"use client";

import { Button } from "@/components/ui";

interface Props {
  subtotal: number;
  step: "cart" | "checkout" | "success";
  setStep: (step: "cart" | "checkout") => void;
  loading: boolean;
  isFormValid: boolean;
}

/**
 * OrderSummary - Displays order totals and action buttons
 * 
 * Shows:
 * - Subtotal, shipping (free), tax (8%), and total
 * - "Proceed to Checkout" button in cart view
 * - "Place Order" button (form submit) in checkout view
 *   - Disabled until form is valid (isFormValid)
 * - "Back to Cart" button in checkout view
 */
export const OrderSummary = ({
  subtotal,
  step,
  setStep,
  loading,
  isFormValid,
}: Props) => {
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-[#e2e8f0] dark:border-[#1E293B] sticky top-24">
      <h3 className="text-lg font-bold mb-4">Order Summary</h3>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Shipping</span>
          <span>Free</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Tax (Estimated)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-[#e2e8f0] dark:border-[#1E293B] pt-4 mb-6 flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {step === "cart" ? (
        <Button className="w-full h-12 text-base" onClick={() => setStep("checkout")}>
          Proceed to Checkout
        </Button>
      ) : (
        <div className="space-y-3">
          <Button
            form="checkout-form"
            type="submit"
            disabled={loading || !isFormValid}
            className="w-full h-12 text-base"
          >
            {loading ? "Processing..." : "Place Order"}
          </Button>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => setStep("cart")}
          >
            Back to Cart
          </Button>
        </div>
      )}
    </div>
  );
};
