
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, Package, Palette, GalleryHorizontalEnd } from 'lucide-react';
import { readPackages } from '@/lib/package-store';
import { readTeamMembers } from '@/lib/team-store';

export default async function AdminDashboardPage() {
  const packages = await readPackages();
  const teamMembers = await readTeamMembers();

  const stats = [
    { title: 'Total Packages', value: packages.length, icon: <Package className="text-accent" /> },
    { title: 'Team Members', value: teamMembers.length, icon: <Users className="text-accent" /> },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the KosheliTravel Admin Panel.</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">Platform At a Glance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(stat => (
             <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Package className="text-accent" /> Manage Packages</CardTitle>
            <CardDescription>View, edit, and add new travel packages.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/admin/packages">Go to Packages</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="text-accent" /> Manage Team</CardTitle>
            <CardDescription>Add or remove members from the "About Us" page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/admin/team">Go to Team</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><GalleryHorizontalEnd className="text-accent" /> Site Settings</CardTitle>
            <CardDescription>Update your homepage banner, theme, and promotions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/admin/settings">Go to Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
