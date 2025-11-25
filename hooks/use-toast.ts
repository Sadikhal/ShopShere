import { useContext } from "react";
import { ToastContext } from "@/components/ui/toast";

/**
 * useToast Hook
 * Provides access to toast notification system
 * Must be used within a ToastProvider component
 * @returns {toast} - Function to show toast notifications
 * @throws Error if used outside ToastProvider
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
