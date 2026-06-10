import { Instagram, Mail, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/8 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/flytosky/flytosky-logo.jpg"
                alt="FlyToSky logo"
                className="w-12 h-12 rounded-full object-cover border border-cream-100/20"
              />
              <div>
                <div className="font-semibold text-white text-sm">FlyToSky</div>
                <div className="text-xs text-cream-200/60 tracking-wide">Ready, Get Set, Fly</div>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              FAA Certified Flight Instructor (CFI/CFII) based in the Chicago area. One-on-one training from Discovery Flight to CFI.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">
              Training
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:yashp1196@gmail.com"
                className="flex items-center gap-2.5 text-sm text-white/50 hover:text-cream-200 transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
                yashp1196@gmail.com
              </a>
              <a
                href="tel:4087521777"
                className="flex items-center gap-2.5 text-sm text-white/50 hover:text-cream-200 transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                (408) 752-1777
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-white/50 hover:text-cream-200 transition-colors"
              >
                <Instagram className="w-4 h-4 shrink-0" />
                {/* Update with your actual handle */}
                @yashpatelaviation
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © {year} FlyToSky. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/20">FAA Certified CFI/CFII</span>
            <span className="w-1 h-1 rounded-full bg-white/15 inline-block" />
            <span className="text-xs text-white/20">West Chicago, IL</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
