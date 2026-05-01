'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/core/auth';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { IllustrationPanel } from '../components/IllustrationPanel';

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
      className="grid md:grid-cols-2 overflow-hidden border shadow-sm"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        borderRadius: 'var(--card-radius)',
      }}
    >
      <div className="p-8 md:p-12">
        <div className="max-w-sm mx-auto">
          <h1
            className="text-4xl md:text-5xl font-normal text-center"
            style={{ fontFamily: 'var(--font-display-family)' }}
          >
            Sign in
          </h1>
          <p className="text-sm text-center mt-2">
            Don&apos;t have an account yet?{' '}
            <Link href="/signup" className="font-semibold underline">
              Register here
            </Link>
          </p>

          <div className="mt-8 space-y-3">
            <Button variant="social" fullWidth leftIcon={<GoogleIcon />}>
              Continue with Google
            </Button>
            <Button variant="social" fullWidth leftIcon={<AppleIcon />}>
              Continue with Apple
            </Button>
          </div>

          <div
            className="flex items-center gap-4 my-6 text-xs tracking-widest"
            style={{ color: 'var(--muted)' }}
          >
            <span className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            OR
            <span className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              uppercaseLabel
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              uppercaseLabel
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              {...register('password')}
              error={errors.password?.message}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                {...register('remember')}
                className="w-4 h-4"
                style={{ accentColor: 'var(--primary)' }}
              />
              <span>Remember me</span>
            </label>

            {serverError && <p className="text-sm text-red-500">{serverError}</p>}

            <Button type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>

      <IllustrationPanel />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.86-3.08.43-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.43C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
