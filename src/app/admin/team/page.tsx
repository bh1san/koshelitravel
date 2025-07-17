
import Link from 'next/link';
import Image from 'next/image';
import { readTeamMembers } from '@/lib/team-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Users } from 'lucide-react';
import { TeamMemberActions } from './team-member-actions';

// This component now fetches its initial data on the server.
export default async function AdminTeamPage() {
  const teamMembers = await readTeamMembers();

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
                    <TableCell className="text-right">
                      <TeamMemberActions memberId={member.id} memberName={member.name} />
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
