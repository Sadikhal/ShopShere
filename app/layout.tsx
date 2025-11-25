import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { ToastProvider } from "@/components/ui";
import { ThemeProvider } from "@/components/ui/theme";

const inter = Inter({ subsets: ["latin"] });

// Metadata for SEO
export const metadata: Metadata = {
  title: "ShopShere",
  description: "Modern E-Commerce Frontend Experience",
};

/**
 * - Provides theme context (light/dark mode)
 * - Provides toast notification context
 * - Sets up Inter font
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen flex flex-col transition-colors duration-300`}
      >
        {/* Theme Provider */}
        <ThemeProvider>
          {/* Toast Provider */}
          <ToastProvider>
            {/* Global Navigation */}
            <Navbar />

            {/* Page Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>

            {/* Global Footer */}
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
