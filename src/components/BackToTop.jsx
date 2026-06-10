import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 800)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 left-6 z-40 w-10 h-10 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      <ChevronUp className="w-4 h-4" />
    </button>
  )
}
