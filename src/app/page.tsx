
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Plane, Search, HandCoins, Users, Star, Tag, Briefcase, GraduationCap, CalendarDays, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { readTeamMembers } from '@/lib/team-store';
import { readPackages } from '@/lib/package-store';
import { mockVisaOptions, type TravelPackage } from '@/lib/mock-data';

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
            <Link href="#all-packages">Explore Packages</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
            <Link href="/contact">Contact Us</Link>
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

async function AllPackagesSection() {
  const packages = await readPackages();

  return (
    <section id="all-packages" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <Star className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Our Travel Packages</h2>
          <p className="mt-3 text-lg text-foreground/80 max-w-2xl mx-auto">
            Handpicked destinations to inspire your next journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg: TravelPackage) => (
            <Card key={pkg.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slideInUp group">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 group-hover:scale-110"
                  data-ai-hint={pkg.dataAiHint}
                />
                 <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs font-bold py-1 px-2 rounded-full capitalize">
                    {pkg.budgetCategory}
                </div>
              </div>
              <CardHeader>
                <CardTitle>{pkg.title}</CardTitle>
                <p className="text-sm text-muted-foreground pt-1">{pkg.destination}</p>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                 <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><CalendarDays size={16} className="text-primary"/><span>{pkg.date}</span></div>
                    <div className="flex items-center gap-2"><Clock size={16} className="text-primary"/><span>{pkg.duration}</span></div>
                </div>
                <p className="text-sm text-foreground/80 line-clamp-3">{pkg.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center bg-secondary/50 p-4">
                  <div>
                    <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                  </div>
                 <Button asChild>
                    <Link href="/contact">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


function ServicesSection() {
  const services = mockVisaOptions; // Show all visa options now

  const getIcon = (identifier: string) => {
    switch (identifier) {
      case 'tourist': return <Plane className="h-8 w-8 text-primary" />;
      case 'business': return <Briefcase className="h-8 w-8 text-primary" />;
      case 'student': return <GraduationCap className="h-8 w-8 text-primary" />;
      case 'family': return <Users className="h-8 w-8 text-primary" />;
      default: return <Tag className="h-8 w-8 text-primary" />;
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Visa & Travel Services</h2>
          <p className="mt-3 text-lg text-foreground/80 max-w-2xl mx-auto">
            Comprehensive support for all your travel needs, from planning to visa assistance.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="text-center p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                {getIcon(service.iconIdentifier)}
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm">{service.description}</p>
            </Card>
          ))}
        </div>
         <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/contact">Inquire About Visas</Link>
            </Button>
        </div>
      </div>
    </section>
  )
}

async function TeamSection() {
  const teamMembers = await readTeamMembers();

  return (
    <section id="team" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <Users className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Meet Our Team</h2>
          <p className="mt-3 text-lg text-foreground/80 max-w-2xl mx-auto">
            The dedicated professionals behind your next great adventure.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.id} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slideInUp">
              <CardHeader className="items-center pb-4">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20">
                  <Image
                    src={member.image}
                    alt={`Photo of ${member.name}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    data-ai-hint={member.dataAiHint}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <p className="text-primary font-semibold mt-1">{member.role}</p>
                <p className="text-muted-foreground mt-3 text-sm">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
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
        <AllPackagesSection />
        <ServicesSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
