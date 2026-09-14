import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { ArrowUpRight, ArrowDownRight, Activity, Dog, ShieldAlert } from 'lucide-react';

export const TopMarketBar: React.FC = () => {
  const { stocks, isMarketOpen, poopIndex, formatMoney } = useMarket();

  const validStocks = stocks.filter(s => !s.isDelisted);
  const totalMarketCap = validStocks.reduce((sum, s) => sum + s.marketCap, 0);
  const totalVolumeKg = (validStocks.reduce((sum, s) => sum + s.volume, 0) * 0.18).toFixed(1);
  const advancers = validStocks.filter(s => s.change > 0).length;
  const decliners = validStocks.filter(s => s.change < 0).length;
  const unchanged = validStocks.filter(s => s.change === 0).length;

  const isIndexUp = poopIndex.change >= 0;

  return (
    <div className="bg-[#05080f] border-b border-slate-800/90 text-slate-300 font-mono text-[11px] select-none">
      {/* Upper disclaimer strip */}
      <div className="px-4 py-1 bg-gradient-to-r from-[#05080f] via-slate-900/60 to-[#05080f] border-b border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-emerald-400 tracking-wider">DPSE LIVE V2</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 italic hidden sm:inline">“Where every dump is an investment.”</span>
        </div>
        <div className="flex items-center space-x-2 text-amber-400/90">
          <ShieldAlert className="w-3 h-3 text-amber-400" />
          <span className="tracking-tight">FICTIONAL MARKET • ZERO REAL MONEY • 100% UNNECESSARY</span>
        </div>
      </div>

      {/* Main Stats Ticker Bar */}
      <div className="px-4 py-1.5 flex items-center justify-between overflow-x-auto gap-4 scrollbar-none">
        {/* DPSE Composite */}
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <span className="text-slate-500 uppercase font-semibold">DPSE COMPOSITE:</span>
          <span className="font-bold text-slate-100">{formatMoney(poopIndex.value)}</span>
          <span className={`inline-flex items-center font-semibold px-1 py-0.2 rounded text-[10px] ${
            isIndexUp ? 'text-emerald-400 bg-emerald-950/60' : 'text-rose-400 bg-rose-950/60'
          }`}>
            {isIndexUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {isIndexUp ? '+' : ''}{poopIndex.change}%
          </span>
        </div>

        {/* Total Market Crap */}
        <div className="flex items-center space-x-1.5 whitespace-nowrap hidden md:flex">
          <span className="text-slate-500 uppercase">TOTAL MARKET CRAP:</span>
          <span className="text-slate-200 font-bold">{formatMoney(totalMarketCap)}</span>
        </div>

        {/* Poop Volume */}
        <div className="flex items-center space-x-1.5 whitespace-nowrap hidden lg:flex">
          <span className="text-slate-500 uppercase">POOP VOLUME:</span>
          <span className="text-slate-200 font-bold">{Number(totalVolumeKg).toLocaleString()} KG</span>
        </div>

        {/* Dogs Listed */}
        <div className="flex items-center space-x-1.5 whitespace-nowrap hidden sm:flex">
          <span className="text-slate-500 uppercase">DOGS LISTED:</span>
          <span className="text-emerald-400 font-bold">50</span>
        </div>

        {/* Breadth: Adv / Dec */}
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <span className="text-slate-500 uppercase">BREADTH:</span>
          <span className="text-emerald-400 font-bold">{advancers} ▲</span>
          <span className="text-rose-400 font-bold">{decliners} ▼</span>
          <span className="text-slate-400">{unchanged} =</span>
        </div>

        {/* Market Mood */}
        <div className="flex items-center space-x-1.5 whitespace-nowrap">
          <span className="text-slate-500 uppercase">MARKET MOOD:</span>
          <span className="text-amber-400 font-bold">🐕 {poopIndex.status}</span>
        </div>
      </div>
    </div>
  );
};
