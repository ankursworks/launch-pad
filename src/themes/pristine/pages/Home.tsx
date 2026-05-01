import { MarketingNav } from '../sections/MarketingNav';
import { Hero } from '../sections/Hero';
import { LogoCloud } from '../sections/LogoCloud';
import { Features } from '../sections/Features';
import { Benefits } from '../sections/Benefits';
import { Integration } from '../sections/Integration';
import { Pricing } from '../sections/Pricing';
import { Testimonial } from '../sections/Testimonial';
import { CtaBanner } from '../sections/CtaBanner';
import { Footer } from '../sections/Footer';

export default function Home() {
  return (
    <main
      className="overflow-x-hidden"
      style={{ background: 'var(--bg)', minHeight: '100vh' }}
    >
      <MarketingNav />

      {/* Single continuous outline wrapping the entire page body —
          every section inside is content-only and stacks edge-to-edge. */}
      <div className="px-4 md:px-6 pt-4 pb-4">
        <div className="max-w-[1280px] mx-auto">
          <div
            className="overflow-hidden border"
            style={{
              borderRadius: '2rem',
              borderColor: 'color-mix(in srgb, var(--text) 8%, transparent)',
              background: 'var(--surface)',
            }}
          >
            <Hero />
            <LogoCloud />
            <Features />
            <Benefits />
            <Integration />
            <Pricing />
            <Testimonial />
            <CtaBanner />
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
