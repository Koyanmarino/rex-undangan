'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Edit3,
  CheckCircle2,
  Share2,
  Calendar,
  CreditCard
} from 'lucide-react';
import { getStoredInvitation } from '@/data/storage';
import { TEMPLATES_DATA } from '@/data/templates';
import { InvitationData } from '@/data/initialInvitation';

export default function DashboardOverviewPage() {
  const [invitation, setInvitation] = useState<InvitationData>(getStoredInvitation());
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setInvitation(getStoredInvitation());
  }, []);

  const currentTemplate =
    TEMPLATES_DATA.find((t) => t.slug === invitation.templateSlug) || TEMPLATES_DATA[0];

  const totalGuests = invitation.guests.length;
  const attendingGuests = invitation.guests.filter((g) => g.rsvp === 'attending');
  const checkedInCount = invitation.guests.filter((g) => g.isCheckedIn).length;
  const totalWishes = invitation.wishes.length;

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/u/${invitation.slug}`
    : `https://rexundangan.com/u/${invitation.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-600 via-rose-700 to-pink-700 text-white shadow-xl shadow-rose-200/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm inline-block mb-3">
            Dashboard Pengantin
          </span>
          <h1 className="font-serif text-3xl font-bold">
            Halo, {invitation.groom.nickname} & {invitation.bride.nickname}!
          </h1>
          <p className="text-xs text-rose-100 mt-1 max-w-xl leading-relaxed">
            Undangan digital Anda saat ini berstatus{' '}
            <strong className="underline decoration-white/60">
              {invitation.status === 'active' ? 'AKTIF & SIAP DIBAGIKAN' : 'DRAF (PREVIEW GRATIS)'}
            </strong>
            . Bagikan link khusus atau lengkapi data melalui editor.
          </p>
        </div>

        <div className="flex gap-2">
          {invitation.status !== 'active' ? (
            <Link
              href="/dashboard/checkout"
              className="px-5 py-2.5 rounded-2xl bg-white text-rose-700 font-bold text-xs shadow-lg hover:bg-rose-50 transition-all flex items-center gap-1.5"
            >
              <CreditCard className="w-4 h-4" />
              Aktifkan Undangan
            </Link>
          ) : (
            <div className="px-4 py-2 rounded-2xl bg-emerald-500/30 border border-emerald-300 text-emerald-100 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              Paket Pro Aktif
            </div>
          )}
        </div>
      </div>

      {/* Public Share Box */}
      <div className="p-5 rounded-2xl bg-white border border-rose-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700">Link Utama Undangan:</p>
            <p className="font-mono text-sm font-bold text-rose-700">{publicUrl}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={handleCopyLink}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Salin Link
              </>
            )}
          </button>
          <Link
            href={`/u/${invitation.slug}`}
            target="_blank"
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Buka
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Total Tamu</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-800 mt-2">{totalGuests}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Tamu terdaftar di buku tamu</p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-600 font-medium">Konfirmasi Hadir</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="font-serif text-3xl font-bold text-emerald-700 mt-2">{attendingGuests.length}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Tamu konfirmasi RSVP hadir</p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-rose-600 font-medium">Check-In di Venue</span>
            <Calendar className="w-4 h-4 text-rose-500" />
          </div>
          <p className="font-serif text-3xl font-bold text-rose-700 mt-2">{checkedInCount}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Tamu sudah scan QR di resepsi</p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Doa & Ucapan</span>
            <MessageSquare className="w-4 h-4 text-slate-400" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-800 mt-2">{totalWishes}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Ucapan selamat yang masuk</p>
        </div>
      </div>

      {/* Active Template Showcase Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-24 rounded-2xl overflow-hidden relative shadow-md shrink-0">
            <img
              src={currentTemplate.thumbnail}
              alt={currentTemplate.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                {currentTemplate.themeType}
              </span>
              {currentTemplate.isCartoon && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  🎨 Animasi Kartun Non-Foto
                </span>
              )}
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900 mt-1">
              {currentTemplate.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
              {currentTemplate.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto">
          <Link
            href="/catalog"
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            Ganti Template (Katalog 35)
          </Link>
          <Link
            href="/dashboard/edit"
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Data Undangan
          </Link>
        </div>
      </div>
    </div>
  );
}
