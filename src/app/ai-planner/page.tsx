'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getTravelRecommendations, type TravelRecommendationsOutput } from '@/ai/flows/ai-travel-recommendations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2, ServerCrash, VenetianMask } from 'lucide-react';

function AIPlannerContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || 'anything in particular';

  const [recommendations, setRecommendations] = useState<TravelRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getTravelRecommendations({ preferences: query });
        if (!result || result.destinations.length === 0) {
            throw new Error("The AI couldn't find any recommendations for your query. Please try being more specific!");
        }
        setRecommendations(result);
      } catch (err: any) {
        console.error("AI Planner Error:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    }
    if(query) {
      fetchRecommendations();
    }
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="bg-primary text-primary-foreground py-16 md:py-20">
          <div className="container text-center animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-headline font-bold flex items-center justify-center gap-3">
              <Wand2 className="h-10 w-10" /> AI Travel Planner
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
              Showing AI-powered travel ideas for: <span className="font-bold italic">"{query}"</span>
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            {isLoading && (
              <div className="text-center text-muted-foreground">
                <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
                <p className="mt-4 text-lg">Our AI is exploring the globe for you...</p>
              </div>
            )}

            {error && (
              <Card className="max-w-2xl mx-auto bg-destructive/10 border-destructive">
                <CardHeader className="text-center">
                  <ServerCrash className="h-12 w-12 mx-auto text-destructive" />
                  <CardTitle className="text-destructive">Oops! Something went wrong.</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-destructive/90">{error}</p>
                    <p className="mt-4 text-sm text-destructive/70">
                        This can happen if the AI is unavailable or the request is too broad. Try refining your search on the homepage.
                    </p>
                </CardContent>
              </Card>
            )}

            {!isLoading && !error && recommendations && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slideInUp">
                {recommendations.destinations.map((destination, index) => (
                  <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                        <VenetianMask className="h-8 w-8 text-accent mb-2" />
                      <CardTitle className="text-2xl text-primary">{destination}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{recommendations.reasons[index]}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function AIPlannerPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AIPlannerContent />
        </Suspense>
    )
}
