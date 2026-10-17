<template>
  <button
    type="button"
    :aria-pressed="done"
    class="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold transition-colors"
    :class="done ? 'bg-firoozeh text-white' : 'border border-line bg-white hover:border-firoozeh'"
    @click="toggleCompleted(lessonId)"
  >
    <svg viewBox="0 0 20 20" class="size-5" fill="currentColor" aria-hidden="true" :class="done ? '' : 'opacity-30'">
      <path d="M8 13.6 4.4 10l1.2-1.2L8 11.2l6.4-6.4 1.2 1.2z" />
    </svg>
    {{ done ? 'این درس را تمام کردید' : 'علامت زدن به‌عنوان تمام‌شده' }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@nanostores/vue';
import { completed, toggleCompleted } from '../store/progress';
import { useMounted } from '../lib/useMounted';

const props = defineProps<{ lessonId: string }>();
const list = useStore(completed);
const mounted = useMounted();
const done = computed(() => mounted.value && list.value.includes(props.lessonId));
</script>
