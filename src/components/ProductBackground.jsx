import { useEffect, useRef } from 'react'
import styles from './ProductBackground.module.css'

function createRainEffect(ctx, w, h) {
  const drops = Array.from({ length: 80 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    len: 12 + Math.random() * 18,
    speed: 4 + Math.random() * 4,
    opacity: 0.08 + Math.random() * 0.12,
  }))

  return () => {
    ctx.clearRect(0, 0, w, h)
    for (const d of drops) {
      ctx.beginPath()
      ctx.moveTo(d.x, d.y)
      ctx.lineTo(d.x + 1, d.y + d.len)
      ctx.strokeStyle = `rgba(180, 160, 130, ${d.opacity})`
      ctx.lineWidth = 1
      ctx.stroke()
      d.y += d.speed
      if (d.y > h) {
        d.y = -d.len
        d.x = Math.random() * w
      }
    }
  }
}

function createCloudEffect(ctx, w, h) {
  const puffs = Array.from({ length: 25 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 40 + Math.random() * 80,
    speed: 0.15 + Math.random() * 0.3,
    opacity: 0.03 + Math.random() * 0.04,
    phase: Math.random() * Math.PI * 2,
  }))

  let t = 0
  return () => {
    ctx.clearRect(0, 0, w, h)
    t += 0.008
    for (const p of puffs) {
      const yOff = Math.sin(t + p.phase) * 8
      ctx.beginPath()
      ctx.arc(p.x, p.y + yOff, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(160, 170, 180, ${p.opacity})`
      ctx.fill()
      p.x += p.speed
      if (p.x - p.r > w) {
        p.x = -p.r
        p.y = Math.random() * h
      }
    }
  }
}

function createEarthEffect(ctx, w, h) {
  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * w,
    y: h + Math.random() * 20,
    size: 2 + Math.random() * 4,
    speed: 0.3 + Math.random() * 0.6,
    drift: (Math.random() - 0.5) * 0.4,
    opacity: 0.06 + Math.random() * 0.1,
    phase: Math.random() * Math.PI * 2,
  }))

  let t = 0
  return () => {
    ctx.clearRect(0, 0, w, h)
    t += 0.01
    for (const p of particles) {
      const xOff = Math.sin(t + p.phase) * 6
      ctx.beginPath()
      ctx.arc(p.x + xOff, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(140, 110, 70, ${p.opacity})`
      ctx.fill()
      p.y -= p.speed
      p.x += p.drift
      if (p.y < -10) {
        p.y = h + 10
        p.x = Math.random() * w
      }
    }
  }
}

function createSandEffect(ctx, w, h) {
  const grains = Array.from({ length: 60 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: 1.5 + Math.random() * 2.5,
    speedX: 0.5 + Math.random() * 1,
    speedY: 0.1 + Math.random() * 0.3,
    opacity: 0.06 + Math.random() * 0.08,
    wave: Math.random() * Math.PI * 2,
  }))

  let t = 0
  return () => {
    ctx.clearRect(0, 0, w, h)
    t += 0.012
    for (const g of grains) {
      const yOff = Math.sin(t + g.wave) * 12
      ctx.beginPath()
      ctx.arc(g.x, g.y + yOff, g.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(190, 170, 130, ${g.opacity})`
      ctx.fill()
      g.x += g.speedX
      g.y += g.speedY
      if (g.x > w + 10) {
        g.x = -10
        g.y = Math.random() * h
      }
      if (g.y > h + 10) {
        g.y = -10
      }
    }
  }
}

const effects = {
  'first-rain': createRainEffect,
  'cloud-rain': createCloudEffect,
  'after-rain': createEarthEffect,
  'sand-rain': createSandEffect,
}

export default function ProductBackground({ slug }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const parent = canvas.parentElement
    let raf

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.scale(dpr, dpr)
    }

    resize()

    const createEffect = effects[slug]
    if (!createEffect) return

    const rect = parent.getBoundingClientRect()
    const tick = createEffect(ctx, rect.width, rect.height)

    const loop = () => {
      tick()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [slug])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
