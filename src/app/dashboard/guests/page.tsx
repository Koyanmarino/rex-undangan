'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageCircle,
  Search,
  Filter
} from 'lucide-react';
import { getStoredInvitation, addGuest, saveStoredInvitation } from '@/data/storage';
import { InvitationData, GuestItem } from '@/data/initialInvitation';

export default function GuestManagementPage() {
  const [invitation, setInvitation] = useState<InvitationData>(getStoredInvitation());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRsvp, setFilterRsvp] = useState<string>('all');

  // Form State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCategory, setNewCategory] = useState('Sahabat');
  const [newPax, setNewPax] = useState(2);

  useEffect(() => {
    setInvitation(getStoredInvitation());
  }, []);

  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/u/${invitation.slug}`
    : `https://rexundangan.com/u/${invitation.slug}`;

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    addGuest({
      name: newName.trim(),
      phone: newPhone.trim(),
      category: newCategory,
      rsvp: 'pending',
      pax: newPax,
    });

    setInvitation(getStoredInvitation());
    setNewName('');
    setNewPhone('');
    setIsAddModalOpen(false);
  };

  const getGuestLink = (guest: GuestItem) => {
    const encodedName = encodeURIComponent(guest.name);
    return `${baseUrl}?to=${encodedName}`;
  };

  const handleCopyLink = (guest: GuestItem) => {
    const link = getGuestLink(guest);
    navigator.clipboard.writeText(link);
    setCopiedId(guest.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendWhatsApp = (guest: GuestItem) => {
    const link = getGuestLink(guest);
    const text = `Halo ${guest.name},%0A%0ATanpa mengurangi rasa hormat, kami bermaksud mengundang Anda untuk menghadiri hari bahagia pernikahan kami:%0A%0A*${invitation.title}*%0A%0AUntuk informasi detail rangkaian acara dan reservasi kehadiran, silakan buka tautan undangan digital berikut:%0A${link}%0A%0AMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.%0A%0ATerima kasih,%0A${invitation.groom.nickname} %26 ${invitation.bride.nickname}`;

    // Clean phone number (format 62...)
    let phoneFormatted = guest.phone.replace(/[^0-9]/g, '');
    if (phoneFormatted.startsWith('0')) {
      phoneFormatted = '62' + phoneFormatted.slice(1);
    }

    const waUrl = phoneFormatted
      ? `https://api.whatsapp.com/send?phone=${phoneFormatted}&text=${text}`
      : `https://api.whatsapp.com/send?text=${text}`;

    window.open(waUrl, '_blank');
  };

  const filteredGuests = invitation.guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.phone.includes(searchTerm) ||
      g.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRsvp = filterRsvp === 'all' || g.rsvp === filterRsvp;
    return matchesSearch && matchesRsvp;
  });

  const totalGuests = invitation.guests.length;
  const attendingGuests = invitation.guests.filter((g) => g.rsvp === 'attending');
  const checkedInGuests = invitation.guests.filter((g) => g.isCheckedIn);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Manajemen Buku Tamu & WhatsApp Blast
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Personalisasi nama tamu pada undangan dan kirim link undangan secara otomatis melalui WhatsApp.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-200 flex items-center gap-2 self-start sm:self-auto transition-all"
        >
          <UserPlus className="w-4 h-4" />
          Tambah Tamu Baru
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500">Total Tamu</p>
          <p className="font-serif text-2xl font-bold text-slate-800 mt-1">{totalGuests}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <p className="text-xs text-emerald-600">RSVP Hadir</p>
          <p className="font-serif text-2xl font-bold text-emerald-700 mt-1">{attendingGuests.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500">Belum Konfirmasi</p>
          <p className="font-serif text-2xl font-bold text-slate-600 mt-1">
            {invitation.guests.filter((g) => g.rsvp === 'pending').length}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <p className="text-xs text-rose-600">Check-in di Venue</p>
          <p className="font-serif text-2xl font-bold text-rose-700 mt-1">{checkedInGuests.length}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama tamu, nomor HP, atau kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={filterRsvp}
            onChange={(e) => setFilterRsvp(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none"
          >
            <option value="all">Semua Status RSVP</option>
            <option value="attending">Konfirmasi Hadir</option>
            <option value="maybe">Ragu-ragu</option>
            <option value="declined">Berhalangan</option>
            <option value="pending">Belum Respon</option>
          </select>
        </div>
      </div>

      {/* Guest Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                <th className="p-4">Nama Tamu & Kategori</th>
                <th className="p-4">No. WhatsApp</th>
                <th className="p-4">Status RSVP</th>
                <th className="p-4">Kehadiran di Venue</th>
                <th className="p-4 text-right">Aksi Personalisasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGuests.map((guest) => {
                const guestLink = getGuestLink(guest);
                return (
                  <tr key={guest.id} className="hover:bg-rose-50/20 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-slate-800">{guest.name}</p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 inline-block mt-0.5">
                        {guest.category} • {guest.pax} Pax
                      </span>
                    </td>

                    <td className="p-4 text-slate-600 font-mono">
                      {guest.phone || '-'}
                    </td>

                    <td className="p-4">
                      {guest.rsvp === 'attending' && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold inline-flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          Hadir ({guest.pax} Pax)
                        </span>
                      )}
                      {guest.rsvp === 'maybe' && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                          ? Ragu-ragu
                        </span>
                      )}
                      {guest.rsvp === 'declined' && (
                        <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                          ✕ Berhalangan
                        </span>
                      )}
                      {guest.rsvp === 'pending' && (
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 font-medium inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Belum Respon
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      {guest.isCheckedIn ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Check-in ({guest.checkedInAt || 'Hari Ini'})
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Belum tiba</span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleCopyLink(guest)}
                          title="Salin Link Khusus Tamu Ini"
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        >
                          {copiedId === guest.id ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() => handleSendWhatsApp(guest)}
                          title="Kirim Pesan WhatsApp Otomatis"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-200 transition-all"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Kirim WA
                        </button>

                        <a
                          href={guestLink}
                          target="_blank"
                          title="Pratinjau Undangan Tamu Ini"
                          className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Guest Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border border-rose-100">
            <h3 className="font-serif text-xl font-bold text-slate-800 mb-1">
              Tambah Tamu Undangan
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Data tamu akan digenerate menjadi link undangan khusus berparameter.
            </p>

            <form onSubmit={handleAddGuest} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Tamu Undangan *
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bpk. Bambang Sutrisno & Partner"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor WhatsApp (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 081234567890"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kategori Tamu
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value="Keluarga">Keluarga</option>
                    <option value="Sahabat">Sahabat</option>
                    <option value="Rekan Kerja">Rekan Kerja</option>
                    <option value="VIP">VIP</option>
                    <option value="Teman Kuliah">Teman Kuliah</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jumlah Pax Tamu
                  </label>
                  <select
                    value={newPax}
                    onChange={(e) => setNewPax(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-200"
                >
                  Simpan Tamu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
