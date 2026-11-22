'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Calendar, MapPin, Clock, Gift, Copy, Check, Send, Sparkles, QrCode } from 'lucide-react';
import { InvitationData } from '@/data/initialInvitation';
import { TemplateItem } from '@/data/templates';
import CountdownTimer from '@/components/CountdownTimer';
import { fireWeddingConfetti } from '@/components/ConfettiButton';
import QrCodeModal from '@/components/QrCodeModal';

interface PhotoTemplateRendererProps {
  invitation: InvitationData;
  template: TemplateItem;
  guestName?: string;
  onOpenInvitation: () => void;
  isOpen: boolean;
  onAddWish: (name: string, relationship: string, message: string) => void;
  onRsvp: (rsvp: 'attending' | 'declined' | 'maybe', pax: number) => void;
}

export default function PhotoTemplateRenderer({
  invitation,
  template,
  guestName = 'Tamu Undangan',
  onOpenInvitation,
  isOpen,
  onAddWish,
  onRsvp,
}: PhotoTemplateRendererProps) {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [wishName, setWishName] = useState(guestName !== 'Tamu Undangan' ? guestName : '');
  const [wishRel, setWishRel] = useState('Sahabat');
  const [wishMsg, setWishMsg] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'declined' | 'maybe'>('attending');
  const [rsvpPax, setRsvpPax] = useState(2);
  const [isRsvpSubmitted, setIsRsvpSubmitted] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

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

  // Theme styling helpers
  const isLuxury = template.category === 'luxury';
  const isTraditional = template.category === 'traditional';
  const isIslamic = template.category === 'islamic';

  return (
    <div className={`min-h-screen ${template.bgColor} ${template.fontFamily} ${isLuxury ? 'text-slate-100' : 'text-slate-800'} relative selection:bg-rose-200`}>
      {/* ================= MODAL COVER ================= */}
      {!isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md text-white text-center">
          <div className="relative max-w-md w-full p-8 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            {/* Background Image on Cover */}
            <Image
              src={invitation.coverPhoto}
              alt="Cover Photo"
              fill
              className="object-cover -z-10 brightness-50"
            />
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white">
              <Sparkles className="w-7 h-7 animate-spin" />
            </div>

            <p className="text-xs uppercase tracking-widest text-rose-200 font-medium mb-1">
              Undangan Pernikahan
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-4 drop-shadow-md">
              {invitation.groom.nickname} & {invitation.bride.nickname}
            </h1>

            <div className="my-6 p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20">
              <p className="text-xs text-slate-300">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
              <p className="text-lg font-bold text-white mt-1">{guestName}</p>
            </div>

            <button
              onClick={() => {
                onOpenInvitation();
                fireWeddingConfetti();
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold text-sm shadow-xl shadow-rose-950/40 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              Buka Undangan
            </button>
          </div>
        </div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <main className={`max-w-md mx-auto ${isLuxury ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-100'} backdrop-blur-md shadow-2xl border-x min-h-screen pb-20`}>
        {/* Hero Cover Photo */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={invitation.coverPhoto}
            alt="Hero Wedding"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-center text-white">
            <span className="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm self-center mb-3">
              {template.themeType}
            </span>
            <h1 className="font-serif text-4xl font-bold drop-shadow-md">
              {invitation.groom.nickname} & {invitation.bride.nickname}
            </h1>
            <p className="text-xs text-rose-200 mt-2 font-medium">
              Jumat, 25 Desember 2026 • Jakarta
            </p>
          </div>
        </div>

        {/* Ayat Suci / Kutipan */}
        <section className={`p-8 text-center border-b ${isLuxury ? 'bg-slate-900/50 border-slate-800' : 'bg-rose-50/40 border-rose-100'}`}>
          <p className="font-serif text-base font-semibold text-rose-600 mb-2">
            {invitation.quoteTitle}
          </p>
          <p className="text-xs opacity-80 leading-relaxed italic">
            "{invitation.quoteText}"
          </p>
        </section>

        {/* Mempelai Photo Section */}
        <section className="p-8 space-y-8">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold">
              Kedua Mempelai
            </h2>
            <p className="text-xs opacity-70 mt-1">
              Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud melangsungkan pernikahan:
            </p>
          </div>

          {/* Mempelai Pria */}
          <div className={`p-6 rounded-3xl ${isLuxury ? 'bg-slate-900 border-slate-800' : 'bg-white border-rose-100'} border shadow-sm text-center`}>
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-rose-400/50 shadow-md mb-4">
              <Image src={invitation.groom.photo} alt={invitation.groom.fullName} fill className="object-cover" />
            </div>
            <h3 className="font-serif text-xl font-bold text-rose-600">
              {invitation.groom.fullName}
            </h3>
            <p className="text-xs opacity-70 mt-1">{invitation.groom.childOrder}</p>
            <p className="text-xs font-medium mt-1">{invitation.groom.fatherName} & {invitation.groom.motherName}</p>
          </div>

          <div className="flex justify-center text-rose-500">
            <Heart className="w-6 h-6 fill-rose-500" />
          </div>

          {/* Mempelai Wanita */}
          <div className={`p-6 rounded-3xl ${isLuxury ? 'bg-slate-900 border-slate-800' : 'bg-white border-rose-100'} border shadow-sm text-center`}>
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-rose-400/50 shadow-md mb-4">
              <Image src={invitation.bride.photo} alt={invitation.bride.fullName} fill className="object-cover" />
            </div>
            <h3 className="font-serif text-xl font-bold text-rose-600">
              {invitation.bride.fullName}
            </h3>
            <p className="text-xs opacity-70 mt-1">{invitation.bride.childOrder}</p>
            <p className="text-xs font-medium mt-1">{invitation.bride.fatherName} & {invitation.bride.motherName}</p>
          </div>
        </section>

        {/* Countdown Timer */}
        <section className={`px-6 py-8 text-center border-y ${isLuxury ? 'bg-slate-900/50 border-slate-800' : 'bg-rose-50/50 border-rose-100'}`}>
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-600 mb-1">
            Menuju Hari Bahagia
          </p>
          <CountdownTimer targetDate="2026-12-25T08:00:00" />
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="mt-4 px-4 py-2 rounded-xl bg-white text-slate-800 border border-rose-200 text-xs font-semibold shadow-sm hover:bg-rose-50 transition-all inline-flex items-center gap-1.5"
          >
            <QrCode className="w-4 h-4 text-rose-600" />
            Buka Tiket QR Code Resepsi
          </button>
        </section>

        {/* Rangkaian Acara */}
        <section className="p-8 space-y-6">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl font-bold">
              Rangkaian Acara
            </h2>
            <p className="text-xs opacity-70 mt-1">
              Waktu dan lokasi perayaan pernikahan
            </p>
          </div>

          {invitation.events.map((evt, idx) => (
            <div
              key={evt.id || idx}
              className={`p-6 rounded-3xl ${isLuxury ? 'bg-slate-900 border-slate-800' : 'bg-white border-rose-100'} border shadow-sm space-y-4`}
            >
              <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
                <h3 className="font-serif text-lg font-bold text-rose-600">
                  {evt.title}
                </h3>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  {evt.timezone}
                </span>
              </div>

              <div className="space-y-2 text-xs">
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
                    <p className="font-semibold">{evt.venue}</p>
                    <p className="opacity-70">{evt.address}</p>
                  </div>
                </div>
              </div>

              <a
                href={evt.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5" />
                Buka Google Maps
              </a>
            </div>
          ))}
        </section>

        {/* Galeri Foto */}
        <section className="p-8 space-y-4">
          <div className="text-center mb-4">
            <h2 className="font-serif text-2xl font-bold">
              Galeri Momen
            </h2>
            <p className="text-xs opacity-70 mt-1">
              Potret kebahagiaan kami dalam bingkai kenangan
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {invitation.galleries.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedPhoto(img)}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:scale-105 transition-transform"
              >
                <Image src={img} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          >
            <div className="relative max-w-lg w-full aspect-square rounded-2xl overflow-hidden">
              <Image src={selectedPhoto} alt="Zoomed Photo" fill className="object-contain" />
            </div>
          </div>
        )}

        {/* Amplop Digital */}
        <section className="p-8 space-y-6">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mb-2">
              <Gift className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl font-bold">
              Tanda Kasih (Amplop Digital)
            </h2>
            <p className="text-xs opacity-70 mt-1">
              Doa restu Anda merupakan karunia terindah bagi kami:
            </p>
          </div>

          <div className="space-y-3">
            {invitation.banks.map((b, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl ${isLuxury ? 'bg-slate-900 border-slate-800' : 'bg-white border-rose-100'} border shadow-sm flex items-center justify-between`}
              >
                <div>
                  <p className="text-[10px] uppercase font-bold text-rose-500">{b.bankName}</p>
                  <p className="font-mono text-base font-bold tracking-wider my-0.5">{b.accountNumber}</p>
                  <p className="text-xs opacity-70">a.n. {b.accountHolder}</p>
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
            <div className={`p-6 rounded-3xl ${isLuxury ? 'bg-slate-900 border-slate-800' : 'bg-rose-50/50 border-rose-200/60'} border text-center`}>
              <p className="text-xs font-bold mb-1">QRIS Pembayaran / Donasi</p>
              <p className="text-[10px] opacity-70 mb-3">Scan menggunakan semua aplikasi dompet digital & mobile banking</p>
              <img
                src={invitation.qrisImageUrl}
                alt="QRIS Wedding Gift"
                className="w-40 h-40 mx-auto rounded-xl border border-rose-200 shadow-sm bg-white p-2"
              />
            </div>
          )}
        </section>

        {/* Konfirmasi Kehadiran (RSVP) */}
        <section className={`p-8 border-t ${isLuxury ? 'bg-slate-900/50 border-slate-800' : 'bg-rose-50/40 border-rose-100'}`}>
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl font-bold">
              Konfirmasi Kehadiran
            </h2>
            <p className="text-xs opacity-70 mt-1">
              Mohon konfirmasi kehadiran Anda untuk pengaturan meja & catering.
            </p>
          </div>

          {isRsvpSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <p className="font-semibold text-sm">Terima Kasih atas Konfirmasi Anda!</p>
              <p className="text-xs opacity-80">Respon Anda telah tercatat.</p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Status Kehadiran</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRsvpStatus('attending')}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      rsvpStatus === 'attending'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : 'bg-white/10 border-slate-300 hover:bg-white/20'
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
                        : 'bg-white/10 border-slate-300 hover:bg-white/20'
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
                        : 'bg-white/10 border-slate-300 hover:bg-white/20'
                    }`}
                  >
                    ✕ Berhalangan
                  </button>
                </div>
              </div>

              {rsvpStatus === 'attending' && (
                <div>
                  <label className="block text-xs font-semibold mb-1">Jumlah Orang (Pax)</label>
                  <select
                    value={rsvpPax}
                    onChange={(e) => setRsvpPax(Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs rounded-xl border ${isLuxury ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
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
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md shadow-rose-900/40 transition-all flex items-center justify-center gap-1.5"
              >
                Kirim Konfirmasi RSVP
              </button>
            </form>
          )}
        </section>

        {/* Buku Ucapan & Doa */}
        <section className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold">
              Untaian Doa & Ucapan
            </h2>
            <p className="text-xs opacity-70 mt-1">
              Tuliskan doa restu untuk kedua mempelai:
            </p>
          </div>

          <form onSubmit={handleWishSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Nama Anda"
              value={wishName}
              onChange={(e) => setWishName(e.target.value)}
              required
              className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none ${isLuxury ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}
            />
            <input
              type="text"
              placeholder="Hubungan (Sahabat / Keluarga / Rekan Kerja)"
              value={wishRel}
              onChange={(e) => setWishRel(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none ${isLuxury ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}
            />
            <textarea
              placeholder="Tuliskan ucapan selamat & doa restu di sini..."
              value={wishMsg}
              onChange={(e) => setWishMsg(e.target.value)}
              required
              rows={3}
              className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none resize-none ${isLuxury ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
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
                className={`p-4 rounded-2xl ${isLuxury ? 'bg-slate-900 border-slate-800' : 'bg-white border-rose-100'} border shadow-sm space-y-1.5`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-rose-500">{w.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {w.relationship}
                    </span>
                  </div>
                  <span className="text-[10px] opacity-60">{w.date}</span>
                </div>
                <p className="text-xs opacity-80 leading-relaxed">
                  {w.message}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="p-8 text-center border-t border-slate-200/50 space-y-2">
          <p className="text-xs opacity-70">
            Terima kasih atas doa restu Bapak/Ibu/Saudara/i sekalian.
          </p>
          <p className="font-serif text-lg font-bold text-rose-600 pt-2">
            Romeo & Juliet
          </p>
          <div className="pt-4 text-[10px] opacity-40">
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
