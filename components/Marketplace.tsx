
import React from 'react';

const MARKET_ITEMS = [
  { id: 1, name: "Neon Shrine #42", category: "LAND", price: "12,400 $ACRE", rarity: "LEGENDARY", yield: "18.2%", img: "https://picsum.photos/seed/yokai1/400/300?grayscale" },
  { id: 2, name: "Obsidian Heights", category: "LAND", price: "8,900 $ACRE", rarity: "RARE", yield: "12.4%", img: "https://picsum.photos/seed/yokai2/400/300?grayscale" },
  { id: 3, name: "Cyber Dojo 7", category: "STRUCTURE", price: "45,000 $ACRE", rarity: "EPIC", yield: "24.1%", img: "https://picsum.photos/seed/yokai3/400/300?grayscale" },
  { id: 4, name: "Spirit Garden", category: "LAND", price: "5,200 $ACRE", rarity: "COMMON", yield: "6.8%", img: "https://picsum.photos/seed/yokai4/400/300?grayscale" },
  { id: 5, name: "Zen Quadrant", category: "LAND", price: "15,000 $ACRE", rarity: "RARE", yield: "11.2%", img: "https://picsum.photos/seed/yokai5/400/300?grayscale" },
  { id: 6, name: "Imperial Palace", category: "STRUCTURE", price: "120,000 $ACRE", rarity: "MYTHIC", yield: "42.0%", img: "https://picsum.photos/seed/yokai6/400/300?grayscale" },
];

const Marketplace: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <div className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Yokaiverse Assets</div>
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase italic leading-[0.85]">The <br /><span className="text-red-700">Marketplace</span></h2>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-sm flex items-center gap-4">
            <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Filter:</span>
            <select className="bg-transparent text-xs font-black uppercase tracking-widest outline-none border-none cursor-pointer">
              <option>All Land</option>
              <option>Legendary Only</option>
              <option>Structures</option>
            </select>
          </div>
          <button className="bg-yellow-500 text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-yellow-400">List Property</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MARKET_ITEMS.map((item) => (
          <div key={item.id} className="group relative">
            <div className="absolute inset-0 bg-red-900/5 translate-x-2 translate-y-2 -z-10 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></div>
            <div className="glass border border-white/5 group-hover:border-yellow-500/50 transition-all duration-500 overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute top-4 left-4">
                  <span className={`text-[8px] px-2 py-1 font-black rounded-sm border ${
                    item.rarity === 'LEGENDARY' ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50' :
                    item.rarity === 'MYTHIC' ? 'bg-purple-500/20 text-purple-500 border-purple-500/50' :
                    'bg-white/10 text-white border-white/20'
                  }`}>
                    {item.rarity}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">{item.category}</div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic">{item.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mb-1">Yield</div>
                    <div className="text-lg font-black text-white">{item.yield}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Buy Now</div>
                    <div className="text-xl font-mono font-bold">{item.price}</div>
                  </div>
                  <button className="px-6 py-3 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all">Purchase</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
