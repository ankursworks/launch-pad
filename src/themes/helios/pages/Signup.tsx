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
  name: z.string().min(2, 'Name too short'),
  username: z
    .string()
    .min(2, 'Username too short')
    .regex(/^@?[a-zA-Z0-9_]+$/, 'Letters, numbers and underscores only'),
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
        username: data.username.replace(/^@/, ''),
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
      className="grid md:grid-cols-2 overflow-hidden border shadow-sm"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        borderRadius: 'var(--card-radius)',
      }}
    >
      {/* Left: form */}
      <div className="p-8 md:p-12">
        <h1
          className="text-4xl md:text-5xl font-normal"
          style={{ fontFamily: 'var(--font-display-family)' }}
        >
          Sign up
        </h1>
        <p className="text-sm mt-2">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold underline">
            Sign in
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              uppercaseLabel
              label="Name"
              placeholder="Enter Your Name"
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              uppercaseLabel
              label="Username"
              placeholder="@username"
              {...register('username')}
              error={errors.username?.message}
            />
          </div>
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
            autoComplete="new-password"
            placeholder="Password"
            {...register('password')}
            error={errors.password?.message}
          />

          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                {...register('terms')}
                className="w-4 h-4 rounded-full"
                style={{ accentColor: 'var(--primary)' }}
              />
              <span>
                I accept the{' '}
                <Link href="#" className="underline">
                  term and conditions
                </Link>
              </span>
            </label>
            {errors.terms && (
              <span className="text-xs text-red-500 ml-6">
                {errors.terms.message as string}
              </span>
            )}
          </div>

          {serverError && <p className="text-sm text-red-500">{serverError}</p>}

          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Registering…' : 'Register'}
          </Button>
        </form>
      </div>

      {/* Right: illustration */}
      <IllustrationPanel />
    </div>
  );
}
