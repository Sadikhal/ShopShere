"use client";
import React, { createContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { ToastProps } from "@/types";
import { cn } from "@/utils/cn";

type ToastContextType = {
  toast: (props: Omit<ToastProps, "id" | "onDismiss">) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

/**
 * ToastProvider Component
 * Provides toast notification functionality throughout the app
 * - Displays temporary notifications at bottom-right
 * - Auto-dismisses after 5 seconds
 * - Supports success and error types
 * - Manual dismiss option
 */
export const ToastProvider = ({ children }: { children?: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  // Add a new toast notification
  const toast = useCallback(
    ({
      title,
      description,
      type = "default",
    }: Omit<ToastProps, "id" | "onDismiss">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [
        ...prev,
        { id, title, description, type, onDismiss: dismiss },
      ]);
      // Auto-dismiss after 5 seconds
      setTimeout(() => dismiss(id), 5000);
    },
    [],
  );

  // Remove a toast by ID
  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-4 max-w-md w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex w-full items-start gap-4 rounded-lg border p-4 shadow-lg transition-all animate-in slide-in-from-right-full",
              t.type === "default" &&
              "bg-white dark:bg-slate-950 border-border-light dark:border-border-light",
              t.type === "success" &&
              "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
              t.type === "error" &&
              "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
            )}
            role="alert"
          >
            {t.type === "success" && (
              <CheckCircle className="h-5 w-5 text- dark:text-success shrink-0" />
            )}
            {t.type === "error" && (
              <AlertCircle className="h-5 w-5 text-danger dark:text-red-400 shrink-0" />
            )}
            <div className="grid gap-1">
              {t.title && (
                <h5 className="text-sm font-semibold text-slate-900 dark:text-text-primary">
                  {t.title}
                </h5>
              )}
              {t.description && (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {t.description}
                </div>
              )}
            </div>
            <button
              onClick={() => t.onDismiss(t.id)}
              className="ml-auto text-slate-500 hover:text-slate-900 dark:hover:text-text-primary cursor-pointer"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
