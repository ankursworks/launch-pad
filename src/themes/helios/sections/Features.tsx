'use client';
import Link from 'next/link';
import { ArrowRight, Info, Pause, Play, Plus, UserPlus } from 'lucide-react';

export function Features() {
  return (
    <section
      id="features"
      className="px-5 md:px-8 py-16 md:py-24"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex justify-center mb-5">
            <div
              className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full"
              style={{
                background: 'color-mix(in srgb, var(--accent) 14%, transparent)',
                color: 'var(--accent)',
                letterSpacing: '0.005em',
              }}
            >
              Features
            </div>
          </div>
          <h2
            className="mx-auto"
            style={{
              fontFamily: 'var(--font-display-family)',
              color: 'var(--text)',
              fontSize: 'clamp(1.875rem, 4.5vw, 3rem)',
              fontWeight: 400,
              letterSpacing: '-0.015em',
              lineHeight: 1.15,
            }}
          >
            Everything you need
            <br />
            — all in one place
          </h2>
          <p
            className="mx-auto mt-5 max-w-lg text-sm md:text-base"
            style={{ color: 'var(--muted)', lineHeight: 1.6 }}
          >
            All your essential tools — connected in one powerful platform. From
            performance tracking to team collaboration, everything works
            together seamlessly.
          </p>
        </div>

        {/* 3-card row */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          <FeatureCard
            title="Analytics that speak the language of growth"
            description="Monitor revenue in real-time, uncover trends, and make confident financial decisions."
            href="#analytics"
          >
            <ProjectsMockup />
          </FeatureCard>

          <FeatureCard
            title="Timing that drives performance"
            description="Easily track time, manage tasks, and improve productivity — without the hassle."
            href="#time"
          >
            <TimeTrackerMockup />
          </FeatureCard>

          <FeatureCard
            title="Collaboration made simple and transparent"
            description="Add teammates, assign roles, and stay aligned — all in one clean, intuitive workspace."
            href="#team"
          >
            <TeamMockup />
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}

/* ---- Card frame ---- */

function FeatureCard({
  title,
  description,
  href,
  children,
}: {
  title: string;
  description: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className="border flex flex-col h-full"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        borderRadius: 'var(--card-radius)',
        padding: '1.5rem',
      }}
    >
      {/* Inner cream panel that holds the mockup card */}
      <div
        className="flex items-center justify-center p-5 md:p-6"
        style={{
          background: 'var(--bg)',
          borderRadius: '0.875rem',
          minHeight: '240px',
        }}
      >
        {children}
      </div>

      {/* Caption */}
      <div className="pt-7 pb-1 px-1">
        <h3
          style={{
            fontFamily: 'var(--font-display-family)',
            color: 'var(--text)',
            fontSize: '1.375rem',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            lineHeight: 1.25,
          }}
        >
          {title}
        </h3>
        <p
          className="mt-3 text-sm"
          style={{ color: 'var(--muted)', lineHeight: 1.6 }}
        >
          {description}
        </p>
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: 'var(--accent)' }}
        >
          Learn more
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

/* ---- Mockup #1: Projects with bar chart ---- */

function ProjectsMockup() {
  return (
    <div
      className="w-full max-w-[230px] border shadow-sm"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        borderRadius: '0.875rem',
        padding: '1rem',
      }}
    >
      <div
        className="text-xs font-semibold mb-3"
        style={{ color: 'var(--text)' }}
      >
        Projects
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display-family)',
              fontSize: '2rem',
              fontWeight: 400,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            63
          </div>
          <div
            className="mt-2 inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full"
            style={{
              background: 'color-mix(in srgb, #0E9384 14%, transparent)',
              color: '#0E9384',
            }}
          >
            +9% from last week
          </div>
        </div>
        {/* Bar chart */}
        <div className="flex items-end gap-1 h-14">
          {[40, 70, 50, 85, 55, 75, 95, 80].map((h, i) => (
            <div
              key={i}
              className="w-1.5 rounded-sm"
              style={{
                height: `${h}%`,
                background:
                  i === 3 || i === 6
                    ? 'var(--accent)'
                    : 'color-mix(in srgb, var(--accent) 70%, transparent)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Mockup #2: Time tracker with circular ring ---- */

function TimeTrackerMockup() {
  // Circle: r=45 → circumference ≈ 282.74. 80% filled.
  const C = 2 * Math.PI * 45;
  const filled = 0.8;
  return (
    <div
      className="w-full max-w-[240px] border shadow-sm"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        borderRadius: '0.875rem',
        padding: '1rem',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className="text-xs font-semibold"
          style={{ color: 'var(--text)' }}
        >
          Time tracker
        </div>
        <Info size={14} style={{ color: 'var(--muted)' }} />
      </div>

      {/* Circular ring */}
      <div className="relative mx-auto" style={{ width: 120, height: 120 }}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="color-mix(in srgb, var(--text) 8%, transparent)"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="6"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - filled)}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            style={{
              fontFamily: 'var(--font-display-family)',
              fontSize: '1.375rem',
              fontWeight: 400,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            04:24
          </div>
          <div className="text-[10px] mt-1" style={{ color: 'var(--muted)' }}>
            Today
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-2 mt-3">
        <button
          aria-label="Play"
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'var(--accent)', color: '#FFFFFF' }}
        >
          <Play size={14} fill="currentColor" />
        </button>
        <button
          aria-label="Pause"
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: 'color-mix(in srgb, var(--text) 6%, transparent)',
            color: 'var(--text)',
          }}
        >
          <Pause size={14} fill="currentColor" />
        </button>
        <button
          aria-label="Add task"
          className="w-9 h-9 rounded-full flex items-center justify-center ml-auto"
          style={{
            background: 'color-mix(in srgb, var(--text) 6%, transparent)',
            color: 'var(--text)',
          }}
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

/* ---- Mockup #3: Team list + invite ---- */

function TeamMockup() {
  const members = [
    {
      name: 'Michael Thompson',
      email: 'michael.thompson@gmail.com',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80&auto=format&fit=crop',
    },
    {
      name: 'Chloe Patterson',
      email: 'chloe.patterson@gmail.com',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80&auto=format&fit=crop',
    },
    {
      name: 'Liam Edwards',
      email: 'liam.edwards@gmail.com',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80&auto=format&fit=crop',
    },
  ];

  return (
    <div className="w-full max-w-[260px] flex flex-col gap-2">
      {members.map((m) => (
        <div
          key={m.email}
          className="flex items-center gap-2.5 px-3 py-2 border shadow-sm"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            borderRadius: '0.625rem',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={m.avatar}
            alt=""
            className="w-7 h-7 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div
              className="text-[11px] font-semibold truncate"
              style={{ color: 'var(--text)' }}
            >
              {m.name}
            </div>
            <div
              className="text-[10px] truncate"
              style={{ color: 'var(--muted)' }}
            >
              {m.email}
            </div>
          </div>
        </div>
      ))}
      <button
        className="mt-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
        style={{
          background: 'var(--accent)',
          color: '#FFFFFF',
          borderRadius: '9999px',
        }}
      >
        <UserPlus size={12} />
        Invite member
      </button>
    </div>
  );
}
