import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 879, suffix: '+', label: 'Total Flight Hours' },
  { value: 281, suffix: '+', label: 'Dual Instruction Hours' },
  { value: 10, suffix: '', label: 'Students Trained' },
  { value: 4, suffix: '', label: 'Checkride Passes' },
]

function CountUp({ target, suffix, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const animate = (now) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
            else setCount(target)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="border-y border-white/8 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold text-shimmer mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/50 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
