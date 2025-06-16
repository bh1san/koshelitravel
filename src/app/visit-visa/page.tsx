
"use client";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket, Mail, Phone, ArrowRight, BookOpenCheck, Briefcase, Users, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

// export const metadata: Metadata = { // Metadata cannot be used in client components
//   title: 'Visit Visa Services - KosheliTravel',
//   description: 'Explore visit visa options and get expert assistance with KosheliTravel for your travel needs.',
// };


export default function VisitVisaPage() {
  const visaOptions = [
    {
      title: 'Tourist Visa',
      description: 'Explore new destinations for leisure and tourism. We assist with applications for various countries.',
      icon: <BookOpenCheck className="w-8 h-8 text-accent" />
    },
    {
      title: 'Business Visa',
      description: 'Travel for business meetings, conferences, or exploring new ventures. Streamlined processing available.',
      icon: <Briefcase className="w-8 h-8 text-accent" />
    },
    {
      title: 'Family Visit Visa',
      description: 'Visit your loved ones abroad. We help navigate the requirements for family sponsorship and invitations.',
      icon: <Users className="w-8 h-8 text-accent" />
    },
    {
      title: 'Student Visa',
      description: 'Pursue your educational goals overseas. Guidance on application, documentation, and university requirements.',
      icon: <GraduationCap className="w-8 h-8 text-accent" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-10 md:mb-16 animate-fadeIn">
            <Ticket className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
              Visit Visa Services
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              Navigate the complexities of visa applications with KosheliTravel. We provide expert assistance for various visa types to make your travel preparations smoother and stress-free.
            </p>
          </div>

          <section id="visa-options" className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary mb-8 md:mb-10 text-center">
              Visa Types We Assist With
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {visaOptions.map((visa, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center animate-slideInUp h-full">
                  <CardHeader className="items-center pt-6">
                    {visa.icon}
                    <CardTitle className="mt-4 text-2xl font-headline">{visa.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow px-4 pb-4">
                    <CardDescription className="text-sm">
                      {visa.description}
                    </CardDescription>
                  </CardContent>
                  <div className="p-4 pt-0 w-full">
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Link href="/#contact">Inquire Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="how-to-apply" className="mb-12 md:mb-16">
            <Card className="shadow-xl p-6 md:p-10 bg-card rounded-lg animate-fadeIn">
              <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary mb-6">
                General Application Process
              </h2>
              <ol className="list-decimal list-inside space-y-4 text-foreground/90 text-base">
                <li>
                  <strong>Consultation:</strong> Contact us with your travel plans and visa requirements. We'll assess your eligibility and guide you on the necessary documents.
                </li>
                <li>
                  <strong>Document Preparation:</strong> Gather all required documents, such as passport copies, photos, financial statements, travel itinerary, and invitation letters (if applicable).
                </li>
                <li>
                  <strong>Application Submission:</strong> We assist in filling out application forms accurately and submitting them to the respective embassy or visa application center.
                </li>
                <li>
                  <strong>Follow-up:</strong> We keep track of your application status and provide updates, liaising with authorities as needed.
                </li>
                <li>
                  <strong>Visa Collection:</strong> Once approved, we guide you on collecting your visa and preparing for your travels.
                </li>
              </ol>
              <p className="mt-6 text-sm text-muted-foreground italic">
                Please note: Visa requirements and processing times vary significantly by country and visa type. It's highly advisable to start your application well in advance of your planned travel date to avoid any last-minute complications.
              </p>
            </Card>
          </section>

          <section id="contact-for-visa" className="text-center py-8 md:py-12 bg-secondary rounded-lg animate-fadeIn">
             <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary mb-6">
              Need Expert Visa Assistance?
            </h2>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
              Our experienced consultants are here to help you every step of the way. Don't let visa complexities hold back your travel dreams. Contact us today for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                <Link href="/#contact">
                  <Mail className="mr-2 h-5 w-5" /> Send an Inquiry
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-accent text-accent hover:bg-accent/10 hover:text-accent px-8 py-3 text-lg">
                 <a href="tel:+97143538898">
                  <Phone className="mr-2 h-5 w-5" /> Call Us Now
                </a>
              </Button>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
