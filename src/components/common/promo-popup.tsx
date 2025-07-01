
'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { DEFAULT_PROMO_IMAGE_URL } from '@/lib/mock-data';

const PROMO_IMAGE_STORAGE_KEY = 'kosheliTravelPromoImage';
const POPUP_SEEN_SESSION_KEY = 'kosheliTravelPopupSeen';

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [promoImageUrl, setPromoImageUrl] = useState(DEFAULT_PROMO_IMAGE_URL);

  useEffect(() => {
    // This effect runs only on the client
    const hasSeenPopup = sessionStorage.getItem(POPUP_SEEN_SESSION_KEY);
    
    // Only show the popup if the user hasn't seen it in this session
    if (!hasSeenPopup) {
      setIsOpen(true);
      sessionStorage.setItem(POPUP_SEEN_SESSION_KEY, 'true');
    }

    const storedImageUrl = localStorage.getItem(PROMO_IMAGE_STORAGE_KEY);
    if (storedImageUrl) {
      setPromoImageUrl(storedImageUrl);
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === PROMO_IMAGE_STORAGE_KEY && event.newValue) {
        setPromoImageUrl(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Don't render the Dialog if it's not supposed to be open
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 max-w-md sm:max-w-lg md:max-w-xl overflow-hidden shadow-xl rounded-lg">
        <DialogHeader className="p-3 flex flex-row items-center justify-between border-b bg-muted/40">
          <DialogTitle className="text-base font-semibold text-primary">Special Promotion!</DialogTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close popup" className="h-7 w-7">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="p-4 flex justify-center items-center bg-background">
          <img
            src={promoImageUrl}
            alt="Special Promotion"
            className="max-w-full max-h-[70vh] object-contain rounded-md"
            key={promoImageUrl} // Add key to force re-render if URL changes
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
