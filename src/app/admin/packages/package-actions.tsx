
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
} from '@/components/ui/alert-dialog';
import { Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { deletePackage } from '@/app/actions/packageActions';

interface PackageActionsProps {
  packageId: string;
  packageTitle: string;
}

export function PackageActions({ packageId, packageTitle }: PackageActionsProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    const result = await deletePackage(packageId);
    if (result.success) {
      toast({
        title: 'Package Deleted',
        description: `"${packageTitle}" has been deleted.`,
      });
      router.refresh(); // Refreshes the page to show the updated list
    } else {
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-x-2">
      <Button variant="outline" size="sm" asChild>
        <Link href={`/admin/packages/${packageId}/edit`}>
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
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the package "{packageTitle}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
