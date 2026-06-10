import { Instagram, ExternalLink } from 'lucide-react'

export default function InstagramSection() {
  return (
    <section id="instagram" className="py-24 md:py-32 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="section-label block mb-4">Behind the Controls</span>
            <h2 className="section-heading">
              Life in
              <br />
              the Cockpit.
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline self-start md:self-auto flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            Follow on Instagram
            <ExternalLink className="w-3 h-3 opacity-50" />
          </a>
        </div>

        {/* 
          ===================================================
          INSTAGRAM EMBED INSTRUCTIONS
          ===================================================
          When your Instagram account is ready:

          1. Go to https://behold.so and sign up (free)
          2. Connect your Instagram account
          3. Create a feed and copy the embed widget ID
          4. Replace the placeholder below with:

          <div id="your-behold-widget-id"></div>
          <script src="https://w.behold.so/widget.js" type="module"></script>

          OR use SnapWidget (https://snapwidget.com) — also free.
          ===================================================
        */}

        {/* Placeholder grid — replace with real embed when ready */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square card-dark flex flex-col items-center justify-center gap-2 group cursor-pointer"
            >
              <Instagram
                className="w-6 h-6 text-white/15 group-hover:text-white/30 transition-colors"
                strokeWidth={1.5}
              />
              <span className="text-xs text-white/20 group-hover:text-white/40 transition-colors">
                Coming soon
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-white/25 text-sm mt-8">
          Instagram feed coming soon — follow along for flight videos, weather observations, and student milestones.
        </p>
      </div>
    </section>
  )
}
