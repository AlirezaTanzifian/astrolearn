import type { AstroSession } from 'astro';

// دوره‌های خریداری‌شده در session سمت سرور نگه داشته می‌شوند
const KEY = 'enrolled';

export async function getEnrolled(session: AstroSession | undefined): Promise<string[]> {
  return (await session?.get(KEY)) ?? [];
}

export async function enroll(session: AstroSession | undefined, courseIds: string[]) {
  const current = await getEnrolled(session);
  const next = [...new Set([...current, ...courseIds])];
  session?.set(KEY, next);
  return next;
}
