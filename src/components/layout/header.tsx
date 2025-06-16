
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Plane, Ticket } from 'lucide-react';

const navLinks = [
  { href: '#packages', label: 'Packages' },
  { href: '/visit-visa', label: 'Visit Visa' },
  { href: '#recommendations', label: 'AI Picks' },
  { href: '#our-team', label: 'Our Team' },
  { href: '#latest-blogs', label: 'Blog' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="KosheliTravel Home">
          <Plane className="h-7 w-7 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary">KosheliTravel</span>
        </Link>
        
        <nav className="hidden md:flex gap-x-5 lg:gap-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary flex items-center gap-1"
            >
              {link.label === 'Visit Visa' && <Ticket className="h-4 w-4" />}
              {link.label}
            </Link>
          ))}
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Link href="#contact">Book Now</Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-6 pt-8">
              <Link href="/" className="flex items-center gap-2 mb-4" aria-label="KosheliTravel Home">
                <Plane className="h-6 w-6 text-primary" />
                <span className="font-headline text-xl font-bold text-primary">KosheliTravel</span>
              </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary flex items-center gap-2"
                  >
                     {link.label === 'Visit Visa' && <Ticket className="h-5 w-5" />}
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground mt-4 py-3 text-base">
                  <Link href="#contact">Book Now</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
