<script setup lang="ts">
const links = [
  { label: 'Roster', to: '/roster' },
  { label: 'Dates', to: '/dates' },
  { label: 'Book', to: '/book' }
]
</script>

<template>
  <header class="h-(--header-h) shrink-0 flex items-center justify-between px-6 sm:px-10 border-b border-default">
    <NuxtLink to="/" class="flex items-baseline gap-3">
      <span class="font-display font-extrabold text-[28px] leading-none tracking-[.04em]">SUBLEVEL</span>
      <span class="hidden sm:inline font-mono text-[11px] tracking-[.06em] text-muted">ARTIST BOOKING</span>
    </NuxtLink>
    <nav class="hidden md:flex gap-8 text-sm font-medium">
      <NuxtLink v-for="l in links" :key="l.label" :to="l.to" active-class="text-primary" class="hover:text-primary transition-colors">
        {{ l.label }}
      </NuxtLink>
    </nav>
    <UButton to="/book" label="Book an artist" class="font-semibold" />
  </header>
</template>
