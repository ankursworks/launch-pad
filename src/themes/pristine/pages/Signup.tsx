'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/core/auth';
import { Button, Input } from '@/themes/helios';
import { HeroPanel } from '../components/HeroPanel';

const schema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'At least 6 characters'),
  terms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms' }),
  }),
});
type FormData = z.infer<typeof schema>;

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      await signup({
        name: data.name,
        username: data.name.toLowerCase().replace(/\s+/g, ''),
        email: data.email,
        password: data.password,
      });
      router.push('/dashboard');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Signup failed');
    }
  };

  return (
    <div
      className="grid md:grid-cols-2 overflow-hidden border"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        borderRadius: 'var(--card-radius)',
      }}
    >
      <div className="p-8 md:p-14">
        <div className="max-w-sm mx-auto">
          <h1
            className="text-3xl md:text-4xl mb-2"
            style={{
              fontFamily: 'var(--font-display-family)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            Create your account
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold"
              style={{ color: 'var(--accent)' }}
            >
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
            <Input
              label="Full name"
              placeholder="Jane Doe"
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 6 characters"
              {...register('password')}
              error={errors.password?.message}
            />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                {...register('terms')}
                className="w-4 h-4"
                style={{ accentColor: 'var(--accent)' }}
              />
              <span>
                I agree to the{' '}
                <Link href="#" className="font-semibold" style={{ color: 'var(--accent)' }}>
                  terms
                </Link>{' '}
                and{' '}
                <Link href="#" className="font-semibold" style={{ color: 'var(--accent)' }}>
                  privacy policy
                </Link>
              </span>
            </label>
            {errors.terms && (
              <span className="text-xs text-red-500 ml-6 block">
                {errors.terms.message as string}
              </span>
            )}

            {serverError && <p className="text-sm text-red-500">{serverError}</p>}

            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              rightIcon={<ArrowRight size={16} />}
              style={{ background: 'var(--accent)' }}
            >
              {isSubmitting ? 'Creating account…' : 'Create account'}
            </Button>
          </form>
        </div>
      </div>

      <HeroPanel />
    </div>
  );
}
