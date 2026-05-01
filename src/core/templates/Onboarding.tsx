'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import {
  Button,
  Card,
  Checkbox,
  Input,
  Select,
  useToast,
} from '@/themes/active';

interface OnboardingData {
  workspace: string;
  size: string;
  goal: string;
  invites: string;
  agree: boolean;
}

const steps = ['Workspace', 'Team', 'Goals', 'Done'] as const;

export default function Onboarding() {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    workspace: '',
    size: '',
    goal: '',
    invites: '',
    agree: false,
  });

  const update = <K extends keyof OnboardingData>(k: K, v: OnboardingData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const finish = () => {
    toast({ title: 'Workspace ready', variant: 'success' });
    router.push('/dashboard');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: 'var(--bg)' }}
    >
      <div className="w-full max-w-xl">
        <Stepper step={step} />
        <Card className="mt-6">
          {step === 0 && <WorkspaceStep data={data} update={update} />}
          {step === 1 && <TeamStep data={data} update={update} />}
          {step === 2 && <GoalsStep data={data} update={update} />}
          {step === 3 && <DoneStep />}

          <div
            className="flex justify-between gap-2 mt-8 pt-4 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <Button variant="ghost" onClick={back} disabled={step === 0}>
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={next} rightIcon={<ArrowRight size={14} />}>
                Continue
              </Button>
            ) : (
              <Button onClick={finish}>Go to dashboard</Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2 flex-1">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors"
            style={{
              background: i <= step ? 'var(--primary)' : 'var(--border)',
              color: i <= step ? 'var(--primary-contrast)' : 'var(--muted)',
            }}
          >
            {i < step ? <Check size={14} /> : i + 1}
          </div>
          <span
            className="text-xs font-semibold"
            style={{ color: i <= step ? 'var(--text)' : 'var(--muted)' }}
          >
            {label}
          </span>
          {i < steps.length - 1 && (
            <div
              className="flex-1 h-px"
              style={{ background: i < step ? 'var(--primary)' : 'var(--border)' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function WorkspaceStep({
  data,
  update,
}: {
  data: OnboardingData;
  update: <K extends keyof OnboardingData>(k: K, v: OnboardingData[K]) => void;
}) {
  return (
    <>
      <h2
        className="text-2xl font-normal mb-1"
        style={{ fontFamily: 'var(--font-display-family)' }}
      >
        Name your workspace
      </h2>
      <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
        Use your company or team name. You can change it later.
      </p>
      <Input
        label="Workspace name"
        placeholder="Acme Inc."
        value={data.workspace}
        onChange={(e) => update('workspace', e.target.value)}
      />
    </>
  );
}

function TeamStep({
  data,
  update,
}: {
  data: OnboardingData;
  update: <K extends keyof OnboardingData>(k: K, v: OnboardingData[K]) => void;
}) {
  return (
    <>
      <h2
        className="text-2xl font-normal mb-1"
        style={{ fontFamily: 'var(--font-display-family)' }}
      >
        How big is your team?
      </h2>
      <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
        We&apos;ll tailor the workspace to your size.
      </p>
      <div className="flex flex-col gap-4">
        <Select
          label="Team size"
          placeholder="Select…"
          value={data.size}
          onValueChange={(v) => update('size', v)}
          options={[
            { value: 'just-me', label: 'Just me' },
            { value: '2-10', label: '2–10' },
            { value: '11-50', label: '11–50' },
            { value: '51-200', label: '51–200' },
            { value: '200+', label: '200+' },
          ]}
        />
        <Input
          label="Invite teammates (optional)"
          placeholder="alice@acme.com, bob@acme.com"
          value={data.invites}
          onChange={(e) => update('invites', e.target.value)}
        />
      </div>
    </>
  );
}

function GoalsStep({
  data,
  update,
}: {
  data: OnboardingData;
  update: <K extends keyof OnboardingData>(k: K, v: OnboardingData[K]) => void;
}) {
  const goals = [
    { id: 'launch', label: 'Launch a new product' },
    { id: 'collaborate', label: 'Collaborate with my team' },
    { id: 'integrate', label: 'Integrate with existing tools' },
    { id: 'explore', label: 'Just exploring' },
  ];
  return (
    <>
      <h2
        className="text-2xl font-normal mb-1"
        style={{ fontFamily: 'var(--font-display-family)' }}
      >
        What brings you here?
      </h2>
      <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
        Pick the option that fits best.
      </p>
      <div className="flex flex-col gap-2">
        {goals.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => update('goal', g.id)}
            className="flex items-center justify-between gap-2 px-4 py-3 border text-left text-sm transition-colors"
            style={{
              borderColor:
                data.goal === g.id ? 'var(--accent)' : 'var(--border)',
              background:
                data.goal === g.id
                  ? 'color-mix(in srgb, var(--accent) 8%, transparent)'
                  : 'var(--surface)',
              borderRadius: 'var(--card-radius)',
              fontWeight: data.goal === g.id ? 600 : 400,
            }}
          >
            {g.label}
            {data.goal === g.id && <Check size={16} style={{ color: 'var(--accent)' }} />}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <Checkbox
          label="I agree to the terms of service and privacy policy"
          checked={data.agree}
          onCheckedChange={(v) => update('agree', v === true)}
        />
      </div>
    </>
  );
}

function DoneStep() {
  return (
    <div className="text-center py-6">
      <div
        className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
        style={{
          background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
          color: 'var(--accent)',
        }}
      >
        <Check size={28} />
      </div>
      <h2
        className="text-2xl font-normal mb-1"
        style={{ fontFamily: 'var(--font-display-family)' }}
      >
        You&apos;re all set
      </h2>
      <p className="text-sm" style={{ color: 'var(--muted)' }}>
        Your workspace is ready. Jump in and explore.
      </p>
    </div>
  );
}
