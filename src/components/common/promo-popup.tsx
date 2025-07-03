
'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const POPUP_SEEN_SESSION_KEY = 'kosheliTravelPopupSeen';

interface PromoData {
  imageUrl: string;
}

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<PromoData | null>(null);

  useEffect(() => {
    // This effect runs once to determine if the popup should be shown
    if (typeof window !== 'undefined') {
      const hasSeenPopup = sessionStorage.getItem(POPUP_SEEN_SESSION_KEY);
      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          sessionStorage.setItem(POPUP_SEEN_SESSION_KEY, 'true');
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  useEffect(() => {
    // This effect runs only when the popup is opened to fetch data
    async function fetchPromoData() {
      try {
        // Add cache-busting query parameter
        const response = await fetch(`/api/settings/promo?t=${new Date().getTime()}`);
        if (!response.ok) throw new Error('Failed to fetch promo data');
        const promoData = await response.json();
        setData(promoData);
      } catch (error) {
        console.error("Failed to fetch promo data:", error);
        setData(null);
      }
    }
    
    if (isOpen) {
      fetchPromoData();
    }
  }, [isOpen]);

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
          {!data?.imageUrl ? (
            <Skeleton className="w-full h-64" />
          ) : (
            <img
              src={data.imageUrl}
              alt="Special Promotion"
              className="max-w-full max-h-[70vh] object-contain rounded-md"
              key={data.imageUrl} // Use key to force re-render on URL change
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
