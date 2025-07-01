
'use client';

// A simple wrapper for BroadcastChannel to ensure it's a singleton and SSR-safe.
let channel: BroadcastChannel | null = null;

export function getChannel(): BroadcastChannel | null {
  if (typeof window === 'undefined') {
    return null;
  }
  if (channel === null) {
    channel = new BroadcastChannel('kosheli_travel_updates');
  }
  return channel;
}
