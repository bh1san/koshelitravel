
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, PackagePlus } from 'lucide-react';
import { readPackages } from '@/lib/package-store';


export default async function AdminPackagesPage() {
  const packages = await readPackages();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Manage Travel Packages</h1>
          <p className="text-muted-foreground">View and edit travel package details.</p>
        </div>
        {/* <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/admin/packages/new"><PackagePlus className="mr-2" /> Add New Package</Link>
        </Button> */}
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Travel Packages</CardTitle>
          <CardDescription>Currently available travel packages in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          {packages.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
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
                    <TableCell className="font-medium">{pkg.title}</TableCell>
                    <TableCell>{pkg.destination}</TableCell>
                    <TableCell>{pkg.price}</TableCell>
                    <TableCell>{pkg.duration}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/packages/${pkg.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No travel packages found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
