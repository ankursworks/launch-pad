/**
 * Pristine theme barrel.
 *
 * Strategy: re-export token-driven primitives from Helios (they recolor
 * automatically through CSS variables), and override only what's
 * theme-specific — the auth illustration, brand pages, and tokens.
 *
 * To make Pristine fully self-contained (e.g. for shipping a fork
 * without Helios), copy the relevant primitive files from
 * `themes/helios/components` into `themes/pristine/components`.
 */

// --- Token-driven primitives (shared with Helios) ---
export {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  EmptyState,
  Header,
  Input,
  Modal,
  Progress,
  Select,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  Sheet,
  Sidebar,
  Skeleton,
  Stat,
  Switch,
  Table,
  THead,
  TBody,
  Tr,
  Th,
  Td,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ThemeSwitcher,
  ToastProvider,
  useToast,
  useToastStore,
  Tooltip,
} from '@/themes/helios';
export type {
  BadgeVariant,
  ButtonVariant,
  ButtonSize,
  ToastVariant,
} from '@/themes/helios';

// --- Pristine-specific components ---
export { PristineHero } from './components/PristineHero';
export { HeroPanel as IllustrationPanel } from './components/HeroPanel';

// --- Marketing sections ---
export {
  Hero,
  DashboardMockup,
  MarketingNav,
  LogoCloud,
  Features,
  Benefits,
  Integration,
  Pricing,
  Testimonial,
  CtaBanner,
  Footer,
  StripedBand,
} from './sections';

// --- Layouts (re-used from Helios; chrome adapts via tokens) ---
export { AuthLayout, AppLayout } from '@/themes/helios';

// --- Brand pages (Pristine-specific) ---
export { default as Home } from './pages/Home';
export { default as Login } from './pages/Login';
export { default as Signup } from './pages/Signup';
export { default as StyleGuide } from './pages/StyleGuide';

// --- Brand pages re-used from Helios for now ---
export { Dashboard } from '@/themes/helios';

// --- Domain templates (core-owned) ---
export {
  Profile,
  Settings,
  Team,
  Billing,
  Onboarding,
  Projects,
} from '@/core/templates';

// --- Tokens / metadata ---
export { theme, tokens } from './tokens';
