
'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { DEFAULT_PROMO_IMAGE_URL, PROMO_IMAGE_STORAGE_KEY } from '@/lib/mock-data';
import { Skeleton } from '@/components/ui/skeleton';

const POPUP_SEEN_SESSION_KEY = 'kosheliTravelPopupSeen';

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [promoImageUrl, setPromoImageUrl] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    setIsMounted(true);

    const hasSeenPopup = sessionStorage.getItem(POPUP_SEEN_SESSION_KEY);
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem(POPUP_SEEN_SESSION_KEY, 'true');
      }, 2000); // 2-second delay
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const checkStorage = () => {
      const storedUrl = localStorage.getItem(PROMO_IMAGE_STORAGE_KEY) || DEFAULT_PROMO_IMAGE_URL;
      if (storedUrl !== promoImageUrl) {
        setPromoImageUrl(storedUrl);
      }
    };

    checkStorage();
    const intervalId = setInterval(checkStorage, 1000);
    return () => clearInterval(intervalId);

  }, [isMounted, promoImageUrl]);

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
          {!promoImageUrl ? (
            <Skeleton className="w-full h-64" />
          ) : (
            <img
              src={promoImageUrl}
              alt="Special Promotion"
              className="max-w-full max-h-[70vh] object-contain rounded-md"
              key={promoImageUrl}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
