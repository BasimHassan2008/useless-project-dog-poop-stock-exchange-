import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { DogDetailPage } from './DogDetailPage';
import { Dog, ExternalLink, Filter, Search } from 'lucide-react';
import { SectorType } from '../types/market';

export const DogsPage: React.FC = () => {
  const { stocks, selectedStockTicker, selectStock, formatMoney } = useMarket();
  const [filterSector, setFilterSector] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedDog = stocks.find(s => s.ticker === selectedStockTicker);

  if (selectedDog) {
    return <DogDetailPage dog={selectedDog} onBack={() => selectStock(null)} />;
  }

  const sectors: (string | SectorType)[] = [
    'ALL',
    'Heavy Poop Industries',
    'Treat Technology',
    'Bark Communications',
    'Nap Industries',
    'Park & Recreation',
    'Cat Detection Systems',
    'Bone Mining',
    'Premium Canine Assets',
  ];

  const filteredDogs = stocks.filter(s => {
    const matchesSector = filterSector === 'ALL' || s.sector === filterSector;
    const matchesSearch = searchQuery.trim() === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.breed.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center">
            <Dog className="w-5 h-5 text-emerald-400 mr-2" />
            50-Dog Securities Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse all 50 publicly traded canine equities, inspect organic biometrics, and evaluate fundamentals.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search 50 dogs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-[#0b101c] border border-slate-700 rounded pl-8 pr-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <select
            value={filterSector}
            onChange={e => setFilterSector(e.target.value)}
            className="bg-[#0b101c] border border-slate-700 text-xs text-slate-200 rounded px-2.5 py-1 focus:outline-none focus:border-emerald-500"
          >
            {sectors.map(s => (
              <option key={s} value={s}>{s === 'ALL' ? 'All 8 Sectors' : s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of 50 Dog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDogs.map(dog => {
          const isUp = dog.change >= 0;
          return (
            <div
              key={dog.ticker}
              onClick={() => selectStock(dog.ticker)}
              className="bg-[#0b101c] border border-slate-800 hover:border-emerald-500/60 rounded-lg p-4 flex flex-col justify-between cursor-pointer transition-all hover:shadow-xl group"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-xl shadow-inner group-hover:scale-105 transition-transform">
                      {dog.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-sm text-slate-100 group-hover:text-emerald-400 transition-colors">
                          {dog.ticker}
                        </span>
                        <span className="text-[10px] text-slate-400">({dog.name})</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[130px] font-sans">
                        {dog.breed}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    isUp ? 'text-emerald-400 bg-emerald-950/60' : 'text-rose-400 bg-rose-950/60'
                  }`}>
                    {isUp ? '+' : ''}{dog.changePercent.toFixed(1)}%
                  </span>
                </div>

                <div className="text-[10px] text-emerald-400/90 font-semibold mb-2">
                  {dog.sector}
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-sans mb-3">
                  {dog.description}
                </p>

                {/* Biometrics */}
                <div className="grid grid-cols-2 gap-2 text-[10px] bg-[#080c14] p-2 rounded mb-3">
                  <div>
                    <span className="text-slate-500">POOP SCORE:</span>
                    <div className="text-emerald-400 font-bold">{dog.poopProduction}/100</div>
                  </div>
                  <div>
                    <span className="text-slate-500">BARK INDEX:</span>
                    <div className="text-amber-400 font-bold">{dog.barkIndex}/100</div>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-[9px] text-slate-500 uppercase">PRICE</div>
                  <div className="text-sm font-bold text-slate-100">{formatMoney(dog.currentPrice)}</div>
                </div>

                <button
                  className="px-2.5 py-1 text-[11px] font-sans font-medium rounded bg-emerald-600/20 group-hover:bg-emerald-600 group-hover:text-white text-emerald-400 border border-emerald-600/40 transition-colors flex items-center"
                >
                  Trade <ExternalLink className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
