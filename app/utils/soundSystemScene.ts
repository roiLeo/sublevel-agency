import * as THREE from 'three'

const ACCENT = '#ff4d1f'
const PI = Math.PI // three r155+ uses physical light units; multiply legacy intensities by PI

function coneTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 512
  const g = c.getContext('2d')!
  const gr = g.createRadialGradient(256, 256, 10, 256, 256, 256)
  gr.addColorStop(0, '#2c2c2a'); gr.addColorStop(0.18, '#0a0a0a'); gr.addColorStop(0.55, '#1c1c1b')
  gr.addColorStop(0.9, '#0e0e0e'); gr.addColorStop(0.96, '#333331'); gr.addColorStop(1, '#111')
  g.fillStyle = gr; g.beginPath(); g.arc(256, 256, 256, 0, PI * 2); g.fill()
  g.fillStyle = 'rgba(0,0,0,.55)'
  for (let y = 6; y < 512; y += 9) for (let x = (y / 9) % 2 ? 6 : 10.5; x < 512; x += 9) {
    if ((x - 256) ** 2 + (y - 256) ** 2 < 236 ** 2) { g.beginPath(); g.arc(x, y, 2.6, 0, PI * 2); g.fill() }
  }
  g.strokeStyle = '#3a3a37'; g.lineWidth = 8; g.beginPath(); g.arc(256, 256, 244, 0, PI * 2); g.stroke()
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace
  return t
}

function bannerTexture(text: string) {
  const c = document.createElement('canvas'); c.width = 2048; c.height = 128
  const g = c.getContext('2d')!
  const draw = () => {
    g.fillStyle = '#161615'; g.fillRect(0, 0, 2048, 128)
    g.fillStyle = ACCENT; g.textAlign = 'center'; g.textBaseline = 'middle'
    g.font = '800 92px "Big Shoulders Display", sans-serif'
    const words = text.split(' '), step = 2048 / words.length
    words.forEach((w, i) => g.fillText(w, step * (i + 0.5), 68))
  }
  draw()
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8
  document.fonts?.ready.then(() => { draw(); t.needsUpdate = true })
  return t
}

