'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateCard from '@/components/TemplateCard';
import { TEMPLATES_DATA, CATEGORIES } from '@/data/templates';
import { Sparkles, Search } from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filteredTemplates = TEMPLATES_DATA.filter((tpl) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'cartoon' ? tpl.isCartoon : tpl.category === selectedCategory);

    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.themeType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-rose-100 text-rose-700 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Koleksi Desain Lengkap
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          Katalog 35 Template Undangan
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Pilih dari <strong>30 template foto</strong> berestetika tinggi atau{' '}
          <strong>5 template animasi kartun (non-foto)</strong> yang dirancang khusus untuk konsep syar'i dan privasi.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari tema, gaya adat, floral, kartun, warna..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-200 scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-2">
        <span>
          Menampilkan <strong>{filteredTemplates.length}</strong> dari 35 Template
        </span>
        <span>
          (30 Foto • 5 Animasi Kartun)
        </span>
      </div>

      {/* Template Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <p className="text-base font-semibold text-slate-700">
            Tidak ada template yang cocok dengan pencarian "{searchQuery}"
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs font-bold text-rose-600 hover:underline"
          >
            Reset Filter Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <Suspense fallback={<div className="text-center py-20 text-slate-500 text-sm">Memuat katalog...</div>}>
          <CatalogContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
