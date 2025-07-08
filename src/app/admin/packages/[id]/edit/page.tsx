
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
import { ArrowLeft, Save, Edit as EditIcon, Loader2, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getPackageById, updatePackage } from '@/app/actions/packageActions';
import { generateImage } from '@/ai/flows/generate-image-flow';

const isValidImageUrl = (str: string) => {
  if (str.startsWith('data:image/')) {
    return true;
  }
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
};


export default function EditPackagePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageStatus, setImageStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  useEffect(() => {
    if (typeof id !== 'string') return;

    const fetchPackage = async () => {
      setIsLoading(true);
      try {
        const foundPackage = await getPackageById(id);
        if (foundPackage) {
          setPkg(foundPackage);
          if (foundPackage.image && isValidImageUrl(foundPackage.image)) {
            setImageStatus('idle'); // We will validate on first load inside the image tag
          }
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { id: string; value: string } }) => {
    if (!pkg) return;
    const { id, value } = e.target;
    setPkg({ ...pkg, [id]: value });

    if (id === 'image') {
      if (value.startsWith('data:image/')) {
        setImageStatus('valid');
      } else {
        setImageStatus(isValidImageUrl(value) ? 'idle' : 'invalid');
      }
    }
  };
  
  const handleGenerateImage = async () => {
    if (!pkg?.dataAiHint) {
        toast({
            title: "AI Hint Required",
            description: "Please provide an 'Image AI Hint' to generate an image.",
            variant: "destructive",
        });
        return;
    }

    setIsGeneratingImage(true);
    try {
        const result = await generateImage({ prompt: pkg.dataAiHint });
        if (result.imageUrl) {
            handleInputChange({
                target: { id: 'image', value: result.imageUrl },
            });
            toast({
                title: "Image Generated",
                description: "New image generated and URL has been updated.",
            });
        } else {
            throw new Error("The AI did not return a valid image URL.");
        }
    } catch (error: any) {
        console.error("Failed to generate image:", error);
        toast({
            title: "Image Generation Failed",
            description: error.message || "An unexpected error occurred.",
            variant: "destructive",
        });
    } finally {
        setIsGeneratingImage(false);
    }
};

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!pkg || (pkg.image && imageStatus === 'invalid')) {
        if (imageStatus === 'invalid') {
            toast({
                title: "Invalid Image URL",
                description: "Please provide a valid and accessible image URL before saving.",
                variant: "destructive",
            });
        }
        return;
    }
    
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

  const isUrlValidForPreview = pkg.image && isValidImageUrl(pkg.image);

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
              <Label htmlFor="dataAiHint">Image AI Hint</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="dataAiHint" 
                  value={pkg.dataAiHint || ''} 
                  onChange={handleInputChange} 
                  placeholder="e.g., paris eiffel tower"
                  className="flex-grow"
                />
                <Button 
                  type="button" 
                  onClick={handleGenerateImage} 
                  disabled={isGeneratingImage || !pkg.dataAiHint}
                  variant="outline"
                >
                  {isGeneratingImage ? 
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
                    <Sparkles className="mr-2 h-4 w-4" />
                  }
                  Generate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Provide a prompt and click generate to create an AI image.</p>
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
            </div>
            <div>
                <Label>Image Preview</Label>
                <div className="mt-2 border rounded-md p-4 flex justify-center items-center bg-muted/20 min-h-[150px]">
                    {isUrlValidForPreview && imageStatus !== 'invalid' ? (
                        <img 
                            key={pkg.image} 
                            src={pkg.image} 
                            alt="Image preview" 
                            className="max-w-full max-h-56 object-contain rounded" 
                            onLoad={() => setImageStatus('valid')}
                            onError={() => setImageStatus('invalid')}
                        />
                    ) : (
                       <p className="text-sm text-muted-foreground">Enter a valid URL to see a preview.</p>
                    )}
                </div>
                 {imageStatus === 'invalid' && pkg.image && (
                    <div className="mt-2 flex items-center gap-2 text-destructive text-sm">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Could not load image. Check the URL or if it's publicly accessible.</span>
                    </div>
                 )}
                 {imageStatus === 'valid' && pkg.image && (
                     <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>Image preview is valid.</span>
                    </div>
                 )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSaving || (pkg.image && imageStatus === 'invalid')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
