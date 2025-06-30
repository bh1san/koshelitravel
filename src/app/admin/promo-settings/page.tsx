
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ImageUp, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_PROMO_IMAGE_URL } from '@/lib/mock-data';
import { ImageUploader } from '@/components/admin/image-uploader';

const PROMO_IMAGE_STORAGE_KEY = 'kosheliTravelPromoImage';

export default function PromoSettingsPage() {
  const [promoImageUrl, setPromoImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedUrl = localStorage.getItem(PROMO_IMAGE_STORAGE_KEY);
    setPromoImageUrl(storedUrl || DEFAULT_PROMO_IMAGE_URL);
  }, []);

  const handleImageUploadComplete = (url: string) => {
    setPromoImageUrl(url);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!promoImageUrl.trim()) {
        toast({
            title: "Error",
            description: "Promo image URL cannot be empty.",
            variant: "destructive",
        });
        setIsLoading(false);
        return;
    }

    try {
      localStorage.setItem(PROMO_IMAGE_STORAGE_KEY, promoImageUrl);
      window.dispatchEvent(new StorageEvent('storage', {
        key: PROMO_IMAGE_STORAGE_KEY,
        newValue: promoImageUrl,
        oldValue: localStorage.getItem(PROMO_IMAGE_STORAGE_KEY)
      }));

      toast({
        title: "Promo Image Updated",
        description: "The promotional popup image has been saved.",
      });
    } catch (error) {
      console.error("Failed to save promo image URL:", error);
      toast({
        title: "Error",
        description: "Could not save the promo image URL. Please ensure your browser supports localStorage.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

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
                Upload an image for the site-wide promotional popup. The new image will be used after saving.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Image</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
