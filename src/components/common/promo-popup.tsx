
'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { DEFAULT_PROMO_IMAGE_URL, PROMO_IMAGE_STORAGE_KEY } from '@/lib/mock-data';

const POPUP_SEEN_SESSION_KEY = 'kosheliTravelPopupSeen';

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [promoImageUrl, setPromoImageUrl] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Effect to control popup visibility (show once per session)
  useEffect(() => {
    setIsClient(true);
    const hasSeenPopup = sessionStorage.getItem(POPUP_SEEN_SESSION_KEY);
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem(POPUP_SEEN_SESSION_KEY, 'true');
      }, 2000); // 2-second delay
      return () => clearTimeout(timer);
    }
  }, []);

  // Effect to manage the promo image URL and listen for live updates via polling
  useEffect(() => {
    if(!isClient) return;

    const checkStorage = () => {
        const storedUrl = localStorage.getItem(PROMO_IMAGE_STORAGE_KEY) || DEFAULT_PROMO_IMAGE_URL;
        setPromoImageUrl(currentUrl => currentUrl !== storedUrl ? storedUrl : currentUrl);
    };

    // Initial check on mount
    checkStorage();

    // Poll every second for changes.
    const intervalId = setInterval(checkStorage, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [isClient]);

  if (!isClient || !isOpen || !promoImageUrl) {
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
            key={promoImageUrl} // Force re-render on URL change
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
