import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

const categories = ['All Services', 'Flight Training', 'Time Building']

const pricing = [
  {
    id: 'discovery',
    title: 'Discovery Flight',
    category: 'Flight Training',
    price: '$290',
    unit: '/ hour',
    duration: '1 hr',
    tagline: 'Your first time in the cockpit.',
    description:
      'Experience flying firsthand with a certified instructor by your side. You take the controls over the Chicago area — no experience needed.',
    includes: [
      'Pre-flight briefing',
      'You fly the aircraft',
      'Certified CFI/CFII instructor',
      'Post-flight debrief',
    ],
    cta: 'Book Now',
    highlight: true,
    image: 'https://images.unsplash.com/photo-1628000156679-b36c91956540?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'training',
    title: 'Pilot Training',
    category: 'Flight Training',
    price: '$265',
    unit: '/ hour',
    duration: '1 hr',
    tagline: 'Structured training toward your certificate.',
    description:
      'One-on-one flight instruction toward your Private Pilot, Instrument, Commercial, CFI, or CFII certificate. Personalized pacing, modern Bristell aircraft.',
    includes: [
      'Ground & flight instruction',
      'Logbook endorsements',
      'Progress tracking',
      'Checkride preparation',
    ],
    cta: 'More Info',
    highlight: false,
    image: 'https://images.unsplash.com/photo-1520442027413-7bf6c51517da?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'block',
    title: 'Block Hour Discounts',
    category: 'Time Building',
    price: 'Custom',
    unit: 'rates',
    duration: '1 hr',
    tagline: 'Save more when you fly more.',
    description:
      'Purchasing flight hours in blocks unlocks discounted rates. Ideal for students committed to a training program or pilots actively building time.',
    includes: [
      'Discounted hourly rate',
      'Flexible scheduling',
      'Block hours never expire',
      'Available for all services',
    ],
    cta: 'Request Rates',
    highlight: false,
    image: 'https://images.unsplash.com/photo-1530545124313-ce5e8eae55af?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'timebuilding',
    title: 'Time Building',
    category: 'Time Building',
    price: '$95',
    unit: '/ hour per seat',
    duration: '1 hr',
    tagline: 'Build hours efficiently in modern aircraft.',
    description:
      'For commercial-bound pilots who need to accumulate flight hours. Fly modern Bristell aircraft solo or with a safety pilot at an affordable per-seat rate.',
    includes: [
      'Modern Bristell NG5 aircraft',
      'Solo or safety pilot options',
      'IFR-capable avionics',
      'Flexible scheduling',
    ],
    cta: 'More Info',
    highlight: false,
    image: 'https://images.unsplash.com/photo-1683971336619-d445cbec0276?w=800&q=80&auto=format&fit=crop',
  },
]

const faqs = [
  {
    q: 'What is included in the hourly rate?',
    a: 'The hourly rate covers aircraft rental and instructor time. Additional costs may include fuel surcharges, written test fees, and FAA examiner fees for checkrides.',
  },
  {
    q: 'How many hours does it take to get a Private Pilot License?',
    a: 'The FAA minimum is 40 hours, but the national average is 60–70 hours. Your pace depends on frequency of training and how quickly concepts click.',
  },
  {
    q: 'Can I pay for training in installments?',
    a: 'Yes — block hour packages let you pre-purchase hours at a discounted rate. Contact us to discuss payment options that work for your situation.',
  },
  {
    q: 'What airports do you fly out of?',
    a: 'We operate out of KUGN (Waukegan Regional Airport) and KDPA (DuPage Airport in West Chicago).',
  },
]

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-sm font-semibold text-white/80">{faq.q}</span>
        <span className={`text-cream-200 text-lg transition-transform duration-200 shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <p className="text-sm text-white/50 leading-relaxed pb-5">{faq.a}</p>
      )}
    </div>
  )
}

export default function Pricing() {
  const [activeCategory, setActiveCategory] = useState('All Services')

  const filtered = activeCategory === 'All Services'
    ? pricing
    : pricing.filter((p) => p.category === activeCategory)

  return (
    <section id="pricing" className="py-24 md:py-32 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <span className="section-label block mb-4">Pricing</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="section-heading">
              Transparent Pricing.
              <br />
              No Surprises.
            </h2>
            <p className="text-white/50 max-w-sm leading-relaxed text-sm md:text-right">
              Straightforward rates for every stage of your aviation journey — from your first flight to building commercial hours.
            </p>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-0 border-b border-white/8 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all duration-200 -mb-px ${
                activeCategory === cat
                  ? 'text-cream-200 border-cream-200'
                  : 'text-white/40 border-transparent hover:text-white/70 hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {filtered.map((plan) => (
            <div
              key={plan.id}
              className={`card-dark rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 ${
                plan.highlight ? 'border-cream-100/25 ring-1 ring-cream-100/15' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <span className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-sm ${
                      plan.highlight
                        ? 'bg-cream-100/20 text-cream-100 border border-cream-100/30'
                        : 'bg-black/40 text-white/70 border border-white/20'
                    }`}>
                      {plan.category}
                    </span>
                  </div>
                  {plan.highlight && (
                    <span className="text-xs font-bold text-cream-200 bg-cream-100/15 px-2.5 py-1 rounded-full border border-cream-100/25">
                      Most Popular
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-1">
                {/* Price */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-cream-200" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {plan.price}
                  </span>
                  <span className="text-sm text-white/40">{plan.unit}</span>
                </div>
                <p className="text-xs text-white/30 mb-4">{plan.duration} minimum</p>

                <h3 className="text-lg font-bold text-white mb-1">{plan.title}</h3>
                <p className="text-sm text-cream-200/60 italic mb-3">{plan.tagline}</p>
                <p className="text-sm text-white/50 leading-relaxed mb-6 flex-1">{plan.description}</p>

                {/* Includes */}
                <div className="mb-6">
                  <div className="text-xs font-bold tracking-widest uppercase text-white/30 mb-3">Includes</div>
                  <ul className="space-y-2">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-white/55">
                        <Check className="w-3.5 h-3.5 text-cream-200/70 shrink-0" strokeWidth={2.5} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-sm transition-all duration-200 active:scale-95 ${
                    plan.highlight
                      ? 'bg-cream-100 text-navy-900 hover:bg-cream-50'
                      : 'border border-cream-100/25 text-cream-200 hover:bg-cream-100/10'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="card-dark rounded-2xl p-6 mb-16 flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-cream-100/10 border border-cream-100/20 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-cream-200 text-sm font-bold">i</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-white/80 mb-1">Pricing note</div>
            <p className="text-sm text-white/45 leading-relaxed">
              All prices are sourced from Lumina Aviation and reflect current rates at KUGN and KDPA. Rates are subject to change — contact us to confirm current pricing before booking. Block hour discounts are available upon request.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="section-heading mb-8">Common Questions</h3>
          <div className="max-w-3xl">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} faq={faq} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
