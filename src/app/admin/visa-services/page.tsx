
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { mockVisaOptions, type VisaOption } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, PlusCircle, Trash2, ClipboardList } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminVisaServicesPage() {
  const [visaServices, setVisaServices] = useState<VisaOption[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Create a local copy for safe manipulation if needed, or directly use mock
    setVisaServices([...mockVisaOptions]); 
  }, []);

  const handleDelete = (serviceId: string, serviceTitle: string) => {
    const serviceIndex = mockVisaOptions.findIndex(s => s.id === serviceId);
    if (serviceIndex !== -1) {
        mockVisaOptions.splice(serviceIndex, 1);
        setVisaServices([...mockVisaOptions]); // Update local state to re-render
    }
    toast({
      title: "Visa Service Deleted",
      description: `"${serviceTitle}" has been successfully deleted (simulated).`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2"><ClipboardList /> Manage Visa Services</h1>
          <p className="text-muted-foreground">Add, edit, or remove visa service details.</p>
        </div>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/admin/visa-services/new"><PlusCircle className="mr-2" /> Add New Visa Service</Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Visa Services</CardTitle>
          <CardDescription>Current visa services offered by KosheliTravel.</CardDescription>
        </CardHeader>
        <CardContent>
          {visaServices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Icon Identifier</TableHead>
                  <TableHead>Description (Snippet)</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visaServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>{service.iconIdentifier}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {service.description.substring(0, 100)}{service.description.length > 100 ? '...' : ''}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/visa-services/${service.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the visa service
                              "{service.title}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(service.id, service.title)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No visa services found. Add one to get started!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
