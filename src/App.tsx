import { lazy, Suspense, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import LenisProvider from './providers/LenisProvider';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import Loader from './components/Loader';
import Background from './components/Background/Background';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';

const About = lazy(() => import('./components/About/About'));
const Services = lazy(() => import('./components/Services/Services'));
const WebsiteStyles = lazy(() => import('./components/WebsiteStyles/WebsiteStyles'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const Process = lazy(() => import('./components/Process/Process'));
const WhyChooseMe = lazy(() => import('./components/WhyChooseMe/WhyChooseMe'));
const Collaborator = lazy(() => import('./components/Collaborator/Collaborator'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Footer = lazy(() => import('./components/Footer/Footer'));

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) {
      gsap.fromTo(
        '#main-content',
        { opacity: 0, scale: 0.98, filter: 'blur(8px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
      );
    }
  }, [ready]);

  return (
    <LenisProvider>
      <div className="relative min-h-screen bg-ink-950">
        {!ready && <Loader onComplete={() => setReady(true)} />}
        <Cursor />
        <ScrollProgress />
        <Background />
        <Navbar />

        <main
          id="main-content"
          className="relative z-10"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <Hero />
          <Suspense fallback={null}>
            <About />
            <Services />
            <WebsiteStyles />
            <Projects />
            <Process />
            <WhyChooseMe />
            <Collaborator />
            <Contact />
            <Footer />
          </Suspense>
        </main>
      </div>
    </LenisProvider>
  );
}
