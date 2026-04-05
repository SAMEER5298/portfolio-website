import { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PageLoader from './components/PageLoader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import './styles/globals.css';

const About = lazy(() => import('./components/About'));
const TechStack = lazy(() => import('./components/TechStack'));
const Projects = lazy(() => import('./components/Projects'));
const Timeline = lazy(() => import('./components/Timeline'));
const Contact = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));

const LoadingFallback = () => (
  <div className="h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent-mint border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <PageLoader onComplete={handleLoaderComplete} />}
      </AnimatePresence>
      
      {!isLoading && <CustomCursor />}
      {!isLoading && <ScrollProgress />}
      {!isLoading && <BackToTop />}
      
      <div className="font-dm text-text-primary bg-background min-h-screen">
        <Navbar />
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <About />
          <TechStack />
          <Projects />
          <Timeline />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
