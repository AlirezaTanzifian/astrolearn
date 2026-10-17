<template>
  <a
    href="/cart"
    class="relative inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-sm font-medium sm:px-4 hover:border-firoozeh"
    :aria-label="`سبد خرید، ${label} دوره`"
  >
    <svg viewBox="0 0 24 24" class="size-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2" />
      <circle cx="9" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" />
    </svg>
    <span class="hidden sm:inline">سبد خرید</span>
    <span
      class="grid min-w-6 h-6 place-items-center rounded-full px-1.5 text-xs transition-colors"
      :class="count ? 'bg-saffron text-ink' : 'bg-paper text-muted'"
    >{{ label }}</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@nanostores/vue';
import { cartCount } from '../store/cart';
import { useMounted } from '../lib/useMounted';
import { formatNumber } from '../lib/format';

const total = useStore(cartCount);
const mounted = useMounted();
// تا قبل از mount مقدار سرور (صفر) را نشان می‌دهیم تا hydration mismatch رخ ندهد
const count = computed(() => (mounted.value ? total.value : 0));
const label = computed(() => formatNumber(count.value));
</script>
