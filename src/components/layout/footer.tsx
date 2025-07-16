
import Link from 'next/link';
import { Store, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';
import { NewsletterForm } from '@/components/common/newsletter-form';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 md:py-16">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4" aria-label="DropShipKit Home">
            <Store className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold text-primary">DropShipKit</span>
          </Link>
          <p className="text-sm leading-relaxed">
            The all-in-one platform to launch and scale your dropshipping business.
          </p>
          <div className="flex space-x-4 mt-6">
            <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></Link>
            <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></Link>
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 font-headline text-primary">Platform</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
            <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Login</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 font-headline text-primary">Stay Updated</h3>
          <p className="text-sm mb-4">Subscribe to our newsletter for the latest e-commerce tips and platform updates.</p>
          <NewsletterForm />
          <div className="mt-6 space-y-2 text-sm">
            <p className="flex items-center gap-2"><Mail size={16} className="text-accent"/> support@dropshipkit.com</p>
            <p className="flex items-center gap-2"><Phone size={16} className="text-accent"/> +1 (555) 123-4567</p>
          </div>
        </div>
      </div>
      <div className="container text-center mt-10 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} DropShipKit. All rights reserved.</p>
      </div>
    </footer>
  );
}
