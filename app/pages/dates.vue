<template>
  <div class="flex flex-wrap justify-between items-end gap-8 mb-12">
    <h1 class="font-display font-black uppercase text-7xl sm:text-8xl lg:text-[clamp(88px,14svh,140px)] leading-[.84] mb-6">
      Upcoming<br>Dates
    </h1>
    <div class="flex flex-wrap gap-2 lg:justify-end max-w-[560px]" role="group" aria-label="Filter by city">
      <UButton
        :label="`All (${enrichedDates.length})`"
        color="neutral"
        :variant="selectedCity === null ? 'solid' : 'outline'"
        class="font-mono uppercase tracking-[.04em]"
        @click="selectedCity = null"
      />
      <UButton
        v-for="city in cities"
        :key="city"
        :label="`${city} (${enrichedDates.filter(d => d.city === city).length})`"
        color="neutral"
        :variant="selectedCity === city ? 'solid' : 'outline'"
        size="sm"
        class="font-mono uppercase tracking-[.04em]"
        @click="selectedCity = city"
      />
    </div>
  </div>

  <div class="space-y-6">
    <div
      v-for="(gig, idx) in filtered"
      :key="`${gig.date}-${gig.artist?.slug}`"
      class="border-b border-default pb-6 last:border-b-0"
      :class="{ 'pt-6': idx > 0 }"
    >
      <div class="grid lg:grid-cols-[2fr_3fr_2fr] gap-8 items-start">
        <!-- Date & City -->
        <div class="flex flex-col gap-2">
          <span class="font-mono text-xs tracking-[.08em] text-primary">DATE & LOCATION</span>
          <p class="font-display font-bold uppercase text-3xl leading-tight">{{ gig.date }}</p>
          <p class="font-mono text-sm text-muted">{{ gig.city }}</p>
        </div>

        <!-- Artist & Venue -->
        <div class="flex flex-col gap-2">
          <span class="font-mono text-xs tracking-[.08em] text-primary">ARTIST & VENUE</span>
          <div v-if="gig.artist" class="flex flex-col gap-1">
            <NuxtLink
              :to="`/artists/${gig.artist.slug}`"
              class="font-display font-bold uppercase text-3xl leading-tight hover:text-primary transition-colors"
            >
              {{ gig.artist.name }}
            </NuxtLink>
            <p class="font-mono text-sm text-muted">{{ gig.artist.genre }}</p>
          </div>
          <p class="font-display font-bold text-lg mt-2">{{ gig.venue }}</p>
        </div>

        <!-- Info & Link -->
        <div class="flex items-center gap-3">
          <NuxtLink
            v-if="gig.artist"
            :to="`/artists/${gig.artist.slug}`"
            class="inline-flex items-center gap-2 font-mono text-xs tracking-[.04em] text-primary hover:underline"
          >
            View artist →
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="py-12 text-center">
      <p class="text-toned">No dates in {{ selectedCity }}. Check another city.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { dates } from '~/data/dates'
import { findArtist } from '~/data/artists'

useSeoMeta({ title: 'Upcoming Dates — Sublevel' })

const enrichedDates = dates.map(d => ({
  ...d,
  artist: findArtist(d.artist)
}))

const cities = [...new Set(dates.map(d => d.city))].sort()
const selectedCity = ref<string | null>(null)

const filtered = computed(() => {
  if (!selectedCity.value) return enrichedDates
  return enrichedDates.filter(d => d.city === selectedCity.value)
})
</script>
