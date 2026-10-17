<template>
  <div v-if="!items.length" class="rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
    <p class="font-display text-2xl">سبد خرید خالی است</p>
    <p class="mt-2 text-muted">دوره‌ای را که می‌خواهید انتخاب کنید و به سبد اضافه کنید.</p>
    <a href="/courses" class="mt-6 inline-block rounded-lg bg-firoozeh px-5 py-2.5 font-semibold text-white hover:bg-firoozeh-dark">
      دیدن دوره‌ها
    </a>
  </div>

  <div v-else class="grid gap-8 md:grid-cols-[1fr_18rem]">
    <ul class="divide-y divide-line rounded-2xl border border-line bg-white">
      <li v-for="item in items" :key="item.id" class="flex items-center gap-4 p-5">
        <a :href="`/courses/${item.id}`" class="flex-1 font-semibold hover:text-firoozeh-dark">{{ item.title }}</a>
        <span class="tabular-nums">{{ formatPrice(item.price) }}</span>
        <button
          type="button"
          class="rounded-md px-2 py-1 text-sm text-muted hover:bg-paper hover:text-ink"
          @click="removeFromCart(item.id)"
        >
          حذف<span class="sr-only"> {{ item.title }}</span>
        </button>
      </li>
    </ul>

    <aside class="h-fit rounded-2xl border border-line bg-white p-5">
      <dl class="flex justify-between text-lg">
        <dt>جمع کل</dt>
        <dd class="font-bold tabular-nums">{{ formatPrice(total) }}</dd>
      </dl>
      <p class="mt-2 text-sm text-muted">این یک پرداخت آزمایشی است و مبلغی کسر نمی‌شود.</p>
      <button
        type="button"
        class="mt-5 w-full rounded-lg bg-saffron px-4 py-3 font-semibold text-ink hover:brightness-95 disabled:opacity-60"
        :disabled="pending"
        @click="checkout"
      >
        {{ pending ? 'در حال ثبت‌نام…' : 'پرداخت و ثبت‌نام' }}
      </button>
      <p v-if="error" role="alert" class="mt-3 text-sm text-red-700">{{ error }}</p>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@nanostores/vue';
import { actions } from 'astro:actions';
import { navigate } from 'astro:transitions/client';
import { cart, cartTotal, clearCart, removeFromCart } from '../store/cart';
import { formatPrice } from '../lib/format';

const items = useStore(cart);
const total = useStore(cartTotal);
const pending = ref(false);
const error = ref('');

async function checkout() {
  pending.value = true;
  error.value = '';
  // فراخوانی Astro Action: تایپ‌شده، و اعتبارسنجی‌شده روی سرور
  const result = await actions.checkout({ courseIds: items.value.map((item) => item.id) });
  pending.value = false;

  if (result.error) {
    error.value = result.error.message;
    return;
  }
  clearCart();
  navigate('/my-courses?welcome=1');
}
</script>
