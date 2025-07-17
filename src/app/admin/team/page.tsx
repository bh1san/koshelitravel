
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { TeamMember } from '@/lib/mock-data';
import { readTeamMembers } from '@/lib/team-store';
import { deleteTeamMember } from '@/app/actions/teamActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, PlusCircle, Trash2, Users } from 'lucide-react';
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
import Image from 'next/image';

// This component now fetches its initial data on the server.
// We wrap the client-side logic in a separate component.
export default function AdminTeamPageWrapper() {
  const [initialMembers, setInitialMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMembers() {
      const members = await readTeamMembers();
      setInitialMembers(members);
      setIsLoading(false);
    }
    loadMembers();
  }, []);

  if (isLoading) {
    return <div>Loading team members...</div>
  }
  
  return <AdminTeamPage initialMembers={initialMembers} />;
}


function AdminTeamPage({ initialMembers }: { initialMembers: TeamMember[] }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialMembers);
  const { toast } = useToast();

  useEffect(() => {
    // This syncs the state if the initialMembers prop changes (e.g., after revalidation)
    setTeamMembers(initialMembers);
  }, [initialMembers]);


  const handleDelete = async (memberId: string, memberName: string) => {
    const result = await deleteTeamMember(memberId);
    
    if (result.success) {
        // Optimistically update UI, but the revalidation from the server action is the source of truth
        const updatedMembers = teamMembers.filter(m => m.id !== memberId);
        setTeamMembers(updatedMembers);
        
        toast({
          title: "Team Member Deleted",
          description: `"${memberName}" has been successfully deleted.`,
        });

        // Manually trigger a refresh to be sure we get the revalidated data
        // A better approach would be to rely solely on revalidatePath, but this is a failsafe
        // router.refresh(); 
    } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2"><Users /> Manage Team Members</h1>
          <p className="text-muted-foreground">Add, edit, or remove team member details.</p>
        </div>
        <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/admin/team/new"><PlusCircle className="mr-2" /> Add New Member</Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Team Members</CardTitle>
          <CardDescription>Current team members in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          {teamMembers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                     <TableCell>
                      <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image src={member.image || 'https://placehold.co/100x100.png'} alt={member.name} fill style={{ objectFit: 'cover' }} />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/team/${member.id}/edit`}>
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
                              This action cannot be undone. This will permanently delete the team member
                              "{member.name}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(member.id, member.name)}>
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
            <p className="text-muted-foreground text-center py-4">No team members found. Add one to get started!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
