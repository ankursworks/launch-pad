'use client';
import { useEffect, useMemo, useState } from 'react';
import { create } from 'zustand';
import { FolderPlus, Pencil, Search, Trash2 } from 'lucide-react';
import {
  Badge,
  Button,
  EmptyState,
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

/**
 * In-memory CRUD example. Demonstrates:
 *   • Zustand store as the data layer (replaceable with API client + react-query)
 *   • List + search/filter
 *   • Create / edit modal pattern
 *   • Optimistic delete with toast confirmation
 */

type ProjectStatus = 'Active' | 'Paused' | 'Archived';

interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  createdAt: string;
}

interface ProjectStore {
  items: Project[];
  add: (p: Omit<Project, 'id' | 'createdAt'>) => void;
  update: (id: string, p: Partial<Project>) => void;
  remove: (id: string) => void;
}

const useProjects = create<ProjectStore>((set) => ({
  items: [
    {
      id: '1',
      name: 'Helios theme rollout',
      client: 'Internal',
      status: 'Active',
      createdAt: '2026-04-12',
    },
    {
      id: '2',
      name: 'Onboarding redesign',
      client: 'Acme Inc.',
      status: 'Active',
      createdAt: '2026-04-08',
    },
    {
      id: '3',
      name: 'Q1 audit log',
      client: 'Internal',
      status: 'Archived',
      createdAt: '2026-02-01',
    },
  ],
  add: (p) =>
    set((s) => ({
      items: [
        ...s.items,
        { ...p, id: crypto.randomUUID(), createdAt: new Date().toISOString().slice(0, 10) },
      ],
    })),
  update: (id, p) =>
    set((s) => ({
      items: s.items.map((x) => (x.id === id ? { ...x, ...p } : x)),
    })),
  remove: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),
}));

export default function Projects() {
  const items = useProjects((s) => s.items);
  const remove = useProjects((s) => s.remove);
  const toast = useToast();

  const [editing, setEditing] = useState<Project | null>(null);
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 200);
  const editor = useDisclosure();

  const filtered = useMemo(() => {
    const q = debounced.toLowerCase();
    return items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q)
    );
  }, [items, debounced]);

  const onNew = () => {
    setEditing(null);
    editor.onOpen();
  };

  const onEdit = (p: Project) => {
    setEditing(p);
    editor.onOpen();
  };

  const onDelete = (p: Project) => {
    remove(p.id);
    toast({
      title: 'Project deleted',
      description: p.name,
      variant: 'default',
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        eyebrow="CRUD example"
        title="Projects"
        description="A working create/read/update/delete example backed by an in-memory Zustand store. Swap with a real API by replacing the store implementation."
        actions={
          <Button onClick={onNew} leftIcon={<FolderPlus size={14} />}>
            New project
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
            placeholder="Search projects…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingLeft: '2rem' }}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<FolderPlus size={20} />}
          title={items.length === 0 ? 'No projects yet' : 'No matches'}
          description={
            items.length === 0
              ? 'Create your first project to see it here.'
              : 'Try a different search term.'
          }
          action={
            items.length === 0 ? (
              <Button onClick={onNew} leftIcon={<FolderPlus size={14} />}>
                New project
              </Button>
            ) : undefined
          }
        />
      ) : (
        <Table>
          <THead>
            <Tr>
              <Th>Name</Th>
              <Th>Client</Th>
              <Th>Status</Th>
              <Th>Created</Th>
              <Th className="text-right">Actions</Th>
            </Tr>
          </THead>
          <TBody>
            {filtered.map((p) => (
              <Tr key={p.id}>
                <Td className="font-medium">{p.name}</Td>
                <Td style={{ color: 'var(--muted)' }}>{p.client}</Td>
                <Td>
                  <Badge
                    variant={
                      p.status === 'Active'
                        ? 'success'
                        : p.status === 'Paused'
                        ? 'warning'
                        : 'outline'
                    }
                  >
                    {p.status}
                  </Badge>
                </Td>
                <Td className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
                  {p.createdAt}
                </Td>
                <Td className="text-right">
                  <div className="inline-flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Pencil size={12} />}
                      onClick={() => onEdit(p)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Trash2 size={12} />}
                      onClick={() => onDelete(p)}
                    >
                      Delete
                    </Button>
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      )}

      <ProjectEditor
        open={editor.open}
        onOpenChange={editor.setOpen}
        editing={editing}
      />
    </div>
  );
}

function ProjectEditor({
  open,
  onOpenChange,
  editing,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  editing: Project | null;
}) {
  const add = useProjects((s) => s.add);
  const update = useProjects((s) => s.update);
  const toast = useToast();

  const [name, setName] = useState(editing?.name ?? '');
  const [client, setClient] = useState(editing?.client ?? '');
  const [status, setStatus] = useState<ProjectStatus>(editing?.status ?? 'Active');

  useEffect(() => {
    if (!open) return;
    setName(editing?.name ?? '');
    setClient(editing?.client ?? '');
    setStatus(editing?.status ?? 'Active');
  }, [open, editing]);

  const onSubmit = () => {
    if (!name.trim()) return;
    if (editing) {
      update(editing.id, { name, client, status });
      toast({ title: 'Project updated', variant: 'success' });
    } else {
      add({ name, client: client || 'Internal', status });
      toast({ title: 'Project created', variant: 'success' });
    }
    onOpenChange(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={editing ? 'Edit project' : 'New project'}
      description={
        editing
          ? 'Update the details for this project.'
          : 'Set up a new project for your workspace.'
      }
    >
      <div className="flex flex-col gap-3">
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Helios theme rollout"
        />
        <Input
          label="Client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          placeholder="Acme Inc."
        />
        <Select
          label="Status"
          value={status}
          onValueChange={(v) => setStatus(v as ProjectStatus)}
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Paused', label: 'Paused' },
            { value: 'Archived', label: 'Archived' },
          ]}
        />
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>{editing ? 'Save' : 'Create'}</Button>
        </div>
      </div>
    </Modal>
  );
}

