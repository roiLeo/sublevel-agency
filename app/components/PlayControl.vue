<script setup lang="ts">
defineProps<{ playing: boolean, title: string, meta?: string }>()
defineEmits<{ toggle: [] }>()
</script>

<template>
  <div class="flex items-center gap-3.5 py-2.5 pl-2.5 pr-4 bg-default/80 border border-default backdrop-blur-sm">
    <UButton
      :icon="playing ? 'i-lucide-pause' : 'i-lucide-play'"
      :aria-label="playing ? 'Pause preview' : 'Play preview'"
      size="lg"
      class="rounded-full size-11 justify-center"
      @click="$emit('toggle')"
    />
    <div class="flex flex-col gap-1">
      <span class="text-sm font-semibold">{{ title }}</span>
      <span class="font-mono text-[10px] tracking-[.06em] text-muted">{{ playing ? 'PLAYING' : 'PAUSED' }} · {{ meta ?? '160 BPM PREVIEW LOOP' }}</span>
    </div>
  </div>
</template>
