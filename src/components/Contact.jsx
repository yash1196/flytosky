import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

const certOptions = [
  'Discovery Flight (Try flying!)',
  'Private Pilot License (PPL)',
  'Instrument Rating (IR)',
  'Commercial Pilot License (CPL)',
  'Certified Flight Instructor (CFI)',
  'Instrument Flight Instructor (CFII)',
  'Not sure yet — just exploring',
]

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
// ^ Replace YOUR_FORM_ID with your actual Formspree ID after signing up at formspree.io

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    certification: '',
    experience: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', certification: '', experience: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Copy */}
          <div>
            <span className="section-label block mb-4">Get in Touch</span>
            <h2 className="section-heading mb-6">
              Ready to Start
              <br />
              <span className="text-cream-200">Your Journey?</span>
            </h2>
            <p className="text-white/50 leading-relaxed mb-10">
              Whether you're curious about flying for the first time or ready to earn your next certificate — reach out. I'll get back to you within 24 hours to talk about your goals and how we can get you in the air.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-cream-200" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <a
                  href="mailto:yashp1196@gmail.com"
                  className="text-white/60 hover:text-cream-200 transition-colors text-sm"
                >
                  yashp1196@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-cream-200" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.07 1.18 2 2 0 012.06.01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                  </svg>
                </div>
                <a
                  href="tel:4087521777"
                  className="text-white/60 hover:text-cream-200 transition-colors text-sm"
                >
                  (408) 752-1777
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-cream-200" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="text-white/60 text-sm">Lumina Aviation · KUGN Waukegan & KDPA West Chicago</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="card-dark p-8">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <div className="w-14 h-14 bg-green-400/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Message Sent!</h3>
                <p className="text-white/50 text-sm max-w-xs">
                  Thanks for reaching out. I'll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm text-cream-200 hover:text-cream-100 transition-colors mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-white font-semibold text-base mb-6">Tell me about your goals</h3>

                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/40 mb-2" htmlFor="name">
                      Full name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Alex Johnson"
                      className="w-full bg-white/5 border border-white/12 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-cream-100/40 focus:bg-white/8 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-2" htmlFor="email">
                      Email address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@email.com"
                      className="w-full bg-white/5 border border-white/12 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-cream-100/40 focus:bg-white/8 transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs text-white/40 mb-2" htmlFor="phone">
                    Phone number (optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    className="w-full bg-white/5 border border-white/12 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-cream-100/40 focus:bg-white/8 transition-all"
                  />
                </div>

                {/* Certification */}
                <div>
                  <label className="block text-xs text-white/40 mb-2" htmlFor="certification">
                    What are you training for? *
                  </label>
                  <select
                    id="certification"
                    name="certification"
                    required
                    value={formData.certification}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/12 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cream-100/40 focus:bg-white/8 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-slate-900">
                      Select a program...
                    </option>
                    {certOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-slate-900">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-xs text-white/40 mb-2" htmlFor="experience">
                    Current flight experience
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/12 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cream-100/40 focus:bg-white/8 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-slate-900">
                      Select your experience level...
                    </option>
                    <option value="none" className="bg-slate-900">No experience — complete beginner</option>
                    <option value="some" className="bg-slate-900">A few flights / intro lessons</option>
                    <option value="student" className="bg-slate-900">Currently a student pilot</option>
                    <option value="ppl" className="bg-slate-900">I hold a Private Pilot certificate</option>
                    <option value="ir" className="bg-slate-900">I hold an Instrument Rating</option>
                    <option value="cpl" className="bg-slate-900">I hold a Commercial certificate</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs text-white/40 mb-2" htmlFor="message">
                    Anything else you'd like me to know
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your schedule, goals, timeline, or any questions you have..."
                    className="w-full bg-white/5 border border-white/12 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-cream-100/40 focus:bg-white/8 transition-all resize-none"
                  />
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Something went wrong. Please try emailing me directly at yashp1196@gmail.com
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-xs text-white/25 text-center">
                  I'll respond within 24 hours. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
