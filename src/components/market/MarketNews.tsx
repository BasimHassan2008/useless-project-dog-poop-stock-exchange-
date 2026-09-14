import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { Newspaper, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const MarketNews: React.FC = () => {
  const { marketEvents, selectStock, setCurrentTab } = useMarket();

  const handleEventClick = (ticker?: string) => {
    if (ticker) {
      selectStock(ticker);
      setCurrentTab('dogs');
    }
  };

  return (
    <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
        <div className="flex items-center space-x-2">
          <Newspaper className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
            Canine Breaking Wire
          </h3>
        </div>
        <span className="flex items-center text-[10px] text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5" />
          LIVE DISPATCH
        </span>
      </div>

      {/* Events Stream */}
      <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
        {marketEvents.map(event => {
          const isPositive = event.impactPercent >= 0;
          return (
            <div
              key={event.id}
              onClick={() => handleEventClick(event.ticker)}
              className="p-3 bg-[#0d131f] hover:bg-slate-800/60 border border-slate-800/90 rounded-md transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700/80 text-amber-400">
                  {event.badge}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {event.timestamp}
                </span>
              </div>

              <h4 className="text-xs font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors leading-snug">
                {event.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {event.description}
              </p>

              {event.ticker && (
                <div className="mt-2 pt-2 border-t border-slate-850 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-300 font-bold">
                    🐕 {event.ticker}
                  </span>
                  <span className={`inline-flex items-center font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                    {isPositive ? '+' : ''}{event.impactPercent}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
