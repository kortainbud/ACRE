
import React, { useState, useEffect, useMemo } from 'react';
import { getSectorAnalysis, SectorDetail } from '../services/gemini';

const GRID_SIZE = 8;

const ExploreMap: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [details, setDetails] = useState<SectorDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  
  // Investment flow state
  const [investmentStep, setInvestmentStep] = useState<'idle' | 'confirming' | 'processing' | 'success'>('idle');

  // Pre-determined "Acquired" sectors based on hash of coordinates
  const terrainMap = useMemo(() => {
    return Array(GRID_SIZE * GRID_SIZE).fill(0).map((_, i) => {
      const height = Math.random();
      const isAcquired = (i * 13) % 7 === 0 || (i * 3) % 11 === 0;
      return { height, isAcquired };
    });
  }, []);

  useEffect(() => {
    if (selectedSector) {
      const fetchDetails = async () => {
        setLoading(true);
        setInvestmentStep('idle');
        const data = await getSectorAnalysis(selectedSector);
        setDetails(data);
        setLoading(false);
      };
      fetchDetails();
    }
  }, [selectedSector]);

  const handleInvestment = () => {
    setInvestmentStep('confirming');
  };

  const confirmInvestment = () => {
    setInvestmentStep('processing');
    setTimeout(() => {
      setInvestmentStep('success');
    }, 3000);
  };

  return (
    <div className="pt-24 min-h-screen flex flex-col lg:flex-row h-screen overflow-hidden bg-black/50">
      {/* Left Panel: Map */}
      <div className="w-full lg:w-3/4 p-6 relative flex items-center justify-center bg-black/20">
        <div className="absolute top-10 left-10 z-20">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">Spatial <span className="text-yellow-500">Explorer</span></h2>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              High Yield
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-white/20"></span>
              Acquired
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              Available
            </div>
          </div>
        </div>

        <div className="relative perspective-2000 rotate-x-[30deg] rotate-z-[-15deg]">
          <div 
            className="grid gap-2" 
            style={{ 
              gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
              width: 'min(70vw, 600px)',
              height: 'min(70vw, 600px)'
            }}
          >
            {terrainMap.map((cell, idx) => {
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
                    ${cell.isAcquired ? 'bg-white/5 opacity-50 cursor-not-allowed border-white/5' : ''}
                    ${isSelected ? 'bg-yellow-500/30 border-yellow-500 !opacity-100' : ''}
                    ${!cell.isAcquired && !isSelected ? 'bg-red-900/5 hover:bg-red-900/10 hover:border-red-500/30' : ''}
                  `}
                  style={{
                    transform: `translateZ(${isSelected || (isHovered && !cell.isAcquired) ? '25px' : '0px'})`,
                    boxShadow: isSelected ? '0 0 30px rgba(234, 179, 8, 0.4)' : 'none'
                  }}
                >
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                    <path 
                      d={`M0 ${100 - cell.height * 100} Q 50 ${100 - cell.height * 80} 100 ${100 - cell.height * 90}`} 
                      fill="none" 
                      stroke="currentColor" 
                      className={cell.isAcquired ? 'text-gray-500' : isSelected ? 'text-yellow-500' : 'text-red-500'}
                      strokeWidth="1"
                    />
                  </svg>
                  {cell.isAcquired && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <div className="w-1/2 h-px bg-white/20 rotate-45"></div>
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-500 animate-pulse"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Panel: Property Inspector */}
      <div className="w-full lg:w-1/4 glass border-l border-white/10 p-8 overflow-y-auto z-30 bg-[#050505]/95">
        {!selectedSector ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <div className="w-16 h-16 rounded-full border border-red-900/30 flex items-center justify-center mb-6 animate-pulse">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-black uppercase italic mb-2">Scan for Assets</h3>
            <p className="text-xs text-gray-500">Initialize spatial diagnostics by selecting an available sector on the grid.</p>
          </div>
        ) : (
          <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-1">Sector diagnostics</div>
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
              <div className="absolute inset-0 bg-red-950/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-3/4 h-px bg-red-500/20 animate-[scanning_2s_linear_infinite]"></div>
              </div>
              {loading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Lore & Spatial Data</h4>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {loading ? 'Decrypting sector archives...' : details?.lore}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/5">
                  <div className="text-[10px] text-yellow-500 uppercase font-black tracking-widest mb-1">Yield Potential</div>
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
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Valuation</div>
                    <div className="text-xl font-black text-yellow-500">{loading ? 'CALC...' : details?.price}</div>
                  </div>
                </div>

                {details?.owner === 'N/A' || !details?.owner?.includes('_') ? (
                  <button 
                    onClick={handleInvestment}
                    className="w-full py-4 bg-yellow-500 text-black font-black uppercase tracking-widest text-xs hover:bg-yellow-400 transition-colors shadow-[0_0_30px_rgba(234,179,8,0.2)]"
                  >
                    INVEST IN QUADRANT
                  </button>
                ) : (
                  <button className="w-full py-4 bg-white/5 text-gray-500 font-black uppercase tracking-widest text-xs cursor-not-allowed border border-white/10">
                    ACQUIRED BY {details?.owner}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Investment Flow Modal */}
      {investmentStep !== 'idle' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setInvestmentStep('idle')}></div>
          <div className="relative glass border border-white/10 p-12 max-w-lg w-full text-center shadow-[0_0_100px_rgba(234,179,8,0.1)]">
            {investmentStep === 'confirming' && (
              <div className="animate-[scaleIn_0.3s_ease-out]">
                <h3 className="text-3xl font-black uppercase italic mb-6">Confirm Investment</h3>
                <p className="text-gray-400 mb-8 font-light">
                  You are about to deploy capital into <span className="text-yellow-500 font-bold">{details?.name}</span>. This transaction will be minted onto the Yokai Genesis Layer.
                </p>
                <div className="bg-white/5 p-6 rounded-sm border border-white/5 mb-8">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                    <span>Investment Cost:</span>
                    <span className="text-yellow-500">{details?.price}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                    <span>Est. Annual Qi:</span>
                    <span className="text-green-500">+12.4%</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setInvestmentStep('idle')} className="flex-1 py-4 border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5">Cancel</button>
                  <button onClick={confirmInvestment} className="flex-1 py-4 bg-yellow-500 text-black text-xs font-black uppercase tracking-widest hover:bg-yellow-400">Initialize Mint</button>
                </div>
              </div>
            )}

            {investmentStep === 'processing' && (
              <div className="py-12">
                <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
                <h3 className="text-xl font-black uppercase italic mb-2">Syncing Genesis Layer...</h3>
                <p className="text-xs text-gray-500 font-mono">HASH: 0x8a1...{Math.random().toString(16).slice(2, 8)}</p>
              </div>
            )}

            {investmentStep === 'success' && (
              <div className="animate-[scaleIn_0.3s_ease-out]">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                   <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-4xl font-black uppercase italic mb-4">Investment Secured</h3>
                <p className="text-gray-400 mb-10 font-light">Congratulations. Sector <span className="text-white font-bold">{details?.name}</span> is now linked to your digital identity.</p>
                <button onClick={() => setInvestmentStep('idle')} className="w-full py-4 bg-yellow-500 text-black text-xs font-black uppercase tracking-widest">View in Portfolio</button>
              </div>
            )}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scanning {
          0% { transform: translateY(-50px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(50px); opacity: 0; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}} />
    </div>
  );

  function handleSectorClick(id: string) {
    const idx = id.split('-').map(Number);
    const cellIdx = idx[1] * GRID_SIZE + idx[0];
    if (terrainMap[cellIdx].isAcquired) return;
    setSelectedSector(id);
  }
};

export default ExploreMap;
