
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { readTeamMembers } from '@/lib/team-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Star, Quote } from 'lucide-react';
import { mockTestimonials } from '@/lib/mock-data';

export default async function AboutPage() {
  const teamMembers = await readTeamMembers();
  const testimonials = mockTestimonials.slice(0, 2); // Show first 2 testimonials

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container text-center animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">About KosheliTravel</h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
              We are a team of passionate travelers and tech innovators dedicated to crafting your perfect journey.
            </p>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInUp">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Our Mission</h2>
              <p className="mt-4 text-lg text-foreground/80">
                At KosheliTravel, our mission is to blend cutting-edge AI technology with the irreplaceable touch of human expertise to create personalized, seamless, and unforgettable travel experiences. We believe that travel should be accessible, enjoyable, and tailored to each individual's dreams.
              </p>
              <p className="mt-4 text-lg text-foreground/80">
                We handle every detail, from planning intricate itineraries to ensuring you get the best value, so you can focus on what truly matters: making memories.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl animate-fadeIn">
                <Image 
                    src="https://placehold.co/600x400.png"
                    data-ai-hint="team working travel"
                    alt="KosheliTravel team collaborating" 
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-16 md:py-24 bg-secondary">
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

         {/* Testimonials Section */}
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="text-center mb-12">
                    <Star className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">What Our Travelers Say</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="bg-card shadow-lg">
                            <CardContent className="pt-6">
                                <Quote className="w-8 h-8 text-accent mb-4" />
                                <p className="text-foreground/90 italic">"{testimonial.quote}"</p>
                                <div className="mt-4 flex items-center gap-4">
                                     <div className="relative w-14 h-14 rounded-full overflow-hidden">
                                        <Image src={testimonial.image || 'https://placehold.co/100x100.png'} alt={testimonial.author} fill style={{objectFit: 'cover'}} data-ai-hint={testimonial.dataAiHint} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-primary">{testimonial.author}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
