<template>
  <div class="flex flex-wrap justify-between items-end gap-8 pb-9">
    <h1 class="font-display font-black uppercase text-8xl lg:text-[150px] leading-[.8] flex items-start gap-3.5">
      Roster
      <span class="font-mono font-medium text-base text-primary mt-2">{{ String(shown.length).padStart(2, '0') }}</span>
    </h1>
    <div class="flex flex-wrap gap-2 lg:justify-end max-w-[560px]" role="group" aria-label="Filter by sound">
      <UButton
        v-for="o in options" :key="o"
        :label="o"
        color="neutral"
        :variant="filter === o ? 'solid' : 'outline'"
        :aria-pressed="filter === o"
        class="font-mono uppercase tracking-[.04em]"
        @click="filter = o"
      />
    </div>
  </div>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-9 pb-18">
    <ArtistCard v-for="a in shown" :key="a.slug" :artist="a" show-status />
  </div>
</template>

<script setup lang="ts">
import { artists, genres, type Genre } from '~/data/artists'
useSeoMeta({ title: 'Roster — Sublevel' })

const options = ['All', ...genres] as const
const filter = ref<typeof options[number]>('All')
const shown = computed(() => filter.value === 'All' ? artists : artists.filter(a => a.tags.includes(filter.value as Genre)))
</script>
