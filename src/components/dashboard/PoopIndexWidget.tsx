import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { ArrowUpRight, ArrowDownRight, Sparkles, Flame, ShieldAlert } from 'lucide-react';

export const PoopIndexWidget: React.FC = () => {
  const { poopIndex, formatMoney } = useMarket();
  const isUp = poopIndex.change >= 0;

  return (
    <div className="bg-gradient-to-br from-[#0d1527] via-[#0b101c] to-[#080d17] border-2 border-emerald-500/40 rounded-xl p-5 relative overflow-hidden shadow-2xl font-mono">
      {/* Background ambient glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xl">💩</span>
            <span className="font-extrabold text-sm tracking-wider text-slate-100 uppercase">
              THE POOP INDEX (DPSE BENCHMARK)
            </span>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-800">
              CORE METRIC
            </span>
          </div>
          <p className="text-xs text-slate-400 font-sans max-w-xl leading-relaxed">
            {poopIndex.description}
          </p>
        </div>

        <div className="text-left md:text-right flex-shrink-0">
          <div className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
            {poopIndex.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center md:justify-end space-x-2 mt-1">
            <span className={`inline-flex items-center font-bold text-xs px-2 py-0.5 rounded ${
              isUp ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700/80' : 'bg-rose-950/80 text-rose-400 border border-rose-700/80'
            }`}>
              {isUp ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              {isUp ? '+' : ''}{poopIndex.change}%
            </span>
            <span className="text-xs font-bold text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-900/60">
              {poopIndex.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
