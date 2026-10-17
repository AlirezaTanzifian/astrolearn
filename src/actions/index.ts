import { ActionError, defineAction } from 'astro:actions';
import { getCollection } from 'astro:content';
import { z } from 'astro/zod';
import { enroll } from '../lib/enrollment';

export const server = {
  checkout: defineAction({
    accept: 'json',
    input: z.object({
      courseIds: z.array(z.string()).min(1, 'سبد خرید خالی است.'),
    }),
    handler: async ({ courseIds }, { session }) => {
      // قیمت‌ها از سمت سرور محاسبه می‌شوند؛ به داده‌ی کلاینت اعتماد نمی‌کنیم
      const courses = await getCollection('courses', ({ id }) => courseIds.includes(id));
      if (courses.length !== new Set(courseIds).size) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: 'یکی از دوره‌های سبد دیگر موجود نیست. آن را حذف کنید و دوباره تلاش کنید.',
        });
      }

      const total = courses.reduce((sum, course) => sum + course.data.price, 0);
      const enrolled = await enroll(session, courses.map((course) => course.id));
      return { total, enrolled };
    },
  }),
};
