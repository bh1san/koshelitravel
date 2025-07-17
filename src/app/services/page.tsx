
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, GraduationCap, HeartHandshake, Plane, Search, Users } from 'lucide-react';
import { mockVisaOptions } from '@/lib/mock-data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ServicesPage() {

    const getIcon = (identifier: string, className?: string) => {
        switch (identifier) {
            case 'tourist': return <Plane className={className} />;
            case 'business': return <Briefcase className={className} />;
            case 'student': return <GraduationCap className={className} />;
            case 'family': return <HeartHandshake className={className} />;
            case 'general-planning': return <Search className={className} />;
            case 'group-tours': return <Users className={className} />;
            default: return <Plane className={className} />;
        }
    };
    
    const otherServices = [
        {
            id: 'serv-1',
            title: 'AI-Powered Trip Planning',
            description: 'Utilize our advanced AI to get personalized travel recommendations and itineraries based on your unique interests, budget, and travel style. Get started in minutes.',
            iconIdentifier: 'general-planning'
        },
        {
            id: 'serv-2',
            title: 'Custom & Private Tours',
            description: 'Looking for something unique? We design bespoke private tours and customized travel packages for individuals, families, and groups. Your adventure, your way.',
            iconIdentifier: 'tourist'
        },
        {
            id: 'serv-3',
            title: 'Group & Corporate Travel',
            description: 'We organize seamless travel experiences for corporate teams, educational institutions, and special interest groups. From logistics to activities, we handle it all.',
            iconIdentifier: 'group-tours'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-primary text-primary-foreground py-16 md:py-20">
                    <div className="container text-center animate-fadeIn">
                        <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Services</h1>
                        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
                            Comprehensive solutions to make your travel seamless and memorable.
                        </p>
                    </div>
                </section>

                {/* General Services Section */}
                <section className="py-16 md:py-24">
                    <div className="container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Travel & Tour Planning</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {otherServices.map((service) => (
                                <Card key={service.id} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <CardHeader className="items-center">
                                        {getIcon(service.iconIdentifier, "h-12 w-12 text-primary")}
                                        <CardTitle className="mt-4">{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{service.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Visa Services Section */}
                <section className="py-16 md:py-24 bg-secondary">
                    <div className="container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Visa Assistance</h2>
                            <p className="mt-3 text-lg text-foreground/80 max-w-2xl mx-auto">
                                Navigating visa applications can be complex. Let our experts guide you through the process for a hassle-free experience.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {mockVisaOptions.map((option) => (
                                <Card key={option.id} className="text-center p-6 bg-card">
                                    <div className="flex justify-center mb-4">
                                        {getIcon(option.iconIdentifier, "h-10 w-10 text-accent")}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                                    <p className="text-muted-foreground text-sm">{option.description}</p>
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

            </main>
            <Footer />
        </div>
    );
}
