import React from "react";

/**
 * Used to show loading states throughout the application
 */
export const Spinner = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="animate-spin w-8 h-8 border-4 border-slate-300 border-t-[#167091] rounded-full"></div>
  </div>
);
