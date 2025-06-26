
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/common/hero-section';
import { TravelPackagesSection } from '@/components/travel/travel-packages-section';
import { TestimonialsSection } from '@/components/common/testimonials-section';
import { AiRecommendationsSection } from '@/components/ai/ai-recommendations-section';
import { ContactSection } from '@/components/contact/contact-section';
import { OurTeamSection } from '@/components/common/our-team-section';
import { LatestBlogsSection } from '@/components/blog/latest-blogs-section';
import dynamic from 'next/dynamic';

const PromoPopup = dynamic(() => import('@/components/common/promo-popup').then(mod => mod.PromoPopup), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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
