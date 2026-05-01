const TOKEN_KEY = 'launchpad-token';

export const tokenStorage = {
  get: () => (typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null),
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  username?: string;
}

export async function mockLogin(
  email: string,
  password: string
): Promise<{ token: string; user: AuthUser }> {
  await new Promise((r) => setTimeout(r, 400));
  if (password.length < 6) throw new Error('Invalid credentials');
  const user: AuthUser = { id: '1', email, name: email.split('@')[0] };
  const token = btoa(JSON.stringify({ email, exp: Date.now() + 86400000 }));
  return { token, user };
}

export interface SignupInput {
  name: string;
  username: string;
  email: string;
  password: string;
}

export async function mockSignup(
  input: SignupInput
): Promise<{ token: string; user: AuthUser }> {
  await new Promise((r) => setTimeout(r, 400));
  if (input.password.length < 6) throw new Error('Password must be at least 6 characters');
  const user: AuthUser = {
    id: '1',
    email: input.email,
    name: input.name,
    username: input.username,
  };
  const token = btoa(JSON.stringify({ email: input.email, exp: Date.now() + 86400000 }));
  return { token, user };
}
