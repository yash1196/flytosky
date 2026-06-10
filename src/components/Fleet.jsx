import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const BASE = 'https://static.wixstatic.com/media/'

const aircraft = [
  {
    id: 'n1114g',
    reg: 'N1114G',
    role: 'Primary Trainer',
    tagline: 'Where every pilot begins their journey.',
    description:
      'Powered by the Rotax 912iS — a 100HP electronically controlled fuel-injected engine. With automatic mixture and altitude compensation, students focus entirely on flying.',
    images: [
      BASE + 'e7ba5f_61d7624b730046fc8275ee964eef7eca~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/_DSC0547_1_JPG.jpg',
      BASE + 'e7ba5f_6db151147e8a42bfbe54f2ae71c94d66~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/_DSC0539_JPG.jpg',
      BASE + 'e7ba5f_6d8df78196f945848cd0b67d2799ab29~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/_DSC0545_JPG.jpg',
      BASE + 'e7ba5f_4c09e37cc9564ce387da83ba56c13d63~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/_DSC0540_JPG.jpg',
    ],
    features: [
      '100HP Rotax 912iS fuel-injected engine',
      'Dual ECU redundancy',
      'Garmin G3X glass cockpit',
      'Three-axis autopilot (pitch, roll & yaw)',
      'Whole-aircraft ballistic parachute system',
      'Exceptional visibility & modern cabin design',
    ],
    autopilot: [
      'Heading hold',
      'Altitude hold',
      'Vertical speed control',
      'GPS navigation tracking',
      'Coordinated flight assistance',
    ],
    highlight: true,
  },
  {
    id: 'n7931b',
    reg: 'N7931B',
    role: 'Training Aircraft',
    tagline: 'Consistent performance across the fleet.',
    description:
      'Expands the fleet with the same high-performance configuration and safety systems, allowing students to transition seamlessly between aircraft while maintaining identical system logic.',
    images: [
      BASE + 'e7ba5f_7cbc40047c04492abed60010aeeaf826~mv2.jpeg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_4485.jpeg',
      BASE + 'e7ba5f_c42e9b560bf94978afbc8180918bf056~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_0228_JPG.jpg',
    ],
    features: [
      'Rotax 912iS fuel-injected engine',
      'Three-axis autopilot',
      'Garmin G3X glass cockpit',
      'Whole-airframe ballistic parachute',
    ],
    autopilot: null,
  },
  {
    id: 'n279ss',
    reg: 'N279SS',
    role: 'Time Building',
    tagline: 'A professional time building platform.',
    description:
      'For commercial-bound pilots and serious time builders. Equipped with the same advanced configuration, offering a modern training environment that reflects current aviation standards.',
    images: [
      BASE + 'e7ba5f_f8baf2a51435463fa09ff460b01071ea~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_0209_JPG.jpg',
    ],
    features: [
      'Rotax 912iS fuel-injected engine',
      'Three-axis autopilot',
      'Glass cockpit avionics',
      'Whole-airframe ballistic parachute system',
    ],
    autopilot: null,
  },
  {
    id: 'n2543a',
    reg: 'N2543A',
    role: 'Time Building',
    tagline: 'Modern standards for serious pilots.',
    description:
      'A professional time building platform equipped with the same advanced configuration as the full fleet. Ideal for pilots building hours toward commercial certification.',
    images: [
      BASE + 'e7ba5f_3473ffd5d39c4d7a8ef89a112bc93c4d~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/N2543A.jpg',
    ],
    features: [
      'Rotax 912iS fuel-injected engine',
      'Three-axis autopilot',
      'Glass cockpit avionics',
      'Whole-airframe ballistic parachute system',
    ],
    autopilot: null,
  },
  {
    id: 'bristell',
    reg: 'Bristell NG5',
    role: 'Sport Aircraft',
    tagline: 'High performance meets modern design.',
    description:
      'The Bristell NG5 is a sleek, high-performance Light Sport Aircraft with a retractable undercarriage option and exceptional cruise speeds. A step above in comfort, speed, and modern cockpit experience.',
    images: [
      BASE + 'e7ba5f_61d7624b730046fc8275ee964eef7eca~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/_DSC0547_1_JPG.jpg',
    ],
    features: [
      'Rotax 912iS / 915iS engine options',
      'Garmin G3X Touch glass cockpit',
      'Retractable or fixed undercarriage',
      'Cruise speed up to 140 KTAS',
      'Carbon fiber composite airframe',
      'Modern ergonomic cockpit design',
    ],
    autopilot: null,
  },
]

const airspeedSpecs = [
  { label: 'Stall speed without flaps (VS1)', value: '50 KCAS' },
  { label: 'Stall speed with flaps (VS0)', value: '43 KCAS' },
  { label: 'Manoeuvring speed (VA)', value: '98 KCAS' },
  { label: 'Maximum flap speed (VFE)', value: '81 KCAS' },
  { label: 'Max horizontal flight speed (VH)', value: '117 KTAS' },
  { label: 'Never exceeded speed (VNE)', value: '156 KCAS' },
  { label: 'Best rate of climb (Vy, flaps up)', value: '74 KIAS' },
  { label: 'Best angle of climb (Vx)', value: '62 KIAS' },
  { label: 'Best rate of climb (Vy, flaps 10°)', value: '76 KIAS' },
  { label: 'Best rate of climb (flaps 10°)', value: '634 ft/min' },
  { label: 'Take-off distance (ground roll)', value: '1,200 ft' },
  { label: 'Take-off over 50 ft obstacle', value: '1,570 ft' },
  { label: 'Landing distance (ground roll)', value: '480 ft' },
  { label: 'Landing from 50 ft height', value: '1,282 ft' },
]

