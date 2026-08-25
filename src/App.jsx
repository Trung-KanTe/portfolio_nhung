import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WaterfallBackground from './components/WaterfallBackground'
import ScrollProgress from './components/ScrollProgress'
import { LenisProvider } from './lib/LenisProvider'

// Lazy load below-fold components - not needed on initial render
const About = lazy(() => import('./components/About'))
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const Education = lazy(() => import('./components/Education'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const ThreeBackground = lazy(() => import('./components/ThreeBackground'))

function App() {
  return (
    <LenisProvider>
      <div className="relative min-h-screen">
        <WaterfallBackground />
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>
        <ScrollProgress />

        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <Suspense fallback={null}>
              <About />
              <Experience />
              <Projects />
              <Skills />
              <Education />
              <Contact />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </LenisProvider>
  )
}

export default App
