import { useEffect, useRef } from 'react'

export default function AviationBackground() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // --- Particles (stars / data points) ---
    const particles = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.6,
      opacity: Math.random() * 0.55 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.004 + Math.random() * 0.008,
    }))

    // --- Flight paths (curved arcs) ---
    const paths = Array.from({ length: 6 }, (_, i) => ({
      progress: Math.random(),
      speed: 0.00018 + Math.random() * 0.00012,
      startX: Math.random() * canvas.width * 0.3,
      startY: 200 + i * (canvas.height / 6),
      endX: canvas.width * 0.7 + Math.random() * canvas.width * 0.3,
      endY: 150 + i * (canvas.height / 6) + (Math.random() - 0.5) * 200,
      cpX: canvas.width * 0.5 + (Math.random() - 0.5) * 300,
      cpY: 100 + i * (canvas.height / 5) + (Math.random() - 0.5) * 150,
      trailLength: 0.14 + Math.random() * 0.08,
      opacity: 0.22 + Math.random() * 0.16,
    }))

    // --- Radar rings ---
    const radar = {
      x: canvas.width * 0.82,
      y: canvas.height * 0.18,
      maxR: 180,
      sweep: 0,
      sweepSpeed: 0.004,
      blips: Array.from({ length: 5 }, () => ({
        angle: Math.random() * Math.PI * 2,
        dist: 40 + Math.random() * 130,
        opacity: 0,
      })),
    }

    function bezierPoint(t, x0, y0, cx, cy, x1, y1) {
      const mt = 1 - t
      return {
        x: mt * mt * x0 + 2 * mt * t * cx + t * t * x1,
        y: mt * mt * y0 + 2 * mt * t * cy + t * t * y1,
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const W = canvas.width
      const H = canvas.height

      // --- Particles ---
      particles.forEach(p => {
        p.pulse += p.pulseSpeed
        const a = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse))
        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,220,255,${a})`
        ctx.fill()
        ctx.restore()
      })

      // --- Flight paths ---
      paths.forEach(path => {
        path.progress += path.speed
        if (path.progress > 1 + path.trailLength) path.progress = -path.trailLength

        const t = path.progress
        const tStart = Math.max(0, t - path.trailLength)
        const tEnd = Math.min(1, t)

        if (tEnd > tStart) {
          const steps = 40
          ctx.save()
          ctx.beginPath()
          for (let i = 0; i <= steps; i++) {
            const ti = tStart + (tEnd - tStart) * (i / steps)
            const pt = bezierPoint(ti, path.startX, path.startY, path.cpX, path.cpY, path.endX, path.endY)
            const alpha = (i / steps) * path.opacity
            if (i === 0) ctx.moveTo(pt.x, pt.y)
            else ctx.lineTo(pt.x, pt.y)
          }
          ctx.strokeStyle = `rgba(200,220,255,${path.opacity})`
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.restore()

          // Plane dot at tip
          if (t >= 0 && t <= 1) {
            const tip = bezierPoint(t, path.startX, path.startY, path.cpX, path.cpY, path.endX, path.endY)
            ctx.save()
            ctx.beginPath()
            ctx.arc(tip.x, tip.y, 2.5, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(230,240,255,${Math.min(path.opacity * 3, 0.9)})`
            ctx.shadowColor = 'rgba(200,220,255,0.6)'
            ctx.shadowBlur = 8
            ctx.fill()
            ctx.restore()
          }
        }
      })

      // --- Radar ---
      radar.sweep += radar.sweepSpeed
      const rx = radar.x, ry = radar.y, maxR = radar.maxR

      // Rings
      ctx.save()
      ;[1, 0.66, 0.33].forEach(f => {
        ctx.beginPath()
        ctx.arc(rx, ry, maxR * f, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(110,220,150,0.10)'
        ctx.lineWidth = 0.6
        ctx.stroke()
      })

      // Crosshairs
      ctx.strokeStyle = 'rgba(110,220,150,0.08)'
      ctx.lineWidth = 0.6
      ctx.beginPath(); ctx.moveTo(rx - maxR, ry); ctx.lineTo(rx + maxR, ry); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(rx, ry - maxR); ctx.lineTo(rx, ry + maxR); ctx.stroke()

      // Sweep gradient
      const grad = ctx.createConicalGradient
        ? null
        : (() => {
            const g = ctx.createRadialGradient(rx, ry, 0, rx, ry, maxR)
            g.addColorStop(0, 'rgba(80,200,120,0.16)')
            g.addColorStop(1, 'rgba(80,200,120,0)')
            return g
          })()

      ctx.beginPath()
      ctx.moveTo(rx, ry)
      const sweepArc = Math.PI * 0.45
      ctx.arc(rx, ry, maxR, radar.sweep - sweepArc, radar.sweep)
      ctx.closePath()
      ctx.fillStyle = grad || 'rgba(90,210,130,0.08)'
      ctx.fill()

      // Sweep line
      ctx.beginPath()
      ctx.moveTo(rx, ry)
      ctx.lineTo(rx + Math.cos(radar.sweep) * maxR, ry + Math.sin(radar.sweep) * maxR)
      ctx.strokeStyle = 'rgba(110,230,150,0.28)'
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.restore()

      // Blips
      radar.blips.forEach(b => {
        const angleDiff = ((radar.sweep - b.angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)
        if (angleDiff < 0.15) b.opacity = 0.85
        else b.opacity = Math.max(0, b.opacity - 0.003)
        if (b.opacity > 0) {
          const bx = rx + Math.cos(b.angle) * b.dist
          const by = ry + Math.sin(b.angle) * b.dist
          ctx.save()
          ctx.beginPath()
          ctx.arc(bx, by, 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(140,255,180,${b.opacity})`
          ctx.shadowColor = 'rgba(140,255,180,0.9)'
          ctx.shadowBlur = 8
          ctx.fill()
          ctx.restore()
        }
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 1 }}
    />
  )
}
