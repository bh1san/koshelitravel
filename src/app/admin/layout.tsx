
import type { Metadata } from 'next';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export const metadata: Metadata = {
  title: 'Admin Panel - DropShipKit',
  description: 'Manage DropShipKit user sites and platform settings.',
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}
