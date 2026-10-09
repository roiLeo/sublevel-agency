<script setup lang="ts">
const el = ref<HTMLElement>()
let dispose: (() => void) | undefined
onMounted(async () => {
  const { mountRing } = await import('~/utils/ringScene')
  if (el.value) dispose = mountRing(el.value)
})
onBeforeUnmount(() => dispose?.())
</script>

<template>
  <div ref="el" class="size-full" aria-hidden="true" />
</template>
