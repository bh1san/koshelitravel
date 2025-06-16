
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageUp, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_PROMO_IMAGE_URL } from '@/lib/mock-data';

const PROMO_IMAGE_STORAGE_KEY = 'kosheliTravelPromoImage';

export default function PromoSettingsPage() {
  const [promoImageUrl, setPromoImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load current URL from localStorage or use default
    const storedUrl = localStorage.getItem(PROMO_IMAGE_STORAGE_KEY);
    setPromoImageUrl(storedUrl || DEFAULT_PROMO_IMAGE_URL);
  }, []);

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
      // Manually dispatch a storage event so other tabs/components can react if needed
      window.dispatchEvent(new StorageEvent('storage', {
        key: PROMO_IMAGE_STORAGE_KEY,
        newValue: promoImageUrl,
        oldValue: localStorage.getItem(PROMO_IMAGE_STORAGE_KEY) // old value before setting
      }));

      toast({
        title: "Promo Image Updated",
        description: "The promotional popup image URL has been saved.",
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
              <Label htmlFor="promoImageUrl">Promotional Image URL</Label>
              <Input 
                id="promoImageUrl" 
                type="url"
                value={promoImageUrl} 
                onChange={(e) => setPromoImageUrl(e.target.value)} 
                placeholder="https://example.com/your-promo-image.png"
                required 
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter the full URL of the image you want to display in the popup.
              </p>
            </div>
            {promoImageUrl && (
                <div className="mt-4">
                    <Label>Current Image Preview:</Label>
                    <div className="mt-2 border rounded-md p-2 flex justify-center items-center bg-muted/30 max-h-64 overflow-hidden">
                        <img 
                            src={promoImageUrl} 
                            alt="Promo Preview" 
                            className="max-w-full max-h-56 object-contain rounded" 
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    </div>
                </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Image URL</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
