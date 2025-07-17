
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image as ImageIcon, Save, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from '@/components/admin/image-uploader';

export default function LogoSettingsPage() {
  const [logoUrl, setLogoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchLogoSettings() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/settings/logo');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setLogoUrl(data.logoUrl || '');
      } catch (error) {
        console.error("Failed to fetch logo settings:", error);
        toast({
          title: "Error",
          description: "Could not load initial logo settings.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchLogoSettings();
  }, [toast]);

  const handleImageUploadComplete = (url: string) => {
    setLogoUrl(url);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/settings/logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logoUrl }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to save settings');
      }

      toast({
        title: "Logo Settings Updated",
        description: "The site logo has been successfully saved.",
      });

    } catch (error: any) {
      console.error("Failed to save logo settings:", error.message);
      toast({
        title: "Error",
        description: `Could not save logo settings: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading && !logoUrl) { // Show loading indicator only on initial load
    return <div className="text-center p-10">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ImageIcon /> Site Logo Settings</CardTitle>
          <CardDescription>Update the logo for your website. This will appear in the header.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label>Logo Image</Label>
              <ImageUploader
                onUploadComplete={handleImageUploadComplete}
                currentImageUrl={logoUrl}
                folder="logos"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Upload a new image for your site logo. Recommended to be a PNG with a transparent background.
              </p>
            </div>
            <div className="text-sm text-muted-foreground text-center">OR</div>
            <div>
              <Label htmlFor="logoUrl">Or Paste Image URL</Label>
              <Input
                id="logoUrl"
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Pasting a URL here will override the uploaded image. The preview above will update.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Logo Settings</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
