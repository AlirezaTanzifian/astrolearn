import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// مدرس‌ها از یک فایل JSON واحد بارگذاری می‌شوند (file loader)
const instructors = defineCollection({
  loader: file('src/content/instructors.json'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      price: z.number().int().nonnegative(),
      level: z.enum(['beginner', 'intermediate', 'advanced']),
      instructor: reference('instructors'),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      publishedAt: z.coerce.date(),
      cover: image().optional(),
    }),
});

// هر درس با reference به دوره‌ی خودش وصل است
const lessons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    course: reference('courses'),
    order: z.number().int(),
    minutes: z.number().int().positive(),
    free: z.boolean().default(false),
  }),
});

export const collections = { instructors, courses, lessons };
