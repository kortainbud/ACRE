
import React from 'react';

const stats = [
  { label: 'Active Investors', value: '48.2k+', suffix: 'Global' },
  { label: 'Market Capitalization', value: '$840M', suffix: 'FDV' },
  { label: 'Properties Traded', value: '150k', suffix: 'Items' },
  { label: 'Staking APR', value: '14.2%', suffix: 'Avg' },
];

const Stats: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
      {stats.map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-3">{stat.label}</div>
          <div className="text-4xl md:text-5xl font-black mb-1">{stat.value}</div>
          <div className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest">{stat.suffix}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
