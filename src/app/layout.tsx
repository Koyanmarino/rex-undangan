import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rex Undangan - Platform SaaS Web Undangan Pernikahan Online 35 Template',
  description:
    'Platform undangan pernikahan digital terlengkap dengan 30 template foto & 5 animasi kartun syar\'i (non-foto), WhatsApp blast otomatis, buku tamu & QR check-in di venue.',
  openGraph: {
    title: 'Rex Undangan - Web Undangan Pernikahan Digital',
    description:
      'Pilih dari 35 katalog template undangan pernikahan mewah, modern, tradisional, syar\'i, dan animasi kartun non-foto.',
    url: 'https://rexundangan.com',
    siteName: 'Rex Undangan',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="antialiased text-slate-800 bg-slate-50 font-sans">
        {children}
      </body>
    </html>
  );
}
