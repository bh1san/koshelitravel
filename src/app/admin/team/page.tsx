
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { mockTeamMembers, type TeamMember } from '@/lib/mock-data';
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

export default function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setTeamMembers([...mockTeamMembers]); // Create a local copy for safe manipulation
  }, []);

  const handleDelete = (memberId: string, memberName: string) => {
    // Simulate deletion
    const memberIndex = mockTeamMembers.findIndex(m => m.id === memberId);
    if (memberIndex !== -1) {
        mockTeamMembers.splice(memberIndex, 1);
        setTeamMembers([...mockTeamMembers]); // Update local state to re-render
    }
    toast({
      title: "Team Member Deleted",
      description: `"${memberName}" has been successfully deleted (simulated).`,
      variant: "destructive",
    });
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
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
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
