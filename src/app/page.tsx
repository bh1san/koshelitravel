
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/common/hero-section';
import { TravelPackagesSection } from '@/components/travel/travel-packages-section';
import { AiRecommendationsSection } from '@/components/ai/ai-recommendations-section';
import { LatestBlogsSection } from '@/components/blog/latest-blogs-section';
import { TestimonialsSection } from '@/components/common/testimonials-section';
import { ContactSection } from '@/components/contact/contact-section';
import { OurTeamSection } from '@/components/common/our-team-section';
import { PromoPopup } from '@/components/common/promo-popup';

// The page is now an async component, allowing top-level awaits for data fetching.
export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <TravelPackagesSection />
        <AiRecommendationsSection />
        <OurTeamSection />
        <LatestBlogsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <PromoPopup />
    </div>
  );
}
