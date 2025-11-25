import React from "react";
import { cn } from "@/utils/cn";

/**
 * Button Component
 * Reusable button with multiple variants and sizes
 *
 * Variants:
 * - primary: Main action button (blue)
 * - outline: Secondary button with border
 * - ghost: Transparent button
 * - danger: Destructive action (red)
 *
 * Sizes:
 * - default: Standard button
 * - sm: Small button
 * - lg: Large button
 * - icon: Square button for icons
 */
export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline" | "ghost" | "danger";
    size?: "default" | "sm" | "lg" | "icon";
  }
>(({ className, variant = "primary", size = "default", ...props }, ref) => {
  // Variant styles
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-sm",
    outline:
      "border border-border-light dark:border-slate-700 bg-transparent hover:bg-bg-secondary dark:hover:bg-bg-secondary text-slate-900 dark:text-text-primary",
    ghost:
      "bg-transparent hover:bg-bg-secondary dark:hover:bg-bg-secondary text-slate-700 dark:text-slate-300",
    danger: "bg-danger text-white hover:bg-danger-hover",
  };

  // Size styles
  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-9 rounded-md px-3 text-xs",
    lg: "h-11 rounded-md px-8 text-base",
    icon: "h-10 w-10",
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";
