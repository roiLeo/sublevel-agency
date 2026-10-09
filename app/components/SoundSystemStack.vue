<script setup lang="ts">
const el = ref<HTMLElement>()
let dispose: (() => void) | undefined

onMounted(async () => {
  const { mountSoundSystem } = await import('~/utils/soundSystemScene')
  if (el.value) dispose = mountSoundSystem(el.value)
})
onBeforeUnmount(() => dispose?.())
</script>

<template>
  <div ref="el" class="absolute inset-0" aria-hidden="true" />
</template>
