'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Heart, Menu, X, Sparkles, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-200 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                Rex Undangan
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 bg-rose-50 text-rose-600 rounded-full border border-rose-200">
                SaaS Digital
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/catalog" className="text-gray-700 hover:text-rose-600 font-medium transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-rose-500" />
              Katalog 35 Template
            </Link>
            <Link href="/catalog?cat=cartoon" className="text-gray-700 hover:text-rose-600 font-medium transition-colors">
              🎨 Animasi Kartun (Non-Foto)
            </Link>
            <Link href="/#pricing" className="text-gray-700 hover:text-rose-600 font-medium transition-colors">
              Harga & Paket
            </Link>
            <Link href="/#faq" className="text-gray-700 hover:text-rose-600 font-medium transition-colors">
              FAQ
            </Link>
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/u/romeo-juliet"
              target="_blank"
              className="px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50 rounded-xl transition-colors border border-rose-200"
            >
              Lihat Contoh Undangan
            </Link>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 rounded-xl shadow-md shadow-rose-200 transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <LayoutDashboard className="w-4 h-4" />
              Buka Dashboard
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-rose-600 hover:bg-rose-50"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-rose-100 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <Link
            href="/catalog"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-rose-600 rounded-md"
          >
            Katalog 35 Template
          </Link>
          <Link
            href="/catalog?cat=cartoon"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-rose-600 rounded-md"
          >
            🎨 Animasi Kartun (Non-Foto)
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-rose-600 rounded-md"
          >
            Harga & Paket
          </Link>
          <Link
            href="/u/romeo-juliet"
            target="_blank"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-rose-600 bg-rose-50 rounded-md"
          >
            Lihat Contoh Undangan
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="w-full mt-2 px-4 py-2.5 text-center font-medium text-white bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl block shadow-sm"
          >
            Masuk ke Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
