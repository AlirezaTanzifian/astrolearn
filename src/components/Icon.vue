<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="props.class ?? 'size-5'"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  >
    <path :d="icons[name]" />
  </svg>
</template>

<script setup lang="ts">
import { icons, type IconName } from '../lib/ui';

const props = defineProps<{ name: IconName; class?: string; label?: string }>();
</script>
