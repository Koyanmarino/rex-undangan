import Link from 'next/link';
import { Heart, Sparkles, ShieldCheck, Mail, Phone, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-wide">
                Rex Undangan
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Platform pembuatan web undangan pernikahan online modern, responsif, dan lengkap dengan 35 katalog template (30 foto & 5 animasi kartun syar'i).
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Katalog Template</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/catalog?cat=cartoon" className="hover:text-rose-400 transition-colors">🎨 5 Animasi Kartun (Non-Foto)</Link></li>
              <li><Link href="/catalog?cat=minimalist" className="hover:text-rose-400 transition-colors">Minimalist & Clean (5)</Link></li>
              <li><Link href="/catalog?cat=floral" className="hover:text-rose-400 transition-colors">Floral & Botanical (5)</Link></li>
              <li><Link href="/catalog?cat=traditional" className="hover:text-rose-400 transition-colors">Adat Tradisional Nusantara (5)</Link></li>
              <li><Link href="/catalog?cat=luxury" className="hover:text-rose-400 transition-colors">Luxury Royal Gold (5)</Link></li>
              <li><Link href="/catalog?cat=islamic" className="hover:text-rose-400 transition-colors">Islamic & Arabian (5)</Link></li>
              <li><Link href="/catalog?cat=rustic" className="hover:text-rose-400 transition-colors">Rustic Bohemian (5)</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Fitur Unggulan</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-rose-400" /> Form Builder Anti-Rusak</li>
              <li className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-rose-400" /> WhatsApp Blast Generator</li>
              <li className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-rose-400" /> QR Code Check-in di Venue</li>
              <li className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-rose-400" /> Amplop Digital & QRIS</li>
              <li className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-rose-400" /> Musik Latar & Buku Tamu</li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Pembayaran Aman</h4>
            <p className="text-sm text-slate-400 mb-3">
              Didukung integrasi Midtrans otomatis dengan QRIS instan, GoPay, ShopeePay, dan Virtual Account semua bank.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verifikasi Pembayaran Instan
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Rex Undangan. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400">Kebijakan Privasi</a>
            <a href="#" className="hover:text-slate-400">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-slate-400">Bantuan CS WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
