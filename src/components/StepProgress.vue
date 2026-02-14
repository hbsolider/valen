<template>
  <div
    class="w-full"
    role="progressbar"
    :aria-valuenow="current"
    :aria-valuemin="1"
    :aria-valuemax="total"
    :aria-label="`Step ${current} of ${total}`"
  >
    <div class="h-2 w-full overflow-hidden rounded-full bg-white/30">
      <div
        class="h-full rounded-full bg-white transition-all duration-300 ease-out"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  current: number
  total: number
}>()

const progress = computed(() => {
  if (props.total <= 0) return 0
  return Math.min(100, (props.current / props.total) * 100)
})
</script>
