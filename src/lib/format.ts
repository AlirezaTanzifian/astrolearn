import type { BadgeTone } from './ui';

const toman = new Intl.NumberFormat('fa-IR');
const number = new Intl.NumberFormat('fa-IR');
const date = new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long' });

export const formatPrice = (value: number) => `${toman.format(value)} تومان`;
export const formatNumber = (value: number) => number.format(value);
export const formatDate = (value: Date) => date.format(value);

export function formatMinutes(total: number) {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  if (!hours) return `${number.format(minutes)} دقیقه`;
  if (!minutes) return `${number.format(hours)} ساعت`;
  return `${number.format(hours)} ساعت و ${number.format(minutes)} دقیقه`;
}

export const levelLabels = {
  beginner: 'مقدماتی',
  intermediate: 'متوسط',
  advanced: 'پیشرفته',
} as const;

export type Level = keyof typeof levelLabels;

export const levelTones = {
  beginner: 'firoozeh',
  intermediate: 'saffron',
  advanced: 'ink',
} as const satisfies Record<Level, BadgeTone>;
