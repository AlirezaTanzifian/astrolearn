import { persistentJSON } from '@nanostores/persistent';

// شناسه‌ی درس‌های تمام‌شده، مثل «astro-basics/01-why-astro»
export const completed = persistentJSON<string[]>('astrolearn:completed', []);

export function toggleCompleted(lessonId: string) {
  const list = completed.get();
  completed.set(list.includes(lessonId) ? list.filter((id) => id !== lessonId) : [...list, lessonId]);
}
