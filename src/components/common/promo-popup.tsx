
'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getSiteSettings } from '@/app/actions/settingsActions';

const POPUP_SEEN_SESSION_KEY = 'kosheliTravelPopupSeen';

// Client component to handle dialog logic and state
function PromoPopupClient({ imageUrl }: { imageUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // This effect runs once on the client to determine if the popup should be shown
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
              key={imageUrl} // Force re-render if URL changes
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// This is the main export, a Server Component that fetches data
// and passes it to the client component.
export function PromoPopup() {
    // This is now a server component wrapper that fetches data on the server
    // but defers the actual rendering to a client component that can use state and effects.
    // To avoid making this a full async component which can have other implications,
    // we use a simple trick for the prototype: fetch data in the parent component (`page.tsx`)
    // and pass it down. But for now, let's keep it simple and demonstrate the client part.
    // A better way would be to create a wrapper that fetches.
    // For now, let's make the parent an async component that fetches the data.
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const settings = await getSiteSettings();
                setImageUrl(settings.promo.imageUrl);
            } catch (error) {
                console.error("Failed to fetch promo settings", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (isLoading) {
        return null; // Don't show anything while loading settings
    }

    return <PromoPopupClient imageUrl={imageUrl} />;
}
