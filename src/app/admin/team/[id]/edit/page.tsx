
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { TeamMember } from '@/lib/mock-data';
import { readTeamMembers } from '@/lib/team-store';
import { updateTeamMember } from '@/app/actions/teamActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, UserCog, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from '@/components/admin/image-uploader';

export default function EditTeamMemberPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const [member, setMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (id && typeof id === 'string') {
      const fetchMember = async () => {
        setIsLoading(true);
        const members = await readTeamMembers();
        const foundMember = members.find(m => m.id === id);
        if (foundMember) {
          setMember(foundMember);
        } else {
          setIsNotFound(true);
        }
        setIsLoading(false);
      };
      fetchMember();
    }
  }, [id]);
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!member) return;
      setMember({ ...member, [e.target.id]: e.target.value });
  };
  
  const handleImageUploadComplete = (url: string) => {
      if (!member) return;
      setMember({ ...member, image: url });
  };


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!member) return;

    setIsSubmitting(true);
    const result = await updateTeamMember(member);

    if (result.success) {
      toast({
        title: "Team Member Updated",
        description: `"${member.name}"'s details have been successfully updated.`,
      });
      router.push('/admin/team');
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center p-10"><Loader2 className="mr-2 h-6 w-6 animate-spin mx-auto" /> Loading team member data...</div>;
  }

  if (isNotFound) {
     return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Team Member Not Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p>The team member with ID "{id}" could not be found.</p>
            </CardContent>
            <CardFooter>
                 <Button variant="outline" asChild>
                    <Link href="/admin/team"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Team List</Link>
                </Button>
            </CardFooter>
        </Card>
     );
  }

  if (!member) return null;

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link href="/admin/team"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Team List</Link>
      </Button>
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserCog /> Edit Team Member</CardTitle>
          <CardDescription>Modify the details for "{member.name}".</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={member.name} onChange={handleFormChange} required />
            </div>
            <div>
              <Label htmlFor="role">Role / Position</Label>
              <Input id="role" value={member.role} onChange={handleFormChange} required />
            </div>
            <div>
              <Label htmlFor="bio">Biography / Short Description</Label>
              <Textarea id="bio" value={member.bio} onChange={handleFormChange} rows={4} required />
            </div>
            <div>
              <Label>Member Photo</Label>
              <ImageUploader 
                onUploadComplete={handleImageUploadComplete}
                currentImageUrl={member.image}
                folder="team"
              />
            </div>
            <div className="text-sm text-muted-foreground text-center">OR</div>
            <div>
              <Label htmlFor="image">Or Paste Image URL</Label>
              <Input
                id="image"
                type="text"
                value={member.image}
                onChange={handleFormChange}
                placeholder="https://example.com/image.png"
              />
              <p className="text-xs text-muted-foreground mt-1">Pasting a URL here will override the uploaded image. The preview above will update.</p>
            </div>
            <div>
              <Label htmlFor="dataAiHint">Image AI Hint</Label>
              <Input 
                id="dataAiHint" 
                value={member.dataAiHint || ''} 
                onChange={handleFormChange} 
                placeholder="e.g., person professional" 
              />
              <p className="text-xs text-muted-foreground mt-1">Keywords for image description (max 2 words). Defaults to "person portrait".</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
