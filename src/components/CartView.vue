<template>
  <div v-if="!items.length" :class="emptyStateClass">
    <p class="font-display text-2xl">سبد خرید خالی است</p>
    <p class="mt-2 text-muted">دوره‌ای را که می‌خواهید انتخاب کنید و به سبد اضافه کنید.</p>
    <a href="/courses" :class="[buttonClass(), 'mt-6']">دیدن دوره‌ها</a>
  </div>

  <div v-else class="grid gap-8 md:grid-cols-[1fr_18rem]">
    <ul :class="[cardClass, 'divide-y divide-line']">
      <li v-for="item in items" :key="item.id" class="flex items-center gap-4 p-5">
        <a :href="`/courses/${item.id}`" class="flex-1 font-semibold hover:text-firoozeh-dark">{{ item.title }}</a>
        <span class="tabular-nums">{{ formatPrice(item.price) }}</span>
        <button
          type="button"
          class="min-h-10 cursor-pointer rounded-md px-3 text-sm text-muted hover:bg-paper hover:text-ink"
          @click="removeFromCart(item.id)"
        >
          حذف<span class="sr-only"> {{ item.title }}</span>
        </button>
      </li>
    </ul>

    <aside :class="[cardClass, 'h-fit p-5']">
      <dl class="flex justify-between text-lg">
        <dt>جمع کل</dt>
        <dd class="font-bold tabular-nums">{{ formatPrice(total) }}</dd>
      </dl>
      <p class="mt-2 text-sm text-muted">این یک پرداخت آزمایشی است و مبلغی کسر نمی‌شود.</p>
      <button
        type="button"
        :class="[buttonClass('accent'), 'mt-5 w-full']"
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
import { buttonClass, cardClass, emptyStateClass } from '../lib/ui';

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
