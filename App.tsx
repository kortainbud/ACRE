
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import YokaiMarket from './components/YokaiMarket';
import Stats from './components/Stats';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';
import ExploreMap from './components/ExploreMap';

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentView, setCurrentView] = useState<'home' | 'map'>('home');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="relative min-h-screen">
      {/* 3D Wireframe Background */}
      <div className="wireframe-bg"></div>
      
      {/* Terrain Lines for spatial feel */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="terrain-lines" style={{ top: '10%', transform: 'scaleY(-1)' }}></div>
        <div className="terrain-lines"></div>
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-yellow-900/10 rounded-full blur-[150px]"></div>
      </div>

      <Header scrolled={scrollY > 50} onNavigate={(view) => setCurrentView(view)} currentView={currentView} />
      
      <main className="relative z-10">
        {currentView === 'home' ? (
          <>
            <section id="home">
              <Hero onExplore={() => setCurrentView('map')} />
            </section>
            
            <section id="features" className="py-32">
              <FeatureGrid />
            </section>

            <section id="market" className="py-32 bg-black/40 backdrop-blur-sm border-y border-white/5">
              <YokaiMarket />
            </section>

            <section id="stats" className="py-24">
              <Stats />
            </section>

            <section id="roadmap" className="py-32">
              <Roadmap />
            </section>
            <Footer />
          </>
        ) : (
          <ExploreMap />
        )}
      </main>
    </div>
  );
};

export default App;
