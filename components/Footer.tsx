import Image from "next/image";
import Link from "next/link";
import React from "react";

// footer with logo and copyright
export const Footer = () => {
  return (
    <div className="bg-white dark:bg-slate-950 border-t border-[#e2e8f0] dark:border-[#1E293B] h-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Logo */}
          <Link href="/" className="cursor-pointer">
            <Image
              src="/logo8.png"
              alt="logo"
              width={70}
              height={70}
              className="object-contain rounded-full"
            />
          </Link>

          {/* Copyright text */}
          <p className="text-slate-500 dark:text-slate-400 text-sm text-center">
            © {new Date().getFullYear()} shopsphere E-Commerce.
          </p>
        </div>
      </div>
    </div>
  );
};
