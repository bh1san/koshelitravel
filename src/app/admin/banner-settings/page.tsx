
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GalleryHorizontalEnd, Save, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from '@/components/admin/image-uploader';

export default function BannerSettingsPage() {
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchBannerSettings() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/settings/banner');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBannerImageUrl(data.imageUrl || '');
        setBannerTitle(data.title || '');
        setBannerSubtitle(data.subtitle || '');
      } catch (error) {
        console.error("Failed to fetch banner settings:", error);
        toast({
          title: "Error",
          description: "Could not load initial banner settings.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchBannerSettings();
  }, [toast]);

  const handleImageUploadComplete = (url: string) => {
    setBannerImageUrl(url);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/settings/banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: bannerImageUrl,
          title: bannerTitle,
          subtitle: bannerSubtitle,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to save settings');
      }

      toast({
        title: "Banner Settings Updated",
        description: "The hero banner has been successfully saved.",
      });

    } catch (error: any) {
      console.error("Failed to save banner settings:", error.message);
      toast({
        title: "Error",
        description: `Could not save banner settings: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading && !bannerTitle) { // Show loading indicator only on initial load
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
                Upload a new image for the hero banner. Recommended size: 1920x1080.
              </p>
            </div>
            <div className="text-sm text-muted-foreground text-center">OR</div>
            <div>
              <Label htmlFor="bannerImageUrl">Or Paste Image URL</Label>
              <Input
                id="bannerImageUrl"
                type="text"
                value={bannerImageUrl}
                onChange={(e) => setBannerImageUrl(e.target.value)}
                placeholder="https://example.com/image.png"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Pasting a URL here will override the uploaded image. The preview above will update.
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
