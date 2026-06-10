export default function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-4 max-w-6xl mx-auto px-6 py-2 opacity-30">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cream-200/40 to-transparent" />
      {label && (
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-cream-200/60 whitespace-nowrap">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cream-200/40 to-transparent" />
    </div>
  )
}
