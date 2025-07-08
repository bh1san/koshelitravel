
'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const POPUP_SEEN_SESSION_KEY = 'kosheliTravelPopupSeen';

interface PromoPopupProps {
  imageUrl: string | null;
  enabled: boolean;
}

export function PromoPopup({ imageUrl, enabled }: PromoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // This effect runs once on the client to determine if the popup should be shown
    if (enabled && typeof window !== 'undefined' && imageUrl) {
      const hasSeenPopup = sessionStorage.getItem(POPUP_SEEN_SESSION_KEY);
      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          sessionStorage.setItem(POPUP_SEEN_SESSION_KEY, 'true');
        }, 2000); // Delay popup by 2 seconds
        return () => clearTimeout(timer);
      }
    }
  }, [imageUrl, enabled]);

  if (!isOpen || !imageUrl || !enabled) {
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
            src={imageUrl}
            alt="Special Promotion"
            className="w-full h-auto max-h-[70vh] object-contain rounded-md"
            key={imageUrl} // Force re-render if URL changes
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
