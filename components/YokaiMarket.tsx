
import React, { useState, useEffect } from 'react';
import { getYokaiInsights, MarketInsight } from '../services/gemini';

const YokaiMarket: React.FC = () => {
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getYokaiInsights();
      setInsights(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black mb-4 tracking-tight uppercase">Market <span className="text-yellow-500">Intelligence</span></h2>
          <p className="text-gray-400 max-w-xl">
            Live AI-driven sentiment analysis for Yokaiverse sectors. 
            Powered by $ACRE Oracle network for hyper-accurate floor tracking.
          </p>
        </div>
        <div className="flex gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 items-center">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Oracle Status: Operational
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="glass h-64 animate-pulse rounded-xl"></div>
          ))
        ) : (
          insights.map((insight, idx) => (
            <div key={idx} className="glass p-8 rounded-xl border border-white/5 hover:border-yellow-500/30 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-tighter ${
                  insight.sentiment === 'Bullish' ? 'bg-green-500/20 text-green-400' : 
                  insight.sentiment === 'Bearish' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {insight.sentiment}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="text-xs text-yellow-500 uppercase font-black tracking-widest mb-1">Property Sector</div>
                <h3 className="text-2xl font-bold">{insight.propertyType}</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase mb-1">Est. Floor Price</div>
                  <div className="text-xl font-mono text-white">{insight.predictedFloor}</div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  "{insight.reasoning}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-full py-2 bg-white/5 hover:bg-yellow-500 hover:text-black transition-colors text-xs font-bold uppercase tracking-widest rounded">
                  View Assets
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 text-xs italic">
          Disclaimer: Market Intelligence is generated for informational purposes. DYOR before investing in virtual assets.
        </p>
      </div>
    </div>
  );
};

export default YokaiMarket;
