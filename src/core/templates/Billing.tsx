'use client';
import { CheckCircle2, Download, Sparkles } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  Progress,
  Stat,
  TBody,
  THead,
  Table,
  Td,
  Th,
  Tr,
  useToast,
} from '@/themes/active';
import { PageHeader } from './PageHeader';

interface PlanFeature {
  name: string;
  free: boolean;
  pro: boolean;
  team: boolean;
}

const features: PlanFeature[] = [
  { name: 'Unlimited projects', free: true, pro: true, team: true },
  { name: 'Theme switcher', free: true, pro: true, team: true },
  { name: 'Custom themes', free: false, pro: true, team: true },
  { name: 'Team collaboration', free: false, pro: false, team: true },
  { name: 'Priority support', free: false, pro: true, team: true },
  { name: 'SSO + audit log', free: false, pro: false, team: true },
];

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Pending';
}

const invoices: Invoice[] = [
  { id: 'INV-1042', date: 'Apr 1, 2026', amount: '$29.00', status: 'Paid' },
  { id: 'INV-1031', date: 'Mar 1, 2026', amount: '$29.00', status: 'Paid' },
  { id: 'INV-1019', date: 'Feb 1, 2026', amount: '$29.00', status: 'Paid' },
  { id: 'INV-1007', date: 'Jan 1, 2026', amount: '$29.00', status: 'Paid' },
];

export default function Billing() {
  const toast = useToast();

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <PageHeader
        eyebrow="Account"
        title="Billing"
        description="Plan, usage, and invoices."
        actions={
          <Button variant="ghost" leftIcon={<Download size={14} />}>
            Export
          </Button>
        }
      />

      {/* Current plan */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3
                className="text-2xl font-normal"
                style={{ fontFamily: 'var(--font-display-family)' }}
              >
                Pro plan
              </h3>
              <Badge variant="accent">Current</Badge>
            </div>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
              $29/month · renews May 1, 2026
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost">Cancel plan</Button>
            <Button leftIcon={<Sparkles size={14} />}>Upgrade to Team</Button>
          </div>
        </div>
      </Card>

      {/* Usage stats */}
      <section>
        <h2
          className="text-lg font-normal mb-3"
          style={{ fontFamily: 'var(--font-display-family)' }}
        >
          Usage this cycle
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <UsageStat label="Projects" used={12} limit={50} unit="" />
          <UsageStat label="Storage" used={3.2} limit={20} unit="GB" />
          <UsageStat label="Seats" used={4} limit={10} unit="" />
        </div>
      </section>

      {/* Plan comparison */}
      <section>
        <h2
          className="text-lg font-normal mb-3"
          style={{ fontFamily: 'var(--font-display-family)' }}
        >
          Compare plans
        </h2>
        <Table>
          <THead>
            <Tr>
              <Th>Feature</Th>
              <Th className="text-center">Free</Th>
              <Th className="text-center">Pro</Th>
              <Th className="text-center">Team</Th>
            </Tr>
          </THead>
          <TBody>
            {features.map((f) => (
              <Tr key={f.name}>
                <Td className="font-medium">{f.name}</Td>
                <Td className="text-center">{f.free ? <Check /> : <Dash />}</Td>
                <Td className="text-center">{f.pro ? <Check /> : <Dash />}</Td>
                <Td className="text-center">{f.team ? <Check /> : <Dash />}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </section>

      {/* Invoices */}
      <section>
        <h2
          className="text-lg font-normal mb-3"
          style={{ fontFamily: 'var(--font-display-family)' }}
        >
          Invoices
        </h2>
        <Table>
          <THead>
            <Tr>
              <Th>Invoice</Th>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th className="text-right">Action</Th>
            </Tr>
          </THead>
          <TBody>
            {invoices.map((i) => (
              <Tr key={i.id}>
                <Td className="font-mono text-sm">{i.id}</Td>
                <Td style={{ color: 'var(--muted)' }}>{i.date}</Td>
                <Td className="font-medium">{i.amount}</Td>
                <Td>
                  <Badge variant={i.status === 'Paid' ? 'success' : 'warning'}>
                    {i.status}
                  </Badge>
                </Td>
                <Td className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      toast({
                        title: `${i.id} downloaded`,
                        variant: 'success',
                      })
                    }
                  >
                    Download
                  </Button>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </section>
    </div>
  );
}

function UsageStat({
  label,
  used,
  limit,
  unit,
}: {
  label: string;
  used: number;
  limit: number;
  unit: string;
}) {
  const pct = (used / limit) * 100;
  return (
    <Card>
      <div
        className="text-xs uppercase tracking-widest font-semibold"
        style={{ color: 'var(--muted)' }}
      >
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span
          className="text-3xl"
          style={{ fontFamily: 'var(--font-display-family)' }}
        >
          {used}
          {unit}
        </span>
        <span className="text-sm" style={{ color: 'var(--muted)' }}>
          / {limit}
          {unit}
        </span>
      </div>
      <Progress className="mt-3" value={used} max={limit} />
    </Card>
  );
}

function Check() {
  return <CheckCircle2 size={16} className="inline" style={{ color: 'var(--accent)' }} />;
}

function Dash() {
  return (
    <span style={{ color: 'var(--muted)' }} aria-label="Not included">
      —
    </span>
  );
}
