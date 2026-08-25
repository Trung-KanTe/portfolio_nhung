import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WaterfallBackground from './components/WaterfallBackground'
import ThreeBackground from './components/ThreeBackground'
import ScrollProgress from './components/ScrollProgress'
import { LenisProvider } from './lib/LenisProvider'

function App() {
  return (
    <LenisProvider>
      <div className="relative min-h-screen">
        <ThreeBackground />
        <WaterfallBackground />
        <ScrollProgress />

        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Education />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </LenisProvider>
  )
}

export default App
