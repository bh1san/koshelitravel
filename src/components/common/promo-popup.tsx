
'use client';
// This component now acts as a client-side wrapper for the dialog logic.
// The actual data (imageUrl) is fetched by the parent Server Component.

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { siteSettings } from '@/lib/mock-data';


const POPUP_SEEN_SESSION_KEY = 'kosheliTravelPopupSeen';

function PromoPopupClient({ imageUrl }: { imageUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // This effect runs once to determine if the popup should be shown
    if (typeof window !== 'undefined') {
      const hasSeenPopup = sessionStorage.getItem(POPUP_SEEN_SESSION_KEY);
      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          sessionStorage.setItem(POPUP_SEEN_SESSION_KEY, 'true');
        }, 2000); // Delay popup by 2 seconds
        return () => clearTimeout(timer);
      }
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 max-w-md sm:max-w-lg md:max-w-xl overflow-hidden shadow-xl rounded-lg animate-fadeIn">
        <DialogHeader className="p-3 flex flex-row items-center justify-between border-b bg-muted/40">
          <DialogTitle className="text-base font-semibold text-primary">Special Promotion!</DialogTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close popup" className="h-7 w-7">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="p-4 flex justify-center items-center bg-background">
          {!imageUrl ? (
            <Skeleton className="w-full h-64" />
          ) : (
            <img
              src={imageUrl}
              alt="Special Promotion"
              className="max-w-full max-h-[70vh] object-contain rounded-md"
              key={imageUrl}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


// This is the new main export, a Server Component that fetches data.
export function PromoPopup() {
  const data = siteSettings.promo;
  return <PromoPopupClient imageUrl={data.imageUrl} />;
}
