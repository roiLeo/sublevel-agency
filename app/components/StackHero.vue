<template>
  <section class="flex-1 min-h-0 grid lg:grid-cols-[1fr_1.15fr]">
    <div class="flex flex-col justify-between gap-12 px-6 sm:px-10 pt-14 lg:pt-18 pb-14 lg:pr-0">
      <div class="flex flex-col gap-7">
        <span class="font-mono text-xs tracking-[.08em] text-muted">UNDERGROUND ELECTRONIC · PARIS / ROUBAIX / LANAS</span>
        <h1 class="font-display font-black uppercase text-7xl sm:text-8xl lg:text-[clamp(88px,14svh,140px)] leading-[.84]">
          We book<br>the<br><span class="text-primary">basement.</span>
        </h1>
      </div>
      <div class="flex flex-col gap-7">
        <p class="max-w-110 text-lg leading-relaxed text-toned text-pretty">
          Sublevel represents DJs and live acts from the techno, electro and bass undergrounds.
          Promoters and venues book them through one inbox.
        </p>
        <div class="flex flex-wrap gap-3">
          <UButton to="/roster" size="xl" label="Browse the roster" class="font-semibold" />
          <UButton to="#inquiry" size="xl" color="neutral" variant="outline" label="Send an inquiry" class="font-semibold" />
        </div>
      </div>
    </div>

    <div class="relative h-[70svh] lg:h-auto">
      <ClientOnly>
        <SoundSystemStack />
      </ClientOnly>
      <PlayControl :playing="playing" title="Run the system" class="absolute right-6 sm:right-10 bottom-8" @toggle="toggle" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { playing, toggle } = usePreviewLoop()
</script>
