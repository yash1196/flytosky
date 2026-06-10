import { useState } from 'react'
import ScrollAnimator from './ScrollAnimator'

const starting = [
  { id: 'zero', label: 'No experience', hours: 0 },
  { id: 'student', label: 'Student pilot (some hours)', hours: 15 },
  { id: 'ppl', label: 'I have my PPL', hours: 0 },
  { id: 'ir', label: 'I have PPL + Instrument', hours: 0 },
  { id: 'cpl', label: 'I have my Commercial', hours: 0 },
]

const goals = [
  { id: 'ppl', label: 'Private Pilot (PPL)', from: ['zero','student'], minHours: 40, avgHours: 60, rate: 265, extra: 2000 },
  { id: 'ir', label: 'Instrument Rating (IR)', from: ['ppl'], minHours: 50, avgHours: 65, rate: 265, extra: 1500 },
  { id: 'cpl', label: 'Commercial Pilot (CPL)', from: ['ir'], minHours: 250, avgHours: 280, rate: 265, extra: 3000 },
  { id: 'cfi', label: 'Flight Instructor (CFI)', from: ['cpl'], minHours: 15, avgHours: 25, rate: 265, extra: 1000 },
  { id: 'cfii', label: 'Instrument Instructor (CFII)', from: ['cfi'], minHours: 10, avgHours: 15, rate: 265, extra: 800 },
  { id: 'discovery', label: 'Just a Discovery Flight', from: ['zero','student','ppl','ir','cpl','cfi'], minHours: 1, avgHours: 1, rate: 290, extra: 0 },
]

export default function CostCalculator() {
  const [from, setFrom] = useState('zero')
  const [goal, setGoal] = useState('ppl')

  const availableGoals = goals.filter(g => g.from.includes(from))
  const selectedGoal = availableGoals.find(g => g.id === goal) || availableGoals[0]

  const minCost = selectedGoal ? (selectedGoal.minHours * selectedGoal.rate) + selectedGoal.extra : 0
  const avgCost = selectedGoal ? (selectedGoal.avgHours * selectedGoal.rate) + selectedGoal.extra : 0

  const fmt = (n) => '$' + n.toLocaleString()

  return (
    <section className="py-24 md:py-32 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollAnimator>
          <div className="mb-14">
            <span className="section-label block mb-4">Cost Estimator</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="section-heading">
                What Will It
                <br />
                Cost You?
              </h2>
              <p className="text-white/50 max-w-sm text-sm leading-relaxed md:text-right">
                Select where you're starting from and what you want to achieve. We'll give you a realistic cost estimate.
              </p>
            </div>
          </div>
        </ScrollAnimator>

        <ScrollAnimator delay={100}>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Starting point */}
            <div className="card-dark rounded-2xl p-6">
              <div className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">Where are you starting?</div>
              <div className="space-y-2">
                {starting.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { setFrom(s.id); setGoal(goals.filter(g => g.from.includes(s.id))[0]?.id || '') }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      from === s.id
                        ? 'bg-cream-100/15 border border-cream-100/30 text-cream-200'
                        : 'border border-white/8 text-white/50 hover:border-white/20 hover:text-white/70'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div className="card-dark rounded-2xl p-6">
              <div className="text-xs font-bold tracking-widest uppercase text-white/30 mb-4">What's your goal?</div>
              <div className="space-y-2">
                {availableGoals.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      (selectedGoal?.id === g.id)
                        ? 'bg-cream-100/15 border border-cream-100/30 text-cream-200'
                        : 'border border-white/8 text-white/50 hover:border-white/20 hover:text-white/70'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimator>

        {/* Result */}
        {selectedGoal && (
          <ScrollAnimator delay={200}>
            <div className="card-dark rounded-2xl p-8 border-cream-100/20">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-xs text-white/30 mb-2">Minimum estimate</div>
                  <div className="text-3xl font-bold text-cream-200" style={{ fontFamily: "'Playfair Display', serif" }}>{fmt(minCost)}</div>
                  <div className="text-xs text-white/30 mt-1">{selectedGoal.minHours} hrs minimum</div>
                </div>
                <div className="text-center border-x border-white/8">
                  <div className="text-xs text-white/30 mb-2">Average estimate</div>
                  <div className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{fmt(avgCost)}</div>
                  <div className="text-xs text-white/30 mt-1">{selectedGoal.avgHours} hrs national avg</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-white/30 mb-2">Flight rate</div>
                  <div className="text-3xl font-bold text-white/60" style={{ fontFamily: "'Playfair Display', serif" }}>${selectedGoal.rate}</div>
                  <div className="text-xs text-white/30 mt-1">per hour</div>
                </div>
              </div>
              <p className="text-xs text-white/30 text-center mb-6">
                Estimates include aircraft rental, instruction, and test fees. Individual results vary based on frequency and aptitude.
              </p>
              <div className="flex justify-center">
                <a href="#contact" className="btn-primary">
                  Get a Personalized Quote
                </a>
              </div>
            </div>
          </ScrollAnimator>
        )}
      </div>
    </section>
  )
}
