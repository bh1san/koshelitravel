
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the popup after the component mounts on the client
    setIsOpen(true);
  }, []); // Empty dependency array ensures this runs once on mount (per refresh)

  // Don't render the Dialog if it's not supposed to be open,
  // this helps avoid potential hydration issues with Dialogs.
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
        <div className="relative w-full aspect-[1080/1080]"> {/* Using the original image's aspect ratio */}
          <Image
            src="/images/visa-promo.png"
            alt="A2A Visa Change Promotion"
            layout="fill"
            objectFit="contain" 
            priority // Consider if this image is critical for LCP
          />
        </div>
        {/* You can add a footer with a button if needed, for example:
        <DialogFooter className="p-3 border-t bg-muted/40">
          <Button onClick={() => setIsOpen(false)} variant="outline" size="sm">Close</Button>
          <Button onClick={() => { setIsOpen(false); window.location.href = '#contact'; }} size="sm">Contact Us</Button>
        </DialogFooter>
        */}
      </DialogContent>
    </Dialog>
  );
}
