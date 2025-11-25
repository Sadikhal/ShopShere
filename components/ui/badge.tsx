import React from "react";
import { cn } from "@/utils/cn";

/**
 * Badge Component
 * Small label for displaying metadata like categories, tags, or status
 */
export const Badge = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900 px-2.5 py-0.5 text-xs font-semibold text-indigo-800 dark:text-indigo-100",
      className,
    )}
  >
    {children}
  </span>
);
