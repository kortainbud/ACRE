
import React from 'react';

const phases = [
  {
    phase: "Phase 01",
    title: "Genesis",
    status: "Completed",
    tasks: ["Token Launch", "Yokaiverse Map Reveal", "Fractional Protocol V1"]
  },
  {
    phase: "Phase 02",
    title: "Frontier",
    status: "In Progress",
    tasks: ["Yield Farming", "Governance DAO", "Yokai SDK Beta"]
  },
  {
    phase: "Phase 03",
    title: "Empire",
    status: "Q4 2024",
    tasks: ["Inter-realm Portals", "Lending & Borrowing", "Mobile Companion App"]
  },
  {
    phase: "Phase 04",
    title: "Ascension",
    status: "2025",
    tasks: ["Full Metaverse Interop", "Cross-chain Liquidity", "Autonomous Agents"]
  }
];

const Roadmap: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter">Roadmap</h2>
        <div className="h-1 w-24 bg-yellow-500 mx-auto"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {phases.map((p, idx) => (
          <div key={idx} className="p-8 border-l border-white/10 hover:border-yellow-500 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <span className="text-yellow-500 text-xs font-bold tracking-widest">{p.phase}</span>
              <span className="text-[10px] px-2 py-0.5 border border-white/20 text-gray-400 rounded-full uppercase">
                {p.status}
              </span>
            </div>
            <h3 className="text-2xl font-black mb-6 uppercase italic">{p.title}</h3>
            <ul className="space-y-4">
              {p.tasks.map((task, tIdx) => (
                <li key={tIdx} className="flex items-start gap-3 text-sm text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 shrink-0"></span>
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
