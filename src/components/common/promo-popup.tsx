
'use client';

import { useEffect, useState, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { DEFAULT_PROMO_IMAGE_URL, PROMO_IMAGE_STORAGE_KEY } from '@/lib/mock-data';

const POPUP_SEEN_SESSION_KEY = 'kosheliTravelPopupSeen';

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [promoImageUrl, setPromoImageUrl] = useState<string | null>(null);

  // Memoized function to load the image URL from localStorage
  const loadDataFromStorage = useCallback(() => {
    const storedUrl = localStorage.getItem(PROMO_IMAGE_STORAGE_KEY);
    setPromoImageUrl(storedUrl || DEFAULT_PROMO_IMAGE_URL);
  }, []);

  // Effect to control popup visibility (show once per session)
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem(POPUP_SEEN_SESSION_KEY);
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem(POPUP_SEEN_SESSION_KEY, 'true');
      }, 2000); // 2-second delay
      return () => clearTimeout(timer);
    }
  }, []);

  // Effect to load the image URL and listen for cross-tab updates
  useEffect(() => {
    // Initial data load on mount
    loadDataFromStorage();

    // Listen for changes from other tabs
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === PROMO_IMAGE_STORAGE_KEY) {
        loadDataFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadDataFromStorage]);


  // Do not render the dialog until it's ready to be shown and the image URL is loaded
  if (!isOpen || !promoImageUrl) {
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
