'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Eye, CheckCircle2 } from 'lucide-react';
import { TemplateItem } from '@/data/templates';
import { getStoredInvitation, saveStoredInvitation } from '@/data/storage';
import { useRouter } from 'next/navigation';

interface TemplateCardProps {
  template: TemplateItem;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const router = useRouter();

  const handleSelectTemplate = () => {
    const inv = getStoredInvitation();
    inv.templateSlug = template.slug;
    saveStoredInvitation(inv);
    router.push('/dashboard/edit');
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-rose-100/80 hover:border-rose-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <Image
          src={template.thumbnail}
          alt={template.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {template.isCartoon ? (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500 text-white shadow-md flex items-center gap-1">
              🎨 Animasi Kartun
            </span>
          ) : (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/90 backdrop-blur-sm text-slate-800 shadow-sm">
              📷 Foto
            </span>
          )}
          {template.badge && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-500 text-white shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {template.badge}
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity p-4">
          <Link
            href={`/u/romeo-juliet?tpl=${template.slug}`}
            target="_blank"
            className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-white/95 text-slate-900 shadow-lg hover:bg-white hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-rose-600" />
            Live Demo
          </Link>
          <button
            onClick={handleSelectTemplate}
            className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-rose-600 text-white shadow-lg hover:bg-rose-700 hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Pilih Template
          </button>
        </div>

        {/* Bottom Overlay Title on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="text-[11px] font-medium text-rose-200 uppercase tracking-wider">
            {template.themeType}
          </p>
          <h3 className="font-serif text-lg font-bold drop-shadow-sm">
            {template.name}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
          {template.description}
        </p>

        {/* Features Chips */}
        <div className="flex flex-wrap gap-1 mb-4">
          {template.features.slice(0, 3).map((f, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100"
            >
              ✓ {f}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <Link
            href={`/u/romeo-juliet?tpl=${template.slug}`}
            target="_blank"
            className="py-2 text-center text-xs font-medium text-slate-700 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200"
          >
            Live Demo
          </Link>
          <button
            onClick={handleSelectTemplate}
            className="py-2 text-center text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-all"
          >
            Gunakan
          </button>
        </div>
      </div>
    </div>
  );
}
