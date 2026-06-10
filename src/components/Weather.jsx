import { useState, useEffect } from 'react'

const WMO_CODES = {
  0:  { label: 'Clear',           icon: '☀️' },
  1:  { label: 'Mostly Clear',    icon: '🌤️' },
  2:  { label: 'Partly Cloudy',   icon: '⛅' },
  3:  { label: 'Overcast',        icon: '☁️' },
  45: { label: 'Foggy',           icon: '🌫️' },
  48: { label: 'Icing Fog',       icon: '🌫️' },
  51: { label: 'Light Drizzle',   icon: '🌦️' },
  53: { label: 'Drizzle',         icon: '🌦️' },
  55: { label: 'Heavy Drizzle',   icon: '🌧️' },
  61: { label: 'Light Rain',      icon: '🌧️' },
  63: { label: 'Rain',            icon: '🌧️' },
  65: { label: 'Heavy Rain',      icon: '🌧️' },
  71: { label: 'Light Snow',      icon: '🌨️' },
  73: { label: 'Snow',            icon: '❄️' },
  75: { label: 'Heavy Snow',      icon: '❄️' },
  80: { label: 'Showers',         icon: '🌦️' },
  81: { label: 'Showers',         icon: '🌧️' },
  82: { label: 'Heavy Showers',   icon: '⛈️' },
  95: { label: 'Thunderstorm',    icon: '⛈️' },
  96: { label: 'Thunderstorm',    icon: '⛈️' },
  99: { label: 'Thunderstorm',    icon: '⛈️' },
}

function wmo(code) {
  return WMO_CODES[code] ?? { label: 'Unknown', icon: '🌡️' }
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function fmt(dateStr) {
  const d = new Date(dateStr + 'T12:00:00')
  return DAYS[d.getDay()]
}

export default function Weather() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    // KUGN — Waukegan, IL: 42.422°N, 87.867°W
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=42.422&longitude=-87.867' +
      '&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m,winddirection_10m,visibility' +
      '&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max' +
      '&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago&forecast_days=11'
    )
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError(true))
  }, [])

  const flyingCondition = (code) => {
    if ([0, 1, 2].includes(code)) return { label: 'Good to Fly', color: 'text-green-400', dot: 'bg-green-400' }
    if ([3, 45, 48].includes(code)) return { label: 'Marginal', color: 'text-yellow-400', dot: 'bg-yellow-400' }
    return { label: 'Not Recommended', color: 'text-red-400', dot: 'bg-red-400' }
  }

  if (error) return null

  const cur = data?.current
  const daily = data?.daily

  return (
    <section id="weather" className="py-24 md:py-32 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <span className="section-label block mb-4">Live Weather</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="section-heading">
              Flying Conditions
              <br />
              at KUGN Waukegan.
            </h2>
            <p className="text-white/50 max-w-sm leading-relaxed text-sm md:text-right">
              Real-time weather and 10-day outlook sourced directly from Open-Meteo for Waukegan Regional Airport.
            </p>
          </div>
        </div>

        {!data ? (
          <div className="card-dark rounded-2xl p-12 flex items-center justify-center">
            <div className="text-white/30 text-sm animate-pulse">Loading weather data…</div>
          </div>
        ) : (
          <>
            {/* Today card */}
            <div className="card-dark rounded-2xl p-8 mb-6 border-cream-100/15 ring-1 ring-cream-100/10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                {/* Left — temp & condition */}
                <div className="flex items-center gap-6">
                  <span className="text-7xl">{wmo(cur.weathercode).icon}</span>
                  <div>
                    <div className="text-6xl font-bold text-cream-200" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {Math.round(cur.temperature_2m)}°F
                    </div>
                    <div className="text-white/50 text-sm mt-1">{wmo(cur.weathercode).label}</div>
                    <div className="text-white/30 text-xs mt-0.5">Feels like {Math.round(cur.apparent_temperature)}°F</div>
                  </div>
                </div>

                {/* Right — stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-4">
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase text-white/30 mb-1">Wind</div>
                    <div className="text-sm font-semibold text-white/80">{Math.round(cur.windspeed_10m)} mph</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase text-white/30 mb-1">Visibility</div>
                    <div className="text-sm font-semibold text-white/80">
                      {cur.visibility >= 10000 ? '10+ mi' : `${(cur.visibility * 0.000621371).toFixed(1)} mi`}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase text-white/30 mb-1">Flight Status</div>
                    <div className={`text-sm font-semibold flex items-center gap-1.5 ${flyingCondition(cur.weathercode).color}`}>
                      <span className={`w-2 h-2 rounded-full ${flyingCondition(cur.weathercode).dot}`} />
                      {flyingCondition(cur.weathercode).label}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 10-day forecast */}
            <div className="card-dark rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/8">
                <span className="text-xs font-bold tracking-widest uppercase text-white/30">10-Day Forecast</span>
              </div>
              <div className="divide-y divide-white/6">
                {daily.time.slice(1).map((date, i) => {
                  const idx = i + 1
                  const cond = flyingCondition(daily.weathercode[idx])
                  const isToday = i === 0
                  return (
                    <div key={date} className="flex items-center justify-between px-6 py-4 hover:bg-white/3 transition-colors">
                      <div className="w-12 text-sm font-semibold text-white/60">
                        {isToday ? 'Today' : fmt(date)}
                      </div>
                      <div className="flex items-center gap-3 w-32">
                        <span className="text-xl">{wmo(daily.weathercode[idx]).icon}</span>
                        <span className="text-xs text-white/40 hidden sm:block">{wmo(daily.weathercode[idx]).label}</span>
                      </div>
                      <div className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold w-36 ${cond.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cond.dot}`} />
                        {cond.label}
                      </div>
                      <div className="text-xs text-blue-300/70 w-16 text-center hidden sm:block">
                        {daily.precipitation_probability_max[idx]}% rain
                      </div>
                      <div className="flex items-center gap-3 text-sm font-semibold">
                        <span className="text-cream-200">{Math.round(daily.temperature_2m_max[idx])}°</span>
                        <span className="text-white/30">{Math.round(daily.temperature_2m_min[idx])}°</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="px-6 py-3 border-t border-white/8 flex items-center justify-between">
                <span className="text-xs text-white/20">Source: Open-Meteo · KUGN Waukegan, IL</span>
                <span className="text-xs text-white/20">Updated on load</span>
              </div>
            </div>
          </>
        )}

      </div>
    </section>
  )
}
