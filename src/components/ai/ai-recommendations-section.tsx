"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import { getTravelRecommendations, type TravelRecommendationsInput, type TravelRecommendationsOutput } from '@/ai/flows/ai-travel-recommendations';
import { useToast } from "@/hooks/use-toast";

export function AiRecommendationsSection() {
  const [preferences, setPreferences] = useState('');
  const [browsingHistory, setBrowsingHistory] = useState('');
  const [recommendations, setRecommendations] = useState<TravelRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    if (!preferences.trim()) {
      toast({
        title: "Input Required",
        description: "Please tell us your travel preferences.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const input: TravelRecommendationsInput = {
      preferences,
      browsingHistory: browsingHistory || 'No specific browsing history provided.',
    };

    try {
      const result = await getTravelRecommendations(input);
      setRecommendations(result);
    } catch (err) {
      console.error("AI Recommendation Error:", err);
      setError('Failed to get recommendations. Please try again.');
      toast({
        title: "Error",
        description: "Could not fetch AI recommendations. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="recommendations" className="py-12 md:py-16 bg-background">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-accent" /> AI Travel Recommendations
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Let our AI help you find the perfect destination based on your unique tastes and interests.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline">Discover Your Next Adventure</CardTitle>
            <CardDescription>
              Tell us about your dream vacation, and we'll suggest some amazing places.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="preferences" className="block text-sm font-medium text-foreground mb-1">
                  Your Travel Preferences
                </label>
                <Textarea
                  id="preferences"
                  placeholder="e.g., I love sunny beaches, historical sites, and trying local food. I prefer relaxing trips over adventurous ones."
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  rows={4}
                  className="bg-card border-input-border"
                  required
                />
                 <p className="text-xs text-muted-foreground mt-1">What kind of activities, climate, or travel style do you enjoy?</p>
              </div>
              <div>
                <label htmlFor="browsingHistory" className="block text-sm font-medium text-foreground mb-1">
                  Recent Places You've Looked At (Optional)
                </label>
                <Textarea
                  id="browsingHistory"
                  placeholder="e.g., Italy, Japan, National Parks"
                  value={browsingHistory}
                  onChange={(e) => setBrowsingHistory(e.target.value)}
                  rows={2}
                  className="bg-card border-input-border"
                />
                <p className="text-xs text-muted-foreground mt-1">Any destinations or packages you've recently viewed?</p>
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Get Recommendations
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Card className="mt-8 max-w-2xl mx-auto bg-destructive/10 border-destructive">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <p className="font-medium">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {recommendations && recommendations.destinations.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-headline font-semibold text-center mb-6 text-primary">Here are your personalized recommendations:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.destinations.map((destination, index) => (
                <Card key={index} className="shadow-lg animate-fadeIn">
                  <CardHeader>
                    <CardTitle className="font-headline text-accent">{destination}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/90">{recommendations.reasons[index]}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
         {recommendations && recommendations.destinations.length === 0 && !isLoading && (
            <p className="text-center text-lg text-muted-foreground mt-10">
                We couldn't find specific recommendations based on your input. Try being more descriptive!
            </p>
        )}
      </div>
    </section>
  );
}
