
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockVisaOptions, type VisaOption } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Edit as EditIcon, ClipboardType } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const iconIdentifiers: VisaOption['iconIdentifier'][] = ['tourist', 'business', 'family', 'student', 'general'];

export default function EditVisaServicePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const [service, setService] = useState<VisaOption | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconIdentifier, setIconIdentifier] = useState<VisaOption['iconIdentifier']>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      const foundService = mockVisaOptions.find(s => s.id === id);
      if (foundService) {
        setService(foundService);
        setTitle(foundService.title);
        setDescription(foundService.description);
        setIconIdentifier(foundService.iconIdentifier);
        setIsNotFound(false);
      } else {
        setIsNotFound(true);
      }
    }
  }, [id]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!title.trim() || !description.trim()) {
        toast({
            title: "Error",
            description: "Title and Description are required.",
            variant: "destructive",
        });
        setIsLoading(false);
        return;
    }

    const serviceIndex = mockVisaOptions.findIndex(s => s.id === id);
    if (serviceIndex !== -1) {
      mockVisaOptions[serviceIndex] = {
        ...mockVisaOptions[serviceIndex],
        title,
        description,
        iconIdentifier,
      };
      
      await new Promise(resolve => setTimeout(resolve, 500));

      toast({
        title: "Visa Service Updated",
        description: `"${title}" has been successfully updated (simulated).`,
      });
      router.push('/admin/visa-services');
    } else {
      toast({
        title: "Error",
        description: "Visa service not found for update.",
        variant: "destructive",
      });
      setIsNotFound(true);
    }
    setIsLoading(false);
  };

  if (isNotFound) {
     return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Visa Service Not Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p>The visa service with ID "{id}" could not be found.</p>
            </CardContent>
            <CardFooter>
                 <Button variant="outline" asChild>
                    <Link href="/admin/visa-services"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Visa Services List</Link>
                </Button>
            </CardFooter>
        </Card>
     );
  }
  
  if (!service && !isNotFound) { 
    return <p>Loading visa service data...</p>;
  }


  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link href="/admin/visa-services"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Visa Services List</Link>
      </Button>
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardType /> Edit Visa Service</CardTitle>
          <CardDescription>Modify the details for "{service?.title}".</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Service Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required />
            </div>
            <div>
              <Label htmlFor="iconIdentifier">Icon Identifier</Label>
              <Select value={iconIdentifier} onValueChange={(value: VisaOption['iconIdentifier']) => setIconIdentifier(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon type" />
                </SelectTrigger>
                <SelectContent>
                   {iconIdentifiers.map(id => (
                    <SelectItem key={id} value={id}>
                      {id.charAt(0).toUpperCase() + id.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
               <p className="text-xs text-muted-foreground mt-1">This determines the icon shown on the public visa page.</p>
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
