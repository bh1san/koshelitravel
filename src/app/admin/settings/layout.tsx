
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { GalleryHorizontalEnd, ImageUp, Palette } from 'lucide-react';

const settingsNavLinks = [
  { href: '/admin/banner-settings', label: 'Banner', icon: GalleryHorizontalEnd },
  { href: '/admin/promo-settings', label: 'Promotions', icon: ImageUp },
  // { href: '/admin/settings/theme', label: 'Theme', icon: Palette }, // Theme page can be added later
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Platform Settings</h1>
        <p className="text-muted-foreground">
          Manage the look, feel, and global features of your website.
        </p>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {settingsNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'inline-flex items-center gap-2 whitespace-nowrap rounded-md py-2 px-4 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                  pathname === link.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-transparent hover:underline'
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-4xl">{children}</div>
      </div>
    </div>
  );
}
