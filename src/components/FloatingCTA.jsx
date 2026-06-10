import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      <a
        href="#contact"
        className="flex items-center gap-2 bg-cream-100 text-navy-900 font-bold text-sm px-5 py-3 rounded-full shadow-2xl shadow-navy-950/50 hover:bg-cream-50 transition-all hover:scale-105 active:scale-95"
      >
        Book a Flight
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  )
}
