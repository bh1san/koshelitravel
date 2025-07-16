
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Settings, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Manage Users', icon: Users },
  { href: '/admin/sites', label: 'Manage Sites', icon: Store },
  { href: '/admin/settings', label: 'Platform Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2" aria-label="DropShipKit Admin Home">
          <Store className="h-7 w-7 text-primary" />
          <span className="font-headline text-xl font-bold text-primary">Admin Panel</span>
        </Link>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {adminNavLinks.map((link) => (
          <Button
            key={link.href}
            asChild
            variant={pathname.startsWith(link.href) ? 'secondary' : 'ghost'}
            className="w-full justify-start"
          >
            <Link href={link.href} className="flex items-center gap-3">
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t border-border mt-auto">
        <Button variant="outline" className="w-full" asChild>
            <Link href="/">Back to Main Site</Link>
        </Button>
      </div>
    </aside>
  );
}
