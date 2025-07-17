
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { deleteTeamMember } from '@/app/actions/teamActions';

interface TeamMemberActionsProps {
  memberId: string;
  memberName: string;
}

export function TeamMemberActions({ memberId, memberName }: TeamMemberActionsProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteTeamMember(memberId);
    
    if (result.success) {
      toast({
        title: "Team Member Deleted",
        description: `"${memberName}" has been successfully deleted.`,
      });
      // This will cause Next.js to re-fetch the data on the server component
      router.refresh();
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-x-2">
      <Button variant="outline" size="sm" asChild>
        <Link href={`/admin/team/${memberId}/edit`}>
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
              This action cannot be undone. This will permanently delete the team member "{memberName}".
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
