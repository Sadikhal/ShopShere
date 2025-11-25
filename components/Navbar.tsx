"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";

const MotionDiv = motion.div as any;

/**
 * Navbar Component
 * - Logo and brand
 * - Navigation links (Explore, Orders)
 * - Shopping cart with item count badge
 * - Theme toggle
 * - Responsive mobile menu
 */
export default function Navbar() {
  // Get cart items from store
  const items = useCartStore((state) => state.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate total items in cart
  const cartCount = mounted
    ? items.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent rendering until mounted
  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-border-light dark:border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 bg-transparent cursor-pointer">
            <Image
              src="/logo8.png"
              alt="logo"
              width={100}
              height={100}
              className="object-contain rounded-full"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors 
                ${pathname === "/"
                  ? "text-primary dark:text-primary-light"
                  : "hover:text-primary dark:hover:text-primary-light"
                }`}
            >
              Explore
            </Link>

            <Link
              href="/orders"
              className={`text-sm font-medium transition-colors 
                ${pathname === "/orders"
                  ? "text-primary dark:text-primary-light"
                  : "hover:text-primary dark:hover:text-primary-light"
                }`}
            >
              Orders
            </Link>
          </div>

          {/* Desktop - Theme Toggle and Cart */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-bg-secondary dark:hover:bg-bg-secondary transition-colors cursor-pointer"
            >
              <ShoppingCart size={20} />
              {/* Cart count badge */}
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-danger rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile - Theme Toggle, Cart, and Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <Link href="/cart" className="relative p-2 cursor-pointer">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-danger rounded-full text-[10px] text-white flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Mobile menu toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 cursor-pointer">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-950 border-b border-border-light dark:border-border-light overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors 
                  ${pathname === "/"
                    ? "text-[#167091] dark:text-[#59cbf4]"
                    : "hover:bg-[#f1f5f9] dark:hover:bg-[#1E293B]"
                  }`}
              >
                Explore Products
              </Link>

              <Link
                href="/orders"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors 
                  ${pathname === "/orders"
                    ? "text-[#167091] dark:text-[#309ec7]"
                    : "hover:bg-[#f1f5f9] dark:hover:bg-[#1E293B]"
                  }`}
              >
                Order History
              </Link>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </nav>
  );
}
