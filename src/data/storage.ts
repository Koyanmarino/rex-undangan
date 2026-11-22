'use client';

import { DEFAULT_INVITATION, InvitationData, GuestItem, WishItem } from './initialInvitation';

const STORAGE_KEY = 'rex_undangan_data';

export function getStoredInvitation(): InvitationData {
  if (typeof window === 'undefined') {
    return DEFAULT_INVITATION;
  }
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_INVITATION));
      return DEFAULT_INVITATION;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading localStorage:', e);
    return DEFAULT_INVITATION;
  }
}

export function saveStoredInvitation(data: InvitationData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error writing to localStorage:', e);
  }
}

export function addGuest(guest: Omit<GuestItem, 'id' | 'isCheckedIn'>): GuestItem {
  const current = getStoredInvitation();
  const newGuest: GuestItem = {
    ...guest,
    id: `gst-${Date.now()}`,
    isCheckedIn: false,
  };
  current.guests.unshift(newGuest);
  saveStoredInvitation(current);
  return newGuest;
}

export function updateGuestRsvp(guestId: string, rsvp: GuestItem['rsvp'], pax: number): boolean {
  const current = getStoredInvitation();
  const idx = current.guests.findIndex(g => g.id === guestId);
  if (idx !== -1) {
    current.guests[idx].rsvp = rsvp;
    current.guests[idx].pax = pax;
    saveStoredInvitation(current);
    return true;
  }
  return false;
}

export function checkInGuest(guestId: string): { success: boolean; guest?: GuestItem; message: string } {
  const current = getStoredInvitation();
  const idx = current.guests.findIndex(g => g.id === guestId);
  if (idx === -1) {
    return { success: false, message: 'Data tamu tidak ditemukan di sistem.' };
  }
  
  if (current.guests[idx].isCheckedIn) {
    return {
      success: false,
      guest: current.guests[idx],
      message: `Tamu ${current.guests[idx].name} SUDAH check-in sebelumnya pada ${current.guests[idx].checkedInAt || 'tadi'}.`
    };
  }

  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;
  
  current.guests[idx].isCheckedIn = true;
  current.guests[idx].checkedInAt = timeStr;
  saveStoredInvitation(current);

  return {
    success: true,
    guest: current.guests[idx],
    message: `Berhasil check-in untuk ${current.guests[idx].name} (${current.guests[idx].pax} Pax). Selamat datang!`
  };
}

export function addWish(name: string, relationship: string, message: string): WishItem {
  const current = getStoredInvitation();
  const newWish: WishItem = {
    id: `wish-${Date.now()}`,
    name,
    relationship: relationship || 'Tamu Undangan',
    message,
    date: 'Baru saja',
    isApproved: true,
  };
  current.wishes.unshift(newWish);
  saveStoredInvitation(current);
  return newWish;
}

export function activateInvitation(packageType: 'basic' | 'pro' | 'exclusive'): void {
  const current = getStoredInvitation();
  current.status = 'active';
  current.packageType = packageType;
  current.isWatermarkRemoved = true;
  saveStoredInvitation(current);
}
