
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ImageUp, Save, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from '@/components/admin/image-uploader';

export default function PromoSettingsPage() {
  const [promoImageUrl, setPromoImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchPromoSettings() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/settings/promo');
         if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPromoImageUrl(data.imageUrl || '');
      } catch (error) {
        console.error("Failed to fetch promo settings:", error);
        toast({
          title: "Error",
          description: "Could not load promo settings.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchPromoSettings();
  }, [toast]);

  const handleImageUploadComplete = (url: string) => {
    setPromoImageUrl(url);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/settings/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: promoImageUrl }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to save settings');
      }

      toast({
        title: "Promo Image Updated",
        description: "The promotional popup image has been saved.",
      });

    } catch (error: any) {
      console.error("Failed to save promo image URL:", error);
      toast({
        title: "Error",
        description: `Could not save the promo image: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading && !promoImageUrl) { // Show loading indicator only on initial load
    return <div className="text-center p-10">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ImageUp /> Promotional Popup Settings</CardTitle>
          <CardDescription>Update the image displayed in the site-wide promotional popup.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label>Promotional Image</Label>
               <ImageUploader 
                onUploadComplete={handleImageUploadComplete}
                currentImageUrl={promoImageUrl}
                folder="promo"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Upload an image for the site-wide promotional popup.
              </p>
            </div>
            <div className="text-sm text-muted-foreground text-center">OR</div>
            <div>
              <Label htmlFor="promoImageUrl">Or Paste Image URL</Label>
              <Input
                id="promoImageUrl"
                type="text"
                value={promoImageUrl}
                onChange={(e) => setPromoImageUrl(e.target.value)}
                placeholder="https://example.com/image.png"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Pasting a URL here will override the uploaded image. The preview above will update.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Image</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
