
import React from 'react';
import { ViewType } from '../App';

interface HeaderProps {
  scrolled: boolean;
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
}

const Header: React.FC<HeaderProps> = ({ scrolled, onNavigate, currentView }) => {
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || currentView !== 'home' ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
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
          <button 
            onClick={() => onNavigate('home')}
            className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${currentView === 'home' ? 'text-yellow-500' : 'text-gray-400 hover:text-white'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => onNavigate('marketplace')}
            className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${currentView === 'marketplace' ? 'text-yellow-500' : 'text-gray-400 hover:text-white'}`}
          >
            Marketplace
          </button>
          <button 
            onClick={() => onNavigate('staking')}
            className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${currentView === 'staking' ? 'text-yellow-500' : 'text-gray-400 hover:text-white'}`}
          >
            Staking
          </button>
          <button 
            onClick={() => onNavigate('governance')}
            className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${currentView === 'governance' ? 'text-yellow-500' : 'text-gray-400 hover:text-white'}`}
          >
            DAO
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('map')}
            className={`px-5 py-2 border ${currentView === 'map' ? 'bg-yellow-500 text-black border-yellow-500' : 'border-yellow-500/50 text-yellow-500'} text-[10px] font-black rounded-sm hover:bg-yellow-400 hover:text-black transition-all uppercase tracking-[0.2em]`}
          >
            {currentView === 'map' ? 'MAP VIEW' : 'EXPLORE MAP'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
