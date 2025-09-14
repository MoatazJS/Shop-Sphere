"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold">ShopSphere</span>
          </div>
          <p className="text-blue-200 text-sm text-center md:text-left">
            Your one-stop shop for everything stylish, affordable, and premium.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center">
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-blue-200 text-center">
            <li>
              <Link href="/products" className="hover:text-orange-400">
                Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-orange-400">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/brand" className="hover:text-orange-400">
                Brands
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-orange-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-orange-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-center">
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-6 justify-center">
            <Link href="https://facebook.com" target="_blank">
              <Facebook className="h-6 w-6 hover:text-orange-400" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Twitter className="h-6 w-6 hover:text-orange-400" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Instagram className="h-6 w-6 hover:text-orange-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-blue-600 mt-6">
        <p className="text-center text-blue-300 text-sm py-4">
          © {new Date().getFullYear()} ShopSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
