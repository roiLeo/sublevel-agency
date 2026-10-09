<template>
  <section id="inquiry" class="mx-10 mt-24 py-14 border-t border-primary grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
    <h2 class="font-display font-black uppercase text-7xl lg:text-8xl leading-[.86]">Got a room<br>and a date?</h2>
    <div class="flex flex-col gap-5">
      <p class="text-[17px] leading-relaxed text-toned">
        Tell us the city, capacity and night. We reply with availability and fees within 48 hours.
      </p>
      <div class="flex flex-wrap gap-4 items-center">
        <UButton to="mailto:bookings@sublevel.agency" size="xl" label="Send an inquiry" class="font-semibold" />
        <span class="font-mono text-[13px]">bookings@sublevel.agency</span>
      </div>
    </div>
  </section>
</template>
