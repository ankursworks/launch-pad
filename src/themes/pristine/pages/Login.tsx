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
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'At least 6 characters'),
  remember: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

export default function Login() {
  const { login } = useAuth();
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
      await login(data.email, data.password);
      router.push('/dashboard');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Login failed');
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
            Welcome back
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold"
              style={{ color: 'var(--accent)' }}
            >
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
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
              autoComplete="current-password"
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('remember')}
                  className="w-4 h-4"
                  style={{ accentColor: 'var(--accent)' }}
                />
                <span>Remember me</span>
              </label>
              <Link
                href="#"
                className="font-semibold"
                style={{ color: 'var(--accent)' }}
              >
                Forgot password?
              </Link>
            </div>

            {serverError && <p className="text-sm text-red-500">{serverError}</p>}

            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              rightIcon={<ArrowRight size={16} />}
              style={{ background: 'var(--accent)' }}
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>

      <HeroPanel />
    </div>
  );
}
