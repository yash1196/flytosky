import { ArrowRight } from 'lucide-react'

const U = 'https://images.unsplash.com/photo'

const services = [
  {
    tag: 'Start Here',
    title: 'Discovery Flight',
    description: 'Not sure if flying is for you? A Discovery Flight puts you in the cockpit for a real flight experience — no commitment needed. The best first step.',
    duration: '~1 hour',
    highlight: true,
    img: `${U}-1628000156679-b36c91956540?w=600&q=80&auto=format&fit=crop`,
    imgAlt: 'Small airplane in flight',
  },
  {
    tag: 'Certificate',
    title: 'Private Pilot License',
    description: 'Your first certificate. Learn to fly solo, navigate cross-country, and operate an aircraft safely in VFR conditions. The foundation of everything that follows.',
    duration: '40+ hours minimum',
    img: `${U}-1530545124313-ce5e8eae55af?w=600&q=80&auto=format&fit=crop`,
    imgAlt: 'Airplane in blue sky',
  },
  {
    tag: 'Rating',
    title: 'Instrument Rating',
    description: 'Fly in clouds, low visibility, and IMC conditions. A major safety upgrade and career milestone — and one of the most rewarding challenges in aviation.',
    duration: '50 hours instrument time',
    img: `${U}-1520442027413-7bf6c51517da?w=600&q=80&auto=format&fit=crop`,
    imgAlt: 'Cockpit instrument panel',
  },
  {
    tag: 'Certificate',
    title: 'Commercial Pilot License',
    description: 'Fly for compensation or hire. Opens doors to aviation careers — charter, aerial work, instructing, and more. Built on your PPL and Instrument Rating.',
    duration: '250 hours total time',
    img: `${U}-1556388158-158ea5ccacbd?w=600&q=80&auto=format&fit=crop`,
    imgAlt: 'Commercial airplane landing',
  },
  {
    tag: 'Certificate',
    title: 'Certified Flight Instructor',
    description: 'Pass your passion on. Train students, build hours, and contribute to the aviation community. A CFI certificate is one of the most versatile ratings in aviation.',
    duration: 'Based on experience',
    img: `${U}-1540575861501-7cf05a4b125a?w=600&q=80&auto=format&fit=crop`,
    imgAlt: 'Airplane engine turbine',
  },
  {
    tag: 'Rating',
    title: 'Instrument Instructor (CFII)',
    description: 'Instruct students in instrument flying. The CFII is the complete package — teach others to navigate weather, fly approaches, and operate safely in IMC.',
    duration: 'Based on experience',
    img: `${U}-1683971336619-d445cbec0276?w=600&q=80&auto=format&fit=crop`,
    imgAlt: 'Runway at sunset from aerial view',
  },
  {
    tag: 'Proficiency',
    title: 'Instrument Proficiency Check',
    description: 'Lapsed on your IFR currency? An IPC gets you back to legal and proficient in IMC operations. Thorough review of approaches, holds, and procedures.',
    duration: '2–3 hours',
    img: `https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=600&q=85&auto=format&fit=crop&crop=center`,
    imgAlt: 'Airplane cockpit with view of the sky',
  },
  {
    tag: 'Recurrency',
    title: 'Flight Review (BFR)',
    description: 'Required every 24 calendar months to act as PIC. A thorough ground and flight review covering regulations, procedures, and maneuvers to keep you current and sharp.',
    duration: '1+ hours flight & ground',
    img: `${U}-1569629743817-70d8db6c323b?w=600&q=85&auto=format&fit=crop&crop=center`,
    imgAlt: 'White airplane in mid air during daytime',
  },
  {
    tag: 'Endorsement',
    title: 'Complex Endorsement',
    description: 'Required to act as PIC of a complex aircraft with retractable gear, flaps, and a controllable-pitch propeller. Covers systems, procedures, and emergency operations.',
    duration: 'Based on proficiency',
    img: `${U}-1552773346-ca6976a5d4ca?w=600&q=85&auto=format&fit=crop&crop=center`,
    imgAlt: 'Selective focus of aircraft gear shift lever',
  },
  {
    tag: 'Endorsement',
    title: 'High Performance Endorsement',
    description: 'Required to fly aircraft with more than 200 horsepower. Training covers engine management, performance planning, and operational differences from standard trainers.',
    duration: 'Based on proficiency',
    img: `${U}-1540575861501-7cf05a4b125a?w=600&q=85&auto=format&fit=crop&crop=center`,
    imgAlt: 'Black and white airliner turbine engine',
  },
  {
    tag: 'Endorsement',
    title: 'TAA Endorsement',
    description: 'Technologically Advanced Aircraft endorsement for glass cockpit aircraft. Master Garmin G1000, G3X, and advanced avionics systems used in modern training and commercial aircraft.',
    duration: 'Based on proficiency',
    img: `${U}-1587408811730-1a978e6c407d?w=600&q=85&auto=format&fit=crop&crop=center`,
    imgAlt: 'Glass cockpit avionics screen display',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <span className="section-label block mb-4">Training Programs</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="section-heading max-w-md">
              Every Certification
              <br />
              & Endorsement.
            </h2>
            <p className="text-white/50 max-w-sm leading-relaxed md:text-right">
              From your first flight to advanced endorsements — certifications, proficiency checks, and ratings all in one place.
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className={`card-dark p-0 flex flex-col group fade-in-up overflow-hidden rounded-2xl ${
                service.highlight
                  ? 'border-cream-100/30 bg-cream-100/5 hover:bg-cream-100/8'
                  : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.imgAlt}
                  className="w-full h-full object-cover img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                <span
                  className={`absolute top-3 left-3 text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-sm ${
                    service.highlight
                      ? 'bg-cream-100/20 text-cream-100 border border-cream-100/30'
                      : 'bg-black/40 text-white/70 border border-white/20'
                  }`}
                >
                  {service.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1 mb-5">
                  {service.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/8">
                  <span className="text-xs text-white/30">{service.duration}</span>
                  <a
                    href="#contact"
                    className="text-xs font-medium text-cream-200/70 hover:text-cream-100 transition-colors flex items-center gap-1 group/link"
                  >
                    Get started
                    <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
