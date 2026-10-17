import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const coursesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    price: z.number(),
    instructor: z.string(),
    cover: image().optional(), // پشتیبانی از تصاویر بهینه‌شده
  }),
});

export const collections = {
  'courses': coursesCollection,
};
