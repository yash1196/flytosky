import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'

const credentials = ['Private Pilot', 'Instrument Rated', 'Commercial', 'CFI', 'CFII']

// Cloud layer config: speed, opacity, scale, vertical position
const CLOUD_LAYERS = [
  { count: 3, speed: 0.10, opacity: 0.06, minScale: 2.2, maxScale: 3.2, yRange: [0.04, 0.20] },
  { count: 4, speed: 0.18, opacity: 0.09, minScale: 1.3, maxScale: 2.1, yRange: [0.14, 0.40] },
  { count: 5, speed: 0.30, opacity: 0.12, minScale: 0.7, maxScale: 1.4, yRange: [0.32, 0.62] },
  { count: 4, speed: 0.46, opacity: 0.07, minScale: 0.4, maxScale: 0.9, yRange: [0.55, 0.84] },
]

function drawCloud(ctx, x, y, scale, opacity) {
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.fillStyle = '#ffffff'
  ctx.translate(x, y)
  ctx.scale(scale, scale)
  const parts = [
    [0, 0, 60], [-55, 15, 45], [55, 15, 45],
    [-25, -18, 38], [25, -18, 38],
    [-80, 28, 32], [80, 28, 32],
    [0, 10, 50], [-40, 5, 35], [40, 5, 35],
  ]
  parts.forEach(([dx, dy, r]) => {
    ctx.beginPath()
    ctx.arc(dx, dy, r, 0, Math.PI * 2)
    ctx.fill()
  })
  ctx.restore()
}

// Simple side-profile aircraft silhouette path
function drawPlane(ctx, x, y, scale, rotation, opacity) {
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.scale(scale, scale)
  ctx.fillStyle = '#ece3c4'

  ctx.beginPath()
  // fuselage
  ctx.moveTo(-60, 0)
  ctx.quadraticCurveTo(-40, -6, 30, -3)
  ctx.quadraticCurveTo(58, -2, 64, 0)
  ctx.quadraticCurveTo(58, 2, 30, 3)
  ctx.quadraticCurveTo(-40, 6, -60, 0)
  ctx.closePath()
  ctx.fill()

  // wing
  ctx.beginPath()
  ctx.moveTo(-5, 0)
  ctx.lineTo(-28, 22)
  ctx.lineTo(-18, 22)
  ctx.lineTo(8, 2)
  ctx.closePath()
  ctx.fill()

  // tail
  ctx.beginPath()
  ctx.moveTo(-52, -1)
  ctx.lineTo(-62, -14)
  ctx.lineTo(-56, -2)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}

