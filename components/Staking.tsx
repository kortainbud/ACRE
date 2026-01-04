
import React from 'react';

const Staking: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Financial Protocol</div>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase italic leading-[0.85] mb-12">Staking <br /><span className="text-red-700">Liquidity</span></h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Total Value Staked', value: '$42.8M', detail: '14.2% Growth' },
              { label: 'Current APR', value: '18.4%', detail: 'Fixed Reward' },
              { label: 'Total $ACRE Earned', value: '1.2M', detail: 'Distributing Daily' },
            ].map((stat, i) => (
              <div key={i} className="glass p-6 border border-white/5">
                <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">{stat.label}</div>
                <div className="text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-[10px] text-green-500 font-bold uppercase">{stat.detail}</div>
              </div>
            ))}
          </div>

          <div className="glass border border-white/5 p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 rotate-12 group-hover:scale-125 transition-transform duration-1000">
               <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            </div>
            <h3 className="text-3xl font-black uppercase italic mb-8">Deploy Staking Contract</h3>
            <div className="space-y-6 max-w-md">
              <div className="relative">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Amount to Stake</label>
                <div className="flex">
                  <input type="text" placeholder="0.00" className="flex-1 bg-white/5 border border-white/10 px-6 py-4 text-xl font-mono outline-none focus:border-yellow-500/50 transition-colors" />
                  <button className="bg-white/10 border-y border-r border-white/10 px-4 text-[10px] font-black uppercase hover:bg-white/20">MAX</button>
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
                <span>Available: 1,420.42 $ACRE</span>
                <span>APR: 18.4%</span>
              </div>
              <button className="w-full py-5 bg-yellow-500 text-black font-black uppercase tracking-widest text-sm hover:bg-yellow-400 transition-all shadow-[0_0_50px_rgba(234,179,8,0.2)]">Initialize $ACRE Stake</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="glass border border-white/5 p-8">
              <h4 className="text-xl font-black uppercase italic mb-6">Staking Tiers</h4>
              <div className="space-y-4">
                {[
                  { name: 'Pioneer', threshold: '1k $ACRE', apr: '12%', status: 'Active' },
                  { name: 'Ronin', threshold: '10k $ACRE', apr: '16%', status: 'Locked' },
                  { name: 'Shogun', threshold: '100k $ACRE', apr: '22%', status: 'Locked' },
                ].map((tier, i) => (
                  <div key={i} className={`p-4 border ${tier.status === 'Active' ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-white/5 opacity-40'} flex justify-between items-center`}>
                    <div>
                      <div className="text-xs font-black uppercase tracking-tighter">{tier.name}</div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold">{tier.threshold}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-white">{tier.apr} APR</div>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="glass border border-white/5 p-8 bg-red-950/10">
              <h4 className="text-xl font-black uppercase italic mb-4">Risk Parameters</h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed mb-6">Staking involves a 7-day cooldown period for withdrawals. Rewards are calculated based on Genesis Block time.</p>
              <a href="#" className="text-[10px] text-yellow-500 font-black uppercase tracking-widest hover:underline">Read Audit Report →</a>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
