<script setup lang="ts">
import type { Artist } from '~/data/artists'
defineProps<{ artist: Artist, showStatus?: boolean }>()
const dot = (s: Artist['status']) => s === 'Taking dates' ? 'bg-success' : s === 'Limited' ? 'bg-warning' : 'bg-(--ui-text-muted)'
</script>

<template>
  <NuxtLink :to="`/artists/${artist.slug}`" class="group flex flex-col gap-3.5">
    <div class="aspect-[4/5] bg-elevated overflow-hidden">
      <img v-if="artist.image" :src="artist.image" :alt="artist.name" class="size-full object-cover grayscale group-hover:grayscale-0 transition">
      <div v-else class="size-full grid place-items-center font-mono text-[11px] text-dimmed">PRESS PHOTO</div>
    </div>
    <div class="flex justify-between items-baseline gap-2">
      <span class="font-display font-extrabold uppercase text-[30px] leading-none group-hover:text-primary transition-colors">{{ artist.name }}</span>
      <span class="font-mono text-[11px] text-muted">{{ artist.city }}</span>
    </div>
    <div class="flex justify-between items-center gap-2 font-mono text-xs tracking-[.04em] uppercase">
      <span class="text-muted">{{ artist.genre }}</span>
      <span v-if="showStatus" class="flex items-center gap-1.5"><span class="size-1.5 rounded-full" :class="dot(artist.status)" />{{ artist.status }}</span>
    </div>
  </NuxtLink>
</template>