export default function Hero() {
  const canvasRef = useRef(null)
  const bgRef = useRef(null)
  const animRef = useRef(null)
  const cloudsRef = useRef([])
  const planeRef = useRef({ progress: -0.15 })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 50)
    return () => clearTimeout(t)
  }, [])

  // Init clouds
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const W = window.innerWidth
    const H = window.innerHeight

    const clouds = []
    CLOUD_LAYERS.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        const scale = layer.minScale + Math.random() * (layer.maxScale - layer.minScale)
        const yFrac = layer.yRange[0] + Math.random() * (layer.yRange[1] - layer.yRange[0])
        clouds.push({
          x: Math.random() * (W + 400) - 200,
          y: yFrac * H,
          scale,
          speed: layer.speed * (0.8 + Math.random() * 0.4),
          opacity: layer.opacity * (0.7 + Math.random() * 0.6),
        })
      }
    })
    cloudsRef.current = clouds

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Animate clouds + plane
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const animate = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Clouds
      cloudsRef.current.forEach(cloud => {
        cloud.x += cloud.speed
        if (cloud.x > W + 300) cloud.x = -300
        drawCloud(ctx, cloud.x, cloud.y, cloud.scale, cloud.opacity)
      })

      // Plane crossing the sky on a gentle arc, looping every ~22s
      const p = planeRef.current
      p.progress += 0.0009
      if (p.progress > 1.15) p.progress = -0.15

      const t = p.progress
      const startX = -120
      const endX = W + 120
      const x = startX + (endX - startX) * t
      // Gentle arc: rises then descends slightly
      const arcHeight = H * 0.08
      const baseY = H * 0.22
      const y = baseY - Math.sin(Math.PI * Math.min(Math.max(t, 0), 1)) * arcHeight
      // Slight pitch angle following the arc
      const rotation = -0.08 + Math.cos(Math.PI * Math.min(Math.max(t, 0), 1)) * 0.06

      const fadeIn = Math.min(t / 0.08, 1)
      const fadeOut = Math.min((1 - t) / 0.08, 1)
      const planeOpacity = Math.max(0, Math.min(fadeIn, fadeOut)) * 0.5

      if (planeOpacity > 0.01) {
        // Contrail
        ctx.save()
        ctx.globalAlpha = planeOpacity * 0.4
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(x - 70, y + 2)
        ctx.lineTo(x - 220, y + 14)
        ctx.stroke()
        ctx.restore()

        drawPlane(ctx, x, y, 0.55, rotation, planeOpacity)
      }

      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Deep sky gradient base */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #0c1f3f 0%, #0f2d5c 25%, #1a3f7a 55%, #0c1f3f 100%)'
      }} />

      {/* Horizon glow */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 120% 40% at 50% 62%, rgba(196,160,80,0.18) 0%, transparent 70%)'
      }} />

      {/* Subtle star field */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `radial-gradient(1px 1px at 15% 12%, rgba(255,255,255,0.6) 0%, transparent 100%),
          radial-gradient(1px 1px at 72% 8%, rgba(255,255,255,0.5) 0%, transparent 100%),
          radial-gradient(1px 1px at 38% 22%, rgba(255,255,255,0.4) 0%, transparent 100%),
          radial-gradient(1px 1px at 88% 18%, rgba(255,255,255,0.5) 0%, transparent 100%),
          radial-gradient(1px 1px at 55% 5%, rgba(255,255,255,0.6) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 25% 35%, rgba(255,255,255,0.3) 0%, transparent 100%),
          radial-gradient(1px 1px at 92% 42%, rgba(255,255,255,0.4) 0%, transparent 100%),
          radial-gradient(1px 1px at 8% 55%, rgba(255,255,255,0.35) 0%, transparent 100%)`
      }} />

      {/* Animated clouds + plane canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen', pointerEvents: 'none' }}
      />

      {/* Parallax photo layer */}
      <div ref={bgRef} className="absolute inset-0 scale-110 will-change-transform opacity-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&q=85&auto=format&fit=crop')" }}
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/75 via-navy-950/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/10" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="max-w-3xl">

          {/* Logo lockup */}
          <div className={`flex items-center gap-4 mb-10 transition-all duration-700 ease-out ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '80ms' }}>
            <img
              src="/flytosky/flytosky-logo.jpg"
              alt="FlyToSky logo"
              className="w-20 h-20 rounded-full object-cover border-2 border-cream-100/30 shadow-lg shadow-navy-950/50 float-anim"
            />
            <div>
              <div className="text-cream-200 text-xs font-bold tracking-[0.25em] uppercase mb-1">
                Ready, Get Set, Fly
              </div>
              <div className="text-white/40 text-sm">FAA Certified Flight Instructor · Chicago Area</div>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full border border-white/15">✈ KUGN</span>
                <span className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full border border-white/15">✈ KDPA</span>
              </div>
            </div>
          </div>

          {/* Headline — staggered word reveal */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className={`inline-block transition-all duration-700 ease-out ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '160ms' }}>
              The Sky Isn't
            </span>
            <br />
            <span className={`inline-block text-shimmer transition-all duration-700 ease-out ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '280ms' }}>
              the Limit.
            </span>
            <br />
            <span className={`inline-block transition-all duration-700 ease-out ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
              It's the Start.
            </span>
          </h1>

          {/* Subheadline */}
          <p className={`text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-2xl transition-all duration-700 ease-out ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '520ms' }}>
            Train with FlyToSky — one-on-one instruction from Discovery Flight to CFI. Every certification, at your pace, in the Chicago area.
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-4 mb-14 transition-all duration-700 ease-out ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '620ms' }}>
            <a href="#contact" className="btn-primary group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Book a Discovery Flight
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
            <a href="#services" className="btn-outline">View Training Programs</a>
          </div>

          {/* Badges */}
          <div className={`flex flex-wrap gap-2 transition-all duration-700 ease-out ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '720ms' }}>
            {credentials.map((cred, i) => (
              <span
                key={cred}
                className="credential-badge transition-all duration-500 ease-out"
                style={{
                  transitionDelay: `${720 + i * 60}ms`,
                  opacity: ready ? 1 : 0,
                  transform: ready ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)',
                }}
              >
                <span className="w-1 h-1 rounded-full bg-cream-200 inline-block" />
                {cred}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors animate-[fadeIn_1s_ease_1.1s_both]"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  )
}
