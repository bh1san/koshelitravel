
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockTravelPackages, type TravelPackage } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Edit as EditIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function EditPackagePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAiHint, setImageAiHint] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const foundPackage = mockTravelPackages.find(p => p.id === id);
      if (foundPackage) {
        setPkg(foundPackage);
        setTitle(foundPackage.title);
        setPrice(foundPackage.price);
        setDescription(foundPackage.description);
        setImageUrl(foundPackage.image);
        setImageAiHint(foundPackage.dataAiHint || '');
      }
    }
  }, [id]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    console.log('Updating package:', { id, title, price, description, image: imageUrl, dataAiHint: imageAiHint });
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, you would update the data source here.
    // For mock data, this change won't persist beyond this simulation.
    const packageIndex = mockTravelPackages.findIndex(p => p.id === id);
    if (packageIndex !== -1) {
        mockTravelPackages[packageIndex] = {
            ...mockTravelPackages[packageIndex],
            title,
            price,
            description,
            image: imageUrl,
            dataAiHint: imageAiHint,
        };
    }
    
    setIsLoading(false);
    toast({
      title: "Package Updated",
      description: `Package "${title}" has been successfully updated (simulated).`,
    });
    router.push('/admin/packages');
  };

  if (!pkg && !id) {
    return <p>Loading package data...</p>;
  }
  
  if (!pkg && id) {
     return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Package Not Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p>The travel package with ID "{id}" could not be found.</p>
            </CardContent>
            <CardFooter>
                 <Button variant="outline" asChild>
                    <Link href="/admin/packages"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Packages</Link>
                </Button>
            </CardFooter>
        </Card>
     );
  }


  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link href="/admin/packages"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Packages</Link>
      </Button>
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><EditIcon /> Edit Travel Package</CardTitle>
          <CardDescription>Modify the details for "{pkg?.title}".</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="price">Price (e.g., $1200)</Label>
              <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="description">Description (Activities, Details)</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows={6} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
              <p className="text-xs text-muted-foreground mt-1">URL of the package image (e.g., https://placehold.co/600x400.png).</p>
            </div>
            {imageUrl && (
                <div className="mt-2">
                    <Label>Image Preview:</Label>
                    <div className="mt-1 border rounded-md p-2 flex justify-center items-center bg-muted/30 max-h-64 overflow-hidden">
                        <img 
                            src={imageUrl} 
                            alt="Package Preview" 
                            className="max-w-full max-h-56 object-contain rounded"
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
              <Label htmlFor="imageAiHint">Image AI Hint</Label>
              <Input 
                id="imageAiHint" 
                value={imageAiHint} 
                onChange={(e) => setImageAiHint(e.target.value)} 
                placeholder="e.g., paris eiffel tower night"
              />
              <p className="text-xs text-muted-foreground mt-1">Keywords to help describe the image (max 2 words).</p>
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
