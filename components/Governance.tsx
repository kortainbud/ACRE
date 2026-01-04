
import React from 'react';

const PROPOSALS = [
  { id: 'AIP-042', title: "Expansion into 'Shadow Realm' Quadrant", status: "Active", votes: "12.4M", timeRemaining: "2d 4h" },
  { id: 'AIP-041', title: "Implement 2.5% Platform Fee Burn Mechanism", status: "Executed", votes: "48.9M", timeRemaining: "--" },
  { id: 'AIP-040', title: "Add 'Spirit Shrine' Structure Archetype", status: "Active", votes: "5.1M", timeRemaining: "4d 12h" },
  { id: 'AIP-039', title: "Increase Staking APR for Shogun Tiers", status: "Defeated", votes: "2.8M", timeRemaining: "--" },
];

const Governance: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen max-w-7xl mx-auto">
       <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <div className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Community Council</div>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase italic leading-[0.85]">The <br /><span className="text-red-700">Governance</span></h2>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 flex gap-12 text-center">
           <div>
             <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Total Power</div>
             <div className="text-2xl font-black">142.8M</div>
           </div>
           <div>
             <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Delegates</div>
             <div className="text-2xl font-black">1.2K</div>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-8 border-b border-white/5 pb-4">Active & Recent Proposals</h3>
          {PROPOSALS.map((prop) => (
            <div key={prop.id} className="glass p-8 border border-white/5 hover:border-white/20 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-yellow-500 text-xs font-black font-mono">{prop.id}</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-sm ${
                    prop.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                    prop.status === 'Executed' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {prop.status}
                  </span>
                </div>
                <h4 className="text-xl font-black uppercase italic tracking-tight group-hover:text-yellow-500 transition-colors">{prop.title}</h4>
              </div>
              <div className="flex gap-12 text-right">
                 <div>
                   <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Votes</div>
                   <div className="text-sm font-black">{prop.votes}</div>
                 </div>
                 {prop.status === 'Active' && (
                   <div>
                     <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Ends In</div>
                     <div className="text-sm font-black text-white">{prop.timeRemaining}</div>
                   </div>
                 )}
              </div>
            </div>
          ))}
          <button className="w-full py-4 border border-dashed border-white/10 text-[10px] text-gray-500 font-black uppercase tracking-widest hover:border-white/30 hover:text-white transition-all">View All Archived Proposals</button>
        </div>

        <div className="space-y-6">
           <div className="glass p-8 border border-white/5 bg-yellow-500/5">
              <h4 className="text-xl font-black uppercase italic mb-4">Create Proposal</h4>
              <p className="text-xs text-gray-500 mb-8 leading-relaxed">Submit a change request to the $ACRE protocol. Requires a minimum of 100,000 $ACRE voting power to initialize.</p>
              <button className="w-full py-4 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all">Submit AIP</button>
           </div>
           
           <div className="glass p-8 border border-white/5">
              <h4 className="text-xl font-black uppercase italic mb-6">My Voting Power</h4>
              <div className="flex items-center justify-between mb-8">
                 <div className="text-4xl font-black font-mono text-white">0</div>
                 <div className="text-right">
                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Unclaimed</div>
                    <div className="text-sm font-black text-yellow-500">142.4 $ACRE</div>
                 </div>
              </div>
              <button className="w-full py-3 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-yellow-400">Claim & Sync Power</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Governance;
