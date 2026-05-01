'use client';
import Link from 'next/link';

interface Post {
  category: string;
  date: string;
  title: string;
  description: string;
  cover: string;
  author: { name: string; avatar: string };
  href: string;
}

const posts: Post[] = [
  {
    category: 'Cloud Computing',
    date: 'February 16, 2025',
    title: 'Building Strong Customer Relationships with SaaS',
    description:
      'SaaS can enhance customer relationships. This article explores strategies for building connections.',
    cover:
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=900&q=80&auto=format&fit=crop',
    author: {
      name: 'Olivia Williams',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80&auto=format&fit=crop',
    },
    href: '#post-1',
  },
  {
    category: 'Digital Marketing',
    date: 'February 11, 2025',
    title: 'Measuring Performance Metrics for Your SaaS',
    description:
      'Understanding performance metrics is vital for SaaS success. This post discusses key metrics to track.',
    cover:
      'https://images.unsplash.com/photo-1635776063043-ab23b4c226d4?w=900&q=80&auto=format&fit=crop',
    author: {
      name: 'Amanda Taylor',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80&auto=format&fit=crop',
    },
    href: '#post-2',
  },
  {
    category: 'Software Development',
    date: 'February 6, 2025',
    title: 'Navigating Challenges in SaaS Implementation',
    description:
      'Implementing SaaS can be challenging. This article outlines common obstacles and how to overcome them.',
    cover:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80&auto=format&fit=crop',
    author: {
      name: 'James Miller',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80&auto=format&fit=crop',
    },
    href: '#post-3',
  },
];

export function Blog() {
  return (
    <section id="blog" className="px-5 md:px-8 py-16 md:py-24 text-center">
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
              Blog
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
            Insights, tips, and
            <br />
            product updates
          </h2>
          <p
            className="mx-auto mt-5 max-w-md text-sm md:text-base"
            style={{ color: 'var(--muted)', lineHeight: 1.6 }}
          >
            Stay up to date with fresh content from our team — tutorials, use
            cases, and ideas to help you grow.
          </p>
        </div>

        {/* 3 post cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((p) => (
            <PostCard key={p.title} post={p} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 md:mt-12 flex justify-center">
          <Link
            href="#posts"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition-[transform,filter] duration-150 hover:brightness-95 active:scale-[0.98]"
            style={{
              background: 'var(--accent)',
              color: '#FFFFFF',
              borderRadius: 'var(--btn-radius)',
              letterSpacing: '-0.005em',
            }}
          >
            Read All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.href}
      className="group text-left flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--card-radius)',
        overflow: 'hidden',
      }}
    >
      {/* Cover */}
      <div className="aspect-[16/10] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.cover}
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Body */}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        {/* Meta row */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold rounded-full"
            style={{
              background:
                'color-mix(in srgb, var(--accent) 14%, transparent)',
              color: 'var(--accent)',
            }}
          >
            {post.category}
          </span>
          <span className="text-xs" style={{ color: 'var(--muted)' }}>
            {post.date}
          </span>
        </div>

        <h3
          className="mb-2"
          style={{
            fontFamily: 'var(--font-display-family)',
            color: 'var(--text)',
            fontSize: '1.25rem',
            fontWeight: 400,
            letterSpacing: '-0.005em',
            lineHeight: 1.3,
          }}
        >
          {post.title}
        </h3>
        <p
          className="text-sm flex-1"
          style={{ color: 'var(--muted)', lineHeight: 1.6 }}
        >
          {post.description}
        </p>

        {/* Author */}
        <div className="mt-5 pt-4 flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.author.avatar}
            alt=""
            className="w-7 h-7 rounded-full object-cover shrink-0"
          />
          <span
            className="text-xs font-semibold"
            style={{ color: 'var(--text)' }}
          >
            {post.author.name}
          </span>
        </div>
      </div>
    </Link>
  );
}
