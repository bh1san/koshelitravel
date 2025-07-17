
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, UserPlus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import type { TeamMember } from '@/lib/mock-data'; 
import { addTeamMember } from '@/app/actions/teamActions';
import { ImageUploader } from '@/components/admin/image-uploader';

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
      image: image || 'https://placehold.co/300x300.png',
      dataAiHint: dataAiHint || 'person portrait',
    };
    
    const result = await addTeamMember(newMember);

    if (result.success) {
      toast({
        title: "Team Member Added",
        description: `"${name}" has been successfully added to the team.`,
      });
      router.push('/admin/team');
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }

    setIsLoading(false);
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
              <Label>Member Photo</Label>
              <ImageUploader 
                onUploadComplete={setImage}
                currentImageUrl={image}
                folder="team"
              />
               <p className="text-xs text-muted-foreground mt-2">Upload a photo for the new team member. Defaults to a placeholder if left empty.</p>
            </div>
            <div className="text-sm text-muted-foreground text-center">OR</div>
            <div>
              <Label htmlFor="imageUrl">Or Paste Image URL</Label>
              <Input
                id="imageUrl"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.png"
              />
              <p className="text-xs text-muted-foreground mt-1">Pasting a URL here will override the uploaded image. The preview above will update.</p>
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
            <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? 'Adding...' : <><Save className="mr-2 h-4 w-4" /> Add Member</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
