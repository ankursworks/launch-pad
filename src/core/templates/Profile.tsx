'use client';
import { useState } from 'react';
import { Camera, Mail, User as UserIcon } from 'lucide-react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  Modal,
  useToast,
} from '@/themes/active';
import { useAuth } from '@/core/auth';
import { useDisclosure } from '@/core/hooks';
import { PageHeader } from './PageHeader';

export default function Profile() {
  const { user } = useAuth();
  const editor = useDisclosure();
  const toast = useToast();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');

  const onSave = () => {
    toast({
      title: 'Profile updated',
      description: 'Changes were saved (demo only).',
      variant: 'success',
    });
    editor.onClose();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description="Manage how your name, email, and avatar appear across the workspace."
        actions={<Button onClick={editor.onOpen}>Edit profile</Button>}
      />

      <Card>
        <div className="flex items-start gap-5">
          <div className="relative">
            <Avatar fallback={user?.name?.charAt(0) ?? 'U'} color="var(--accent)" size={72} />
            <button
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border shadow-sm"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
              aria-label="Change avatar"
            >
              <Camera size={14} />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2
                className="text-2xl font-normal"
                style={{ fontFamily: 'var(--font-display-family)' }}
              >
                {user?.name}
              </h2>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
              <Field icon={<UserIcon size={14} />} label="Username">
                {user?.username ?? user?.name?.toLowerCase().replace(/\s+/g, '')}
              </Field>
              <Field icon={<Mail size={14} />} label="Email">
                {user?.email}
              </Field>
            </div>
          </div>
        </div>
      </Card>

      <Modal
        open={editor.open}
        onOpenChange={editor.setOpen}
        title="Edit profile"
        description="Update your account information."
      >
        <div className="flex flex-col gap-3">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="ghost" onClick={editor.onClose}>
              Cancel
            </Button>
            <Button onClick={onSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold"
        style={{ color: 'var(--muted)' }}
      >
        {icon}
        {label}
      </div>
      <div className="mt-1">{children}</div>
    </div>
  );
}
