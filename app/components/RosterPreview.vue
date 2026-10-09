<script setup lang="ts">
import { artists } from '~/data/artists'
const preview = artists.slice(0, 4)
</script>

<template>
  <section class="px-6 sm:px-10 pt-18">
    <div class="flex justify-between items-end pb-6">
      <h2 class="font-display font-extrabold uppercase text-6xl leading-[.9]">The roster</h2>
      <NuxtLink to="/roster" class="text-sm font-medium border-b border-primary pb-1 hover:text-primary">View all artists →</NuxtLink>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
      <ArtistCard v-for="a in preview" :key="a.slug" :artist="a" />
    </div>
  </section>
</template>
