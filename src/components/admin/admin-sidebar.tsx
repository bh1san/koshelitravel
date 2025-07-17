
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Settings, Package, ClipboardList, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';


const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/packages', label: 'Packages', icon: Package },
  { href: '/admin/team', label: 'Manage Team', icon: Users },
  { href: '/admin/visa-services', label: 'Visa Services', icon: ClipboardList },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2" aria-label="KosheliTravel Admin Home">
          <Plane className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl font-bold text-primary">Admin Panel</span>
        </Link>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {adminNavLinks.map((link) => {
          const isActive = link.href === '/admin/settings' 
            ? pathname.startsWith('/admin/banner-settings') || pathname.startsWith('/admin/promo-settings') || pathname.startsWith('/admin/logo-settings') || pathname === '/admin/settings'
            : pathname.startsWith(link.href) && (link.href !== '/admin' || pathname === '/admin');

          return (
            <Button
              key={link.href}
              asChild
              variant={isActive ? 'secondary' : 'ghost'}
              className="w-full justify-start"
            >
              <Link href={link.href} className="flex items-center gap-3">
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            </Button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border mt-auto">
        <Button variant="outline" className="w-full" asChild>
            <Link href="/"><Home className="mr-2 h-4 w-4" />Back to Main Site</Link>
        </Button>
      </div>
    </aside>
  );
}
