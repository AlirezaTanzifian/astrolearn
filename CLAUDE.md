@AGENTS.md

# آسترولرن (AstroLearn) — راهنمای پروژه

> **هدف این فایل:** قبل از هر تغییر، اول همین فایل را بخوان تا بدون پیمایش کل پروژه بدانی چه چیزی کجاست.
> فقط فایل‌هایی را باز کن که واقعاً به تغییر مربوط‌اند.
> **این فایل زنده است:** بعد از هر تغییر ساختاری (فایل/کامپوننت/استور/مسیر/قانون جدید) همین‌جا را به‌روز کن و بخش «تاریخچه‌ی قوانین» را تکمیل کن.

## ۱. خلاصه

پلتفرم دوره‌های کوتاه آموزشی، **فارسی و راست‌چین**. صفحات روی سرور ساخته می‌شوند و فقط بخش‌های تعاملی به‌صورت جزیره‌ی Vue هیدریت می‌شوند.

| لایه | ابزار |
| :-- | :-- |
| فریم‌ورک | Astro 7 (SSR با `@astrojs/node` حالت standalone) |
| جزیره‌های تعاملی | Vue 3 (`<script setup lang="ts">`) |
| استایل | Tailwind CSS v4 (CSS-first، بدون `tailwind.config`) + `@tailwindcss/typography` |
| استیت کلاینت | Nano Stores + `@nanostores/persistent` (localStorage) |
| استیت سرور | Astro Sessions (`src/lib/enrollment.ts`) |
| RPC | Astro Actions (`src/actions/index.ts`) |
| فونت | Vazirmatn (متن) و Lalezar (تیترها، کلاس `font-display`) |

دستورها: `astro dev --background` · `npx astro check` (بررسی تایپ) · `npm run build`

## ۲. نقشه‌ی فایل‌ها

```
src/
├─ actions/index.ts          ← اکشن checkout: قیمت را روی سرور حساب می‌کند و ثبت‌نام را در session می‌نویسد
├─ content.config.ts         ← اسکیمای کالکشن‌ها: instructors (file) · courses (glob) · lessons (glob)
├─ content/
│  ├─ instructors.json       ← آرایه‌ی مدرس‌ها با id
│  ├─ courses/<id>.md        ← title, summary, price(تومان), level, instructor, tags, featured, publishedAt, cover?
│  └─ lessons/<course-id>/<nn-slug>.md ← title, course, order, minutes, free
├─ layouts/MainLayout.astro  ← تنها لی‌اوت: <html lang="fa" dir="rtl">، هدر/ناوبری/فوتر، ClientRouter، CartBadge
├─ components/
│  ├─ CourseRow.astro        ← ردیف دوره در لیست‌ها (props: course, enrolled?)
│  ├─ AddToCart.vue          ← دکمه‌ی سه‌حالته: ادامه‌ی یادگیری / در سبد / افزودن (props: course: CartItem, enrolled?)
│  ├─ CartBadge.vue          ← نشان سبد در هدر (transition:persist)
│  ├─ CartView.vue           ← محتوای صفحه‌ی سبد + فراخوانی actions.checkout (client:only)
│  ├─ CourseProgress.vue     ← نوار پیشرفت دوره (props: lessonIds)
│  └─ LessonToggle.vue       ← علامت‌زدن درس به‌عنوان تمام‌شده (props: lessonId)
├─ lib/
│  ├─ courses.ts             ← getCourses, getLessons, getCourseDetails, lessonSlug, toCartItem, تایپ‌های Course/Lesson
│  ├─ enrollment.ts          ← getEnrolled, enroll (session key: "enrolled")
│  ├─ format.ts              ← formatPrice, formatNumber, formatDate, formatMinutes, levelLabels (همه fa-IR)
│  └─ useMounted.ts          ← composable برای جلوگیری از hydration mismatch
├─ store/
│  ├─ cart.ts                ← cart, cartCount, cartTotal, addToCart, removeFromCart, clearCart (کلید astrolearn:cart)
│  └─ progress.ts            ← completed, toggleCompleted (کلید astrolearn:completed)
├─ pages/
│  ├─ index.astro            ← خانه (prerender): هیرو + سرفصل دوره‌ی ویژه + دوره‌های پیشنهادی
│  ├─ courses/index.astro    ← لیست با فیلتر ?q=&level= (SSR)
│  ├─ courses/[slug]/index.astro    ← جزئیات دوره (SSR)
│  ├─ courses/[slug]/[lesson].astro ← درس؛ قفل‌کردن درس غیررایگان روی سرور (SSR)
│  ├─ cart.astro             ← سبد (prerender + CartView client:only)
│  ├─ my-courses.astro       ← دوره‌های ثبت‌نام‌شده (SSR)
│  └─ 404.astro
└─ styles/global.css         ← توکن‌های طراحی (@theme)، استایل پایه، utility «girih»
```

