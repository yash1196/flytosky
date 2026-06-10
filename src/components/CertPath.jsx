import { useState } from 'react'
import ScrollAnimator from './ScrollAnimator'

const steps = [
  {
    id: 'ppl',
    label: 'Private Pilot',
    abbr: 'PPL',
    hours: '40–70 hrs',
    duration: '3–6 months',
    cost: '~$8,000–$15,000',
    description: 'Your foundation. Solo flight, cross-country navigation, VFR operations. Opens up recreational flying across the US.',
    prereqs: 'None — this is where you start.',
    color: 'bg-cream-100/15 border-cream-100/30 text-cream-200',
  },
  {
    id: 'ir',
    label: 'Instrument Rating',
    abbr: 'IR',
    hours: '50 hrs instrument',
    duration: '3–6 months',
    cost: '~$8,000–$12,000',
    description: 'Fly in clouds, low visibility, and IMC. A major safety upgrade that makes you a far more capable and confident pilot.',
    prereqs: 'Private Pilot certificate.',
    color: 'bg-navy-700/40 border-navy-600/50 text-white/80',
  },
  {
    id: 'cpl',
    label: 'Commercial Pilot',
    abbr: 'CPL',
    hours: '250 hrs total',
    duration: '6–12 months',
    cost: '~$15,000–$25,000',
    description: 'Fly for compensation. Opens aviation careers — charter, aerial photography, pipeline patrol, and more.',
    prereqs: 'PPL + Instrument Rating.',
    color: 'bg-navy-700/40 border-navy-600/50 text-white/80',
  },
  {
    id: 'cfi',
    label: 'Flight Instructor',
    abbr: 'CFI',
    hours: 'Based on experience',
    duration: '2–4 months',
    cost: '~$5,000–$8,000',
    description: 'Teach others to fly. Build hours fast, give back to aviation, and one of the most versatile certificates you can hold.',
    prereqs: 'Commercial Pilot certificate.',
    color: 'bg-navy-700/40 border-navy-600/50 text-white/80',
  },
  {
    id: 'cfii',
    label: 'Instrument Instructor',
    abbr: 'CFII',
    hours: 'Based on experience',
    duration: '1–2 months',
    cost: '~$3,000–$5,000',
    description: 'Teach instrument flying. The complete instructor package — instruct students in IMC, approaches, and IFR procedures.',
    prereqs: 'CFI + Instrument Rating.',
    color: 'bg-navy-700/40 border-navy-600/50 text-white/80',
  },
]

export default function CertPath() {
  const [active, setActive] = useState('ppl')
  const activeStep = steps.find(s => s.id === active)

  return (
    <section className="py-24 md:py-32 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollAnimator>
          <div className="mb-14">
            <span className="section-label block mb-4">Certification Path</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="section-heading">
                Your Road to
                <br />
                the Cockpit.
              </h2>
              <p className="text-white/50 max-w-sm text-sm leading-relaxed md:text-right">
                Every certification builds on the last. Click each step to see what's involved, how long it takes, and what it costs.
              </p>
            </div>
          </div>
        </ScrollAnimator>

        {/* Timeline */}
        <ScrollAnimator delay={100}>
          <div className="flex items-center gap-0 mb-10 overflow-x-auto pb-2">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <button
                  onClick={() => setActive(step.id)}
                  className={`flex flex-col items-center gap-2 group transition-all duration-200 ${active === step.id ? 'scale-105' : 'opacity-60 hover:opacity-90'}`}
                >
                  <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-200 ${
                    active === step.id
                      ? 'bg-cream-100/20 border-cream-200 text-cream-200 shadow-lg shadow-cream-200/10'
                      : 'bg-white/5 border-white/20 text-white/50 group-hover:border-white/40'
                  }`}>
                    {step.abbr}
                  </div>
                  <span className={`text-xs font-semibold whitespace-nowrap ${active === step.id ? 'text-cream-200' : 'text-white/40'}`}>
                    {step.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-px bg-white/15 mx-3 min-w-8 mt-[-16px]" />
                )}
              </div>
            ))}
          </div>
        </ScrollAnimator>

        {/* Detail panel */}
        <ScrollAnimator delay={200}>
          <div className="card-dark rounded-2xl p-8 grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-cream-100/15 border border-cream-100/25 flex items-center justify-center text-cream-200 font-bold text-sm">
                  {activeStep.abbr}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{activeStep.label}</h3>
                  <span className="text-xs text-cream-200/60">{activeStep.hours}</span>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{activeStep.description}</p>
              <div className="text-xs text-white/30 mb-1">Prerequisites</div>
              <p className="text-sm text-white/55">{activeStep.prereqs}</p>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Estimated hours', value: activeStep.hours },
                { label: 'Typical timeline', value: activeStep.duration },
                { label: 'Estimated cost', value: activeStep.cost },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/8">
                  <span className="text-sm text-white/45">{item.label}</span>
                  <span className="text-sm font-bold text-cream-200">{item.value}</span>
                </div>
              ))}
              <a href="#contact" className="btn-primary mt-4 w-full justify-center text-sm">
                Start {activeStep.label} Training
              </a>
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  )
}
