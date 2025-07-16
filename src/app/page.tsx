
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Store, Package, Rocket } from 'lucide-react';
import Link from 'next/link';

function HeroSection() {
  return (
    <section className="relative bg-cover bg-center text-primary-foreground py-20 md:py-32 min-h-[70vh] flex items-center animate-fadeIn" style={{ backgroundImage: "url('https://placehold.co/1920x1080.png')" }} data-ai-hint="abstract background">
      <div className="absolute inset-0 bg-black/70 z-0"></div>
      <div className="container relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold mb-6 text-white shadow-text">
          Create Your Dropshipping Empire in Minutes
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90 shadow-text">
          DropShipKit gives you everything you need to build, manage, and grow your online store. No coding required.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg">
            <Link href="#features">Get Started For Free</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
            <Link href="#">Watch Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <Store className="h-10 w-10 text-primary" />,
      title: 'Easy Store Setup',
      description: 'Choose a template, add your branding, and launch your professional-looking store in just a few clicks.',
    },
    {
      icon: <Package className="h-10 w-10 text-primary" />,
      title: 'Automated Product Sourcing',
      description: 'Import high-quality products from trusted suppliers directly into your store without managing inventory.',
    },
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: 'Seamless Order Fulfillment',
      description: 'When a customer places an order, we handle the picking, packing, and shipping directly to them.',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Powerful Features, Simple Interface</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mt-3">
            Everything you need to succeed in the world of dropshipping.
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
                 <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">Ready to Start Selling?</h2>
                 <p className="text-lg text-foreground/80 max-w-xl mx-auto mb-8">
                    Join thousands of entrepreneurs and start your own online business today. No credit card required.
                 </p>
                 <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-xl">
                    <Link href="#">Sign Up Now</Link>
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
