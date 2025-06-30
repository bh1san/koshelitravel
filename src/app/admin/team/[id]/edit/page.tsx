
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockTeamMembers, type TeamMember } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, UserCog } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from '@/components/admin/image-uploader';

export default function EditTeamMemberPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const [member, setMember] = useState<TeamMember | null>(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  const [dataAiHint, setDataAiHint] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      const foundMember = mockTeamMembers.find(m => m.id === id);
      if (foundMember) {
        setMember(foundMember);
        setName(foundMember.name);
        setRole(foundMember.role);
        setBio(foundMember.bio);
        setImage(foundMember.image);
        setDataAiHint(foundMember.dataAiHint || '');
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
    }
  }, [id]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const memberIndex = mockTeamMembers.findIndex(m => m.id === id);
    if (memberIndex !== -1) {
      mockTeamMembers[memberIndex] = {
        ...mockTeamMembers[memberIndex],
        name,
        role,
        bio,
        image: image || 'https://placehold.co/300x300.png',
        dataAiHint: dataAiHint || 'person portrait',
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Team Member Updated",
        description: `"${name}"'s details have been successfully updated (simulated).`,
      });
      router.push('/admin/team');
    } else {
      toast({
        title: "Error",
        description: "Team member not found for update.",
        variant: "destructive",
      });
      setIsNotFound(true); // Should already be set, but reaffirm
    }
    setIsLoading(false);
  };

  if (isNotFound) {
     return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Team Member Not Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p>The team member with ID "{id}" could not be found or an error occurred.</p>
            </CardContent>
            <CardFooter>
                 <Button variant="outline" asChild>
                    <Link href="/admin/team"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Team List</Link>
                </Button>
            </CardFooter>
        </Card>
     );
  }
  
  if (!member && !isNotFound) { // Still loading
    return <p>Loading team member data...</p>;
  }


  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link href="/admin/team"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Team List</Link>
      </Button>
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserCog /> Edit Team Member</CardTitle>
          <CardDescription>Modify the details for "{member?.name}".</CardDescription>
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
              <Label>Member Photo</Label>
              <ImageUploader 
                onUploadComplete={setImage}
                currentImageUrl={image}
                folder="team"
              />
            </div>
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
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
