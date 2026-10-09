// Tiny Web Audio techno loop routed through an analyser.
// Replace with a real <audio> element (MediaElementSource -> analyser) when artist previews exist.
type Listener = (playing: boolean) => void

let ac: AudioContext | null = null
let master: GainNode, analyser: AnalyserNode, freq: Uint8Array, noiseBuf: AudioBuffer
let timer: ReturnType<typeof setInterval> | null = null
let nextT = 0, step = 0, playing = false
const subs = new Set<Listener>()
const BPM = 165
const bassNotes = [36, 36, 39, 36, 34, 36, 41, 39]
const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12)

function init() {
  ac = new AudioContext()
  master = ac.createGain(); master.gain.value = 0.55
  analyser = ac.createAnalyser(); analyser.fftSize = 256; analyser.smoothingTimeConstant = 0.72
  freq = new Uint8Array(analyser.frequencyBinCount)
  master.connect(analyser); analyser.connect(ac.destination)
  noiseBuf = ac.createBuffer(1, ac.sampleRate * 0.5, ac.sampleRate)
  const d = noiseBuf.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
}
function kick(t: number, depth = 0.12) {
  const o = ac!.createOscillator(), g = ac!.createGain()
  o.frequency.setValueAtTime(155, t); o.frequency.exponentialRampToValueAtTime(35, t + depth)
  g.gain.setValueAtTime(1, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.48)
  o.connect(g).connect(master); o.start(t); o.stop(t + 0.52)
}
function clap(t: number) {
  const s = ac!.createBufferSource(); s.buffer = noiseBuf
  const f = ac!.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 4200
  const g = ac!.createGain(); g.gain.setValueAtTime(0.8, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.12)
  s.connect(f).connect(g).connect(master); s.start(t); s.stop(t + 0.14)
}
function hat(t: number, v: number) {
  const s = ac!.createBufferSource(); s.buffer = noiseBuf
  const f = ac!.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 8000
  const g = ac!.createGain(); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
  s.connect(f).connect(g).connect(master); s.start(t); s.stop(t + 0.08)
}
function bass(t: number, n: number) {
  const o = ac!.createOscillator(); o.type = 'sine'; o.frequency.value = midi(n)
  const f = ac!.createBiquadFilter(); f.type = 'lowpass'; f.Q.value = 14
  f.frequency.setValueAtTime(980, t); f.frequency.exponentialRampToValueAtTime(120, t + 0.15)
  const g = ac!.createGain(); g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(0.38, t + 0.006); g.gain.exponentialRampToValueAtTime(0.001, t + 0.26)
  o.connect(f).connect(g).connect(master); o.start(t); o.stop(t + 0.28)
}
function schedule() {
  const s16 = 60 / BPM / 4
  while (nextT < ac!.currentTime + 0.12) {
    const s = step % 32

    // Four-on-the-floor kicks
    if (s === 0 || s === 8 || s === 16 || s === 24) kick(nextT)
    if (s === 4 || s === 12 || s === 18 || s === 22) kick(nextT)

    // Tribal percs & claps
    if (s === 4 || s === 12 || s === 20 || s === 28) clap(nextT)
    if (s === 6 || s === 14 || s === 22 || s === 30) clap(nextT)

    // Dense hi-hat layer
    if (s % 2 === 0) hat(nextT, 0.12); else if (s % 4 === 1) hat(nextT, 0.07)

    // Dark bass: syncopated with kicks
    if (s === 0 || s === 8 || s === 16 || s === 24)
      bass(nextT, bassNotes[(step >> 2) % 8]!)
    if (s === 4 || s === 12 || s === 20 || s === 28)
      bass(nextT, bassNotes[(step >> 2) % 8]! - 5)

    nextT += s16; step++
  }
}

export const previewLoop = {
  toggle() {
    if (!ac) init()
    if (playing) { if (timer) clearInterval(timer); playing = false }
    else { ac!.resume(); nextT = ac!.currentTime + 0.06; step = 0; timer = setInterval(schedule, 25); playing = true }
    subs.forEach(f => f(playing))
    return playing
  },
  get playing() { return playing },
  onChange(f: Listener) { subs.add(f); return () => { subs.delete(f) } },
  bins() {
    if (!playing || !analyser) return null
    analyser.getByteFrequencyData(freq as Uint8Array<ArrayBuffer>)
    return freq
  },
  bands(t: number) {
    if (!playing || !analyser) return { low: 0.15 + 0.05 * Math.sin(t * 1.3), mid: 0.12, high: 0.08 }
    analyser.getByteFrequencyData(freq as Uint8Array<ArrayBuffer>)
    const avg = (a: number, z: number) => { let s = 0; for (let i = a; i < z; i++) s += freq[i]!; return s / (z - a) / 255 }
    return { low: avg(1, 6), mid: avg(8, 40), high: avg(50, 100) }
  }
}
