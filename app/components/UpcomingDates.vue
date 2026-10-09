<script setup lang="ts">
import { dates } from '~/data/dates'
import { findArtist } from '~/data/artists'
const props = withDefaults(defineProps<{ limit?: number }>(), { limit: 5 })
const rows = computed(() => dates.slice(0, props.limit).map(d => ({ ...d, a: findArtist(d.artist)! })))
</script>

<template>
  <section id="dates" class="px-6 sm:px-10 pt-24 scroll-mt-6">
    <h2 class="font-display font-extrabold uppercase text-6xl leading-[.9] pb-6">Upcoming dates</h2>
    <div class="flex flex-col">
      <NuxtLink
        v-for="d in rows" :key="d.date + d.artist" :to="`/artists/${d.a.slug}`"
        class="group grid grid-cols-[110px_1fr] md:grid-cols-[140px_1.3fr_1fr_160px_90px] items-center gap-x-5 gap-y-1 py-5 border-t border-default"
      >
        <span class="font-mono text-[13px] text-primary">{{ d.date }}</span>
        <span class="font-display font-extrabold uppercase text-[30px] leading-none group-hover:text-primary transition-colors">{{ d.a.name }}</span>
        <span class="col-start-2 md:col-start-auto">{{ d.venue }}</span>
        <span class="col-start-2 md:col-start-auto font-mono text-xs uppercase text-muted">{{ d.city }}</span>
        <span class="hidden md:block text-sm font-medium text-right group-hover:text-primary">Profile →</span>
      </NuxtLink>
    </div>
  </section>
</template>
