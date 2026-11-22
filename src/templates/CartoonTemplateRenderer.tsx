'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Calendar, MapPin, Clock, Gift, Copy, Check, MessageSquare, Send, Sparkles, QrCode } from 'lucide-react';
import { InvitationData, WishItem } from '@/data/initialInvitation';
import { TemplateItem } from '@/data/templates';
import CountdownTimer from '@/components/CountdownTimer';
import { fireWeddingConfetti } from '@/components/ConfettiButton';
import QrCodeModal from '@/components/QrCodeModal';

interface CartoonTemplateRendererProps {
  invitation: InvitationData;
  template: TemplateItem;
  guestName?: string;
  onOpenInvitation: () => void;
  isOpen: boolean;
  onAddWish: (name: string, relationship: string, message: string) => void;
  onRsvp: (rsvp: 'attending' | 'declined' | 'maybe', pax: number) => void;
}

export default function CartoonTemplateRenderer({
  invitation,
  template,
  guestName = 'Tamu Undangan',
  onOpenInvitation,
  isOpen,
  onAddWish,
  onRsvp,
}: CartoonTemplateRendererProps) {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [wishName, setWishName] = useState(guestName !== 'Tamu Undangan' ? guestName : '');
  const [wishRel, setWishRel] = useState('Sahabat');
  const [wishMsg, setWishMsg] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'declined' | 'maybe'>('attending');
  const [rsvpPax, setRsvpPax] = useState(2);
  const [isRsvpSubmitted, setIsRsvpSubmitted] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(id);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName || !wishMsg) return;
    onAddWish(wishName, wishRel, wishMsg);
    setWishMsg('');
    fireWeddingConfetti();
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRsvp(rsvpStatus, rsvpPax);
    setIsRsvpSubmitted(true);
    fireWeddingConfetti();
  };

  // Avatar illustration mapping
  const renderCartoonIllustration = () => {
    switch (template.slug) {
      case 'cartoon-syari':
        return (
          <div className="relative w-64 h-64 mx-auto my-6 flex items-center justify-center">
            {/* Soft glowing aura */}
            <div className="absolute inset-0 bg-emerald-200/50 rounded-full blur-2xl animate-pulse" />
            <div className="relative z-10 w-56 h-56 rounded-full border-4 border-emerald-300 p-2 bg-gradient-to-b from-emerald-50 to-teal-100 shadow-xl flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-md">
                {/* Background decorative crescent & flowers */}
                <circle cx="100" cy="100" r="90" fill="#e6f4ea" />
                <path d="M140,50 Q160,80 140,110 Q120,80 140,50" fill="#34a853" opacity="0.2" />
                {/* Groom Syar'i (Right) */}
                <circle cx="130" cy="85" r="28" fill="#fce5cd" />
                <path d="M102,70 Q130,55 158,70 L155,62 Q130,50 105,62 Z" fill="#2d3748" /> {/* Peci */}
                <path d="M105,115 Q130,120 155,115 L160,180 L100,180 Z" fill="#ffffff" /> {/* Baju Koko */}
                <circle cx="120" cy="85" r="3" fill="#2d3748" />
                <circle cx="138" cy="85" r="3" fill="#2d3748" />
                <path d="M125,95 Q130,100 135,95" stroke="#2d3748" strokeWidth="2" fill="none" />
                {/* Bride Syar'i (Left) */}
                <circle cx="70" cy="88" r="28" fill="#fce5cd" />
                {/* Hijab Syar'i */}
                <path d="M42,90 Q40,48 70,48 Q100,48 98,90 Q105,145 70,165 Q35,145 42,90 Z" fill="#059669" />
                <circle cx="70" cy="90" r="22" fill="#fce5cd" />
                {/* Hijab Inner Wrap */}
                <path d="M48,82 Q70,65 92,82 Q90,125 70,135 Q50,125 48,82 Z" fill="#059669" opacity="0.3" />
                {/* Face details */}
                <circle cx="62" cy="88" r="3" fill="#2d3748" />
                <circle cx="78" cy="88" r="3" fill="#2d3748" />
                <path d="M66,98 Q70,102 74,98" stroke="#2d3748" strokeWidth="2" fill="none" />
                <circle cx="58" cy="94" r="4" fill="#f87171" opacity="0.4" /> {/* Blush */}
                <circle cx="82" cy="94" r="4" fill="#f87171" opacity="0.4" /> {/* Blush */}
                {/* Syar'i Dress Body */}
                <path d="M40,125 Q70,130 100,125 L108,180 L32,180 Z" fill="#10b981" />
                {/* Heart Center */}
                <path d="M100,135 C95,128 85,130 85,138 C85,145 100,155 100,155 C100,155 115,145 115,138 C115,130 105,128 100,135 Z" fill="#ef4444" />
              </svg>
            </div>
          </div>
        );

      case 'cartoon-adat':
        return (
          <div className="relative w-64 h-64 mx-auto my-6 flex items-center justify-center">
            <div className="absolute inset-0 bg-amber-200/50 rounded-full blur-2xl animate-pulse" />
            <div className="relative z-10 w-56 h-56 rounded-full border-4 border-amber-400 p-2 bg-gradient-to-b from-amber-50 to-orange-100 shadow-xl flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-md">
                <circle cx="100" cy="100" r="90" fill="#fef3c7" />
                {/* Groom with Blangkon Jawa */}
                <circle cx="130" cy="88" r="26" fill="#fed7aa" />
                {/* Blangkon */}
                <path d="M104,78 Q130,55 156,78 Q158,68 145,60 Q130,55 115,60 Z" fill="#78350f" />
                <circle cx="154" cy="82" r="5" fill="#78350f" /> {/* Mondholan */}
                <path d="M108,118 L152,118 L158,180 L102,180 Z" fill="#1e293b" /> {/* Beskap */}
                <circle cx="122" cy="88" r="3" fill="#1e293b" />
                <circle cx="138" cy="88" r="3" fill="#1e293b" />
                <path d="M126,97 Q130,101 134,97" stroke="#1e293b" strokeWidth="2" fill="none" />
                {/* Bride with Paes & Sanggul */}
                <circle cx="70" cy="88" r="26" fill="#fed7aa" />
                {/* Sanggul & Cunduk Mentul */}
                <circle cx="70" cy="62" r="14" fill="#1e293b" />
                <line x1="70" y1="52" x2="70" y2="38" stroke="#d97706" strokeWidth="3" />
                <circle cx="70" cy="36" r="4" fill="#fbbf24" />
                <line x1="60" y1="54" x2="52" y2="42" stroke="#d97706" strokeWidth="2" />
                <circle cx="50" cy="40" r="3" fill="#fbbf24" />
                <line x1="80" y1="54" x2="88" y2="42" stroke="#d97706" strokeWidth="2" />
                <circle cx="90" cy="40" r="3" fill="#fbbf24" />
                {/* Paes black curved lines */}
                <path d="M52,78 Q70,90 88,78" fill="#1e293b" />
                <circle cx="62" cy="88" r="3" fill="#1e293b" />
                <circle cx="78" cy="88" r="3" fill="#1e293b" />
                <path d="M66,97 Q70,101 74,97" stroke="#1e293b" strokeWidth="2" fill="none" />
                <circle cx="58" cy="94" r="4" fill="#f43f5e" opacity="0.4" />
                <circle cx="82" cy="94" r="4" fill="#f43f5e" opacity="0.4" />
                {/* Kebaya Tradisional */}
                <path d="M48,118 L92,118 L96,180 L44,180 Z" fill="#991b1b" />
                {/* Kalung Melati */}
                <path d="M55,118 Q70,135 85,118" stroke="#fef08a" strokeWidth="3" fill="none" />
              </svg>
            </div>
          </div>
        );

      case 'cartoon-fairytale':
        return (
          <div className="relative w-64 h-64 mx-auto my-6 flex items-center justify-center">
            <div className="absolute inset-0 bg-purple-200/50 rounded-full blur-2xl animate-pulse" />
            <div className="relative z-10 w-56 h-56 rounded-full border-4 border-purple-300 p-2 bg-gradient-to-b from-purple-50 to-indigo-100 shadow-xl flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-md">
                <circle cx="100" cy="100" r="90" fill="#faf5ff" />
                {/* Floating Firefly orbs */}
                <circle cx="40" cy="40" r="4" fill="#fde047" className="animate-ping" />
                <circle cx="160" cy="50" r="5" fill="#fde047" className="animate-bounce" />
                <circle cx="35" cy="150" r="4" fill="#fde047" />
                {/* Prince (Right) */}
                <circle cx="130" cy="85" r="26" fill="#fcd34d" opacity="0.2" />
                <circle cx="130" cy="85" r="24" fill="#fed7aa" />
                <path d="M108,72 Q130,55 152,72" fill="#78350f" />
                <circle cx="122" cy="85" r="3" fill="#1e1b4b" />
                <circle cx="138" cy="85" r="3" fill="#1e1b4b" />
                <path d="M126,94 Q130,98 134,94" stroke="#1e1b4b" strokeWidth="2" fill="none" />
                <path d="M110,112 L150,112 L155,180 L105,180 Z" fill="#312e81" /> {/* Royal Coat */}
                {/* Princess (Left) with Tiara */}
                <circle cx="70" cy="85" r="24" fill="#fed7aa" />
                <path d="M48,75 Q70,55 92,75 Q96,120 44,120 Z" fill="#92400e" /> {/* Long hair */}
                <circle cx="70" cy="85" r="22" fill="#fed7aa" />
                {/* Tiara */}
                <polygon points="60,65 65,55 70,63 75,55 80,65" fill="#eab308" />
                <circle cx="62" cy="85" r="3" fill="#1e1b4b" />
                <circle cx="78" cy="85" r="3" fill="#1e1b4b" />
                <path d="M66,94 Q70,98 74,94" stroke="#1e1b4b" strokeWidth="2" fill="none" />
                <path d="M45,112 Q70,120 95,112 L105,180 L35,180 Z" fill="#a855f7" /> {/* Princess Gown */}
              </svg>
            </div>
          </div>
        );

      case 'cartoon-chibi':
        return (
          <div className="relative w-64 h-64 mx-auto my-6 flex items-center justify-center">
            <div className="absolute inset-0 bg-pink-200/50 rounded-full blur-2xl animate-pulse" />
            <div className="relative z-10 w-56 h-56 rounded-full border-4 border-pink-300 p-2 bg-gradient-to-b from-pink-50 to-rose-100 shadow-xl flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-md">
                <circle cx="100" cy="100" r="90" fill="#fff1f2" />
                {/* Heart Balloons */}
                <circle cx="100" cy="35" r="14" fill="#f43f5e" />
                <circle cx="118" cy="40" r="10" fill="#fb7185" />
                <line x1="100" y1="49" x2="100" y2="80" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2" />
                {/* Chibi Boy */}
                <circle cx="130" cy="100" r="26" fill="#fed7aa" />
                <circle cx="122" cy="100" r="4" fill="#18181b" />
                <circle cx="138" cy="100" r="4" fill="#18181b" />
                <circle cx="123" cy="98" r="1.5" fill="#ffffff" />
                <circle cx="139" cy="98" r="1.5" fill="#ffffff" />
                <circle cx="116" cy="106" r="4" fill="#f43f5e" opacity="0.4" />
                <circle cx="144" cy="106" r="4" fill="#f43f5e" opacity="0.4" />
                <path d="M126,110 Q130,115 134,110" stroke="#18181b" strokeWidth="2" fill="none" />
                <rect x="115" y="128" width="30" height="40" rx="8" fill="#3b82f6" />
                {/* Chibi Girl */}
                <circle cx="70" cy="100" r="26" fill="#fed7aa" />
                {/* Twin buns */}
                <circle cx="48" cy="80" r="10" fill="#713f12" />
                <circle cx="92" cy="80" r="10" fill="#713f12" />
                <circle cx="62" cy="100" r="4" fill="#18181b" />
                <circle cx="78" cy="100" r="4" fill="#18181b" />
                <circle cx="63" cy="98" r="1.5" fill="#ffffff" />
                <circle cx="79" cy="98" r="1.5" fill="#ffffff" />
                <circle cx="56" cy="106" r="4" fill="#f43f5e" opacity="0.4" />
                <circle cx="84" cy="106" r="4" fill="#f43f5e" opacity="0.4" />
                <path d="M66,110 Q70,115 74,110" stroke="#18181b" strokeWidth="2" fill="none" />
                <rect x="55" y="128" width="30" height="40" rx="8" fill="#ec4899" />
              </svg>
            </div>
          </div>
        );

      case 'cartoon-modern':
      default:
        return (
          <div className="relative w-64 h-64 mx-auto my-6 flex items-center justify-center">
            <div className="absolute inset-0 bg-rose-200/50 rounded-full blur-2xl animate-pulse" />
            <div className="relative z-10 w-56 h-56 rounded-full border-4 border-rose-300 p-2 bg-gradient-to-b from-rose-50 to-pink-100 shadow-xl flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-48 h-48 drop-shadow-md">
                <circle cx="100" cy="100" r="90" fill="#fff5f5" />
                {/* Groom */}
                <circle cx="130" cy="85" r="26" fill="#fed7aa" />
                <path d="M106,75 Q130,55 154,75" fill="#27272a" />
                <circle cx="122" cy="85" r="3" fill="#27272a" />
                <circle cx="138" cy="85" r="3" fill="#27272a" />
                <path d="M126,95 Q130,100 134,95" stroke="#27272a" strokeWidth="2" fill="none" />
                <rect x="110" y="115" width="40" height="65" rx="10" fill="#18181b" />
                <polygon points="130,118 126,128 134,128" fill="#e11d48" /> {/* Bowtie */}
                {/* Bride */}
                <circle cx="70" cy="85" r="26" fill="#fed7aa" />
                <path d="M46,75 Q70,55 94,75 Q96,120 44,120 Z" fill="#854d0e" />
                <circle cx="70" cy="85" r="22" fill="#fed7aa" />
                {/* Floral headpiece */}
                <circle cx="60" cy="62" r="4" fill="#fb7185" />
                <circle cx="70" cy="60" r="5" fill="#f43f5e" />
                <circle cx="80" cy="62" r="4" fill="#fb7185" />
                <circle cx="62" cy="85" r="3" fill="#27272a" />
                <circle cx="78" cy="85" r="3" fill="#27272a" />
                <path d="M66,95 Q70,100 74,95" stroke="#27272a" strokeWidth="2" fill="none" />
                <circle cx="58" cy="91" r="3.5" fill="#f43f5e" opacity="0.4" />
                <circle cx="82" cy="91" r="3.5" fill="#f43f5e" opacity="0.4" />
                <path d="M50,115 Q70,122 90,115 L98,180 L42,180 Z" fill="#f43f5e" />
              </svg>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${template.bgColor} ${template.fontFamily} text-slate-800 relative selection:bg-rose-200`}>
      {/* ================= MODAL COVER ================= */}
      {!isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-b from-slate-900/90 via-slate-900/95 to-slate-950 backdrop-blur-md text-white text-center">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-500/20 border border-rose-300/40 flex items-center justify-center text-rose-300">
              <Sparkles className="w-8 h-8 animate-spin" />
            </div>

            <p className="text-xs uppercase tracking-widest text-rose-300 font-medium mb-1">
              Undangan Pernikahan
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-rose-200 via-pink-100 to-amber-200 bg-clip-text text-transparent">
              {invitation.groom.nickname} & {invitation.bride.nickname}
            </h1>

            {/* Cartoon Preview on Cover */}
            <div className="scale-75 -my-8">
              {renderCartoonIllustration()}
            </div>

            <div className="my-6 p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-slate-300">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
              <p className="text-lg font-bold text-white mt-1">{guestName}</p>
            </div>

            <button
              onClick={() => {
                onOpenInvitation();
                fireWeddingConfetti();
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-sm shadow-xl shadow-rose-900/40 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              Buka Undangan
            </button>
          </div>
        </div>
      )}

      {/* ================= INVITATION CONTENT ================= */}
      <main className="max-w-md mx-auto bg-white/80 backdrop-blur-md shadow-2xl border-x border-slate-100 min-h-screen pb-20">
        {/* Header Hero Section */}
        <section className="pt-16 pb-10 px-6 text-center border-b border-rose-100">
          <span className="text-[11px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-rose-100 text-rose-700 inline-block mb-3">
            The Wedding Celebration
          </span>
          <h1 className="font-serif text-4xl font-bold text-slate-900 leading-tight">
            {invitation.groom.nickname} <span className="text-rose-500 font-light">&</span> {invitation.bride.nickname}
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Jumat, 25 Desember 2026 • Jakarta
          </p>

          {/* Animated Cartoon Couple */}
          {renderCartoonIllustration()}

          <div className="inline-block px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-medium">
            🎨 Konsep Khusus Animasi Kartun (Bebas Foto Asli)
          </div>
        </section>

        {/* Ayat / Kutipan Suci */}
        <section className="p-8 text-center bg-rose-50/40 border-b border-rose-100">
          <p className="font-serif text-base font-semibold text-rose-800 mb-2">
            {invitation.quoteTitle}
          </p>
          <p className="text-xs text-slate-600 leading-relaxed italic">
            "{invitation.quoteText}"
          </p>
        </section>

        {/* Detail Mempelai */}
        <section className="p-8 space-y-8">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-slate-800">
              Kedua Mempelai
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Dengan penuh syukur, kami mempertemukan dua hati dalam ikatan pernikahan suci:
            </p>
          </div>

          {/* Mempelai Pria */}
          <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm text-center">
            <h3 className="font-serif text-xl font-bold text-slate-900">
              {invitation.groom.fullName}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {invitation.groom.childOrder}
            </p>
            <p className="text-xs text-slate-700 font-medium mt-1">
              {invitation.groom.fatherName} & {invitation.groom.motherName}
            </p>
          </div>

          <div className="flex justify-center text-rose-400">
            <Heart className="w-6 h-6 fill-rose-300" />
          </div>

          {/* Mempelai Wanita */}
          <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm text-center">
            <h3 className="font-serif text-xl font-bold text-slate-900">
              {invitation.bride.fullName}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {invitation.bride.childOrder}
            </p>
            <p className="text-xs text-slate-700 font-medium mt-1">
              {invitation.bride.fatherName} & {invitation.bride.motherName}
            </p>
          </div>
        </section>

        {/* Countdown Timer */}
        <section className="px-6 py-8 text-center bg-gradient-to-b from-rose-50/50 to-white border-y border-rose-100">
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-600 mb-1">
            Menghitung Hari Bahagia
          </p>
          <CountdownTimer targetDate="2026-12-25T08:00:00" />
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="mt-4 px-4 py-2 rounded-xl bg-white border border-rose-200 text-rose-700 text-xs font-semibold shadow-sm hover:bg-rose-50 transition-all inline-flex items-center gap-1.5"
          >
            <QrCode className="w-4 h-4 text-rose-600" />
            Buka Tiket QR Code Resepsi
          </button>
        </section>

        {/* Rangkaian Acara */}
        <section className="p-8 space-y-6">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl font-bold text-slate-800">
              Rangkaian Acara
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Jadwal pelaksanaan akad nikah & resepsi pernikahan
            </p>
          </div>

          {invitation.events.map((evt, idx) => (
            <div
              key={evt.id || idx}
              className="p-6 rounded-3xl bg-white border border-rose-100 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-rose-800">
                  {evt.title}
                </h3>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600">
                  {evt.timezone}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Jumat, 25 Desember 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{evt.startTime} - {evt.endTime} {evt.timezone}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800">{evt.venue}</p>
                    <p className="text-slate-500">{evt.address}</p>
                  </div>
                </div>
              </div>

              <a
                href={evt.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-rose-200"
              >
                <MapPin className="w-3.5 h-3.5" />
                Buka Google Maps
              </a>
            </div>
          ))}
        </section>

        {/* Love Story Timeline */}
        <section className="p-8 bg-rose-50/30 border-y border-rose-100">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl font-bold text-slate-800">
              Kisah Kasih Kami
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Catatan perjalanan cinta Romeo & Juliet
            </p>
          </div>

          <div className="relative border-l-2 border-rose-200 ml-4 space-y-6 pl-6">
            {invitation.loveStories.map((story, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-rose-500 border-4 border-white shadow-sm" />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  {story.year}
                </span>
                <h4 className="font-serif text-base font-bold text-slate-800 mt-1">
                  {story.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {story.story}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Amplop Digital & Kado */}
        <section className="p-8 space-y-6">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-2">
              <Gift className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-slate-800">
              Tanda Kasih (Amplop Digital)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Doa restu Anda merupakan karunia terindah bagi kami. Bagi yang berkenan memberikan tanda kasih:
            </p>
          </div>

          {/* Rekening Bank */}
          <div className="space-y-3">
            {invitation.banks.map((b, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white border border-rose-100 shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="text-[10px] uppercase font-bold text-rose-600">{b.bankName}</p>
                  <p className="font-mono text-base font-bold text-slate-900 tracking-wider my-0.5">
                    {b.accountNumber}
                  </p>
                  <p className="text-xs text-slate-500">a.n. {b.accountHolder}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(b.accountNumber, b.accountNumber)}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-rose-200"
                >
                  {copiedBank === b.accountNumber ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Salin
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* QRIS Box */}
          {invitation.qrisImageUrl && (
            <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-200/60 text-center">
              <p className="text-xs font-bold text-slate-800 mb-1">QRIS Pembayaran / Donasi</p>
              <p className="text-[10px] text-slate-500 mb-3">Scan menggunakan BCA, GoPay, OVO, ShopeePay, Dana, dll.</p>
              <img
                src={invitation.qrisImageUrl}
                alt="QRIS Wedding Gift"
                className="w-40 h-40 mx-auto rounded-xl border border-rose-200 shadow-sm bg-white p-2"
              />
            </div>
          )}

          {/* Alamat Kado Fisik */}
          {invitation.giftAddress && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-800">Kirim Kado Fisik ke Alamat:</p>
              <p className="text-slate-700">{invitation.giftAddress.recipientName} ({invitation.giftAddress.phoneNumber})</p>
              <p className="text-slate-500">{invitation.giftAddress.fullAddress}</p>
            </div>
          )}
        </section>

        {/* Konfirmasi Kehadiran (RSVP) */}
        <section className="p-8 bg-gradient-to-b from-rose-50/40 to-white border-t border-rose-100">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl font-bold text-slate-800">
              Konfirmasi Kehadiran
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Mohon konfirmasikan kehadiran Anda untuk mempermudah reservasi tempat.
            </p>
          </div>

          {isRsvpSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <p className="font-semibold text-emerald-800 text-sm">Terima Kasih atas Konfirmasi Anda!</p>
              <p className="text-xs text-emerald-700">Respon kehadiran Anda telah tercatat di sistem buku tamu pengantin.</p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status Kehadiran</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRsvpStatus('attending')}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      rsvpStatus === 'attending'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50'
                    }`}
                  >
                    ✓ Hadir
                  </button>
                  <button
                    type="button"
                    onClick={() => setRsvpStatus('maybe')}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      rsvpStatus === 'maybe'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    ? Ragu-ragu
                  </button>
                  <button
                    type="button"
                    onClick={() => setRsvpStatus('declined')}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      rsvpStatus === 'declined'
                        ? 'bg-slate-700 text-white border-slate-700 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ✕ Berhalangan
                  </button>
                </div>
              </div>

              {rsvpStatus === 'attending' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Jumlah Orang (Pax)</label>
                  <select
                    value={rsvpPax}
                    onChange={(e) => setRsvpPax(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang (Bersama Pasangan)</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang (Keluarga)</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-1.5"
              >
                Kirim Konfirmasi RSVP
              </button>
            </form>
          )}
        </section>

        {/* Buku Tamu / Doa & Ucapan */}
        <section className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-slate-800">
              Untaian Doa & Ucapan
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Tuliskan doa restu Anda untuk kedua mempelai:
            </p>
          </div>

          <form onSubmit={handleWishSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Nama Anda"
                value={wishName}
                onChange={(e) => setWishName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Hubungan (Sahabat / Keluarga / Rekan Kerja)"
                value={wishRel}
                onChange={(e) => setWishRel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <textarea
                placeholder="Tuliskan ucapan selamat & doa restu di sini..."
                value={wishMsg}
                onChange={(e) => setWishMsg(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              Kirim Doa Restu
            </button>
          </form>

          {/* List of Wishes */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {invitation.wishes.map((w) => (
              <div
                key={w.id}
                className="p-4 rounded-2xl bg-white border border-rose-100/80 shadow-sm space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-800">{w.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {w.relationship}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{w.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {w.message}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Undangan */}
        <footer className="p-8 text-center border-t border-rose-100 space-y-2">
          <p className="text-xs text-slate-500">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
          </p>
          <p className="font-serif text-lg font-bold text-rose-800 pt-2">
            Romeo & Juliet
          </p>
          <div className="pt-4 text-[10px] text-slate-400">
            Dibuat dengan ❤️ melalui Rex Undangan
          </div>
        </footer>
      </main>

      {/* QR Code Modal for Guest */}
      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        guestName={guestName}
        guestId="GUEST-VIP-2026"
        slug={invitation.slug}
      />
    </div>
  );
}
