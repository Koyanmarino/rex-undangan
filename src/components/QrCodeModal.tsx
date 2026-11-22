'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, X, Download } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName: string;
  guestId: string;
  slug: string;
}

export default function QrCodeModal({ isOpen, onClose, guestName, guestId, slug }: QrCodeModalProps) {
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && guestId) {
      const payload = JSON.stringify({
        guestId,
        slug,
        timestamp: Date.now()
      });
      QRCode.toDataURL(payload, {
        width: 300,
        margin: 2,
        color: {
          dark: '#9f1239',
          light: '#ffffff'
        }
      }).then(url => {
        setQrUrl(url);
      }).catch(err => console.error(err));
    }
  }, [isOpen, guestId, slug]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 text-center border border-rose-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="font-serif text-xl font-bold text-slate-800">
          Tiket Masuk Resepsi
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">
          Tunjukkan QR Code ini kepada panitia penerima tamu di lokasi resepsi pernikahan.
        </p>

        {/* QR Box */}
        <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 inline-block mb-4">
          {qrUrl ? (
            <img src={qrUrl} alt="QR Code Tamu" className="w-48 h-48 mx-auto rounded-xl shadow-sm" />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-xs text-slate-400">
              Membuat QR Code...
            </div>
          )}
        </div>

        <div className="bg-slate-50 rounded-xl p-3 mb-5 border border-slate-100">
          <p className="text-[11px] text-slate-400 uppercase tracking-wider">Nama Tamu Undangan</p>
          <p className="font-semibold text-slate-800 text-sm">{guestName}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">ID: {guestId}</p>
        </div>

        {qrUrl && (
          <a
            href={qrUrl}
            download={`Tiket-${guestName.replace(/\s+/g, '_')}.png`}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Simpan Gambar Tiket
          </a>
        )}
      </div>
    </div>
  );
}
