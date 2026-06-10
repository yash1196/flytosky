import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Weather', href: '#weather' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-950/95 backdrop-blur-md border-b border-white/10 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo image */}
        <a href="#" className="flex items-center gap-3">
          <img
            src="/flytosky/flytosky-logo.jpg"
            alt="FlyToSky — Ready, Get Set, Fly"
            className="h-14 w-14 rounded-full object-cover border-2 border-cream-100/20 hover:border-cream-100/50 transition-all duration-200"
          />
          <div className="hidden sm:flex items-center gap-2">
            <span className="pulse-dot w-2 h-2 rounded-full bg-green-400 inline-block" />
            <span className="text-xs text-white/40 font-medium">Available for training</span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary text-sm py-2 px-5">
            Book a Flight
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-900/98 backdrop-blur-md border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link text-base"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary text-sm justify-center"
              onClick={() => setMenuOpen(false)}
            >
              Book a Flight
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
