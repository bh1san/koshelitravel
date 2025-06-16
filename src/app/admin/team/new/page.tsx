
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, PlusCircle, UserPlus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { mockTeamMembers, type TeamMember } from '@/lib/mock-data'; 

export default function NewTeamMemberPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  const [dataAiHint, setDataAiHint] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const newMember: TeamMember = {
      id: `team-${Date.now()}`, 
      name,
      role,
      bio,
      image: image || 'https://placehold.co/300x300.png', // Default placeholder if empty
      dataAiHint: dataAiHint || 'person portrait',
    };
    
    // Simulate API call / data update
    await new Promise(resolve => setTimeout(resolve, 500));
    mockTeamMembers.push(newMember);

    setIsLoading(false);
    toast({
      title: "Team Member Added",
      description: `"${name}" has been successfully added to the team (simulated).`,
    });
    router.push('/admin/team');
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link href="/admin/team"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Team List</Link>
      </Button>
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserPlus /> Add New Team Member</CardTitle>
          <CardDescription>Enter the details for the new team member.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="role">Role / Position</Label>
              <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="bio">Biography / Short Description</Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} required />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input 
                id="image" 
                type="url"
                value={image} 
                onChange={(e) => setImage(e.target.value)} 
                placeholder="https://example.com/member-photo.png" 
              />
               <p className="text-xs text-muted-foreground mt-1">Provide a URL for the team member's photo. Defaults to placeholder if empty.</p>
            </div>
            {image && (
                <div className="mt-2">
                    <Label>Image Preview:</Label>
                    <div className="mt-1 border rounded-md p-2 flex justify-center items-center bg-muted/30 max-h-48 overflow-hidden">
                        <img 
                            src={image} 
                            alt="Team Member Preview" 
                            className="max-w-full max-h-40 object-contain rounded"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const errorMsg = document.createElement('p');
                                errorMsg.textContent = 'Preview not available or image URL is invalid.';
                                errorMsg.className = 'text-destructive text-xs';
                                target.parentNode?.appendChild(errorMsg);
                            }}
                        />
                    </div>
                </div>
            )}
            <div>
              <Label htmlFor="dataAiHint">Image AI Hint</Label>
              <Input 
                id="dataAiHint" 
                value={dataAiHint} 
                onChange={(e) => setDataAiHint(e.target.value)} 
                placeholder="e.g., person professional" 
              />
               <p className="text-xs text-muted-foreground mt-1">Keywords for image description (max 2 words). Defaults to "person portrait".</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? 'Adding...' : <><Save className="mr-2 h-4 w-4" /> Add Member</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
