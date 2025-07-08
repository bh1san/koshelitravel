
'use client';

import { useState, useEffect, type FormEvent, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ImageUp, Save, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ImageUploader } from '@/components/admin/image-uploader';
import { getSiteSettings, updatePromoSettings } from '@/app/actions/settingsActions';

export default function PromoSettingsPage() {
  const [promoImageUrl, setPromoImageUrl] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();


  useEffect(() => {
    async function fetchPromoSettings() {
      setIsFetching(true);
      try {
        // Fetch the latest settings from the persistent store via the server action
        const data = await getSiteSettings();
        setPromoImageUrl(data.promo.imageUrl || '');
      } catch (error) {
        console.error("Failed to fetch promo settings:", error);
        toast({
          title: "Error",
          description: "Could not load promo settings.",
          variant: "destructive",
        });
      } finally {
        setIsFetching(false);
      }
    }
    fetchPromoSettings();
  }, [toast]);

  const handleImageUploadComplete = (url: string) => {
    setPromoImageUrl(url);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    startTransition(async () => {
      try {
        const result = await updatePromoSettings({ imageUrl: promoImageUrl });
        if (!result.success) {
            throw new Error(result.message || 'Failed to save settings');
        }

        toast({
          title: "Promo Image Updated",
          description: "The promotional popup image has been saved.",
        });
        router.refresh();

      } catch (error: any) {
        console.error("Failed to save promo image URL:", error);
        toast({
          title: "Error",
          description: `Could not save the promo image: ${error.message}`,
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
