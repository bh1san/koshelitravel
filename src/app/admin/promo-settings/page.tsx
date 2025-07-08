
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ImageUp, Save, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from '@/components/admin/image-uploader';
import { Switch } from '@/components/ui/switch';

export default function PromoSettingsPage() {
  const [promoImageUrl, setPromoImageUrl] = useState('');
  const [promoEnabled, setPromoEnabled] = useState(true);
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
        setPromoEnabled(data.enabled ?? true); // Default to true if not set
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
        body: JSON.stringify({ imageUrl: promoImageUrl, enabled: promoEnabled }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to save settings');
      }

      toast({
        title: "Promo Settings Updated",
        description: "The promotional popup settings have been saved.",
      });

    } catch (error: any) {
      console.error("Failed to save promo settings:", error);
      toast({
        title: "Error",
        description: `Could not save the promo settings: ${error.message}`,
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
          <CardDescription>Update the image and enable or disable the site-wide promotional popup.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
             <div className="flex items-center space-x-2 p-4 border rounded-md">
                <Switch id="promo-enabled" checked={promoEnabled} onCheckedChange={setPromoEnabled} />
                <Label htmlFor="promo-enabled" className="text-base cursor-pointer">
                    {promoEnabled ? 'Promotional Popup is Enabled' : 'Promotional Popup is Disabled'}
                </Label>
            </div>
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
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <><Save className="mr-2 h-4 w-4" /> Save Settings</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
