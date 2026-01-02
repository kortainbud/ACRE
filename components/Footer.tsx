
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-yellow-500 rounded-sm flex items-center justify-center font-bold text-black text-xl">A</div>
              <span className="text-2xl font-bold tracking-tighter">$ACRE</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8">
              The foundational protocol for digital real estate. Built for the creators, traders, and pioneers of the Yokaiverse.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Discord', 'Telegram', 'Medium'].map(platform => (
                <a key={platform} href="#" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-yellow-500 transition-colors">
                  {platform}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-yellow-500">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Explorer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Staking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Governance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-yellow-500">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Brand Assets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Audits</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 text-[10px] text-gray-600 uppercase tracking-widest">
          <div>© 2024 ACRE LABS. ALL PROPERTY RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
