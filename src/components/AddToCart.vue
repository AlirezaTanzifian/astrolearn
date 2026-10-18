<template>
  <a v-if="enrolled" :href="`/courses/${course.id}`" :class="buttonClass('soft', 'sm')">
    ادامه‌ی یادگیری
  </a>
  <button
    v-else-if="inCart"
    type="button"
    :class="buttonClass('outline', 'sm')"
    @click="removeFromCart(course.id)"
  >
    <Icon name="check" class="size-4" />
    در سبد خرید
    <span class="sr-only">(برای حذف کلیک کنید)</span>
  </button>
  <button
    v-else
    type="button"
    :class="buttonClass('primary', 'sm')"
    :disabled="!mounted"
    @click="addToCart(course)"
  >
    افزودن به سبد
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@nanostores/vue';
import Icon from './Icon.vue';
import { addToCart, cart, removeFromCart, type CartItem } from '../store/cart';
import { useMounted } from '../lib/useMounted';
import { buttonClass } from '../lib/ui';

const props = defineProps<{ course: CartItem; enrolled?: boolean }>();

const items = useStore(cart);
const mounted = useMounted();
const inCart = computed(() => mounted.value && items.value.some((item) => item.id === props.course.id));
</script>
