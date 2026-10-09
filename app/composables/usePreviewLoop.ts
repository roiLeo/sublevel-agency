export function usePreviewLoop() {
  const playing = useState('preview-loop-playing', () => false)
  let off: (() => void) | undefined
  onMounted(() => { off = previewLoop.onChange(p => (playing.value = p)) })
  onBeforeUnmount(() => off?.())
  return { playing, toggle: () => previewLoop.toggle() }
}
