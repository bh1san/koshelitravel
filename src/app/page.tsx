
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
import { readSettings } from '@/lib/settings-store';

// The page is the single source of truth for fetching settings.
export default async function Home() {
  const settings = await readSettings();
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection banner={settings.banner} />
        <TravelPackagesSection />
        <AiRecommendationsSection />
        <OurTeamSection />
        <LatestBlogsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <PromoPopup imageUrl={settings.promo?.imageUrl || null} enabled={settings.promo?.enabled ?? false} />
    </div>
  );
}
