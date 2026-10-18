<template>
  <button
    type="button"
    :aria-pressed="done"
    :class="buttonClass(done ? 'primary' : 'secondary')"
    @click="toggleCompleted(lessonId)"
  >
    <Icon name="check" :class="done ? 'size-5' : 'size-5 opacity-30'" />
    {{ done ? 'این درس را تمام کردید' : 'علامت زدن به‌عنوان تمام‌شده' }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@nanostores/vue';
import Icon from './Icon.vue';
import { completed, toggleCompleted } from '../store/progress';
import { useMounted } from '../lib/useMounted';
import { buttonClass } from '../lib/ui';

const props = defineProps<{ lessonId: string }>();
const list = useStore(completed);
const mounted = useMounted();
const done = computed(() => mounted.value && list.value.includes(props.lessonId));
</script>
