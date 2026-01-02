
import React, { useState, useEffect, useMemo } from 'react';
import { getSectorAnalysis, SectorDetail } from '../services/gemini';

const GRID_SIZE = 8; // 8x8 grid for performance and visual clarity

const ExploreMap: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [details, setDetails] = useState<SectorDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  // Generate a predictable seed for terrain heights
  const terrainMap = useMemo(() => {
    return Array(GRID_SIZE * GRID_SIZE).fill(0).map(() => Math.random());
  }, []);

  useEffect(() => {
    if (selectedSector) {
      const fetchDetails = async () => {
        setLoading(true);
        const data = await getSectorAnalysis(selectedSector);
        setDetails(data);
        setLoading(false);
      };
      fetchDetails();
    }
  }, [selectedSector]);

  const handleSectorClick = (id: string) => {
    setSelectedSector(id);
  };

  return (
    <div className="pt-24 min-h-screen flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Left Panel: Map Controller & Navigation */}
      <div className="w-full lg:w-3/4 p-6 relative flex items-center justify-center bg-black/20">
        <div className="absolute top-10 left-10 z-20">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic italic">Spatial <span className="text-yellow-500">Explorer</span></h2>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              High Yield
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              Available
            </div>
          </div>
        </div>

        {/* The Map Grid */}
        <div className="relative perspective-2000 rotate-x-[30deg] rotate-z-[-15deg] transition-all duration-1000">
          <div 
            className="grid gap-2" 
            style={{ 
              gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
              width: 'min(70vw, 600px)',
              height: 'min(70vw, 600px)'
            }}
          >
            {terrainMap.map((height, idx) => {
              const x = idx % GRID_SIZE;
              const y = Math.floor(idx / GRID_SIZE);
              const id = `${x}-${y}`;
              const isSelected = selectedSector === id;
              const isHovered = hoveredSector === id;
              
              return (
                <div 
                  key={id}
                  onMouseEnter={() => setHoveredSector(id)}
                  onMouseLeave={() => setHoveredSector(null)}
                  onClick={() => handleSectorClick(id)}
                  className={`
                    relative cursor-pointer transition-all duration-300
                    border border-white/5 group
                    ${isSelected ? 'bg-yellow-500/20 border-yellow-500' : 'bg-red-900/5 hover:bg-red-900/10 hover:border-red-500/30'}
                  `}
                  style={{
                    transform: `translateZ(${isSelected || isHovered ? '20px' : '0px'})`,
                    boxShadow: isSelected ? '0 0 20px rgba(234, 179, 8, 0.3)' : 'none'
                  }}
                >
                  {/* Wireframe Terrain Lines within the cell */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                    <path 
                      d={`M0 ${100 - height * 100} Q 50 ${100 - height * 80} 100 ${100 - height * 90}`} 
                      fill="none" 
                      stroke="currentColor" 
                      className={isSelected ? 'text-yellow-500' : 'text-red-500'}
                      strokeWidth="1"
                    />
                  </svg>

                  {/* Cell Coordinate Label */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[8px] font-mono text-white/40">{id}</span>
                  </div>

                  {/* Marker for selected/important areas */}
                  {isSelected && (
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-500 animate-pulse"></div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Base Plate Shadow */}
          <div className="absolute -inset-10 bg-red-900/5 -z-10 blur-2xl rounded-full"></div>
        </div>

        {/* HUD Elements */}
        <div className="absolute bottom-10 right-10 flex flex-col gap-4 text-right">
          <div className="font-mono text-[10px] text-gray-500 tracking-widest">
            COORDS: {hoveredSector || '---'}
          </div>
          <div className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">
            LAYER: Genesis_Mainnet_01
          </div>
        </div>
      </div>

      {/* Right Panel: Property Inspector */}
      <div className="w-full lg:w-1/4 glass border-l border-white/10 p-8 overflow-y-auto z-30">
        {!selectedSector ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full border border-red-900/30 flex items-center justify-center mb-6 animate-pulse">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-black uppercase italic mb-2">Scan for Assets</h3>
            <p className="text-sm text-gray-500 font-light">Select a sector on the spatial grid to initialize deep-level analysis and market valuation.</p>
          </div>
        ) : (
          <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-1">Quadrant {selectedSector}</div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">
                  {loading ? 'Initializing...' : details?.name}
                </h3>
              </div>
              <button onClick={() => setSelectedSector(null)} className="text-gray-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative aspect-video glass border border-white/5 overflow-hidden group">
              {/* Simulated "Satellite View" / Landscape scan */}
              <div className="absolute inset-0 bg-red-900/10 group-hover:bg-red-900/20 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {[...Array(10)].map((_, i) => (
                    <line key={i} x1="0" y1={i * 10} x2="100" y2={i * 10 + Math.sin(i) * 10} stroke="#991b1b" strokeWidth="0.5" />
                  ))}
                </svg>
              </div>
              {loading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Lore & Heritage</h4>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {loading ? 'Decrypting sector archives...' : details?.lore}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/5">
                  <div className="text-[10px] text-yellow-500 uppercase font-black tracking-widest mb-1">Yield</div>
                  <div className="text-lg font-black">{loading ? '--' : details?.yieldPotential}</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/5">
                  <div className="text-[10px] text-yellow-500 uppercase font-black tracking-widest mb-1">Topography</div>
                  <div className="text-xs font-bold leading-tight">{loading ? '--' : details?.topography}</div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Registered Owner</div>
                    <div className="text-sm font-mono font-bold text-white">{loading ? 'SCANNING...' : details?.owner}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Market Price</div>
                    <div className="text-xl font-black text-yellow-500">{loading ? 'CALC...' : details?.price}</div>
                  </div>
                </div>

                <button className="w-full py-4 bg-yellow-500 text-black font-black uppercase tracking-widest text-xs hover:bg-yellow-400 transition-colors shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                  Make Investment Offer
                </button>
                <button className="w-full py-4 mt-3 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-colors">
                  View On Explorer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .perspective-2000 {
          perspective: 2000px;
        }
        .rotate-x-\\[30deg\\] {
          transform: rotateX(30deg);
        }
        .rotate-z-\\[-15deg\\] {
          transform: rotateX(30deg) rotateZ(-15deg);
        }
      `}} />
    </div>
  );
};

export default ExploreMap;
