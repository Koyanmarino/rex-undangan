'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { QrCode, CheckCircle2, AlertCircle, Users, Search, RefreshCw, UserCheck } from 'lucide-react';
import { getStoredInvitation, checkInGuest, saveStoredInvitation } from '@/data/storage';
import { InvitationData, GuestItem } from '@/data/initialInvitation';
import { fireWeddingConfetti } from '@/components/ConfettiButton';

export default function CheckinPage() {
  const params = useParams();
  const [invitation, setInvitation] = useState<InvitationData>(getStoredInvitation());
  const [searchTerm, setSearchTerm] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    setInvitation(getStoredInvitation());
  }, []);

  const totalGuests = invitation.guests.length;
  const checkedInGuests = invitation.guests.filter((g) => g.isCheckedIn);
  const totalPaxCheckedIn = checkedInGuests.reduce((acc, g) => acc + (g.pax || 1), 0);

  const handlePerformCheckin = (guestId: string) => {
    const res = checkInGuest(guestId);
    if (res.success) {
      setNotification({ type: 'success', message: res.message });
      fireWeddingConfetti();
    } else {
      setNotification({ type: 'error', message: res.message });
    }
    setInvitation(getStoredInvitation());
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;

    // Check if json qr payload or direct guestId
    let targetId = manualCode.trim();
    try {
      const parsed = JSON.parse(manualCode);
      if (parsed.guestId) targetId = parsed.guestId;
    } catch {}

    handlePerformCheckin(targetId);
    setManualCode('');
  };

  const filteredGuests = invitation.guests.filter(
    (g) =>
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.phone.includes(searchTerm) ||
      g.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Portal Panitia Venue Resepsi
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-2">
              Scan & Check-In Buku Tamu
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {invitation.title} • {invitation.groom.nickname} & {invitation.bride.nickname}
            </p>
          </div>

          <button
            onClick={() => {
              setInvitation(getStoredInvitation());
              setNotification({ type: 'success', message: 'Data tamu berhasil diperbarui.' });
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5 self-start sm:self-auto border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh Data
          </button>
        </div>

        {/* Realtime Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <p className="text-[11px] text-slate-400">Total Tamu Diundang</p>
            <p className="text-2xl font-bold text-white mt-1">{totalGuests}</p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 text-center">
            <p className="text-[11px] text-emerald-400">Tamu Hadir di Venue</p>
            <p className="text-2xl font-bold text-emerald-300 mt-1">{checkedInGuests.length}</p>
          </div>
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/50 text-center">
            <p className="text-[11px] text-rose-400">Total Pax Catering</p>
            <p className="text-2xl font-bold text-rose-300 mt-1">{totalPaxCheckedIn}</p>
          </div>
        </div>

        {/* Feedback Alert */}
        {notification && (
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
              notification.type === 'success'
                ? 'bg-emerald-900/40 border-emerald-600 text-emerald-200'
                : 'bg-rose-900/40 border-rose-600 text-rose-200'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-xs leading-relaxed">
              <p className="font-semibold">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* QR Scanner / Manual ID Input Box */}
        <div className="p-6 rounded-3xl bg-slate-800/90 border border-slate-700 space-y-4">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-rose-400" />
            <h2 className="text-sm font-bold text-white">Input / Scan Kode Tiket Tamu</h2>
          </div>

          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Ketik ID Tiket (misal: gst-1) atau paste hasil scan QR code..."
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-rose-900/30"
            >
              <UserCheck className="w-4 h-4" />
              Check-In
            </button>
          </form>
        </div>

        {/* Guest List Table for Receptionists */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-300">Daftar Tamu Undangan</h2>
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama / nomor HP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredGuests.map((g) => (
              <div
                key={g.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  g.isCheckedIn
                    ? 'bg-slate-800/40 border-emerald-900/50'
                    : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">{g.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                      {g.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {g.pax} Pax
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-3">
                    <span>ID: {g.id}</span>
                    {g.phone && <span>HP: {g.phone}</span>}
                    {g.isCheckedIn && (
                      <span className="text-emerald-400 font-medium">
                        ✓ Check-in: {g.checkedInAt || 'Hari ini'}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  {g.isCheckedIn ? (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Sudah Hadir
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePerformCheckin(g.id)}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-all"
                    >
                      Tandai Hadir
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
