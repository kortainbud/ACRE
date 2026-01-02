
import React from 'react';

interface HeaderProps {
  scrolled: boolean;
  onNavigate: (view: 'home' | 'map') => void;
  currentView: 'home' | 'map';
}

const Header: React.FC<HeaderProps> = ({ scrolled, onNavigate, currentView }) => {
  const navItems = [
    { name: 'Features', href: '#features', view: 'home' },
    { name: 'Market', href: '#market', view: 'home' },
    { name: 'Stats', href: '#stats', view: 'home' },
    { name: 'Roadmap', href: '#roadmap', view: 'home' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || currentView === 'map' ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-yellow-500 rounded-sm flex items-center justify-center font-bold text-black text-xl group-hover:scale-110 transition-transform">A</div>
          <span className="text-xl font-bold tracking-tighter">$ACRE</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {currentView === 'home' ? (
            navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-yellow-500 transition-colors"
              >
                {item.name}
              </a>
            ))
          ) : (
            <button 
              onClick={() => onNavigate('home')}
              className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-yellow-500 transition-colors"
            >
              Back to Overview
            </button>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('map')}
            className={`px-5 py-2 border ${currentView === 'map' ? 'bg-yellow-500 text-black' : 'border-yellow-500/50 text-yellow-500'} text-[10px] font-black rounded-sm hover:bg-yellow-400 hover:text-black transition-all uppercase tracking-[0.2em]`}
          >
            {currentView === 'map' ? 'Map Active' : 'Explore Map'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
