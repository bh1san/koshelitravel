
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Plane, Wand2 } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/#all-packages', label: 'Packages' },
  { href: '/#services', label: 'Services' },
  { href: '/#team', label: 'Our Team' },
  { href: '/ai-planner', label: 'AI Planner', icon: Wand2 },
  { href: '/contact', label: 'Contact' },
];

interface HeaderProps {
  logoUrl: string | null;
}

export function Header({ logoUrl }: HeaderProps) {
  const Logo = () => (
    <>
      {logoUrl ? (
        <Image src={logoUrl} alt="KosheliTravel Logo" width={150} height={40} className="h-10 w-auto" />
      ) : (
        <>
          <Plane className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl font-bold text-primary">KosheliTravel</span>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="KosheliTravel Home">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex gap-x-5 lg:gap-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary flex items-center gap-1.5"
            >
              {link.icon && <link.icon className="h-4 w-4" />}
              {link.label}
            </Link>
          ))}
          <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/contact">Book Now</Link>
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
                 <Logo />
              </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary flex items-center gap-2"
                  >
                    {link.icon && <link.icon className="h-5 w-5" />}
                    {link.label}
                  </Link>
                ))}
                 <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground mt-4 py-3 text-base">
                  <Link href="/contact">Book Now</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
