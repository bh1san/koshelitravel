
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, PlusCircle, ClipboardType } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { mockVisaOptions, type VisaOption } from '@/lib/mock-data'; 

const iconIdentifiers: VisaOption['iconIdentifier'][] = ['tourist', 'business', 'family', 'student', 'general'];

export default function NewVisaServicePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconIdentifier, setIconIdentifier] = useState<VisaOption['iconIdentifier']>('general');
  const [isLoading, setIsLoading] = useState(false);

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

    const newService: VisaOption = {
      id: `visa-${Date.now()}`, 
      title,
      description,
      iconIdentifier,
    };
    
    // Simulate API call / data update
    await new Promise(resolve => setTimeout(resolve, 500));
    mockVisaOptions.push(newService);

    setIsLoading(false);
    toast({
      title: "Visa Service Added",
      description: `"${title}" has been successfully added (simulated).`,
    });
    router.push('/admin/visa-services');
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link href="/admin/visa-services"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Visa Services List</Link>
      </Button>
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ClipboardType /> Add New Visa Service</CardTitle>
          <CardDescription>Enter the details for the new visa service offering.</CardDescription>
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
            <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? 'Adding...' : <><Save className="mr-2 h-4 w-4" /> Add Service</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