export function mountSoundSystem(el: HTMLElement, opts: { text?: string } = {}) {
  const text = opts.text ?? 'SUBLEVEL SOUND SYSTEM'
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1))
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%'
  el.appendChild(renderer.domElement)
  const scene = new THREE.Scene()
  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
  const size = () => {
    const w = el.clientWidth || 1, h = el.clientHeight || 1
    renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix()
  }
  size()
  const ro = new ResizeObserver(size); ro.observe(el)

  scene.add(new THREE.AmbientLight(0xffffff, 0.12 * PI))
  const key = new THREE.DirectionalLight(0xffffff, 1.25 * PI); key.position.set(3, 7, 8); scene.add(key)
  const rim = new THREE.PointLight(ACCENT, 4 * PI, 18, 0); rim.position.set(-3.5, 3.5, -2.5); scene.add(rim)
  const glow = new THREE.PointLight(ACCENT, 0, 8, 0); glow.position.set(0, 0.4, 2.6); scene.add(glow)

  const wood = new THREE.MeshStandardMaterial({ color: 0x141413, roughness: 0.88, metalness: 0.05 })
  const inner = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.95 })
  const hornMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.7, side: THREE.DoubleSide })
  const edgeMat = new THREE.LineBasicMaterial({ color: 0x3a3a36 })
  const coneMat = new THREE.MeshStandardMaterial({ map: coneTexture(), roughness: 0.7, metalness: 0.2 })
  const metal = new THREE.MeshStandardMaterial({ color: 0x8a8a84, roughness: 0.35, metalness: 0.8 })
  const T = 0.035
  const root = new THREE.Group(); scene.add(root)
  const drivers: Record<'low' | 'mid' | 'high', THREE.Mesh[]> = { low: [], mid: [], high: [] }

  const panel = (g: THREE.Group, w: number, h: number, d: number, x: number, y: number, z: number, m: THREE.Material = wood) => {
    const p = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); p.position.set(x, y, z); g.add(p); return p
  }
  const shell = (w: number, h: number, d: number) => {
    const g = new THREE.Group()
    panel(g, w, T, d, 0, h / 2 - T / 2, 0); panel(g, w, T, d, 0, -h / 2 + T / 2, 0)
    panel(g, T, h, d, -w / 2 + T / 2, 0, 0); panel(g, T, h, d, w / 2 - T / 2, 0, 0)
    panel(g, w - 2 * T, h - 2 * T, T, 0, 0, -d / 2 + T / 2, inner)
    g.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), edgeMat))
    return g
  }
  const driver = (r: number, kind: 'low' | 'mid' | 'high') => {
    const g = new THREE.Group()
    g.add(new THREE.Mesh(new THREE.RingGeometry(r * 0.96, r * 1.06, 48), metal))
    const c = new THREE.Mesh(new THREE.CircleGeometry(r, 48), coneMat); c.position.z = -0.005; g.add(c)
    drivers[kind].push(c); return g
  }
  const place = (g: THREE.Group, x: number, y: number) => { g.position.set(x, y, 0); root.add(g) }

  // Tier 1 — scoop bins: driver baffle on top, mouth below split by a "+" divider
  const bw = 1.0, bh = 1.6, bd = 1.0
  for (let i = 0; i < 4; i++) {
    const g = shell(bw, bh, bd), baffleH = bh * 0.42, baffleY = bh / 2 - baffleH / 2 - T
    panel(g, bw - 2 * T, baffleH, T, 0, baffleY, bd / 2 - 0.08)
    const d = driver(0.31, 'low'); d.position.set(0, baffleY, bd / 2 - 0.06); g.add(d)
    const mouthTop = baffleY - baffleH / 2, mouthBot = -bh / 2 + T
    const mouthY = (mouthTop + mouthBot) / 2, mouthH = mouthTop - mouthBot
    const divBack = -bd / 2 + T, divFront = bd / 2 - 0.08 + T / 2
    const divD = divFront - divBack, divZ = (divFront + divBack) / 2
    panel(g, T * 0.6, mouthH, divD, 0, mouthY, divZ)
    panel(g, bw - 2 * T, T * 0.6, divD, 0, mouthY, divZ)
    place(g, (i - 1.5) * (bw + 0.02), bh / 2)
  }
  // Tier 2 — folded mid horns: open mouth at the bottom, closed chamber above
  const mw = 0.92, mh = 0.95, md = 0.9
  for (let i = 0; i < 4; i++) {
    const g = shell(mw, mh, md)
    const innerBot = -mh / 2 + T, innerTop = mh / 2 - T, mouthTop = innerBot + mh * 0.55
    const mouthY = (innerBot + mouthTop) / 2, mouthH = mouthTop - innerBot
    for (const s of [-1, 1]) panel(g, T * 0.6, mouthH, md * 0.75, s * 0.13, mouthY, 0.02)
    panel(g, mw - 2 * T, T * 0.7, md * 0.5, 0, -mh * 0.1, -md * 0.2, inner)
    panel(g, mw - 2 * T, T, md - T, 0, mouthTop + T / 2, T / 2)
    const capH = innerTop - mouthTop
    panel(g, mw - 2 * T, capH, T, 0, mouthTop + capH / 2, md / 2 - T / 2)
    place(g, (i - 1.5) * (mw + 0.02), bh + mh / 2)
  }
  // Name board
  const bannerH = 0.24, bannerW = 4 * (mw + 0.02) - 0.02
  const bannerFace = new THREE.MeshStandardMaterial({ map: bannerTexture(text), roughness: 0.7, emissive: ACCENT, emissiveIntensity: 0 })
  const banner = new THREE.Mesh(new THREE.BoxGeometry(bannerW, bannerH, 0.32), [wood, wood, wood, wood, bannerFace, wood])
  banner.position.set(0, bh + mh + bannerH / 2, 0.2); root.add(banner)
  // Tier 3 — mid boxes
  const tw = 0.82, th = 0.68, td = 0.75
  for (let i = 0; i < 4; i++) {
    const g = shell(tw, th, td)
    const d = driver(0.2, 'mid'); d.position.set(0, -0.02, -td / 2 + T + 0.01); g.add(d)
    place(g, (i - 1.5) * (tw + 0.02), bh + mh + bannerH + th / 2)
  }
  // Tier 4 — high horns
  const hw = 0.95, hh = 0.62, hd = 0.65
  for (let i = 0; i < 2; i++) {
    const g = shell(hw, hh, hd)
    const z0 = -hd / 2 + 0.08, z1 = hd / 2 - 0.02, zc = (z0 + z1) / 2, dz = z1 - z0
    const ty = 0.03, my = 0.21, tx = 0.07, mx = 0.4, cy = -0.06
    const ay = Math.atan2(my - ty, dz), ax = Math.atan2(mx - tx, dz)
    const Ly = Math.hypot(dz, my - ty), Lx = Math.hypot(dz, mx - tx)
    for (const s of [-1, 1]) {
      panel(g, mx * 2, 0.02, Ly, 0, cy + s * (ty + my) / 2, zc, hornMat).rotation.x = -s * ay
      panel(g, 0.02, my * 2, Lx, s * (tx + mx) / 2, cy, zc, hornMat).rotation.y = s * ax
    }
    panel(g, T * 0.5, my * 1.6, dz * 0.6, 0, cy, zc + dz * 0.15, inner)
    for (let k = 0; k < 4; k++) { const d = driver(0.04, 'high'); d.position.set(-0.3 + k * 0.2, hh / 2 - 0.08, hd / 2 + 0.002); g.add(d) }
    place(g, (i - 0.5) * (hw + 0.02), bh + mh + bannerH + th + hh / 2)
  }
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(14, 8), new THREE.MeshStandardMaterial({ color: 0x0b0b0a, roughness: 0.9 }))
  floor.rotation.x = -PI / 2; scene.add(floor)

  cam.position.set(2.6, 2.5, 9.4); cam.lookAt(0, 2.05, 0)
  let mx = 0, my = 0, pump = 0, raf = 0, alive = true, last = performance.now(), t = 0
  const onMove = (e: PointerEvent) => {
    const b = el.getBoundingClientRect()
    mx = (e.clientX - b.left) / b.width - 0.5; my = (e.clientY - b.top) / b.height - 0.5
  }
  el.addEventListener('pointermove', onMove)
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const loop = (now: number) => {
    if (!alive) return
    t += Math.min(0.05, (now - last) / 1000); last = now
    const s = previewLoop.bands(t), on = previewLoop.playing
    pump += (s.low - pump) * 0.5
    drivers.low.forEach(c => (c.position.z = -0.005 + pump * pump * 0.09))
    drivers.mid.forEach((c, i) => (c.position.z = s.mid * 0.05 * (1 + 0.2 * Math.sin(t * 9 + i))))
    drivers.high.forEach(c => c.scale.setScalar(1 + s.high * 0.6))
    bannerFace.emissiveIntensity = on ? pump * 0.25 : 0
    glow.intensity = on ? pump * 3 * PI : 0
    rim.intensity = (3 + pump * 3) * PI
    root.position.z = on ? pump * pump * 0.03 : 0
    if (!reduced) {
      root.rotation.y += ((-0.32 + mx * 0.45) - root.rotation.y) * 0.05
      cam.position.y += ((2.5 - my * 1.2) - cam.position.y) * 0.05
    } else root.rotation.y = -0.32
    cam.lookAt(0, 2.05, 0)
    renderer.render(scene, cam)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  return () => {
    alive = false; cancelAnimationFrame(raf); ro.disconnect()
    el.removeEventListener('pointermove', onMove)
    scene.traverse((o) => {
      const m = o as THREE.Mesh
      m.geometry?.dispose()
      const mat = m.material as THREE.Material | THREE.Material[] | undefined
      ;(Array.isArray(mat) ? mat : mat ? [mat] : []).forEach(x => x.dispose())
    })
    renderer.dispose(); renderer.domElement.remove()
  }
}
