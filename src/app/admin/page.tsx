
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, Store } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the DropShipKit Admin Panel.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="text-accent" /> Manage Users</CardTitle>
            <CardDescription>View and manage user accounts on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/admin/users">Go to Users</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Store className="text-accent" /> Manage Websites</CardTitle>
            <CardDescription>Oversee and manage the dropshipping sites created by users.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/admin/sites">Go to Websites</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">Platform At a Glance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-lg">Total Users</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">0</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg">Active Websites</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">0</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg">Monthly Revenue</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">$0</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg">Support Tickets</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">0</p></CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
