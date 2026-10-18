<template>
  <a
    href="/cart"
    class="relative inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-3 py-2 text-sm font-medium hover:border-firoozeh sm:px-4"
    :aria-label="`سبد خرید، ${label} دوره`"
  >
    <Icon name="cart" />
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
import Icon from './Icon.vue';
import { cartCount } from '../store/cart';
import { useMounted } from '../lib/useMounted';
import { formatNumber } from '../lib/format';

const total = useStore(cartCount);
const mounted = useMounted();
// تا قبل از mount مقدار سرور (صفر) را نشان می‌دهیم تا hydration mismatch رخ ندهد
const count = computed(() => (mounted.value ? total.value : 0));
const label = computed(() => formatNumber(count.value));
</script>
