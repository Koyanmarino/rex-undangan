'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Heart,
  LayoutDashboard,
  Edit3,
  Users,
  MessageSquare,
  CreditCard,
  Eye,
  ExternalLink,
  QrCode
} from 'lucide-react';
import { getStoredInvitation } from '@/data/storage';
import { useState, useEffect } from 'react';
import { InvitationData } from '@/data/initialInvitation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [invitation, setInvitation] = useState<InvitationData>(getStoredInvitation());

  useEffect(() => {
    setInvitation(getStoredInvitation());
  }, [pathname]);

  const navItems = [
    { href: '/dashboard', label: 'Ringkasan', icon: LayoutDashboard },
    { href: '/dashboard/edit', label: 'Editor Undangan', icon: Edit3 },
    { href: '/dashboard/guests', label: 'Buku Tamu & WA Blast', icon: Users },
    { href: '/dashboard/wishes', label: 'Moderasi Doa & Ucapan', icon: MessageSquare },
    { href: '/dashboard/checkout', label: 'Aktivasi & Pembayaran', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="font-serif text-xl font-bold text-slate-900 tracking-tight">
                Rex Undangan
              </span>
            </Link>
          </div>

          {/* Invitation Status Card */}
          <div className="p-4 m-4 rounded-2xl bg-rose-50/70 border border-rose-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold text-rose-700 tracking-wider">
                Status Undangan
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  invitation.status === 'active'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {invitation.status === 'active' ? '● Aktif' : '● Draf'}
              </span>
            </div>
            <p className="font-serif text-sm font-bold text-slate-800 truncate">
              {invitation.title}
            </p>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">
              /u/{invitation.slug}
            </p>
          </div>

          {/* Nav Items */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-sm shadow-rose-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick External Links */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <Link
            href={`/u/${invitation.slug}`}
            target="_blank"
            className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 text-xs font-medium flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-rose-600" />
              Buka Web Undangan
            </span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <Link
            href={`/checkin/${invitation.slug}`}
            target="_blank"
            className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-medium flex items-center justify-between transition-colors shadow-sm"
          >
            <span className="flex items-center gap-2">
              <QrCode className="w-3.5 h-3.5 text-rose-400" />
              Scan QR di Venue
            </span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
