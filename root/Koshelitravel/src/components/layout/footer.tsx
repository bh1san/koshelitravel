
import Link from 'next/link';
import { Plane, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';
import { NewsletterForm } from '@/components/common/newsletter-form';
import Image from 'next/image';

interface FooterProps {
  logoUrl: string | null;
}

export function Footer({ logoUrl }: FooterProps) {
  const Logo = () => (
    <>
      {logoUrl ? (
        <Image src={logoUrl} alt="KosheliTravel Logo" width={150} height={40} className="h-10 w-auto" />
      ) : (
        <>
          <Plane className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">KosheliTravel</span>
        </>
      )}
    </>
  );

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 md:py-16">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4" aria-label="KosheliTravel Home">
            <Logo />
          </Link>
          <p className="text-sm leading-relaxed">
            Crafting unforgettable journeys with a blend of AI precision and human expertise.
          </p>
          <div className="flex space-x-4 mt-6">
            <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></Link>
            <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></Link>
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 font-headline text-primary">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#team" className="hover:text-primary transition-colors">Our Team</Link></li>
            <li><Link href="/#all-packages" className="hover:text-primary transition-colors">Packages</Link></li>
            <li><Link href="/#services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 font-headline text-primary">Stay Connected</h3>
          <p className="text-sm mb-4">Subscribe to our newsletter for the latest travel deals and destination inspiration.</p>
          <NewsletterForm />
          <div className="mt-6 space-y-2 text-sm">
            <p className="flex items-center gap-2"><Mail size={16} className="text-accent"/> koshelitravel@gmail.com</p>
            <p className="flex items-center gap-2"><Phone size={16} className="text-accent"/> 04 353 8898</p>
          </div>
        </div>
      </div>
      <div className="container text-center mt-10 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} KosheliTravel. All rights reserved.</p>
      </div>
    </footer>
  );
}
