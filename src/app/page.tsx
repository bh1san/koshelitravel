
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/common/hero-section';
import { TravelPackagesSection } from '@/components/travel/travel-packages-section';
import { TestimonialsSection } from '@/components/common/testimonials-section';
import { AiRecommendationsSection } from '@/components/ai/ai-recommendations-section';
import { ContactSection } from '@/components/contact/contact-section';
import { PromoPopup } from '@/components/common/promo-popup';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <TravelPackagesSection />
        <AiRecommendationsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <PromoPopup />
    </div>
  );
}