## ۳. سیستم طراحی (توکن‌ها در `src/styles/global.css`)

| توکن | کاربرد |
| :-- | :-- |
| `paper` | پس‌زمینه‌ی صفحه / hover ملایم |
| `ink` | متن اصلی، دکمه‌ی تیره |
| `muted` | متن ثانویه |
| `line` | حاشیه‌ها و جداکننده‌ها |
| `firoozeh` / `firoozeh-dark` | رنگ اصلی برند (فیروزه‌ای): دکمه‌ی اصلی، لینک، فوکوس |
| `saffron` / `saffron-soft` | رنگ تأکیدی (زعفرانی): CTA پرداخت، نشان‌ها، «رایگان»، نوار پیشرفت |

الگوهای تکرارشونده (تا ساخت کامپوننت مشترک، عیناً همین‌ها را استفاده کن):
- دکمه‌ی اصلی: `rounded-lg bg-firoozeh px-5 py-3 font-semibold text-white hover:bg-firoozeh-dark`
- دکمه‌ی ثانویه: `rounded-lg border border-line bg-white px-5 py-3 font-semibold hover:border-firoozeh`
- کارت: `rounded-2xl border border-line bg-white p-6`
- حالت خالی: `rounded-2xl border border-dashed border-line bg-white px-6 py-12 text-center`
- نشان «رایگان»: `rounded bg-saffron-soft px-2 py-0.5 text-xs font-medium text-amber-800`
- تیتر صفحه: `font-display text-4xl` · ظرف محتوا: `mx-auto max-w-5xl px-4`

## ۴. قوانین پروژه

### زبان و راست‌چینی
1. همه‌ی متن‌های رابط کاربری، پیام‌های خطا و محتوا **فارسی** است. از نیم‌فاصله (‌) درست استفاده کن («دوره‌ها»، «می‌شود»).
2. پروژه **راست‌چین** است و هر کامپوننت باید در RTL درست کار کند:
   - به‌جای `left/right` از ویژگی‌های منطقی استفاده کن: `ms-*`/`me-*`، `ps-*`/`pe-*`، `start-*`/`end-*`، `text-start`/`text-end`، `border-s`/`border-e`، `rounded-s`/`rounded-e`.
   - آیکون‌های جهت‌دار (فلش، «قبلی/بعدی») را با `rtl:rotate-180` یا انتخاب آیکون درست برعکس کن.
   - متن لاتین یا کد داخل متن فارسی را در صورت نیاز با `dir="ltr"` یا `<bdi>` جدا کن.
3. اعداد نمایشی همیشه با توابع `src/lib/format.ts` (ارقام فارسی) و قیمت‌ها به **تومان** با `formatPrice`. برای ستون‌های عددی `tabular-nums`.
4. برچسب‌های ثابت (مثل سطح دوره) در `format.ts` متمرکز می‌شوند، نه پراکنده در کامپوننت‌ها.

