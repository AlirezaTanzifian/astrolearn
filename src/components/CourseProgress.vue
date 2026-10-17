<template>
  <div>
    <div class="flex justify-between text-sm">
      <span>پیشرفت شما</span>
      <span class="tabular-nums text-muted">{{ formatNumber(done) }} از {{ formatNumber(lessonIds.length) }} درس</span>
    </div>
    <div
      class="mt-2 h-2 overflow-hidden rounded-full bg-paper"
      role="progressbar"
      :aria-valuenow="percent"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="h-full rounded-full bg-saffron transition-[width] duration-500" :style="{ width: `${percent}%` }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@nanostores/vue';
import { completed } from '../store/progress';
import { useMounted } from '../lib/useMounted';
import { formatNumber } from '../lib/format';

const props = defineProps<{ lessonIds: string[] }>();
const list = useStore(completed);
const mounted = useMounted();
const done = computed(() => (mounted.value ? props.lessonIds.filter((id) => list.value.includes(id)).length : 0));
const percent = computed(() => Math.round((done.value / props.lessonIds.length) * 100) || 0);
</script>
