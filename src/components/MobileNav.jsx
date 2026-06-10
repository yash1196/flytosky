import { Plane, BookOpen, Users, DollarSign, Mail } from 'lucide-react'

const links = [
  { label: 'Services', href: '#services', icon: BookOpen },
  { label: 'Fleet', href: '#fleet', icon: Plane },
  { label: 'Pricing', href: '#pricing', icon: DollarSign },
  { label: 'About', href: '#about', icon: Users },
  { label: 'Contact', href: '#contact', icon: Mail },
]

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-navy-900/95 backdrop-blur-md border-t border-white/10">
      <div className="flex items-center justify-around px-2 py-2">
        {links.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            className="flex flex-col items-center gap-1 px-3 py-1.5 text-white/50 hover:text-cream-200 transition-colors group"
          >
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" strokeWidth={1.8} />
            <span className="text-[9px] font-semibold tracking-wide uppercase">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
