'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { TEMPLATES_DATA, TemplateItem } from '@/data/templates';
import { getStoredInvitation, addWish, updateGuestRsvp } from '@/data/storage';
import { InvitationData } from '@/data/initialInvitation';
import CartoonTemplateRenderer from '@/templates/CartoonTemplateRenderer';
import PhotoTemplateRenderer from '@/templates/PhotoTemplateRenderer';
import MusicPlayer from '@/components/MusicPlayer';

function InvitationContent() {
  const searchParams = useSearchParams();
  const [invitation, setInvitation] = useState<InvitationData>(getStoredInvitation());
  const [template, setTemplate] = useState<TemplateItem>(TEMPLATES_DATA[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [autoPlayMusic, setAutoPlayMusic] = useState(false);

  // Read dynamic guest name from ?to=Nama+Tamu
  const guestName = searchParams.get('to') || 'Tamu Undangan';
  const customTemplateSlug = searchParams.get('tpl');

  useEffect(() => {
    const inv = getStoredInvitation();
    setInvitation(inv);

    const targetSlug = customTemplateSlug || inv.templateSlug;
    const foundTpl = TEMPLATES_DATA.find((t) => t.slug === targetSlug) || TEMPLATES_DATA[0];
    setTemplate(foundTpl);
  }, [customTemplateSlug]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setAutoPlayMusic(true);
  };

  const handleAddWish = (name: string, relationship: string, message: string) => {
    addWish(name, relationship, message);
    setInvitation(getStoredInvitation());
  };

  const handleRsvp = (rsvp: 'attending' | 'declined' | 'maybe', pax: number) => {
    updateGuestRsvp('gst-current-visitor', rsvp, pax);
    setInvitation(getStoredInvitation());
  };

  return (
    <div className="relative">
      {/* Floating Background Music Player */}
      <MusicPlayer audioUrl={invitation.bgMusicUrl} autoPlayTrigger={autoPlayMusic} />

      {/* Render Cartoon or Photo Template */}
      {template.isCartoon ? (
        <CartoonTemplateRenderer
          invitation={invitation}
          template={template}
          guestName={guestName}
          isOpen={isOpen}
          onOpenInvitation={handleOpenInvitation}
          onAddWish={handleAddWish}
          onRsvp={handleRsvp}
        />
      ) : (
        <PhotoTemplateRenderer
          invitation={invitation}
          template={template}
          guestName={guestName}
          isOpen={isOpen}
          onOpenInvitation={handleOpenInvitation}
          onAddWish={handleAddWish}
          onRsvp={handleRsvp}
        />
      )}
    </div>
  );
}

export default function PublicInvitationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-sm">Memuat undangan...</div>}>
      <InvitationContent />
    </Suspense>
  );
}
