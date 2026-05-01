import { tokenStorage } from '@/core/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export class ApiError extends Error {
  status: number;
  body?: unknown;
  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

interface ApiOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  /** Skip attaching the auth token. */
  noAuth?: boolean;
}

/**
 * Thin fetch wrapper with auth headers + JSON serialisation + error envelope.
 *
 *   await api<User>('/me');
 *   await api<Project>('/projects', { method: 'POST', body: { name: 'X' } });
 */
export async function api<T = unknown>(
  path: string,
  { body, noAuth, headers, ...rest }: ApiOptions = {}
): Promise<T> {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  const finalHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...(body !== undefined && { 'Content-Type': 'application/json' }),
    ...(headers as Record<string, string> | undefined),
  };

  if (!noAuth) {
    const token = tokenStorage.get();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...rest,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get('content-type') ?? '';
  const payload = contentType.includes('application/json')
    ? await res.json().catch(() => undefined)
    : await res.text().catch(() => undefined);

  if (!res.ok) {
    const message =
      (typeof payload === 'object' && payload !== null && 'message' in payload
        ? String((payload as { message: unknown }).message)
        : null) ?? `HTTP ${res.status}`;
    throw new ApiError(message, res.status, payload);
  }

  return payload as T;
}
