'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Trash2, CheckCircle2, ShieldAlert, Heart } from 'lucide-react';
import { getStoredInvitation, saveStoredInvitation } from '@/data/storage';
import { InvitationData, WishItem } from '@/data/initialInvitation';

export default function WishesModerationPage() {
  const [invitation, setInvitation] = useState<InvitationData>(getStoredInvitation());

  useEffect(() => {
    setInvitation(getStoredInvitation());
  }, []);

  const handleDeleteWish = (wishId: string) => {
    const updated = {
      ...invitation,
      wishes: invitation.wishes.filter((w) => w.id !== wishId),
    };
    saveStoredInvitation(updated);
    setInvitation(updated);
  };

  const handleToggleApproval = (wishId: string) => {
    const updated = {
      ...invitation,
      wishes: invitation.wishes.map((w) =>
        w.id === wishId ? { ...w, isApproved: !w.isApproved } : w
      ),
    };
    saveStoredInvitation(updated);
    setInvitation(updated);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200/80 pb-6">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Moderasi Doa & Ucapan Tamu
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Kelola pesan dan doa restu yang masuk dari tamu undangan. Anda dapat menyembunyikan atau menghapus pesan spam.
        </p>
      </div>

      <div className="space-y-3">
        {invitation.wishes.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400">
            <MessageSquare className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-semibold">Belum ada ucapan doa yang masuk.</p>
            <p className="text-xs mt-1">Ucapan dari tamu akan muncul di sini setelah link undangan dibagikan.</p>
          </div>
        ) : (
          invitation.wishes.map((wish) => (
            <div
              key={wish.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                wish.isApproved
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-slate-50 border-slate-300 opacity-60'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-800">{wish.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-medium">
                    {wish.relationship}
                  </span>
                  <span className="text-[10px] text-slate-400">{wish.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{wish.message}"
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => handleToggleApproval(wish.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    wish.isApproved
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {wish.isApproved ? 'Sembunyikan' : 'Tampilkan'}
                </button>

                <button
                  onClick={() => handleDeleteWish(wish.id)}
                  className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Hapus Ucapan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
