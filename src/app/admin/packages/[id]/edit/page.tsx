
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { TravelPackage } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Edit as EditIcon, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getPackageById, updatePackage } from '@/app/actions/packageActions';

export default function EditPackagePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (typeof id !== 'string') return;

    const fetchPackage = async () => {
      setIsLoading(true);
      try {
        const foundPackage = await getPackageById(id);
        if (foundPackage) {
          setPkg(foundPackage);
        } else {
          toast({
            title: "Error",
            description: "Package not found.",
            variant: "destructive",
          });
          setPkg(null);
        }
      } catch (error) {
         toast({
            title: "Error",
            description: "Failed to load package data.",
            variant: "destructive",
          });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackage();
  }, [id, toast]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!pkg) return;
    const { id, value } = e.target;
    setPkg({ ...pkg, [id]: value });
  };


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!pkg) return;
    
    setIsSaving(true);

    try {
        const result = await updatePackage(pkg);
        if (result.success) {
            toast({
              title: "Package Updated",
              description: `Package "${pkg.title}" has been successfully updated.`,
            });
            router.push('/admin/packages');
        } else {
            throw new Error(result.message);
        }
    } catch (error: any) {
        toast({
            title: "Error",
            description: error.message || "Failed to save the package.",
            variant: "destructive",
        });
    } finally {
        setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading package data...</div>;
  }
  
  if (!pkg) {
     return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Package Not Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p>The travel package with ID "{id}" could not be found or loaded.</p>
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
          <CardDescription>Modify the details for "{pkg.title}".</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={pkg.title} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="price">Price (e.g., $1200)</Label>
              <Input id="price" value={pkg.price} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="description">Description (Activities, Details)</Label>
              <Textarea 
                id="description" 
                value={pkg.description} 
                onChange={handleInputChange} 
                rows={6} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                type="text"
                value={pkg.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.png"
                required
              />
               {pkg.image && (
                <div className="mt-4">
                    <Label>Image Preview:</Label>
                    <div className="mt-2 border rounded-md p-2 flex justify-center items-center bg-muted/20 max-h-64 overflow-hidden">
                        <img 
                            key={pkg.image}
                            src={pkg.image} 
                            alt="Current image preview" 
                            className="max-w-full max-h-56 object-contain rounded" 
                        />
                    </div>
                </div>
            )}
            </div>
            <div>
              <Label htmlFor="dataAiHint">Image AI Hint</Label>
              <Input 
                id="dataAiHint" 
                value={pkg.dataAiHint || ''} 
                onChange={handleInputChange} 
                placeholder="e.g., paris eiffel tower night"
              />
              <p className="text-xs text-muted-foreground mt-1">Keywords to help describe the image (max 2 words).</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSaving} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
