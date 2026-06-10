import { CheckCircle2 } from 'lucide-react'
import ScrollAnimator from './ScrollAnimator'

const certifications = [
  'FAA Commercial Single- & Multi-Engine Land',
  'Instrument Rated',
  'Certified Flight Instructor (CFI)',
  'Instrument Flight Instructor (CFII)',
  'FAA First Class Medical',
  'FCC Restricted Radiotelephone Operator Permit',
  'High-Performance & Complex Endorsements',
]

const aircraft = ['Cessna 152', 'Cessna 172', 'Cessna 182', 'Beechcraft Duchess (BE-76)', 'Piper Apache (PA-23)', 'Piper Archer (PA-28-181)']

const flightStats = [
  { value: '879+', label: 'Total Hours' },
  { value: '761+', label: 'Pilot-in-Command' },
  { value: '281+', label: 'Dual Given' },
  { value: '158+', label: 'Instrument Hours' },
]

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <ScrollAnimator><span className="section-label block mb-4">About Your Instructor</span></ScrollAnimator>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <div>
            <h2 className="section-heading mb-6">
              Yash Patel —
              <br />
              <span className="text-cream-200">CFI / CFII</span>
            </h2>

            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                I'm a FAA Certified Flight Instructor based in the Chicago area, currently instructing at{' '}
                <span className="text-white/80">Lumina Aviation</span>, operating out of <span className="text-white/80">KUGN (Waukegan)</span> and <span className="text-white/80">KDPA (West Chicago)</span>. With over 879 total flight hours and 281+ hours of dual instruction given, I've spent years helping students go from zero experience to checkride-ready.
              </p>
              <p>
                My background is a little unusual — I hold a{' '}
                <span className="text-white/80">Bachelor's Degree in Aviation Operations (with Honors)</span> from San Jose State University, and I spent several years as a software developer and technical lead before dedicating myself full-time to flight instruction. I understand how to break down complex concepts, explain them clearly, and keep students motivated through the tough stretches.
              </p>
              <p>
                I've instructed at flight schools in both California and Illinois, conducted review flights, mock checkrides, Discovery Flights, and scenic tours. My approach is direct and practical — I care about your progress, your safety, and your long-term growth as a pilot.
              </p>
            </div>

            {/* Student stats — update these numbers as you go */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              <div className="card-dark p-5 text-center">
                <div className="text-2xl font-bold text-cream-200 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>10</div>
                <div className="text-xs text-white/50">Students Trained</div>
              </div>
              <div className="card-dark p-5 text-center">
                <div className="text-2xl font-bold text-cream-200 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>4</div>
                <div className="text-xs text-white/50">Checkride Passes</div>
              </div>
              <div className="card-dark p-5 text-center">
                <div className="text-2xl font-bold text-cream-200 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>6</div>
                <div className="text-xs text-white/50">In Training</div>
              </div>
            </div>

            <a href="#contact" className="btn-primary mt-8 w-fit">
              Train with FlyToSky
            </a>
          </div>

          {/* Right: Credentials + Logbook */}
          <div className="space-y-8">
            {/* Hero image */}
            <div className="relative h-56 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524592714635-d77511a4834d?w=800&q=85&auto=format&fit=crop"
                alt="Aircraft on runway"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-bold tracking-widest uppercase text-cream-200/80">KUGN · KDPA</span>
              </div>
            </div>
            {/* Logbook stats */}
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">Logbook</h3>
              <div className="grid grid-cols-2 gap-3">
                {flightStats.map((stat) => (
                  <div key={stat.label} className="card-dark p-4">
                    <div className="text-xl font-bold text-white mb-0.5">{stat.value}</div>
                    <div className="text-xs text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">
                Certifications & Ratings
              </h3>
              <div className="space-y-2.5">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cream-200 mt-0.5 shrink-0" strokeWidth={2} />
                    <span className="text-sm text-white/60">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Aircraft */}
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">
                Aircraft Flown
              </h3>
              <div className="flex flex-wrap gap-2">
                {aircraft.map((a) => (
                  <span
                    key={a}
                    className="text-xs text-white/50 border border-white/12 px-3 py-1.5 rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            {/* Avionics */}
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-4">
                Avionics Experience
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Garmin G1000', 'GNS-430', 'GTN650'].map((a) => (
                  <span
                    key={a}
                    className="text-xs text-cream-200/70 border border-cream-100/20 px-3 py-1.5 rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
