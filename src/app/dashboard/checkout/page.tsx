'use client';

import { useState, useEffect } from 'react';
import {
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sparkles,
  QrCode,
  Building,
  ArrowRight
} from 'lucide-react';
import { getStoredInvitation, activateInvitation } from '@/data/storage';
import { InvitationData } from '@/data/initialInvitation';
import { fireWeddingConfetti } from '@/components/ConfettiButton';

export default function CheckoutPage() {
  const [invitation, setInvitation] = useState<InvitationData>(getStoredInvitation());
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro' | 'exclusive'>('pro');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSnapOpen, setIsSnapOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'qris' | 'bca_va' | 'mandiri_va'>('qris');

  useEffect(() => {
    setInvitation(getStoredInvitation());
  }, []);

  const plans = [
    {
      id: 'basic',
      name: 'Paket Hemat',
      price: 'Rp 49.000',
      period: 'Masa Aktif 3 Bulan',
      features: [
        'Akses 30 Template Foto',
        'Buku Tamu & RSVP Dasar',
        'Amplop Digital (Rekening)',
        'Maksimal 100 Tamu Undangan',
      ],
      popular: false,
    },
    {
      id: 'pro',
      name: 'Paket Pro (Paling Favorit)',
      price: 'Rp 99.000',
      period: 'Masa Aktif 1 Tahun Penuh',
      features: [
        'Akses Penuh Seluruh 35 Template',
        'Termasuk 5 Animasi Kartun Non-Foto',
        'Hapus Watermark Sepenuhnya',
        'WhatsApp Blast 1-Klik Tanpa Batas',
        'Sistem QR Code Check-In di Venue',
        'Lagu Musik Latar Bebas Pilih/Upload',
        'Dukungan QRIS & Multi-Rekening',
      ],
      popular: true,
    },
    {
      id: 'exclusive',
      name: 'Paket Eksklusif Lifetime',
      price: 'Rp 149.000',
      period: 'Masa Aktif Selamanya',
      features: [
        'Semua Fitur Paket Pro',
        'Masa Aktif Selamanya (Kenangan Abadi)',
        'Bantuan Tim Admin Input Data',
        'Prioritas Server Super Cepat',
      ],
      popular: false,
    },
  ];

  const handleStartPayment = () => {
    setIsSnapOpen(true);
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      activateInvitation(selectedPlan);
      setInvitation(getStoredInvitation());
      setIsProcessing(false);
      setIsSnapOpen(false);
      setPaymentSuccess(true);
      fireWeddingConfetti();
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-6">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Aktivasi & Pembayaran Undangan
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Aktifkan link publik undangan pernikahan Anda, hilangkan watermark draf, dan nikmati fitur lengkap.
        </p>
      </div>

      {paymentSuccess && (
        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-emerald-900">
            Pembayaran Berhasil Diverifikasi!
          </h3>
          <p className="text-xs text-emerald-700 max-w-md mx-auto">
            Selamat! Undangan digital Anda kini resmi berstatus <strong>AKTIF</strong> tanpa watermark. Link sudah dapat disebarkan ke seluruh tamu.
          </p>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => {
          const isSelected = selectedPlan === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedPlan(p.id as any)}
              className={`relative rounded-3xl p-6 border-2 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-rose-600 bg-white shadow-xl shadow-rose-100'
                  : 'border-slate-200 bg-white hover:border-rose-300'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Rekomendasi
                </div>
              )}

              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">{p.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{p.period}</p>

                <div className="my-5">
                  <span className="font-serif text-3xl font-extrabold text-slate-900">{p.price}</span>
                  <span className="text-xs text-slate-400 ml-1">/ 1x bayar</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isSelected ? 'Paket Terpilih' : 'Pilih Paket Ini'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Checkout Action Box */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            Payment Gateway Midtrans
          </span>
          <h3 className="font-serif text-xl font-bold mt-2">
            Siap Mengaktifkan Undangan Anda?
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Pembayaran otomatis melalui QRIS instan, GoPay, ShopeePay, dan Virtual Account semua bank.
          </p>
        </div>

        <button
          onClick={handleStartPayment}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xs shadow-lg shadow-rose-900/50 flex items-center gap-2 transition-all hover:scale-105 shrink-0"
        >
          <CreditCard className="w-4 h-4" />
          Bayar Sekarang (Midtrans Snap)
        </button>
      </div>

      {/* Midtrans Snap Modal Simulator */}
      {isSnapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            {/* Snap Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center font-bold text-xs">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-xs">Midtrans Snap Checkout</h4>
                  <p className="text-[10px] text-slate-400">Merchant: Rex Undangan SaaS</p>
                </div>
              </div>
              <button
                onClick={() => setIsSnapOpen(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            {/* Total Payment Amount */}
            <div className="p-5 bg-rose-50/50 border-b border-rose-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Total Pembayaran:</p>
                <p className="font-serif text-2xl font-bold text-rose-700">
                  {selectedPlan === 'basic' ? 'Rp 49.000' : selectedPlan === 'pro' ? 'Rp 99.000' : 'Rp 149.000'}
                </p>
              </div>
              <div className="text-right text-[11px] text-slate-500">
                <p className="font-semibold text-slate-800">Order #{Date.now().toString().slice(-6)}</p>
                <p>1x Aktivasi Lisensi</p>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="p-5 space-y-3">
              <p className="text-xs font-bold text-slate-700">Pilih Metode Pembayaran:</p>

              <div
                onClick={() => setSelectedMethod('qris')}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedMethod === 'qris'
                    ? 'border-rose-600 bg-rose-50/40 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                    <QrCode className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">QRIS Instan</p>
                    <p className="text-[10px] text-slate-500">BCA, GoPay, OVO, Dana, ShopeePay</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="pm"
                  checked={selectedMethod === 'qris'}
                  onChange={() => {}}
                  className="accent-rose-600"
                />
              </div>

              <div
                onClick={() => setSelectedMethod('bca_va')}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedMethod === 'bca_va'
                    ? 'border-rose-600 bg-rose-50/40 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">BCA Virtual Account</p>
                    <p className="text-[10px] text-slate-500">Verifikasi otomatis 24 jam</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="pm"
                  checked={selectedMethod === 'bca_va'}
                  onChange={() => {}}
                  className="accent-rose-600"
                />
              </div>

              <div
                onClick={() => setSelectedMethod('mandiri_va')}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  selectedMethod === 'mandiri_va'
                    ? 'border-rose-600 bg-rose-50/40 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                    <Building className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Mandiri Bill Payment</p>
                    <p className="text-[10px] text-slate-500">Livin by Mandiri & ATM</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="pm"
                  checked={selectedMethod === 'mandiri_va'}
                  onChange={() => {}}
                  className="accent-rose-600"
                />
              </div>
            </div>

            {/* Sim Payment Action */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Enkripsi SSL 256-bit
              </div>

              <button
                onClick={handleCompletePayment}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-200 transition-all flex items-center gap-1.5"
              >
                {isProcessing ? (
                  <span>Memproses...</span>
                ) : (
                  <>
                    <span>Konfirmasi Bayar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
