'use client';
import { useState } from 'react';
import {
  Bell,
  Globe,
  KeyRound,
  Lock,
  Shield,
  User as UserIcon,
} from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  Input,
  Select,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useToast,
} from '@/themes/active';
import { useAuth } from '@/core/auth';
import { PageHeader } from './PageHeader';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Configure your account, notifications, security, and locale."
      />

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="locale">Locale</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralPanel />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsPanel />
        </TabsContent>
        <TabsContent value="security">
          <SecurityPanel />
        </TabsContent>
        <TabsContent value="locale">
          <LocalePanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ---------- panels ---------- */

function GeneralPanel() {
  const { user } = useAuth();
  const toast = useToast();
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [workspace, setWorkspace] = useState('LaunchPad');

  const onSave = () => {
    toast({ title: 'Settings saved', variant: 'success' });
  };

  return (
    <Section icon={<UserIcon size={16} />} title="Account" description="Your name, email, and workspace identity.">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input
          label="Workspace name"
          value={workspace}
          onChange={(e) => setWorkspace(e.target.value)}
          className="sm:col-span-2"
        />
      </div>
      <FormActions onSave={onSave} />
    </Section>
  );
}

function NotificationsPanel() {
  const toast = useToast();
  const [email, setEmail] = useState(true);
  const [product, setProduct] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <Section
      icon={<Bell size={16} />}
      title="Notifications"
      description="Choose what you want delivered to your inbox."
    >
      <ul className="divide-y" style={{ borderColor: 'var(--border)' }}>
        <Toggle
          label="Email notifications"
          description="Account activity and security alerts."
          checked={email}
          onChange={setEmail}
        />
        <Toggle
          label="Product updates"
          description="New features, releases, and changelogs."
          checked={product}
          onChange={setProduct}
        />
        <Toggle
          label="Weekly digest"
          description="A Monday summary of your workspace activity."
          checked={weekly}
          onChange={setWeekly}
        />
        <Toggle
          label="Marketing"
          description="Tips, surveys, and the occasional newsletter."
          checked={marketing}
          onChange={setMarketing}
        />
      </ul>
      <FormActions
        onSave={() => toast({ title: 'Preferences saved', variant: 'success' })}
      />
    </Section>
  );
}

function SecurityPanel() {
  const toast = useToast();
  const [twoFA, setTwoFA] = useState(false);

  return (
    <Section
      icon={<Shield size={16} />}
      title="Security"
      description="Protect your account with strong authentication."
    >
      <div className="space-y-6">
        <Card className="!p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Lock size={14} />
                <span className="font-semibold text-sm">Password</span>
              </div>
              <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                Last changed 23 days ago.
              </p>
            </div>
            <Button variant="ghost" size="sm">
              Change
            </Button>
          </div>
        </Card>

        <Card className="!p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <KeyRound size={14} />
                <span className="font-semibold text-sm">Two-factor authentication</span>
                {twoFA && <Badge variant="success">On</Badge>}
              </div>
              <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                Add a second step using an authenticator app.
              </p>
            </div>
            <Switch
              checked={twoFA}
              onCheckedChange={(v) => {
                setTwoFA(v);
                toast({
                  title: v ? '2FA enabled' : '2FA disabled',
                  variant: v ? 'success' : 'default',
                });
              }}
            />
          </div>
        </Card>
      </div>
    </Section>
  );
}

function LocalePanel() {
  const toast = useToast();
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC+0');

  return (
    <Section
      icon={<Globe size={16} />}
      title="Locale"
      description="Language and timezone preferences."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Select
          label="Language"
          value={language}
          onValueChange={setLanguage}
          options={[
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Español' },
            { value: 'fr', label: 'Français' },
            { value: 'de', label: 'Deutsch' },
            { value: 'ja', label: '日本語' },
          ]}
        />
        <Select
          label="Timezone"
          value={timezone}
          onValueChange={setTimezone}
          options={[
            { value: 'UTC-8', label: 'Pacific (UTC-8)' },
            { value: 'UTC-5', label: 'Eastern (UTC-5)' },
            { value: 'UTC+0', label: 'UTC' },
            { value: 'UTC+1', label: 'Central Europe (UTC+1)' },
            { value: 'UTC+5:30', label: 'India (UTC+5:30)' },
            { value: 'UTC+9', label: 'Japan (UTC+9)' },
          ]}
        />
      </div>
      <FormActions
        onSave={() => toast({ title: 'Locale saved', variant: 'success' })}
      />
    </Section>
  );
}

/* ---------- helpers ---------- */

function Section({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="mt-6">
      <div className="flex items-start gap-3 mb-5 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'var(--bg)', color: 'var(--text)' }}
        >
          {icon}
        </div>
        <div>
          <h3
            className="text-lg font-normal"
            style={{ fontFamily: 'var(--font-display-family)' }}
          >
            {title}
          </h3>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            {description}
          </p>
        </div>
      </div>
      {children}
    </Card>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <li className="flex items-start justify-between gap-4 py-4">
      <div className="min-w-0">
        <div className="font-semibold text-sm">{label}</div>
        <div className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
          {description}
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </li>
  );
}

function FormActions({ onSave }: { onSave: () => void }) {
  return (
    <div
      className="flex justify-end gap-2 mt-6 pt-4 border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <Button variant="ghost">Discard</Button>
      <Button onClick={onSave}>Save changes</Button>
    </div>
  );
}
