"use client";

import React, { createContext, useContext } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeContextType = {
  theme: string | undefined;
  setTheme: (theme: string) => void;
};

// dark and light mode context handling
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
    >
      {children}
    </NextThemesProvider>
  );
};
