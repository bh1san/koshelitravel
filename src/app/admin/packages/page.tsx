
import Link from 'next/link';
import { readPackages } from '@/lib/package-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, PlusCircle, Package as PackageIcon } from 'lucide-react';
import Image from 'next/image';
import { PackageActions } from './package-actions';

export default async function AdminPackagesPage() {
  const packages = await readPackages();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2"><PackageIcon /> Manage Packages</h1>
          <p className="text-muted-foreground">Add, edit, or remove travel packages.</p>
        </div>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/admin/packages/new"><PlusCircle className="mr-2" /> Add New Package</Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Travel Packages</CardTitle>
          <CardDescription>Current packages available on the website.</CardDescription>
        </CardHeader>
        <CardContent>
          {packages.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>
                      <div className="relative h-12 w-16 rounded-md overflow-hidden">
                        <Image src={pkg.image || 'https://placehold.co/100x100.png'} alt={pkg.title} fill style={{ objectFit: 'cover' }} />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{pkg.title}</TableCell>
                    <TableCell>{pkg.destination}</TableCell>
                    <TableCell>{pkg.price}</TableCell>
                    <TableCell>{pkg.duration}</TableCell>
                    <TableCell className="text-right space-x-2">
                       <PackageActions packageId={pkg.id} packageTitle={pkg.title} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No packages found. Add one to get started!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
