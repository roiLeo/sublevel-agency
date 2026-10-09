import * as THREE from 'three'

export function mountRing(el: HTMLElement, accent = '#ff4d1f') {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%'
  el.appendChild(renderer.domElement)
  const scene = new THREE.Scene()
  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
  cam.position.set(0, -0.6, 7.2); cam.lookAt(0, 0, 0)
  const size = () => { const w = el.clientWidth || 1, h = el.clientHeight || 1; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix() }
  size(); const ro = new ResizeObserver(size); ro.observe(el)

  const g = new THREE.Group(); scene.add(g)
  const N = 72, R = 1.15, bars: THREE.Mesh[] = []
  const geo = new THREE.BoxGeometry(0.045, 1, 0.045); geo.translate(0, 0.5, 0)
  const col = new THREE.MeshBasicMaterial({ color: accent }), dim = new THREE.MeshBasicMaterial({ color: '#ecebe4' })
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2
    const m = new THREE.Mesh(geo, i % 2 ? col : dim)
    m.position.set(Math.cos(a) * R, Math.sin(a) * R, 0); m.rotation.z = a - Math.PI / 2
    g.add(m); bars.push(m)
  }
  g.add(new THREE.Mesh(new THREE.RingGeometry(R - 0.04, R - 0.02, 128), new THREE.MeshBasicMaterial({ color: '#ecebe4', transparent: true, opacity: 0.5 })))
  const core = new THREE.Mesh(new THREE.CircleGeometry(0.8, 64), col); g.add(core)
  const hole = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.22, 64), new THREE.MeshBasicMaterial({ color: '#0b0b0a' })); hole.position.z = 0.01; g.add(hole)

  let raf = 0, alive = true, last = performance.now(), t = 0
  const loop = (now: number) => {
    if (!alive) return
    t += Math.min(0.05, (now - last) / 1000); last = now
    const s = previewLoop.bands(t), b = previewLoop.bins()
    for (let i = 0; i < N; i++) {
      const k = i < N / 2 ? i : N - 1 - i
      const v = b ? b[2 + Math.floor(k * 1.6)]! / 255 : 0.12 + 0.08 * Math.sin(t * 2 + i * 0.4) * Math.sin(t * 0.7 + i * 0.13)
      const bar = bars[i]!; bar.scale.y += (0.06 + v * v * 1.6 - bar.scale.y) * 0.35
    }
    const p = 1 + s.low * 0.18; core.scale.set(p, p, 1)
    g.rotation.z -= 0.003 + s.mid * 0.01
    g.rotation.x = Math.sin(t * 0.4) * 0.12; g.rotation.y = Math.cos(t * 0.3) * 0.12
    renderer.render(scene, cam)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
  return () => { alive = false; cancelAnimationFrame(raf); ro.disconnect(); geo.dispose(); renderer.dispose(); renderer.domElement.remove() }
}
