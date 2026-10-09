<template>
  <UApp>
    <div class="min-h-screen bg-default text-default flex flex-col">
      <!-- Header + hero + strip fill exactly one screen on desktop -->
      <div class="flex flex-col min-h-svh lg:h-svh">
        <AppHeader />
        <StackHero />
        <NowStrip />
      </div>

      <main class="flex-1 px-6 sm:px-10 py-12">
        <NuxtPage />
      </main>
  
      <AppFooter />
    </div>
  </UApp>
</template>