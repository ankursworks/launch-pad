'use client';
import { Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  brand: { name: string; color: string };
}

const testimonials: Testimonial[] = [
  {
    quote:
      'This platform helped us save time from day one. It’s intuitive, fast, and gives us the visibility we need to keep growing.',
    name: 'Marcus Reed',
    role: 'COO at Sisyphus',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80&auto=format&fit=crop',
    brand: { name: 'Sisyphus', color: '#10B981' },
  },
  {
    quote:
      'Using this platform has made it easier for our team to stay aligned without extra meetings. The interface is clean, and everything feels well thought-out.',
    name: 'Jason Miller',
    role: 'Head of Strategy at Layers',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&q=80&auto=format&fit=crop',
    brand: { name: 'Layers', color: '#6366F1' },
  },
  {
    quote:
      'We tried several tools before this one — none felt this smooth and lightweight. It fits naturally into our workflow and just works the way we expect.',
    name: 'Emily Carter',
    role: 'CEO at Catalog',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&q=80&auto=format&fit=crop',
    brand: { name: 'Circooles', color: '#F97316' },
  },
  {
    quote:
      'Numbers that used to take a full day to compile now appear instantly. Our weekly review meetings are half as long and twice as sharp.',
    name: 'Priya Shah',
    role: 'VP Analytics at Quotient',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=80&auto=format&fit=crop',
    brand: { name: 'Quotient', color: '#8B5CF6' },
  },
  {
    quote:
      'Onboarding was effortless and the team was running dashboards inside an hour. Exactly the lightweight tool we wanted.',
    name: 'David Chen',
    role: 'Founder at Catalog',
    avatar:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?w=160&q=80&auto=format&fit=crop',
    brand: { name: 'Catalog', color: '#0EA5E9' },
  },
];

const ratingAvatars = [
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=80&q=80&auto=format&fit=crop',
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="px-5 md:px-8 py-16 md:py-24 text-center"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-14">
          <div className="flex justify-center mb-5">
            <div
              className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border"
              style={{
                background:
                  'color-mix(in srgb, var(--accent) 14%, transparent)',
                borderColor:
                  'color-mix(in srgb, var(--accent) 30%, transparent)',
                color: 'var(--accent)',
              }}
            >
              Testimonials
            </div>
          </div>
          <h2
            className="mx-auto"
            style={{
              fontFamily: 'var(--font-display-family)',
              color: 'var(--text)',
              fontSize: 'clamp(1.875rem, 4.5vw, 3.25rem)',
              fontWeight: 400,
              letterSpacing: '-0.015em',
              lineHeight: 1.15,
            }}
          >
            Trusted by teams
            <br />
            around the world
          </h2>
          <p
            className="mx-auto mt-5 max-w-md text-sm md:text-base"
            style={{ color: 'var(--muted)', lineHeight: 1.6 }}
          >
            We listen closely to our users — and build with their feedback in
            mind. Their success is what drives us forward.
          </p>
        </div>
      </div>

      {/* Edge-bleeding scroll track */}
      <div
        className="relative"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className="flex gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-1200px)/2))] pb-2 snap-x snap-mandatory no-scrollbar"
          style={{ scrollPaddingInline: 'max(1.25rem,calc((100vw-1200px)/2))' }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Rating row */}
      <div className="max-w-[1200px] mx-auto mt-10 flex flex-col items-center gap-3">
        <div className="flex -space-x-2">
          {ratingAvatars.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt=""
              className="w-8 h-8 rounded-full object-cover shadow-sm"
              style={{
                border: '2px solid var(--bg)',
              }}
            />
          ))}
        </div>
        <div
          className="text-sm flex items-center gap-1.5"
          style={{ color: 'var(--text)' }}
        >
          <span style={{ color: 'var(--muted)' }}>Rated</span>
          <Star
            size={14}
            fill="var(--accent)"
            stroke="var(--accent)"
            strokeWidth={1.5}
          />
          <span className="font-semibold">4.9</span>
          <span style={{ color: 'var(--muted)' }}>
            by over 12,000+ users
          </span>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article
      className="snap-start shrink-0 text-left flex flex-col"
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--card-radius)',
        padding: '1.75rem',
        width: 'min(380px, 85vw)',
      }}
    >
      <p
        className="text-sm md:text-[0.95rem] flex-1"
        style={{ color: 'var(--text)', lineHeight: 1.65 }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>

      <div className="mt-7 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={t.avatar}
            alt=""
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0">
            <div
              className="text-sm font-semibold truncate"
              style={{ color: 'var(--text)' }}
            >
              {t.name}
            </div>
            <div
              className="text-xs truncate"
              style={{ color: 'var(--muted)' }}
            >
              {t.role}
            </div>
          </div>
        </div>

        <BrandMark name={t.brand.name} color={t.brand.color} />
      </div>
    </article>
  );
}

function BrandMark({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="flex items-center gap-1.5 shrink-0 opacity-90"
      style={{ color: 'var(--text)' }}
    >
      <span
        className="w-4 h-4 rounded-sm"
        style={{ background: color }}
        aria-hidden="true"
      />
      <span className="text-sm font-semibold">{name}</span>
    </div>
  );
}
