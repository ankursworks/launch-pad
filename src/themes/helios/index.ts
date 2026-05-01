// Components
export { Avatar } from './components/Avatar';
export { Badge } from './components/Badge';
export type { BadgeVariant } from './components/Badge';
export { Button } from './components/Button';
export type { ButtonVariant, ButtonSize } from './components/Button';
export { Card } from './components/Card';
export { Checkbox } from './components/Checkbox';
export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
} from './components/Dropdown';
export { EmptyState } from './components/EmptyState';
export { Header } from './components/Header';
export { IllustrationPanel } from './components/IllustrationPanel';
export { AgenticIllustration } from './components/AgenticIllustration';
export { Input } from './components/Input';
export { Modal } from './components/Modal';
export { Progress } from './components/Progress';
export {
  Select,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './components/Select';
export { Sheet } from './components/Sheet';
export { Sidebar } from './components/Sidebar';
export { Skeleton } from './components/Skeleton';
export { Stat } from './components/Stat';
export { SunRays } from './components/SunRays';
export { Switch } from './components/Switch';
export { Table, THead, TBody, Tr, Th, Td } from './components/Table';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs';
export { ThemeSwitcher } from './components/ThemeSwitcher';
export { ToastProvider, useToast, useToastStore } from './components/Toast';
export type { ToastVariant } from './components/Toast';
export { Tooltip } from './components/Tooltip';

// Marketing sections
export {
  MarketingNav,
  Hero,
  DashboardMockup,
  LogoCloud,
  Features,
  ProductivityPartner,
  AutomationAssistant,
  FeatureGrid,
  Integrations,
  Pricing,
  Testimonials,
  Blog,
  FAQ,
  Footer,
} from './sections';

// Layouts
export { AuthLayout } from './layouts/AuthLayout';
export { AppLayout } from './layouts/AppLayout';

// Brand pages (theme-owned — visual identity matters most here)
export { default as Home } from './pages/Home';
export { default as About } from './pages/About';
export { default as Login } from './pages/Login';
export { default as Signup } from './pages/Signup';
export { default as Dashboard } from './pages/Dashboard';
export { default as StyleGuide } from './pages/StyleGuide';

// Domain templates (core-owned — themes can override by re-defining)
export {
  Profile,
  Settings,
  Team,
  Billing,
  Onboarding,
  Projects,
} from '@/core/templates';

// Tokens / metadata
export { theme, tokens } from './tokens';
