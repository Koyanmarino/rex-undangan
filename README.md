# Rex Undangan - Platform SaaS Web Undangan Pernikahan Online

Platform SaaS undangan pernikahan digital terlengkap di Indonesia dengan **katalog 35 template** (30 template berbasis foto estetis + 5 template non-foto animasi kartun syar'i/privasi).

---

## 🌟 Fitur Utama

1. **Katalog 35 Template**:
   - **30 Template Foto**: 6 Kategori (Minimalist Clean, Floral & Botanical, Adat Tradisional Nusantara, Luxury Gold Glamour, Islamic & Arabian, Rustic Vintage).
   - **5 Template Animasi Kartun Non-Foto**: Dirancang khusus untuk konsep syar'i / menjaga privasi tanpa foto manusia asli. Dilengkapi animasi kelopak bunga (CSS particle), balon cinta, ornamen tradisional, dan fairytale fireflies.
2. **Form-Based Structured Editor**:
   - Formulir pengisian data mempelai, jadwal acara, galeri, musik, amplop digital, dan live preview instan yang anti-rusak (*layout-safe*).
3. **Manajemen Buku Tamu & WhatsApp Blast 1-Klik**:
   - Personalisasi nama tamu otomatis (`/u/slug?to=Nama+Tamu`).
   - Tombol kirim pesan WhatsApp otomatis dengan template pesan yang rapi.
   - Rekap status konfirmasi kehadiran (RSVP).
4. **Buku Tamu Digital & QR Code Check-In di Lokasi Acara**:
   - Tiket QR Code unik di setiap undangan tamu.
   - Portal panitia penerima tamu (`/checkin/slug`) untuk scan QR atau input kode tiket via smartphone secara realtime.
5. **Amplop Digital Lengkap**:
   - Multi-rekening bank dengan tombol salin nomor rekening instan, gambar QRIS untuk semua e-wallet, dan alamat kirim kado fisik.
6. **Integrasi Pembayaran Midtrans Snap**:
   - Skema *Free Draft & Preview*, 1x pembayaran (*one-time payment*) untuk aktivasi publik dan hapus watermark via QRIS instan & Virtual Account.

---

## 🚀 Menjalankan Aplikasi

```bash
# Jalankan development server
npm run dev

# Jalankan production build
npm run build
npm run start
```

Akses aplikasi di browser:
- **Landing Page**: [http://localhost:3000](http://localhost:3000)
- **Katalog 35 Template**: [http://localhost:3000/catalog](http://localhost:3000/catalog)
- **Dashboard Pengantin**: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Editor Formulir**: [http://localhost:3000/dashboard/edit](http://localhost:3000/dashboard/edit)
- **Buku Tamu & WA Blast**: [http://localhost:3000/dashboard/guests](http://localhost:3000/dashboard/guests)
- **Contoh Undangan Publik**: [http://localhost:3000/u/romeo-juliet](http://localhost:3000/u/romeo-juliet)
- **Contoh Undangan Tamu Personal**: [http://localhost:3000/u/romeo-juliet?to=Bpk.+Budi+Santoso](http://localhost:3000/u/romeo-juliet?to=Bpk.+Budi+Santoso)
- **Portal Scan QR Check-In Panitia**: [http://localhost:3000/checkin/romeo-juliet](http://localhost:3000/checkin/romeo-juliet)

---

## 📁 Struktur Direktori

```
src/
├── app/
│   ├── layout.tsx                     # Root layout, metadata & fonts
│   ├── page.tsx                       # Landing page (Hero, 5 Kartun highlight, pricing, FAQ)
│   ├── catalog/page.tsx               # Katalog lengkap 35 template dengan filter & search
│   ├── dashboard/
│   │   ├── layout.tsx                 # Sidebar navigasi dashboard
│   │   ├── page.tsx                   # Ringkasan metrik & status undangan
│   │   ├── edit/page.tsx              # Form-based structured editor
│   │   ├── guests/page.tsx            # Guest list & WA blast generator
│   │   ├── wishes/page.tsx            # Moderasi doa & ucapan
│   │   └── checkout/page.tsx          # Simulator pembayaran Midtrans Snap
│   ├── u/[slug]/page.tsx              # Halaman undangan publik interaktif
│   └── checkin/[slug]/page.tsx        # Portal scanner QR check-in panitia venue
├── components/                        # Komponen UI (Navbar, Footer, TemplateCard, MusicPlayer, dll)
├── data/                              # Data 35 template, aset kartun, mock data, & local storage
└── templates/
    ├── PhotoTemplateRenderer.tsx      # Renderer untuk 30 template foto
    └── CartoonTemplateRenderer.tsx    # Renderer untuk 5 template animasi kartun non-foto
```