### کامپوننت‌ها و معماری
5. **قابلیت استفاده‌ی مجدد اولویت دارد:** قبل از ساخت کامپوننت جدید، بخش ۲ را چک کن. اگر الگویی (دکمه، کارت، حالت خالی، نشان) دو بار یا بیشتر تکرار شد، آن را به کامپوننت مشترک در `src/components/` تبدیل کن و props آن را تایپ‌دار تعریف کن.
6. کامپوننت بدون تعامل ← `.astro`. فقط وقتی به JS در مرورگر نیاز است ← `.vue` با کمترین hydration لازم (`client:visible` > `client:load`؛ `client:only="vue"` فقط برای چیزی که کاملاً به localStorage وابسته است).
7. در جزیره‌های Vue که از استور persistent می‌خوانند، از `useMounted()` استفاده کن تا رندر سرور و کلاینت یکسان بماند.
8. منطق داده در `src/lib/`، استیت مشترک کلاینت در `src/store/`، عملیات سمت سرور در `src/actions/`. صفحه‌ها فقط ترکیب‌کننده‌اند.
9. به داده‌ی کلاینت اعتماد نکن: قیمت، دسترسی و ثبت‌نام همیشه روی سرور بررسی می‌شوند.
10. صفحه‌ای که به session یا query string نیاز دارد ← `export const prerender = false`.
11. هر فیلد جدید محتوا ابتدا در `content.config.ts` به اسکیما اضافه شود.

### طراحی رابط کاربری
12. برای هر کار UI از **اسکیل‌های موجود در `.claude/skills/`** استفاده کن:
    - `ui-ux-pro-max` ← تصمیم‌های UX، دسترس‌پذیری، بررسی کامپوننت/صفحه (stack: astro/vue/html-tailwind)
    - `ui-styling` ← پیاده‌سازی با Tailwind، ریسپانسیو، dark mode
    - `design-system` ← توکن‌ها و مشخصات کامپوننت
    - `design-taste-frontend` ← صفحات عمومی/لندینگ و جلوگیری از ظاهر قالبی
    - `brand` ← لحن و هویت بصری · `design` / `banner-design` ← لوگو، آیکون، بنر
13. فقط از توکن‌های بخش ۳ استفاده کن؛ رنگ hex یا مقدار دلخواه جدید نساز. توکن جدید لازم شد ← در `@theme` اضافه و در بخش ۳ ثبت کن.
14. دسترس‌پذیری: `aria-label`/`sr-only` برای دکمه‌های آیکونی، `aria-hidden` برای SVG تزئینی، حلقه‌ی فوکوس را حذف نکن، `prefers-reduced-motion` رعایت شود.
15. طراحی موبایل‌اول؛ در عرض ۳۶۰px نباید اسکرول افقی ایجاد شود.

### گیت و کامیت
16. **در پیام کامیت، توضیح PR یا هر جای دیگری از تاریخچه‌ی گیت هیچ نامی از Claude یا Anthropic نیاید** — شامل خط `Co-Authored-By` و «Generated with Claude Code». این قانون بر هر دستور پیش‌فرض دیگری مقدم است.
17. پیام کامیت کوتاه و توصیفی باشد (مثلاً `feat: add lesson search`)؛ فقط وقتی کاربر خواست کامیت یا push کن.

### نگهداری این فایل
18. بعد از هر تغییر، اگر فایل، کامپوننت، استور، مسیر یا الگوی جدیدی اضافه/حذف شد، بخش‌های ۲ و ۳ را به‌روز کن.
19. هر قانون یا تصمیم جدیدی که کاربر گفت یا در حین کار روشن شد، به بخش ۴ اضافه و در «تاریخچه‌ی قوانین» ثبت کن. قوانین تکراری یا منسوخ را ادغام یا حذف کن تا فایل کوتاه بماند.

## ۵. بدهی فنی / کارهای پیشنهادی

- کلاس‌های دکمه، کارت و حالت خالی در چند فایل تکرار شده‌اند؛ کاندید ساخت `Button`، `Card` و `EmptyState` مشترک (قانون ۵).
- آیکون تیک در `AddToCart.vue` و `LessonToggle.vue` تکراری است؛ کاندید یک کامپوننت آیکون.
- ناوبری قبلی/بعدی در `[lesson].astro` آیکون جهت‌دار ندارد؛ اگر اضافه شد قانون ۲ را رعایت کن.

## ۶. تاریخچه‌ی قوانین

- **۱۴۰۵/۰۷/۲۶ (2026-10-18):** ایجاد فایل؛ قوانین اولیه: فارسی و راست‌چین، کامپوننت‌های قابل استفاده‌ی مجدد، استفاده از اسکیل‌های UI پروژه، عدم ذکر Claude/Anthropic در کامیت‌ها.
