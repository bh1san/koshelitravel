
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, Search, HandCoins } from 'lucide-react';
import Link from 'next/link';

function HeroSection() {
  return (
    <section className="relative bg-cover bg-center text-primary-foreground py-20 md:py-32 min-h-[70vh] flex items-center animate-fadeIn" style={{ backgroundImage: "url('https://www.imghippo.com/i/hV7929iHQ.jpg')" }} data-ai-hint="dubai skyline desert">
      <div className="absolute inset-0 bg-black/70 z-0"></div>
      <div className="container relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold mb-6 text-white shadow-text">
          Your Next Adventure Awaits
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90 shadow-text">
          Discover breathtaking destinations and create unforgettable memories with KosheliTravel. Personalized plans, expert advice, and exclusive deals.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg">
            <Link href="/packages">Explore Packages</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: 'AI-Powered Search',
      description: 'Our smart search helps you find the perfect travel package based on your unique preferences and interests.',
    },
    {
      icon: <Plane className="h-10 w-10 text-primary" />,
      title: 'Customized Itineraries',
      description: 'We craft personalized travel plans, from flights and accommodations to daily activities and tours.',
    },
    {
      icon: <HandCoins className="h-10 w-10 text-primary" />,
      title: 'Competitive Pricing',
      description: 'Get the best value for your adventure with our exclusive deals and transparent pricing. No hidden fees.',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Why Travel With Us?</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mt-3">
            We combine cutting-edge technology with human expertise to deliver your dream vacation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center">
                {feature.icon}
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
    return (
        <section id="cta" className="py-16 md:py-24 bg-background">
            <div className="container text-center">
                 <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Ready for an Unforgettable Journey?</h2>
                 <p className="text-lg text-foreground/80 max-w-xl mx-auto mb-8">
                    Let our experts and AI craft the perfect getaway for you. Explore our packages or get a custom quote today.
                 </p>
                 <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-xl">
                    <Link href="/packages">View All Travel Packages</Link>
                </Button>
            </div>
        </section>
    );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
