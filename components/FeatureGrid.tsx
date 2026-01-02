
import React from 'react';

const features = [
  {
    title: "Terrain Tiling",
    description: "Every plot of land in the Yokaiverse is unique. Our tiling engine ensures your property is distinct, verifiable, and optimized for 3D deployment.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13h16M12 4v16" />
      </svg>
    )
  },
  {
    title: "Atmospheric Yield",
    description: "Earn rewards based on the 'Qi' of your location. Mountainous regions generate different yields than virtual urban sprawls.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    )
  },
  {
    title: "Landscape Engine",
    description: "Use the $ACRE toolkit to modify your land's topography. Build peaks, valleys, or flatlands to maximize your virtual commerce space.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Spatial Trading",
    description: "Trade plot rights in a real-time 3D marketplace. Zoom into individual quadrants to see live data before executing an investment.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    )
  }
];

const FeatureGrid: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <div className="text-yellow-500 text-xs font-black uppercase tracking-[0.4em] mb-4">Core Infrastructure</div>
          <h2 className="text-5xl lg:text-6xl font-black mb-6 tracking-tighter uppercase italic">The Building <br /><span className="text-red-700">Blocks</span> of Yokai.</h2>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            We don't just sell tokens. We provide the geological data and ownership rights for a new digital world.
          </p>
        </div>
        <div className="pb-2">
          <div className="text-4xl font-black italic opacity-10">01 / 04</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="group relative">
            <div className="absolute inset-0 bg-red-900/5 translate-x-2 translate-y-2 -z-10 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></div>
            <div className="glass p-10 rounded-sm border border-white/5 group-hover:border-yellow-500/50 transition-all duration-500 h-full">
              <div className="w-14 h-14 bg-red-950/20 border border-red-900/20 rounded-sm flex items-center justify-center text-red-500 mb-8 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight italic">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
