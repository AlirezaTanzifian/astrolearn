import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Course = CollectionEntry<'courses'>;
export type Lesson = CollectionEntry<'lessons'>;

/** نام درس در URL: «astro-basics/01-why-astro» ← «01-why-astro» */
export const lessonSlug = (lesson: Lesson) => lesson.id.split('/').pop()!;

export async function getCourses() {
  const courses = await getCollection('courses');
  return courses.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export async function getLessons(courseId: string) {
  const lessons = await getCollection('lessons', ({ data }) => data.course.id === courseId);
  return lessons.sort((a, b) => a.data.order - b.data.order);
}

/** دوره را همراه با مدرس (resolve‌شده از reference) و درس‌هایش برمی‌گرداند */
export async function getCourseDetails(course: Course) {
  const [instructor, lessons] = await Promise.all([
    getEntry(course.data.instructor),
    getLessons(course.id),
  ]);
  const minutes = lessons.reduce((sum, l) => sum + l.data.minutes, 0);
  return { course, instructor, lessons, minutes };
}

/** خلاصه‌ی سبک دوره که به جزیره‌های کلاینت پاس داده می‌شود */
export const toCartItem = (course: Course) => ({
  id: course.id,
  title: course.data.title,
  price: course.data.price,
});
