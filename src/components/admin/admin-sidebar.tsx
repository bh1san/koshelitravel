
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plane, LayoutDashboard, Package, FileText, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/packages', label: 'Manage Packages', icon: Package },
  { href: '/admin/blogs', label: 'Manage Blogs', icon: FileText },
  // Future links can be added here e.g. Settings
  // { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <Link href="/admin" className="flex items-center gap-2" aria-label="KosheliTravel Admin Home">
          <Plane className="h-7 w-7 text-sidebar-primary" />
          <span className="font-headline text-xl font-bold text-sidebar-primary">Admin Panel</span>
        </Link>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {adminNavLinks.map((link) => (
          <Button
            key={link.href}
            asChild
            variant={pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href)) ? 'secondary' : 'ghost'}
            className={cn(
              "w-full justify-start",
              (pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))) && "bg-sidebar-primary/10 text-sidebar-primary hover:bg-sidebar-primary/20"
            )}
          >
            <Link href={link.href} className="flex items-center gap-3">
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t border-sidebar-border mt-auto">
        <Button variant="outline" className="w-full" asChild>
            <Link href="/">Back to Main Site</Link>
        </Button>
      </div>
    </aside>
  );
}
