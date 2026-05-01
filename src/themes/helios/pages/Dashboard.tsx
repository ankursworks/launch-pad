'use client';
import { useState } from 'react';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
} from '../components/Dropdown';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Progress } from '../components/Progress';
import { Select } from '../components/Select';
import { Skeleton } from '../components/Skeleton';
import { Stat } from '../components/Stat';
import { Switch } from '../components/Switch';
import { TBody, Table, Td, Th, THead, Tr } from '../components/Table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs';
import { Tooltip } from '../components/Tooltip';
import { useToast } from '../components/Toast';

export default function Dashboard() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <PageHeader />

      <Showcase id="avatar" title="Avatar" description="Image with letter fallback. Drives off any background color.">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar fallback="K" color="#475569" size={56} />
          <Avatar fallback="A" color="#F97316" size={48} />
          <Avatar fallback="L" color="#6366F1" size={40} />
          <Avatar fallback="N" color="#0F766E" size={32} />
          <Avatar fallback="S" color="#7C3AED" size={28} />
        </div>
      </Showcase>

      <Showcase id="badge" title="Badge" description="Compact status pills with semantic variants.">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Connected</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="danger">Error</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Showcase>

      <Showcase id="stat" title="Stat" description="KPI tile — label, value, optional delta.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Stat label="Active users" value="1,284" delta="+8.2% MoM" deltaTrend="up" />
          <Stat label="MRR" value="$12.4k" delta="-1.4% MoM" deltaTrend="down" />
          <Stat label="Churn" value="2.1%" delta="flat" deltaTrend="neutral" />
        </div>
      </Showcase>

      <Showcase id="progress" title="Progress" description="Linear progress bar with token-driven accent.">
        <div className="space-y-3 max-w-md">
          <Progress value={28} />
          <Progress value={62} />
          <Progress value={95} />
        </div>
      </Showcase>

      <Showcase id="skeleton" title="Skeleton" description="Loading placeholders for content shape.">
        <div className="max-w-md space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton width={48} height={48} rounded="lg" />
            <div className="flex-1 space-y-2">
              <Skeleton width="60%" />
              <Skeleton width="40%" height={12} />
            </div>
          </div>
          <Skeleton height={140} rounded="lg" />
        </div>
      </Showcase>

      <Showcase id="button" title="Button" description="Variants × sizes + icon + asChild.">
        <Card>
          <div className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>
            Variants
          </div>
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="social">Social</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="text-xs uppercase tracking-widest mt-6 mb-3" style={{ color: 'var(--muted)' }}>
            Sizes
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Card>
      </Showcase>

      <Showcase id="input" title="Input" description="Labeled input with optional uppercase + error states.">
        <Card>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
            <Input label="Standard" placeholder="Type here…" />
            <Input uppercaseLabel label="Uppercase label" placeholder="Helios spec" />
            <Input label="With error" placeholder="invalid" error="Required field" />
            <Input label="Disabled" placeholder="—" disabled />
          </div>
        </Card>
      </Showcase>

      <Showcase id="select" title="Select" description="Radix Select wrapped with theme tokens.">
        <Card>
          <SelectDemo />
        </Card>
      </Showcase>

      <Showcase id="checkbox" title="Checkbox" description="Radix Checkbox, vermilion when checked.">
        <Card>
          <div className="flex flex-col gap-3">
            <Checkbox label="Subscribe to product updates" defaultChecked />
            <Checkbox label="Send me weekly digests" />
            <Checkbox label="Disabled" disabled />
          </div>
        </Card>
      </Showcase>

      <Showcase id="switch" title="Switch" description="Two-state toggle.">
        <Card>
          <div className="flex flex-col gap-3">
            <Switch label="Auto-deploy on merge" defaultChecked />
            <Switch label="Pause notifications" />
            <Switch label="Disabled" disabled />
          </div>
        </Card>
      </Showcase>

      <Showcase id="modal" title="Modal" description="Radix Dialog with theme styling.">
        <Card>
          <ModalDemo />
        </Card>
      </Showcase>

      <Showcase id="dropdown" title="Dropdown" description="Radix DropdownMenu — items, label, separator.">
        <Card>
          <Dropdown>
            <DropdownTrigger asChild>
              <Button variant="ghost">Actions ▾</Button>
            </DropdownTrigger>
            <DropdownContent align="start">
              <DropdownLabel>My account</DropdownLabel>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownSeparator />
              <DropdownItem>Sign out</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </Card>
      </Showcase>

      <Showcase id="tooltip" title="Tooltip" description="Radix Tooltip on hover/focus.">
        <Card>
          <div className="flex flex-wrap gap-3">
            <Tooltip content="Save changes (⌘S)">
              <Button>Save</Button>
            </Tooltip>
            <Tooltip content="Discard everything" side="bottom">
              <Button variant="ghost">Discard</Button>
            </Tooltip>
          </div>
        </Card>
      </Showcase>

      <Showcase id="toast" title="Toast" description="Queue-driven notifications via useToast().">
        <Card>
          <ToastDemo />
        </Card>
      </Showcase>

      <Showcase id="tabs" title="Tabs" description="Radix Tabs with vermilion active indicator.">
        <Card>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                High-level summary of the workspace.
              </p>
            </TabsContent>
            <TabsContent value="activity">
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                Recent events and audit log.
              </p>
            </TabsContent>
            <TabsContent value="settings">
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                Workspace preferences.
              </p>
            </TabsContent>
          </Tabs>
        </Card>
      </Showcase>

      <Showcase id="card" title="Card" description="Surface container with optional display-font title.">
        <div className="grid md:grid-cols-3 gap-4">
          <Card title="Cream canvas">
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Warm off-white with white surfaces and soft borders.
            </p>
          </Card>
          <Card title="Vermilion accent">
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              <span style={{ color: 'var(--accent)' }}>Accent color</span> reserved for highlights.
            </p>
          </Card>
          <Card title="Editorial type">
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              DM Serif Display headings + Inter body.
            </p>
          </Card>
        </div>
      </Showcase>

      <Showcase id="table" title="Table" description="Themed table with header surface, row dividers.">
        <Table>
          <THead>
            <Tr>
              <Th>User</Th>
              <Th>Email</Th>
              <Th>Plan</Th>
              <Th className="text-right">Status</Th>
            </Tr>
          </THead>
          <TBody>
            {[
              { name: 'Alena Runton', email: 'alena@yourco.com', plan: 'Pro', status: 'Active' },
              { name: 'Cabsa Alex', email: 'cabsa@yourco.com', plan: 'Free', status: 'Active' },
              { name: 'Wood Fangs', email: 'wood@yourco.com', plan: 'Free', status: 'Pending' },
            ].map((u) => (
              <Tr key={u.email}>
                <Td>
                  <div className="flex items-center gap-2">
                    <Avatar fallback={u.name.charAt(0)} color="var(--accent)" size={28} />
                    <span className="font-medium">{u.name}</span>
                  </div>
                </Td>
                <Td style={{ color: 'var(--muted)' }}>{u.email}</Td>
                <Td>
                  <Badge variant={u.plan === 'Pro' ? 'accent' : 'outline'}>{u.plan}</Badge>
                </Td>
                <Td className="text-right">
                  <Badge variant={u.status === 'Active' ? 'success' : 'warning'}>
                    {u.status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </Showcase>
    </div>
  );
}

/* ---------- helpers ---------- */

function PageHeader() {
  return (
    <header
      className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b"
      style={{ borderColor: 'var(--border)' }}
    >
      <div>
        <p
          className="text-xs uppercase tracking-[0.3em] font-semibold mb-2"
          style={{ color: 'var(--accent)' }}
        >
          Components
        </p>
        <h1
          className="text-3xl md:text-5xl font-normal leading-tight"
          style={{ fontFamily: 'var(--font-display-family)' }}
        >
          Component library
        </h1>
        <p className="text-sm md:text-base mt-2 max-w-2xl" style={{ color: 'var(--muted)' }}>
          Every primitive available out of the box. Pick from the sidebar to jump
          to any component — what you see is what your app gets.
        </p>
      </div>
      <Badge variant="accent">v0.1 · 17 components</Badge>
    </header>
  );
}

function Showcase({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} style={{ scrollMarginTop: 24 }}>
      <header className="mb-4">
        <h2
          className="text-2xl md:text-3xl font-normal"
          style={{ fontFamily: 'var(--font-display-family)' }}
        >
          {title}
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          {description}
        </p>
      </header>
      <div>{children}</div>
    </section>
  );
}

function SelectDemo() {
  const [value, setValue] = useState<string | undefined>();
  return (
    <div className="max-w-sm">
      <Select
        label="Plan"
        placeholder="Choose a plan"
        value={value}
        onValueChange={setValue}
        options={[
          { value: 'free', label: 'Free' },
          { value: 'pro', label: 'Pro' },
          { value: 'team', label: 'Team' },
          { value: 'enterprise', label: 'Enterprise' },
        ]}
      />
      {value && (
        <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
          Selected: <code className="font-mono">{value}</code>
        </p>
      )}
    </div>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Edit profile"
        description="Update your account details."
      >
        <div className="flex flex-col gap-3">
          <Input label="Name" defaultValue="Kevin de Bruyne" />
          <Input label="Email" defaultValue="kevin@yourco.com" />
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

function ToastDemo() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() =>
          toast({
            title: 'Settings saved',
            description: 'Your changes have been applied.',
            variant: 'success',
          })
        }
      >
        Show success
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast({
            title: 'Couldn’t save',
            description: 'Check the network and try again.',
            variant: 'error',
          })
        }
      >
        Show error
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast({
            title: 'New activity',
            description: '3 new events in your inbox.',
          })
        }
      >
        Show default
      </Button>
    </div>
  );
}
