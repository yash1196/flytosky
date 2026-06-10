import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollAnimator from './ScrollAnimator'

const U = 'https://images.unsplash.com/photo'

const photos = [
  { src: `${U}-1436491865332-7a61a109cc05?w=800&q=80&auto=format&fit=crop`, alt: 'Aerial view of airliner', span: 'col-span-2 row-span-2' },
  { src: `${U}-1520442027413-7bf6c51517da?w=600&q=80&auto=format&fit=crop`, alt: 'Cockpit instruments', span: '' },
  { src: `${U}-1530545124313-ce5e8eae55af?w=600&q=80&auto=format&fit=crop`, alt: 'Airplane in blue sky', span: '' },
  { src: `${U}-1683971336619-d445cbec0276?w=600&q=80&auto=format&fit=crop`, alt: 'Runway at sunset', span: '' },
  { src: `${U}-1628000156679-b36c91956540?w=600&q=80&auto=format&fit=crop`, alt: 'Small aircraft in flight', span: '' },
  { src: `${U}-1540575861501-7cf05a4b125a?w=600&q=80&auto=format&fit=crop`, alt: 'Aircraft turbine', span: '' },
  { src: `${U}-1524592714635-d77511a4834d?w=600&q=80&auto=format&fit=crop`, alt: 'Plane on runway', span: '' },
  { src: `${U}-1556388158-158ea5ccacbd?w=600&q=80&auto=format&fit=crop`, alt: 'Landing aircraft', span: '' },
  { src: `${U}-1569154941061-e231b4725ef1?w=600&q=80&auto=format&fit=crop`, alt: 'White airplane', span: '' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  const prev = () => setLightbox(i => (i - 1 + photos.length) % photos.length)
  const next = () => setLightbox(i => (i + 1) % photos.length)

  return (
    <section id="gallery" className="py-24 md:py-32 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollAnimator>
          <div className="mb-14">
            <span className="section-label block mb-4">Photo Gallery</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="section-heading">Life in<br />the Cockpit.</h2>
              <p className="text-white/50 max-w-sm text-sm leading-relaxed md:text-right">
                A glimpse into the world of flight training — from the ramp to the runway, and everything in between.
              </p>
            </div>
          </div>
        </ScrollAnimator>

        {/* Masonry grid */}
        <ScrollAnimator delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px]">
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className={`relative overflow-hidden rounded-xl group ${photo.span}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover img-zoom-lg"
                />
                <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/30 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollAnimator>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-white/60 hover:text-white z-10">
            <X className="w-7 h-7" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev() }} className="absolute left-4 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white z-10">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <img
            src={photos[lightbox].src.replace('w=600', 'w=1200').replace('w=800', 'w=1600')}
            alt={photos[lightbox].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
            onClick={e => e.stopPropagation()}
          />
          <button onClick={(e) => { e.stopPropagation(); next() }} className="absolute right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white z-10">
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-6 flex gap-2">
            {photos.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setLightbox(i) }}
                className={`rounded-full transition-all ${i === lightbox ? 'bg-cream-200 w-6 h-2' : 'bg-white/30 w-2 h-2'}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
