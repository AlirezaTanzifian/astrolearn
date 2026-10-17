<template>
  <a
    v-if="enrolled"
    :href="`/courses/${course.id}`"
    class="inline-flex items-center rounded-lg bg-firoozeh/10 px-4 py-2 text-sm font-semibold text-firoozeh-dark"
  >
    ادامه‌ی یادگیری
  </a>
  <button
    v-else-if="inCart"
    type="button"
    class="inline-flex items-center gap-2 rounded-lg border border-firoozeh px-4 py-2 text-sm font-semibold text-firoozeh-dark hover:bg-firoozeh/5"
    @click="removeFromCart(course.id)"
  >
    <svg viewBox="0 0 20 20" class="size-4" fill="currentColor" aria-hidden="true">
      <path d="M8 13.6 4.4 10l1.2-1.2L8 11.2l6.4-6.4 1.2 1.2z" />
    </svg>
    در سبد خرید
    <span class="sr-only">(برای حذف کلیک کنید)</span>
  </button>
  <button
    v-else
    type="button"
    class="rounded-lg bg-firoozeh px-4 py-2 text-sm font-semibold text-white hover:bg-firoozeh-dark disabled:opacity-60"
    :disabled="!mounted"
    @click="addToCart(course)"
  >
    افزودن به سبد
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@nanostores/vue';
import { addToCart, cart, removeFromCart, type CartItem } from '../store/cart';
import { useMounted } from '../lib/useMounted';

const props = defineProps<{ course: CartItem; enrolled?: boolean }>();

const items = useStore(cart);
const mounted = useMounted();
const inCart = computed(() => mounted.value && items.value.some((item) => item.id === props.course.id));
</script>
