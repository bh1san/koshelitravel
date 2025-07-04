
'use client';

import { useState, useEffect, type FormEvent, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GalleryHorizontalEnd, Save, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from '@/components/admin/image-uploader';
import { getSiteSettings, updateBannerSettings } from '@/app/actions/settingsActions';

export default function BannerSettingsPage() {
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function fetchBannerSettings() {
      try {
        const data = await getSiteSettings();
        setBannerImageUrl(data.banner.imageUrl || '');
        setBannerTitle(data.banner.title || '');
        setBannerSubtitle(data.banner.subtitle || '');
      } catch (error) {
        console.error("Failed to fetch banner settings:", error);
        toast({
          title: "Error",
          description: "Could not load initial banner settings.",
          variant: "destructive",
        });
      } finally {
        setIsFetching(false);
      }
    }
    fetchBannerSettings();
  }, [toast]);

  const handleImageUploadComplete = (url: string) => {
    setBannerImageUrl(url);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    startTransition(async () => {
      try {
        const result = await updateBannerSettings({
          imageUrl: bannerImageUrl,
          title: bannerTitle,
          subtitle: bannerSubtitle,
        });

        if (!result.success) {
          throw new Error(result.message || 'Failed to save settings');
        }

        toast({
          title: "Banner Settings Updated",
          description: "The hero banner has been successfully saved.",
        });
        // Refresh the page to ensure server components elsewhere re-render
        router.refresh(); 

      } catch (error: any) {
        console.error("Failed to save banner settings:", error.message);
        toast({
          title: "Error",
          description: `Could not save banner settings: ${error.message}`,
          variant: "destructive",
        });
      }
    });
  };
  
  const isLoading = isPending || isFetching;

  if (isFetching) {
    return <div className="text-center p-10">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><GalleryHorizontalEnd /> Hero Banner Settings</CardTitle>
          <CardDescription>Update the image, title, and subtitle for the main hero banner on your homepage.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label>Banner Image</Label>
              <ImageUploader
                onUploadComplete={handleImageUploadComplete}
                currentImageUrl={bannerImageUrl}
                folder="banners"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Upload a new image for the hero banner.
              </p>
            </div>
            <div>
              <Label htmlFor="bannerTitle">Banner Title</Label>
              <Input 
                id="bannerTitle" 
                type="text"
                value={bannerTitle} 
                onChange={(e) => setBannerTitle(e.target.value)} 
                placeholder="Your Catchy Title"
                required 
              />
            </div>
            <div>
              <Label htmlFor="bannerSubtitle">Banner Subtitle</Label>
              <Textarea 
                id="bannerSubtitle"
                value={bannerSubtitle} 
                onChange={(e) => setBannerSubtitle(e.target.value)} 
                placeholder="An engaging subtitle for your banner..."
                rows={3}
                required 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Banner Settings</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
