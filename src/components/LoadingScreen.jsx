import { useEffect, useState } from 'react'

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 900)
    const t3 = setTimeout(() => setPhase(3), 1400)
    const t4 = setTimeout(() => onDone(), 1800)
    return () => [t1,t2,t3,t4].forEach(clearTimeout)
  }, [onDone])

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-950 transition-opacity duration-500 ${phase === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Animated plane */}
      <div className={`transition-all duration-700 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="relative">
          {/* Runway line */}
          <div className={`h-px bg-cream-200/20 mb-8 transition-all duration-700 delay-300 ${phase >= 2 ? 'w-48' : 'w-0'}`} />
          {/* Logo */}
          <div className="flex flex-col items-center gap-4">
            <img
              src="/flytosky/flytosky-logo.jpg"
              alt="FlyToSky"
              className={`w-20 h-20 rounded-full object-cover border-2 border-cream-100/30 transition-all duration-500 ${phase >= 1 ? 'scale-100' : 'scale-75'}`}
            />
            <div className="text-center">
              <div className={`text-2xl font-bold text-white tracking-tight transition-all duration-500 delay-200 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                Fly<span className="text-cream-200">ToSky</span>
              </div>
              <div className={`text-xs tracking-[0.3em] uppercase text-cream-200/50 mt-1 transition-all duration-500 delay-300 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                Ready, Get Set, Fly
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-8 w-48 h-px bg-white/10 rounded-full overflow-hidden">
            <div className={`h-full bg-cream-200 rounded-full transition-all duration-1000 ease-out ${phase >= 1 ? 'w-full' : 'w-0'}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
