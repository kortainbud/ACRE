
import React from 'react';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="pt-48 pb-24 px-6 relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-red-950/30 border border-red-900/30 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            Scan Active: Sector 7-G
          </div>
          <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-8">
            DIGITIZE <br />
            <span className="gold-gradient">THE LAND.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-lg mb-12 leading-relaxed font-light">
            Secure your quadrant in the Yokaiverse. $ACRE converts virtual topography into liquid, tradable DeFi assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={onExplore}
              className="px-10 py-5 bg-yellow-500 text-black font-black text-sm rounded-sm hover:scale-105 transition-all shadow-[0_0_30px_rgba(234,179,8,0.2)] flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              DEPLOY CAPITAL
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={onExplore}
              className="px-10 py-5 bg-transparent border border-white/10 font-bold text-sm rounded-sm hover:bg-white/5 transition-colors uppercase tracking-widest"
            >
              Explore Map
            </button>
          </div>
          
          <div className="mt-16 flex items-center gap-8 border-l-2 border-red-900/30 pl-8">
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Current Sector</div>
              <div className="text-lg font-mono font-bold">YOKAI-NORTH</div>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Status</div>
              <div className="text-lg font-mono font-bold text-green-500">AVAILABLE</div>
            </div>
          </div>
        </div>

        <div className="relative group perspective-1000">
          <div className="absolute inset-0 bg-red-600/10 rounded-full blur-[120px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
          
          <div className="relative aspect-[4/5] glass rounded-sm overflow-hidden border border-white/10 flex items-center justify-center p-4 hologram-glow transition-transform duration-700 group-hover:rotate-1 group-hover:scale-[1.02]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-screen"></div>
            
            <svg className="w-full h-full opacity-60 float-anim" viewBox="0 0 400 500" preserveAspectRatio="none">
              <defs>
                <linearGradient id="wire-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#991b1b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#991b1b" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {[...Array(30)].map((_, i) => (
                <path
                  key={i}
                  d={`M0 ${100 + i * 15} Q 100 ${80 + i * 10 + Math.sin(i) * 50} 200 ${120 + i * 12} T 400 ${100 + i * 15}`}
                  fill="none"
                  stroke="url(#wire-grad)"
                  strokeWidth="0.5"
                />
              ))}
            </svg>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-[0.5em] text-yellow-500 mb-2 font-black">Digital Topography</div>
                <div className="text-4xl font-black text-white tracking-widest mb-1 italic">V-ACRE #001</div>
                <div className="w-12 h-0.5 bg-yellow-500 mx-auto"></div>
              </div>
            </div>
            
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500/30 blur-sm animate-[scan_4s_ease-in-out_infinite]"></div>
          </div>
          
          <div className="absolute -top-10 -right-4 glass p-6 border border-white/10 float-anim">
            <div className="text-[10px] text-yellow-500 font-black mb-3 uppercase tracking-widest">Asset Valuation</div>
            <div className="text-3xl font-black font-mono">1.4M $ACRE</div>
            <div className="mt-2 h-1 w-full bg-white/5 overflow-hidden">
              <div className="h-full bg-yellow-500 w-3/4 animate-[grow_2s_ease-out]"></div>
            </div>
          </div>

          <div className="absolute -bottom-8 -left-8 glass p-6 border border-white/10 float-anim" style={{ animationDelay: '3s' }}>
            <div className="flex gap-4 items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Live Feed</div>
                <div className="text-sm font-bold">New plot minted in Sector 4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes grow {
          from { width: 0%; }
          to { width: 75%; }
        }
      `}} />
    </div>
  );
};

export default Hero;