const weightSpecs = [
  { label: 'Empty weight', value: '992 lb' },
  { label: 'Max takeoff weight (MTOW)', value: '1,653 lb' },
  { label: 'Max useful load', value: '661 lb' },
  { label: 'Fuel capacity', value: '43 gal' },
  { label: 'Oil capacity', value: '33 lb' },
]

function ImageViewer({ images, onClose, startIndex = 0 }) {
  const [current, setCurrent] = useState(startIndex)
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
      >
        <X className="w-7 h-7" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        className="absolute left-6 text-white/60 hover:text-white transition-colors z-10 bg-white/10 rounded-full p-2 hover:bg-white/20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <img
        src={images[current]}
        alt={`Aircraft view ${current + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        className="absolute right-6 text-white/60 hover:text-white transition-colors z-10 bg-white/10 rounded-full p-2 hover:bg-white/20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <div className="absolute bottom-6 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
              className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-cream-200 w-6' : 'bg-white/30'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function AircraftCard({ ac }) {
  const [activeImg, setActiveImg] = useState(0)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      {viewerOpen && (
        <ImageViewer
          images={ac.images}
          startIndex={activeImg}
          onClose={() => setViewerOpen(false)}
        />
      )}

      <div className={`card-dark rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 ${
        ac.highlight ? 'border-cream-100/25 ring-1 ring-cream-100/15' : ''
      }`}>

        {/* Image */}
        <div
          className="relative h-52 overflow-hidden cursor-pointer"
          onClick={() => setViewerOpen(true)}
        >
          <img
            src={ac.images[activeImg]}
            alt={ac.reg}
            className="w-full h-full object-cover img-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

          {/* Role badge */}
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-sm ${
              ac.highlight
                ? 'bg-cream-100/20 text-cream-100 border border-cream-100/30'
                : 'bg-black/40 text-white/70 border border-white/20'
            }`}>
              {ac.role}
            </span>
          </div>

          {/* View gallery hint */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white/70 text-xs px-2.5 py-1.5 rounded-full border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-3 h-3" />
            View gallery
          </div>

          {/* Thumbnail strip */}
          {ac.images.length > 1 && (
            <div className="absolute bottom-3 left-3 flex gap-1.5">
              {ac.images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveImg(i) }}
                  className={`w-8 h-8 rounded-md overflow-hidden border-2 transition-all ${
                    i === activeImg ? 'border-cream-200' : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-2xl font-bold text-white">{ac.reg}</h3>
            {ac.highlight && (
              <span className="text-xs text-cream-200/60 font-semibold mt-1">Featured</span>
            )}
          </div>
          <p className="text-sm text-cream-200/60 italic mb-3">{ac.tagline}</p>
          <p className="text-sm text-white/50 leading-relaxed mb-5">{ac.description}</p>

          {/* Features */}
          <div className="mb-4 flex-1">
            <div className="text-xs font-bold tracking-widest uppercase text-white/30 mb-3">
              Key features
            </div>
            <ul className="space-y-2">
              {ac.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/55">
                  <span className="text-cream-200/60 mt-0.5 text-xs shrink-0">—</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Autopilot expandable */}
          {ac.autopilot && (
            <div className="border-t border-white/8 pt-4 mt-2">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 text-xs font-semibold text-cream-200/60 hover:text-cream-100 transition-colors w-full"
              >
                <span className={`transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}>▶</span>
                {expanded ? 'Hide' : 'Show'} 3-axis autopilot capabilities
              </button>
              {expanded && (
                <ul className="mt-3 space-y-1.5 expand-content">
                  {ac.autopilot.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-sm text-cream-200/70">
                      <span className="text-cream-200/40 text-xs">✓</span>
                      {a}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Book CTA */}
          <a
            href="#contact"
            className="mt-4 pt-4 border-t border-white/8 inline-flex items-center gap-1.5 text-xs font-semibold text-cream-200/60 hover:text-cream-100 transition-colors"
          >
            Book time in this aircraft →
          </a>
        </div>
      </div>
    </>
  )
}

export default function Fleet() {
  const [activeSpecTab, setActiveSpecTab] = useState('Airspeed & Climb')
  const specs = activeSpecTab === 'Airspeed & Climb' ? airspeedSpecs : weightSpecs

  return (
    <section id="fleet" className="py-24 md:py-32 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <span className="section-label block mb-4">Our Fleet</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="section-heading">
              Train with Confidence
              <br />
              in Every Aircraft.
            </h2>
            <p className="text-white/50 max-w-sm leading-relaxed text-sm md:text-right">
              Advanced configuration, safety systems, and a cockpit experience aligned with modern aviation standards.
            </p>
          </div>
        </div>

        {/* Aircraft grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {aircraft.map((ac) => (
            <AircraftCard key={ac.id} ac={ac} />
          ))}
        </div>

        {/* Shared Specifications */}
        <div className="card-dark rounded-2xl overflow-hidden">
          <div className="px-8 pt-8 border-b border-white/8">
            <h3 className="section-heading mb-1">Shared Specifications</h3>
            <p className="text-white/40 text-sm mb-6">All four aircraft share identical performance figures.</p>
            <div className="flex gap-0">
              {['Airspeed & Climb', 'Weight & Capacity'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSpecTab(tab)}
                  className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all duration-200 -mb-px ${
                    activeSpecTab === tab
                      ? 'text-cream-200 border-cream-200'
                      : 'text-white/40 border-transparent hover:text-white/70'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="p-8">
            <div className="grid sm:grid-cols-2 gap-x-12">
              {specs.map((s) => (
                <div key={s.label} className="flex items-center justify-between py-3 border-b border-white/6 gap-4">
                  <span className="text-sm text-white/45">{s.label}</span>
                  <span className="text-sm font-bold text-cream-200 whitespace-nowrap">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
