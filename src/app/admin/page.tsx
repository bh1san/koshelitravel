
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Package, FileText } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the KosheliTravel Admin Panel.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Package className="text-accent" /> Manage Travel Packages</CardTitle>
            <CardDescription>View, edit prices, and update details for travel packages.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/admin/packages">Go to Packages</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText className="text-accent" /> Manage Blog Posts</CardTitle>
            <CardDescription>Create, edit, and publish blog posts and news articles.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/admin/blogs">Go to Blogs</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Placeholder for future stats or quick actions */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">Quick Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-lg">Total Packages</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">6</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg">Published Blogs</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">2</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg">Draft Blogs</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">1</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-lg">Users</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">N/A</p></CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
