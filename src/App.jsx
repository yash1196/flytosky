import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import AviationBackground from './components/AviationBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import CertPath from './components/CertPath'
import Fleet from './components/Fleet'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import Weather from './components/Weather'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'
import BackToTop from './components/BackToTop'
import MobileNav from './components/MobileNav'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <div className={`min-h-screen bg-navy-950 relative transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Global aviation background animation - sits behind everything */}
        <AviationBackground />

        {/* All content sits above the canvas, with semi-transparent sections */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <Stats />
          <div className="section-accent">
            <Services />
          </div>
          <CertPath />
          <div className="section-accent">
            <Fleet />
          </div>
          <Pricing />
          <div className="section-accent">
            <Testimonials />
          </div>
          <Weather />
          <div className="section-accent">
            <About />
          </div>
          <Contact />
          <Footer />
        </div>

        <FloatingCTA />
        <BackToTop />
        <MobileNav />
      </div>
    </>
  )
}
