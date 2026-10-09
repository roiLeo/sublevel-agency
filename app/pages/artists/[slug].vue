<template>
  <div class="px-6 sm:px-10 py-5 font-mono text-[11px] tracking-[.08em] text-muted">
    <NuxtLink to="/roster" class="hover:text-primary">ROSTER</NuxtLink> / <span class="text-default uppercase">{{ no }} {{ artist.name }}</span>
  </div>

  <section class="grid lg:grid-cols-[5fr_7fr] gap-10 px-6 sm:px-10">
    <div class="aspect-4/5 lg:aspect-auto lg:min-h-195 bg-elevated overflow-hidden">
      <img v-if="artist.image" :src="artist.image" :alt="artist.name" class="size-full object-cover">
      <div v-else class="size-full grid place-items-center font-mono text-[11px] text-dimmed">PORTRAIT</div>
    </div>

    <div class="flex flex-col gap-7">
      <div class="flex flex-wrap gap-2 font-mono text-xs tracking-[.06em] uppercase">
        <span class="border border-accented px-2.5 py-2">{{ artist.genre }}</span>
        <span class="border border-accented px-2.5 py-2">{{ artist.city }}</span>
        <span class="px-2.5 py-2" :class="artist.status === 'Taking dates' ? 'bg-primary text-inverted' : 'border border-accented'">{{ artist.status }}</span>
      </div>
      <h1 class="font-display font-black uppercase text-8xl lg:text-[168px] leading-[.8]">{{ artist.name }}</h1>
      <p class="max-w-150 text-lg leading-relaxed text-toned text-pretty">{{ artist.bio }}</p>

      <div class="bg-muted border border-default flex flex-col">
        <div class="h-82.5">
          <ClientOnly><RingVisualizer /></ClientOnly>
        </div>
        <div class="flex items-center gap-4.5 px-5 py-4.5 border-t border-default">
          <UButton
            :icon="playing ? 'i-lucide-pause' : 'i-lucide-play'"
            :aria-label="playing ? 'Pause preview' : 'Play preview'"
            size="xl" class="rounded-full size-13 justify-center" @click="toggle"
          />
          <div class="flex flex-col gap-1.5 flex-1">
            <span class="font-semibold">{{ artist.track }}</span>
            <span class="font-mono text-[11px] tracking-[.06em] text-muted">{{ playing ? 'PLAYING' : 'PAUSED' }} · PREVIEW LOOP · 160 BPM</span>
          </div>
          <span class="hidden sm:block font-mono text-[11px] tracking-[.06em] text-muted">SOUNDCLOUD ↗</span>
        </div>
      </div>
    </div>
  </section>

  <section class="grid md:grid-cols-3 gap-10 px-6 sm:px-10 pt-18">
    <div class="flex flex-col gap-4.5">
      <span class="font-mono text-xs tracking-[.08em] text-primary">UPCOMING</span>
      <div v-for="g in gigs" :key="g.date" class="flex flex-col gap-1.5 pt-3.5 border-t border-default">
        <span class="font-mono text-xs text-muted">{{ g.date }} · {{ g.city }}</span>
        <span class="font-display font-extrabold uppercase text-[26px] leading-none">{{ g.venue }}</span>
      </div>
      <p v-if="!gigs.length" class="pt-3.5 border-t border-default text-toned">No public dates announced. Ask us for availability.</p>
    </div>
    <div class="flex flex-col gap-4.5">
      <span class="font-mono text-xs tracking-[.08em] text-primary">BOOKING</span>
      <dl class="grid grid-cols-[110px_1fr] gap-y-3.5 pt-3.5 border-t border-default">
        <template v-for="[k, v] in booking" :key="k">
          <dt class="text-muted">{{ k }}</dt><dd>{{ v }}</dd>
        </template>
      </dl>
    </div>
    <div class="flex flex-col gap-4.5">
      <span class="font-mono text-xs tracking-[.08em] text-primary">TECH RIDER</span>
      <ul class="flex flex-col gap-2.5 pt-3.5 border-t border-default">
        <li v-for="r in artist.rider" :key="r">{{ r }}</li>
      </ul>
    </div>
  </section>

  <section id="request" class="mx-6 sm:mx-10 mt-18 p-8 bg-primary text-inverted flex flex-wrap justify-between items-center gap-6">
    <span class="font-display font-black uppercase text-5xl lg:text-[56px] leading-[.9]">Check a date for {{ artist.name }}</span>
    <UButton
      :to="`mailto:bookings@sublevel.agency?subject=${encodeURIComponent('Date request: ' + artist.name)}`"
      size="xl" color="neutral" variant="solid" label="Request a date" class="font-semibold bg-[#0b0b0a] text-[#ecebe4] hover:bg-[#1f1f1d]"
    />
  </section>

  <nav class="flex justify-between px-6 sm:px-10 pt-14 pb-4 font-mono text-[11px] tracking-[.06em] text-muted uppercase">
    <NuxtLink :to="`/artists/${prev.slug}`" class="hover:text-primary">← {{ prev.name }}</NuxtLink>
    <NuxtLink :to="`/artists/${next.slug}`" class="hover:text-primary">{{ next.name }} →</NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { artists, findArtist } from '~/data/artists'
import { datesFor } from '~/data/dates'

const route = useRoute()
const artist = findArtist(route.params.slug as string)
if (!artist) throw createError({ statusCode: 404, statusMessage: 'Artist not found', fatal: true })
const gigs = datesFor(artist.slug)
const idx = artists.indexOf(artist)
const no = String(idx + 1).padStart(2, '0')
const prev = artists[(idx + artists.length - 1) % artists.length]!
const next = artists[(idx + 1) % artists.length]!
const { playing, toggle } = usePreviewLoop()

useSeoMeta({ title: `${artist.name} — Sublevel`, description: artist.bio })

const booking = [
  ['Fee range', artist.fee],
  ['Set length', artist.setLength],
  ['Travels from', artist.travelsFrom],
  ['Lead time', artist.leadTime]
]
</script>
