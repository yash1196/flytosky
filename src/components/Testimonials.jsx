import { useState, useEffect } from 'react'
import ScrollAnimator from './ScrollAnimator'

const testimonials = [
  {
    name: 'Vedant K.',
    cert: 'Instrument Rating & Commercial Pilot',
    text: "Yash mentored me through my Instrument Rating and helped me all the way to passing my Commercial exam. His guidance was incredibly structured — he knew exactly where I needed to improve and pushed me to get there. Couldn't have done it without him.",
    stars: 5,
    initials: 'VK',
  },
  {
    name: 'Sukhbat Uvgunkhuu',
    cert: 'Instrument Rating',
    text: "What sets Yash apart is not just his technical knowledge, but his genuine enthusiasm for teaching and deep care for each student's progress. He broke down complex instrument procedures into clear, manageable steps and maintained a calm, encouraging demeanor even during the most challenging lessons. His attitude is one of mentorship rather than mere instruction.",
    stars: 5,
    initials: 'SU',
  },
  {
    name: 'Laagan Tamir',
    cert: 'Student Pilot',
    text: "Yash holds nearly every possible pilot certification, and his professionalism always made his students feel safe and confident. He never hesitated to spend extra time teaching us, even when it required more effort than expected. I always felt completely supported — he consistently went beyond what was required.",
    stars: 5,
    initials: 'LT',
  },
  {
    name: 'Preston S.',
    cert: 'Private Pilot — Aspiring US Air Force Pilot',
    text: "Yash went above and beyond for me — he provided free ground lessons and trained me to US Air Force standards from day one. His high-level instruction gave me the discipline, knowledge, and mindset I need to pursue my dream of serving in the Air Force. He genuinely invested in my future, not just my checkride.",
    stars: 5,
    initials: 'PS',
  },
  {
    name: 'Gunjan S.',
    cert: 'Discovery Flight — San Francisco Bay Area',
    text: "Yash took me on a discovery flight over the Bay Area in California — we flew over the Golden Gate Bridge and he took me to KAPC Napa for dinner. Absolutely unforgettable. He made every moment feel safe, exciting, and natural. I had no idea flying could feel like that.",
    stars: 5,
    initials: 'GS',
  },
  {
    name: 'Karan Patel',
    cert: 'Discovery Flight — San Francisco Bay Area',
    text: "Yash took me on a discovery flight over the Bay Area — we flew over the Golden Gate Bridge and landed at KAPC Napa for dinner. He made the whole experience feel completely effortless and safe. By the end I was at the controls myself. An experience I'll never forget.",
    stars: 5,
    initials: 'KP',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-cream-200" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(a => (a + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 md:py-32 border-t border-white/8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollAnimator>
          <div className="text-center mb-16">
            <span className="section-label block mb-4">Student Reviews</span>
            <h2 className="section-heading">What Students Say.</h2>
          </div>
        </ScrollAnimator>

        {/* Featured testimonial */}
        <ScrollAnimator delay={100}>
          <div className="relative max-w-3xl mx-auto mb-12">
            <div className="card-dark rounded-2xl p-10 text-center relative overflow-hidden">
              {/* Quote mark */}
              <div className="absolute top-6 left-8 text-cream-200/10 text-8xl font-serif leading-none select-none">"</div>

              <div className="relative z-10">
                <Stars count={testimonials[active].stars} />
                <p className="text-white/80 text-lg leading-relaxed mb-8 italic">
                  "{testimonials[active].text}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cream-100/15 border border-cream-100/25 flex items-center justify-center text-cream-200 text-sm font-bold">
                    {testimonials[active].initials}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">{testimonials[active].name}</div>
                    <div className="text-xs text-cream-200/60">{testimonials[active].cert}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${i === active ? 'bg-cream-200 w-6 h-2' : 'bg-white/20 w-2 h-2'}`}
                />
              ))}
            </div>
          </div>
        </ScrollAnimator>

        {/* Mini cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          {testimonials.slice(0, 3).map((t, i) => (
            <ScrollAnimator key={t.name} delay={i * 100}>
              <button
                onClick={() => setActive(i)}
                className={`card-dark rounded-xl p-5 text-left w-full transition-all duration-200 hover:border-cream-100/25 ${active === i ? 'border-cream-100/30 bg-cream-100/5' : ''}`}
              >
                <Stars count={t.stars} />
                <p className="text-white/55 text-xs leading-relaxed mb-3 line-clamp-2">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cream-100/15 flex items-center justify-center text-cream-200 text-xs font-bold">{t.initials}</div>
                  <div>
                    <div className="text-xs font-semibold text-white/80">{t.name}</div>
                    <div className="text-xs text-cream-200/50">{t.cert}</div>
                  </div>
                </div>
              </button>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  )
}
