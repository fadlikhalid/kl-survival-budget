// All sounds are synthesised with the Web Audio API: no audio files to load or host.
const MUTE_KEY = 'kl-survival-muted'

let ctx = null
let muted = readMuted()

function readMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === '1'
  } catch {
    return false
  }
}

export function isMuted() {
  return muted
}

export function setMuted(value) {
  muted = value
  try {
    localStorage.setItem(MUTE_KEY, value ? '1' : '0')
  } catch {
    // Storage blocked: the choice lasts for this visit only.
  }
}

// Browsers only allow audio after a tap, so the context is created lazily inside handlers.
function getContext() {
  if (muted) return null
  const Ctor = window.AudioContext || window.webkitAudioContext
  if (!Ctor) return null
  if (!ctx) ctx = new Ctor()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone({ freq, to = freq, start = 0, length = 0.15, type = 'square', volume = 0.12 }) {
  const audio = getContext()
  if (!audio) return
  const t0 = audio.currentTime + start
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  if (to !== freq) osc.frequency.exponentialRampToValueAtTime(to, t0 + length)
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + length)
  osc.connect(gain).connect(audio.destination)
  osc.start(t0)
  osc.stop(t0 + length + 0.02)
}

function notes(list, step, options) {
  list.forEach((freq, index) => tone({ freq, start: index * step, ...options }))
}

export const sfx = {
  pick(index = 0) {
    tone({ freq: 440 + index * 110, to: 660 + index * 110, length: 0.08, type: 'triangle' })
  },
  play() {
    tone({ freq: 200, to: 700, length: 0.18, type: 'sawtooth', volume: 0.08 })
  },
  tick(step = 0) {
    tone({ freq: 500 + (step % 4) * 90, length: 0.04, type: 'square', volume: 0.06 })
  },
  land() {
    tone({ freq: 330, length: 0.12, type: 'triangle' })
  },
  loss() {
    notes([330, 262], 0.1, { length: 0.16, type: 'sawtooth', volume: 0.1 })
  },
  hit() {
    tone({ freq: 140, to: 40, length: 0.35, type: 'sine', volume: 0.35 })
    notes([260, 196, 147], 0.09, { length: 0.18, type: 'sawtooth', volume: 0.09 })
  },
  gain() {
    notes([523, 659, 784, 1047], 0.07, { length: 0.14, type: 'triangle', volume: 0.14 })
  },
  win() {
    notes([523, 659, 784, 659, 784, 1047], 0.11, { length: 0.22, type: 'square', volume: 0.1 })
    tone({ freq: 1047, start: 0.7, length: 0.6, type: 'triangle', volume: 0.14 })
  },
  lose() {
    notes([392, 370, 349, 330], 0.2, { length: 0.3, type: 'sawtooth', volume: 0.1 })
    tone({ freq: 110, to: 70, start: 0.85, length: 0.6, type: 'sawtooth', volume: 0.12 })
  },
  copy() {
    notes([880, 1175], 0.06, { length: 0.08, type: 'triangle', volume: 0.1 })
  },
}
