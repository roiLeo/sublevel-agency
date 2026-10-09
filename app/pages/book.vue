<template>
  <h1 class="font-display font-black uppercase text-7xl sm:text-8xl lg:text-[clamp(88px,14svh,140px)] leading-[.84] mb-6">
    Book<br>An Artist
  </h1>

  <div class="grid lg:grid-cols-3 gap-12 max-w-6xl">
    <!-- Form -->
    <div class="lg:col-span-2 flex flex-col gap-8">
      <!-- Selected Artists Preview -->
      <div v-if="selectedArtistsData.length > 0" class="bg-elevated p-6 border border-default">
        <span class="font-mono text-xs tracking-[.08em] text-primary block mb-4">SELECTED ARTISTS</span>
        <div class="space-y-3">
          <div
            v-for="artist in selectedArtistsData"
            :key="artist.slug"
            class="flex justify-between items-start pb-3 border-b border-default last:border-b-0 last:pb-0"
          >
            <div>
              <p class="font-display font-bold uppercase text-lg">{{ artist.name }}</p>
              <p class="font-mono text-xs text-muted">{{ artist.genre }} · {{ artist.fee }}</p>
            </div>
            <UBadge :label="artist.status" :color="artist.status === 'Taking dates' ? 'success' : 'warning'" />
          </div>
        </div>
      </div>

      <!-- Artists Selection -->
      <div class="flex flex-col gap-3">
        <label class="font-mono text-xs tracking-[.08em] text-primary">SELECT ARTISTS</label>
        <div class="space-y-2">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
            <UButton
              v-for="option in artistOptions"
              :key="option.value"
              :label="option.label"
              :variant="formData.selectedArtists.includes(option.value) ? 'solid' : 'outline'"
              color="neutral"
              size="sm"
              class="text-left whitespace-normal h-auto py-2.5 px-3 font-mono text-[11px]"
              @click="toggleArtist(option.value)"
            />
          </div>
        </div>
        <p v-if="formData.selectedArtists.length > 0" class="font-mono text-xs text-muted">
          {{ formData.selectedArtists.length }} artist{{ formData.selectedArtists.length !== 1 ? 's' : '' }} selected
        </p>
      </div>

      <!-- Date -->
      <div class="flex flex-col gap-3">
        <label class="font-mono text-xs tracking-[.08em] text-primary">EVENT DATE *</label>
        <UInput
          v-model="formData.date"
          type="date"
          placeholder="Select a date"
          :ui="{ base: 'placeholder-muted' }"
        />
      </div>

      <!-- Venue Information -->
      <div class="flex flex-col gap-3">
        <label class="font-mono text-xs tracking-[.08em] text-primary">VENUE NAME *</label>
        <UInput
          v-model="formData.venue"
          placeholder="e.g., Bunker 9"
          :ui="{ base: 'placeholder-muted' }"
        />
      </div>

      <div class="flex flex-col gap-3">
        <label class="font-mono text-xs tracking-[.08em] text-primary">CITY *</label>
        <UInput
          v-model="formData.city"
          placeholder="e.g., Berlin"
          :ui="{ base: 'placeholder-muted' }"
        />
      </div>

      <div class="flex flex-col gap-3">
        <label class="font-mono text-xs tracking-[.08em] text-primary">CAPACITY</label>
        <UInput
          v-model="formData.capacity"
          placeholder="e.g., 500"
          type="number"
          :ui="{ base: 'placeholder-muted' }"
        />
      </div>

      <!-- Notes -->
      <div class="flex flex-col gap-3">
        <label class="font-mono text-xs tracking-[.08em] text-primary">ADDITIONAL NOTES</label>
        <UTextarea
          v-model="formData.notes"
          placeholder="Any special requests, venue details, or sound system info..."
          :rows="6"
          :ui="{ base: 'placeholder-muted' }"
        />
      </div>

      <!-- Submit Button -->
      <UButton
        :disabled="!isFormValid"
        size="xl"
        label="Send Booking Inquiry"
        class="font-semibold w-full sm:w-auto"
        @click="handleSubmit"
      />
      <p class="font-mono text-xs text-muted">
        * Required fields. We'll reply within 48 hours.
      </p>
    </div>

    <!-- Sidebar Info -->
    <div class="flex flex-col gap-8">
      <div class="bg-elevated p-6 border border-default">
        <span class="font-mono text-xs tracking-[.08em] text-primary block mb-4">HOW IT WORKS</span>
        <div class="space-y-4 text-sm text-toned">
          <div>
            <p class="font-semibold text-default mb-1">1. Select Artists</p>
            <p>Choose one or multiple artists from our roster.</p>
          </div>
          <div>
            <p class="font-semibold text-default mb-1">2. Your Details</p>
            <p>Tell us your event date, venue, and location.</p>
          </div>
          <div>
            <p class="font-semibold text-default mb-1">3. We Reply</p>
            <p>We confirm availability and discuss fees within 48 hours.</p>
          </div>
        </div>
      </div>

      <div class="bg-elevated p-6 border border-default">
        <span class="font-mono text-xs tracking-[.08em] text-primary block mb-4">KEY INFO</span>
        <div class="space-y-3 text-sm">
          <div>
            <p class="font-mono text-xs text-muted mb-1">LEAD TIME</p>
            <p>4–12 weeks depending on artist</p>
          </div>
          <div>
            <p class="font-mono text-xs text-muted mb-1">FEES</p>
            <p>€1,000–6,000 depending on artist</p>
          </div>
          <div>
            <p class="font-mono text-xs text-muted mb-1">QUESTIONS?</p>
            <p><a href="mailto:bookings@sublevel.agency" class="text-primary hover:underline">bookings@sublevel.agency</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { artists } from '~/data/artists'

useSeoMeta({ title: 'Book an Artist — Sublevel' })

const formData = reactive({
  selectedArtists: [] as string[],
  date: '',
  venue: '',
  city: '',
  capacity: '',
  notes: ''
})

const artistOptions = computed(() =>
  artists.map(a => ({ value: a.slug, label: `${a.name} — ${a.genre}`, artist: a }))
)

const selectedArtistsData = computed(() =>
  artists.filter(a => formData.selectedArtists.includes(a.slug))
)

const isFormValid = computed(() =>
  formData.selectedArtists.length > 0 && formData.date && formData.venue && formData.city
)

const toggleArtist = (slug: string) => {
  const idx = formData.selectedArtists.indexOf(slug)
  if (idx === -1) {
    formData.selectedArtists.push(slug)
  } else {
    formData.selectedArtists.splice(idx, 1)
  }
}

const handleSubmit = async () => {
  if (!isFormValid.value) return

  const subject = `Booking inquiry: ${selectedArtistsData.value.map(a => a.name).join(', ')}`
  const body = `
Date requested: ${formData.date}
Venue: ${formData.venue}
City: ${formData.city}
Capacity: ${formData.capacity || 'Not specified'}

Artists requested:
${selectedArtistsData.value.map(a => `- ${a.name} (${a.fee})`).join('\n')}

Additional notes:
${formData.notes || 'None'}
  `.trim()

  const mailtoLink = `mailto:bookings@sublevel.agency?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = mailtoLink
}
</script>
