
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GalleryHorizontalEnd, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { 
  DEFAULT_BANNER_IMAGE_URL, 
  DEFAULT_BANNER_TITLE, 
  DEFAULT_BANNER_SUBTITLE,
  BANNER_IMAGE_URL_STORAGE_KEY,
  BANNER_TITLE_STORAGE_KEY,
  BANNER_SUBTITLE_STORAGE_KEY
} from '@/lib/mock-data';
import { ImageUploader } from '@/components/admin/image-uploader';

export default function BannerSettingsPage() {
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedImageUrl = localStorage.getItem(BANNER_IMAGE_URL_STORAGE_KEY);
    const storedTitle = localStorage.getItem(BANNER_TITLE_STORAGE_KEY);
    const storedSubtitle = localStorage.getItem(BANNER_SUBTITLE_STORAGE_KEY);

    setBannerImageUrl(storedImageUrl || DEFAULT_BANNER_IMAGE_URL);
    setBannerTitle(storedTitle || DEFAULT_BANNER_TITLE);
    setBannerSubtitle(storedSubtitle || DEFAULT_BANNER_SUBTITLE);
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!bannerImageUrl.trim() || !bannerTitle.trim() || !bannerSubtitle.trim()) {
        toast({
            title: "Error",
            description: "All banner fields are required.",
            variant: "destructive",
        });
        setIsLoading(false);
        return;
    }

    try {
      localStorage.setItem(BANNER_IMAGE_URL_STORAGE_KEY, bannerImageUrl);
      localStorage.setItem(BANNER_TITLE_STORAGE_KEY, bannerTitle);
      localStorage.setItem(BANNER_SUBTITLE_STORAGE_KEY, bannerSubtitle);
      
      // Dispatch storage events so other components (like HeroSection) can react
      window.dispatchEvent(new StorageEvent('storage', { key: BANNER_IMAGE_URL_STORAGE_KEY, newValue: bannerImageUrl }));
      window.dispatchEvent(new StorageEvent('storage', { key: BANNER_TITLE_STORAGE_KEY, newValue: bannerTitle }));
      window.dispatchEvent(new StorageEvent('storage', { key: BANNER_SUBTITLE_STORAGE_KEY, newValue: bannerSubtitle }));

      toast({
        title: "Banner Settings Updated",
        description: "The hero banner image and text have been saved.",
      });
    } catch (error) {
      console.error("Failed to save banner settings:", error);
      toast({
        title: "Error",
        description: "Could not save banner settings. Please ensure your browser supports localStorage.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><GalleryHorizontalEnd /> Hero Banner Settings</CardTitle>
          <CardDescription>Update the image, title, and subtitle for the main hero banner.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label>Banner Image</Label>
              <ImageUploader
                onUploadComplete={setBannerImageUrl}
                currentImageUrl={bannerImageUrl}
                folder="banners"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Upload a new banner image. The new image will be used after saving.
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
              {isLoading ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Banner Settings</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
