'use client';
import { useMemo, useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
  Input,
  Modal,
  Select,
  TBody,
  THead,
  Table,
  Td,
  Th,
  Tr,
  useToast,
} from '@/themes/active';
import { useDebounce, useDisclosure } from '@/core/hooks';
import { PageHeader } from './PageHeader';

type Role = 'Owner' | 'Admin' | 'Member' | 'Viewer';
type Status = 'Active' | 'Pending' | 'Disabled';

interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  color: string;
}

const seed: Member[] = [
  { id: '1', name: 'Kevin de Bruyne', email: 'kevin@yourco.com', role: 'Owner', status: 'Active', color: '#475569' },
  { id: '2', name: 'Alena Runton', email: 'alena@yourco.com', role: 'Admin', status: 'Active', color: '#F97316' },
  { id: '3', name: 'Cabsa Alex', email: 'cabsa@yourco.com', role: 'Member', status: 'Active', color: '#6366F1' },
  { id: '4', name: 'Wood Fangs', email: 'wood@yourco.com', role: 'Member', status: 'Pending', color: '#0F766E' },
  { id: '5', name: 'Jamie Park', email: 'jamie@yourco.com', role: 'Viewer', status: 'Disabled', color: '#7C3AED' },
];

export default function Team() {
  const [members, setMembers] = useState(seed);
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 200);
  const invite = useDisclosure();
  const toast = useToast();

  const filtered = useMemo(() => {
    const q = debounced.toLowerCase();
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q)
    );
  }, [members, debounced]);

  const onInvite = (email: string, role: Role) => {
    const id = String(Date.now());
    setMembers((m) => [
      ...m,
      {
        id,
        name: email.split('@')[0],
        email,
        role,
        status: 'Pending',
        color: '#F97316',
      },
    ]);
    invite.onClose();
    toast({
      title: 'Invitation sent',
      description: `${email} invited as ${role}.`,
      variant: 'success',
    });
  };

  const onRemove = (id: string) => {
    setMembers((m) => m.filter((x) => x.id !== id));
    toast({ title: 'Member removed', variant: 'default' });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        eyebrow="Workspace"
        title="Team"
        description="Invite, manage, and remove people from your workspace."
        actions={
          <Button onClick={invite.onOpen} leftIcon={<UserPlus size={14} />}>
            Invite member
          </Button>
        }
      />

      <div className="mb-4 max-w-sm">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--muted)' }}
          />
          <Input
            placeholder="Search members…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingLeft: '2rem' }}
          />
        </div>
      </div>

      <Table>
        <THead>
          <Tr>
            <Th>Member</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th className="text-right">Actions</Th>
          </Tr>
        </THead>
        <TBody>
          {filtered.map((m) => (
            <Tr key={m.id}>
              <Td>
                <div className="flex items-center gap-3">
                  <Avatar fallback={m.name.charAt(0)} color={m.color} size={32} />
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{m.name}</div>
                    <div className="text-xs truncate" style={{ color: 'var(--muted)' }}>
                      {m.email}
                    </div>
                  </div>
                </div>
              </Td>
              <Td>
                <Badge variant={m.role === 'Owner' ? 'accent' : 'outline'}>{m.role}</Badge>
              </Td>
              <Td>
                <Badge
                  variant={
                    m.status === 'Active'
                      ? 'success'
                      : m.status === 'Pending'
                      ? 'warning'
                      : 'danger'
                  }
                >
                  {m.status}
                </Badge>
              </Td>
              <Td className="text-right">
                <Dropdown>
                  <DropdownTrigger asChild>
                    <Button variant="ghost" size="sm">
                      …
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent align="end">
                    <DropdownItem>View profile</DropdownItem>
                    <DropdownItem>Change role</DropdownItem>
                    <DropdownSeparator />
                    <DropdownItem
                      onSelect={() => onRemove(m.id)}
                      style={{ color: '#BE123C' }}
                    >
                      Remove from workspace
                    </DropdownItem>
                  </DropdownContent>
                </Dropdown>
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>

      <InviteModal
        open={invite.open}
        onOpenChange={invite.setOpen}
        onSubmit={onInvite}
      />
    </div>
  );
}

function InviteModal({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSubmit: (email: string, role: Role) => void;
}) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('Member');

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Invite member"
      description="They'll receive an email to join the workspace."
    >
      <div className="flex flex-col gap-3">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="someone@yourco.com"
        />
        <Select
          label="Role"
          value={role}
          onValueChange={(v) => setRole(v as Role)}
          options={[
            { value: 'Admin', label: 'Admin — manage team and billing' },
            { value: 'Member', label: 'Member — full project access' },
            { value: 'Viewer', label: 'Viewer — read-only' },
          ]}
        />
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => email && onSubmit(email, role)}>Send invite</Button>
        </div>
      </div>
    </Modal>
  );
}
