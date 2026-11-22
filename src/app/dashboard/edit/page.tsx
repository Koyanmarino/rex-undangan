'use client';

import { useState, useEffect } from 'react';
import {
  Save,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Plus,
  Trash2,
  Heart,
  Music,
  Gift
} from 'lucide-react';
import { getStoredInvitation, saveStoredInvitation } from '@/data/storage';
import { TEMPLATES_DATA } from '@/data/templates';
import { CARTOON_AVATARS, MUSIC_PLAYLIST } from '@/data/cartoonAssets';
import { InvitationData } from '@/data/initialInvitation';

export default function InvitationEditorPage() {
  const [inv, setInv] = useState<InvitationData>(getStoredInvitation());
  const [activeTab, setActiveTab] = useState<'info' | 'couple' | 'cartoon' | 'events' | 'music' | 'gift'>('info');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setInv(getStoredInvitation());
  }, []);

  const currentTemplate =
    TEMPLATES_DATA.find((t) => t.slug === inv.templateSlug) || TEMPLATES_DATA[0];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredInvitation(inv);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Editor Formulir Undangan
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Isi field formulir data pernikahan Anda. Perubahan langsung tersimpan ke sistem web.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`/u/${inv.slug}`}
            target="_blank"
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Preview
          </a>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-200 flex items-center gap-1.5 transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            Simpan Perubahan
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 transition-all">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          Data undangan pernikahan berhasil disimpan dan diperbarui!
        </div>
      )}

      {/* Editor Tabs Navigation */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'info'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          1. Info Dasar & Tema
        </button>
        <button
          onClick={() => setActiveTab('couple')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'couple'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          2. Data Mempelai
        </button>
        {currentTemplate.isCartoon && (
          <button
            onClick={() => setActiveTab('cartoon')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'cartoon'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            🎨 3. Karakter Kartun
          </button>
        )}
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'events'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          4. Rangkaian Acara
        </button>
        <button
          onClick={() => setActiveTab('music')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'music'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          5. Musik Latar
        </button>
        <button
          onClick={() => setActiveTab('gift')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'gift'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          6. Amplop Digital
        </button>
      </div>

      {/* Editor Form Body */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: INFORMASI DASAR */}
        {activeTab === 'info' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 border-b pb-3">
              Informasi Umum & URL Undangan
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Undangan
                </label>
                <input
                  type="text"
                  value={inv.title}
                  onChange={(e) => setInv({ ...inv, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Slug Alamat URL (domain.com/u/...)
                </label>
                <input
                  type="text"
                  value={inv.slug}
                  onChange={(e) => setInv({ ...inv, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Template Aktif (Katalog 35)
              </label>
              <select
                value={inv.templateSlug}
                onChange={(e) => setInv({ ...inv, templateSlug: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
              >
                <optgroup label="🎨 5 Animasi Kartun Non-Foto">
                  {TEMPLATES_DATA.filter((t) => t.isCartoon).map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.name} (Animasi Kartun)
                    </option>
                  ))}
                </optgroup>
                <optgroup label="📷 30 Template Foto">
                  {TEMPLATES_DATA.filter((t) => !t.isCartoon).map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.name} ({t.themeType})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Judul Ayat Suci / Kutipan
                </label>
                <input
                  type="text"
                  value={inv.quoteTitle}
                  onChange={(e) => setInv({ ...inv, quoteTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Isi Kutipan / Terjemahan Ayat
                </label>
                <textarea
                  rows={3}
                  value={inv.quoteText}
                  onChange={(e) => setInv({ ...inv, quoteText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DATA MEMPELAI */}
        {activeTab === 'couple' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mempelai Pria */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-rose-800 border-b pb-2">
                Mempelai Pria (Groom)
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  value={inv.groom.fullName}
                  onChange={(e) => setInv({ ...inv, groom: { ...inv.groom, fullName: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Panggilan</label>
                <input
                  type="text"
                  value={inv.groom.nickname}
                  onChange={(e) => setInv({ ...inv, groom: { ...inv.groom, nickname: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Urutan Anak</label>
                <input
                  type="text"
                  value={inv.groom.childOrder}
                  onChange={(e) => setInv({ ...inv, groom: { ...inv.groom, childOrder: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Ayah</label>
                <input
                  type="text"
                  value={inv.groom.fatherName}
                  onChange={(e) => setInv({ ...inv, groom: { ...inv.groom, fatherName: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Ibu</label>
                <input
                  type="text"
                  value={inv.groom.motherName}
                  onChange={(e) => setInv({ ...inv, groom: { ...inv.groom, motherName: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">URL Foto Pria</label>
                <input
                  type="text"
                  value={inv.groom.photo}
                  onChange={(e) => setInv({ ...inv, groom: { ...inv.groom, photo: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            {/* Mempelai Wanita */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="font-serif text-lg font-bold text-rose-800 border-b pb-2">
                Mempelai Wanita (Bride)
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  value={inv.bride.fullName}
                  onChange={(e) => setInv({ ...inv, bride: { ...inv.bride, fullName: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Panggilan</label>
                <input
                  type="text"
                  value={inv.bride.nickname}
                  onChange={(e) => setInv({ ...inv, bride: { ...inv.bride, nickname: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Urutan Anak</label>
                <input
                  type="text"
                  value={inv.bride.childOrder}
                  onChange={(e) => setInv({ ...inv, bride: { ...inv.bride, childOrder: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Ayah</label>
                <input
                  type="text"
                  value={inv.bride.fatherName}
                  onChange={(e) => setInv({ ...inv, bride: { ...inv.bride, fatherName: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Ibu</label>
                <input
                  type="text"
                  value={inv.bride.motherName}
                  onChange={(e) => setInv({ ...inv, bride: { ...inv.bride, motherName: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">URL Foto Wanita</label>
                <input
                  type="text"
                  value={inv.bride.photo}
                  onChange={(e) => setInv({ ...inv, bride: { ...inv.bride, photo: e.target.value } })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KARAKTER KARTUN (UNTUK TEMPLATE NON-FOTO) */}
        {activeTab === 'cartoon' && currentTemplate.isCartoon && (
          <div className="p-6 rounded-3xl bg-white border border-emerald-200 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                Pustaka Karakter Kartun
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-900 mt-2">
                Pilih Karakter Animasi Pasangan
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Karakter kartun ini akan ditampilkan menggantikan foto asli untuk menjaga privasi / konsep syar'i.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CARTOON_AVATARS.map((avatar) => {
                const isSelected = inv.cartoonConfig.selectedAvatarId === avatar.id;
                return (
                  <div
                    key={avatar.id}
                    onClick={() =>
                      setInv({
                        ...inv,
                        cartoonConfig: { ...inv.cartoonConfig, selectedAvatarId: avatar.id },
                      })
                    }
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-md'
                        : 'border-slate-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs mb-3">
                      🎨
                    </div>
                    <h4 className="font-bold text-xs text-slate-800">{avatar.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      {avatar.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Atau Masukkan URL Karikatur / Gambar Kartun Custom Sendiri (Opsional):
              </label>
              <input
                type="text"
                placeholder="https://example.com/karikatur-custom.png"
                value={inv.cartoonConfig.customAvatarUrl || ''}
                onChange={(e) =>
                  setInv({
                    ...inv,
                    cartoonConfig: { ...inv.cartoonConfig, customAvatarUrl: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>
        )}

        {/* TAB 4: RANGKAIAN ACARA */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            {inv.events.map((evt, idx) => (
              <div
                key={evt.id || idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-serif text-base font-bold text-slate-900">
                    Acara #{idx + 1}: {evt.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Acara</label>
                    <input
                      type="text"
                      value={evt.title}
                      onChange={(e) => {
                        const updated = [...inv.events];
                        updated[idx].title = e.target.value;
                        setInv({ ...inv, events: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tanggal</label>
                    <input
                      type="date"
                      value={evt.date}
                      onChange={(e) => {
                        const updated = [...inv.events];
                        updated[idx].date = e.target.value;
                        setInv({ ...inv, events: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Jam Mulai - Selesai</label>
                    <div className="flex gap-2">
                      <input
                        type="time"
                        value={evt.startTime}
                        onChange={(e) => {
                          const updated = [...inv.events];
                          updated[idx].startTime = e.target.value;
                          setInv({ ...inv, events: updated });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                      <input
                        type="time"
                        value={evt.endTime}
                        onChange={(e) => {
                          const updated = [...inv.events];
                          updated[idx].endTime = e.target.value;
                          setInv({ ...inv, events: updated });
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Tempat / Venue</label>
                    <input
                      type="text"
                      value={evt.venue}
                      onChange={(e) => {
                        const updated = [...inv.events];
                        updated[idx].venue = e.target.value;
                        setInv({ ...inv, events: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Link Google Maps</label>
                    <input
                      type="text"
                      value={evt.mapsUrl}
                      onChange={(e) => {
                        const updated = [...inv.events];
                        updated[idx].mapsUrl = e.target.value;
                        setInv({ ...inv, events: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Lengkap</label>
                  <input
                    type="text"
                    value={evt.address}
                    onChange={(e) => {
                      const updated = [...inv.events];
                      updated[idx].address = e.target.value;
                      setInv({ ...inv, events: updated });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: MUSIK LATAR */}
        {activeTab === 'music' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900 border-b pb-2">
              Pilihan Musik Latar (BGM)
            </h3>
            <p className="text-xs text-slate-500">
              Musik akan diputar otomatis secara lembut begitu tamu menekan tombol "Buka Undangan".
            </p>

            <div className="space-y-2">
              {MUSIC_PLAYLIST.map((song) => {
                const isSelected = inv.bgMusicUrl === song.url;
                return (
                  <div
                    key={song.id}
                    onClick={() => setInv({ ...inv, bgMusicUrl: song.url })}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/50 shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                        <Music className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{song.title}</p>
                        <p className="text-[10px] text-slate-500">{song.artist}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-rose-600">
                      {isSelected ? '✓ Dipilih' : song.duration}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: AMPLOP DIGITAL */}
        {activeTab === 'gift' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-slate-900 border-b pb-2">
              Pengaturan Amplop Digital & Rekening Bank
            </h3>

            {inv.banks.map((b, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Bank / E-Wallet</label>
                    <input
                      type="text"
                      value={b.bankName}
                      onChange={(e) => {
                        const updated = [...inv.banks];
                        updated[idx].bankName = e.target.value;
                        setInv({ ...inv, banks: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Rekening</label>
                    <input
                      type="text"
                      value={b.accountNumber}
                      onChange={(e) => {
                        const updated = [...inv.banks];
                        updated[idx].accountNumber = e.target.value;
                        setInv({ ...inv, banks: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Atas Nama (Pemilik)</label>
                    <input
                      type="text"
                      value={b.accountHolder}
                      onChange={(e) => {
                        const updated = [...inv.banks];
                        updated[idx].accountHolder = e.target.value;
                        setInv({ ...inv, banks: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                URL Gambar Barcode QRIS (Opsional)
              </label>
              <input
                type="text"
                value={inv.qrisImageUrl || ''}
                onChange={(e) => setInv({ ...inv, qrisImageUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>
        )}

        {/* Bottom Save Action */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg shadow-rose-200 flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            Simpan Perubahan Undangan
          </button>
        </div>
      </form>
    </div>
  );
}
