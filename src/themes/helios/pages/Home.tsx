import { MarketingNav } from '../sections/MarketingNav';
import { Hero } from '../sections/Hero';
import { LogoCloud } from '../sections/LogoCloud';
import { Features } from '../sections/Features';
import {
  ProductivityPartner,
  AutomationAssistant,
} from '../sections/SplitFeatures';
import { FeatureGrid } from '../sections/FeatureGrid';
import { Integrations } from '../sections/Integrations';
import { Pricing } from '../sections/Pricing';
import { Testimonials } from '../sections/Testimonials';
import { Blog } from '../sections/Blog';
import { FAQ } from '../sections/FAQ';
import { Footer } from '../sections/Footer';

export default function Home() {
  return (
    <main
      className="overflow-x-hidden"
      style={{ background: 'var(--bg)', minHeight: '100vh' }}
    >
      <MarketingNav />
      <Hero />
      <LogoCloud />
      <Features />
      <ProductivityPartner />
      <AutomationAssistant />
      <FeatureGrid />
      <Integrations />
      <Pricing />
      <Testimonials />
      <Blog />
      <FAQ />
      <Footer />
    </main>
  );
}
