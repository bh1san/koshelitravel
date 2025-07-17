
'use client';

import { FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const WHATSAPP_PHONE_NUMBER = '+15551234567'; // Replace with your actual WhatsApp number

export function WhatsappChat() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER.replace(/\D/g, '')}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-green-600"
            aria-label="Chat with us on WhatsApp"
          >
            <FaWhatsapp className="h-8 w-8" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-card text-card-foreground">
          <p>Chat on WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
