import { onMounted, ref } from 'vue';

/** استیت localStorage روی سرور در دسترس نیست؛ تا mount منتظر می‌مانیم */
export function useMounted() {
  const mounted = ref(false);
  onMounted(() => (mounted.value = true));
  return mounted;
}
