import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateCard from '@/components/TemplateCard';
import { TEMPLATES_DATA } from '@/data/templates';
import {
  Heart,
  Sparkles,
  CheckCircle2,
  Share2,
  QrCode,
  Gift,
  Music,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users
} from 'lucide-react';

export default function HomePage() {
  const cartoonTemplates = TEMPLATES_DATA.filter((t) => t.isCartoon);
  const featuredPhotoTemplates = TEMPLATES_DATA.filter((t) => !t.isCartoon).slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-rose-200">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-gradient-to-b from-rose-50/60 via-white to-slate-50">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-200/40 via-pink-200/30 to-amber-200/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200/80 text-rose-700 text-xs font-semibold shadow-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Katalog Lengkap: 30 Template Foto + 5 Animasi Kartun Syar'i</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Undangan Pernikahan Digital{' '}
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent">
              Elegan, Instan, & Tanpa Ribet
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Buat web undangan pernikahan impian Anda dalam hitungan menit. Dilengkapi WhatsApp Blast otomatis, buku tamu & RSVP, amplop digital QRIS, serta sistem scan QR Check-in di lokasi acara.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/catalog"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-sm shadow-xl shadow-rose-200 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Lihat Katalog 35 Template
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              Mulai Buat Draf Gratis
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Coba & Preview Gratis
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Responsif HP
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Pembayaran QRIS & VA Otomatis
            </span>
          </div>
        </div>
      </section>

      {/* ================= SPECIAL SHOWCASE: 5 CARTOON TEMPLATES ================= */}
      <section className="py-16 bg-gradient-to-b from-emerald-50/50 via-teal-50/30 to-white border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 inline-flex items-center gap-1.5">
              🎨 Fitur Eksklusif Privasi
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              5 Template Animasi Kartun (Non-Foto)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Solusi sempurna bagi pasangan yang <strong>tidak ingin menampilkan foto asli</strong> untuk menjaga privasi atau mengusung konsep syar'i. Dilengkapi animasi interaktif bunga melayang, balon cinta, dan karakter kartun lucu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {cartoonTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED PHOTO TEMPLATES ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-50 text-rose-600 inline-block mb-2">
                Koleksi Foto Elegan
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
                Pilihan Template Foto Terpopuler
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Tersedia 30 pilihan gaya (Minimalis, Floral, Tradisional Nusantara, Luxury Gold, Islamic, Rustic).
              </p>
            </div>

            <Link
              href="/catalog"
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 group self-start sm:self-auto"
            >
              Lihat Seluruh 30 Template Foto
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPhotoTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= KEY FEATURES ================= */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Fitur All-in-One
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Semua yang Anda Butuhkan untuk Undangan Sempurna
            </h2>
            <p className="text-sm text-slate-400">
              Dibangun dengan teknologi Next.js 14 mutakhir, menghadirkan kecepatan loading instan di smartphone tamu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold">WhatsApp Blast Generator</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Personalisasi nama tamu otomatis (<code className="text-rose-300">?to=Budi+Santoso</code>). Kirim link sekali klik ke WhatsApp dengan format pesan undangan yang rapi.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold">Scan QR Check-In di Venue</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Panitia penerima tamu dapat memindai tiket QR Code tamu langsung dari kamera HP untuk verifikasi kehadiran dan rekap catering realtime.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold">Amplop Digital & QRIS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dukungan transfer ke rekening semua bank dengan tombol salin nomor rekening, barcode QRIS semua e-wallet, dan alamat kirim kado fisik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRICING SECTION ================= */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-100 text-rose-700">
              Harga Transparan
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Pilihan Paket Undangan
            </h2>
            <p className="text-sm text-slate-600">
              Hanya 1x bayar tanpa biaya langganan tersembunyi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Basic */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Paket Hemat</h3>
                <p className="text-xs text-slate-400">Aktif 3 Bulan</p>
                <div className="my-4">
                  <span className="font-serif text-3xl font-extrabold text-slate-900">Rp 49.000</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">✓ Akses 30 Template Foto</li>
                <li className="flex items-center gap-2">✓ Kuota 100 Tamu Undangan</li>
                <li className="flex items-center gap-2">✓ Amplop Digital</li>
              </ul>
              <Link
                href="/dashboard/checkout"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold block text-center transition-colors"
              >
                Pilih Hemat
              </Link>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-3xl bg-white border-2 border-rose-600 shadow-xl shadow-rose-100 space-y-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider">
                Paling Populer
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Paket Pro</h3>
                <p className="text-xs text-slate-400">Masa Aktif 1 Tahun Penuh</p>
                <div className="my-4">
                  <span className="font-serif text-3xl font-extrabold text-rose-600">Rp 99.000</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2 font-semibold text-slate-800">✓ Akses Seluruh 35 Template</li>
                <li className="flex items-center gap-2 font-semibold text-emerald-700">✓ Termasuk 5 Animasi Kartun Syar'i</li>
                <li className="flex items-center gap-2">✓ Hapus Watermark Sepenuhnya</li>
                <li className="flex items-center gap-2">✓ WhatsApp Blast 1-Klik Tanpa Batas</li>
                <li className="flex items-center gap-2">✓ Sistem QR Code Check-In Venue</li>
                <li className="flex items-center gap-2">✓ Musik Latar Bebas Upload MP3</li>
              </ul>
              <Link
                href="/dashboard/checkout"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold block text-center shadow-md shadow-rose-200 transition-all"
              >
                Pilih Paket Pro
              </Link>
            </div>

            {/* Exclusive */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Paket Lifetime</h3>
                <p className="text-xs text-slate-400">Masa Aktif Selamanya</p>
                <div className="my-4">
                  <span className="font-serif text-3xl font-extrabold text-slate-900">Rp 149.000</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">✓ Seluruh Fitur Paket Pro</li>
                <li className="flex items-center gap-2">✓ Masa Aktif Selamanya</li>
                <li className="flex items-center gap-2">✓ Bantuan Tim Admin Input Data</li>
              </ul>
              <Link
                href="/dashboard/checkout"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold block text-center transition-colors"
              >
                Pilih Lifetime
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section id="faq" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-3xl font-bold text-slate-900">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <p className="text-xs text-slate-500">
              Informasi seputar cara kerja, template, dan pembayaran.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-sm text-slate-800">
                Apakah saya bisa mencoba membuat draf undangan secara gratis?
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Ya! Anda bisa bebas mendaftar, memilih salah satu dari 35 template di katalog, mengisi seluruh data, dan melihat pratinjau hasilnya secara gratis. Anda hanya perlu membayar 1x saat hendak mengaktifkan link publik dan menghapus watermark draf.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-sm text-slate-800">
                Bagaimana cara kerja 5 template animasi kartun (non-foto)?
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Template kartun ini dirancang khusus bagi pasangan yang ingin menjaga privasi atau menerapkan konsep syar'i tanpa foto manusia asli. Anda bisa memilih dari berbagai karakter kartun bawaan (syar'i berhijab, pakaian adat, modern, dll.) atau mengunggah gambar karikatur buatan Anda sendiri.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-sm text-slate-800">
                Apakah nama tamu undangan bisa otomatis berganti di setiap link WhatsApp?
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Bisa! Melalui menu Buku Tamu di Dashboard, sistem akan otomatis menghasilkan tautan dengan parameter nama tamu (misal: <code>domain.com/u/slug?to=Bapak+Joko</code>). Tersedia tombol sekali klik "Kirim WA" yang langsung membuka WhatsApp dengan ucapan dan nama yang telah terisi otomatis.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="font-bold text-sm text-slate-800">
                Metode pembayaran apa saja yang didukung?
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Kami terintegrasi resmi dengan Midtrans Snap, mendukung pembayaran otomatis 24 jam melalui QRIS (BCA, GoPay, OVO, ShopeePay, Dana), Virtual Account semua bank (BCA, Mandiri, BNI, BRI, Permata), dan gerai Alfamart/Indomaret.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA BANNER ================= */}
      <section className="py-16 bg-gradient-to-r from-rose-600 via-rose-700 to-pink-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Wujudkan Undangan Pernikahan Terbaik Anda Hari Ini
          </h2>
          <p className="text-xs sm:text-sm text-rose-100 max-w-xl mx-auto">
            Hanya butuh 5 menit untuk memilih template, mengisi data, dan menyebarkan undangan ke seluruh sanak saudara.
          </p>
          <div className="flex justify-center gap-3">
            <Link
              href="/catalog"
              className="px-6 py-3 rounded-2xl bg-white text-rose-700 font-bold text-xs shadow-lg hover:bg-rose-50 transition-all"
            >
              Jelajahi 35 Katalog Template
            </Link>
            <Link
              href="/dashboard/edit"
              className="px-6 py-3 rounded-2xl bg-rose-800/80 hover:bg-rose-800 text-white font-bold text-xs border border-rose-400/40 transition-all"
            >
              Mulai Desain Sekarang
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
