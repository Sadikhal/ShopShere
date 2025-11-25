import React from "react";
import { Spinner } from "@/components/ui";

//  * Loading Component

export default function Loading() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner />
        <p className="text-slate-500 animate-pulse">Loading shopshere...</p>
      </div>
    </div>
  );
}
