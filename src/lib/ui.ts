// کلاس‌ها و آیکون‌های مشترک؛ هم کامپوننت‌های Astro و هم جزیره‌های Vue از اینجا می‌خوانند

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60';

const buttonVariants = {
  primary: 'bg-firoozeh text-white hover:bg-firoozeh-dark',
  secondary: 'border border-line bg-white hover:border-firoozeh',
  outline: 'border border-firoozeh text-firoozeh-dark hover:bg-firoozeh/5',
  accent: 'bg-saffron text-ink hover:brightness-95',
  dark: 'bg-ink text-white hover:bg-ink/90',
  soft: 'bg-firoozeh/10 text-firoozeh-dark hover:bg-firoozeh/15',
} as const;

const buttonSizes = {
  sm: 'min-h-10 px-4 py-2 text-sm',
  md: 'min-h-11 px-5 py-2.5',
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;

export const buttonClass = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md') =>
  `${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]}`;

const badgeTones = {
  saffron: 'bg-saffron-soft text-amber-800',
  firoozeh: 'bg-firoozeh/10 text-firoozeh-dark',
  ink: 'bg-ink text-white',
} as const;

export type BadgeTone = keyof typeof badgeTones;

export const badgeClass = (tone: BadgeTone = 'saffron') =>
  `inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${badgeTones[tone]}`;

export const cardClass = 'rounded-2xl border border-line bg-white';
export const emptyStateClass = 'rounded-2xl border border-dashed border-line bg-white px-6 py-12 text-center';

// مسیرهای SVG در کادر 24×24، با stroke یکسان
export const icons = {
  check: 'M5 12.5l4.5 4.5L19 7.5',
  lock: 'M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z',
  cart: 'M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2M8 20a1 1 0 1 0 2 0a1 1 0 1 0-2 0M16 20a1 1 0 1 0 2 0a1 1 0 1 0-2 0',
  // در LTR به جلو (راست) اشاره می‌کند؛ در RTL باید با rtl:rotate-180 برعکس شود
  arrow: 'M5 12h14M13 6l6 6-6 6',
  play: 'M8 5.5v13l10.5-6.5z',
} as const;

export type IconName = keyof typeof icons;
