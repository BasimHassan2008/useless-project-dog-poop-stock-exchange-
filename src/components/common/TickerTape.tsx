import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const TickerTape: React.FC = () => {
  const { stocks, selectStock, setCurrentTab, formatMoney } = useMarket();

  const handleDogClick = (ticker: string) => {
    selectStock(ticker);
    setCurrentTab('dogs');
  };

  const tickerItems = [...stocks, ...stocks];

  // Derive funny market status icon
  const getSymbol = (dog: typeof stocks[0]) => {
    if (dog.changePercent >= 15) return '🚀';
    if (dog.changePercent <= -12) return '💩';
    if (dog.sector === 'Bark Communications') return '🐕';
    if (dog.sector === 'Treat Technology') return '🦴';
    if (dog.sector === 'Cat Detection Systems') return '🐈';
    if (dog.sector === 'Nap Industries') return '🛋️';
    return isUp(dog) ? '▲' : '▼';
  };

  const isUp = (dog: typeof stocks[0]) => dog.change >= 0;

  return (
    <div className="w-full bg-[#080d17] border-b border-slate-800/80 overflow-hidden select-none py-1.5 z-20 shadow-inner">
      <div className="flex animate-marquee whitespace-nowrap items-center hover:[animation-play-state:paused]">
        {tickerItems.map((dog, idx) => {
          const up = isUp(dog);
          const icon = getSymbol(dog);

          return (
            <div
              key={`${dog.ticker}-${idx}`}
              onClick={() => handleDogClick(dog.ticker)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-0.5 mx-1 rounded cursor-pointer hover:bg-slate-800/80 transition-colors group"
            >
              <span className="text-sm">{icon}</span>
              <span className="font-bold text-xs tracking-wider text-slate-200 group-hover:text-emerald-400 transition-colors font-mono">
                {dog.ticker}
              </span>
              <span className="font-mono text-xs text-slate-300 font-semibold">
                {formatMoney(dog.currentPrice)}
              </span>
              <span
                className={`inline-flex items-center text-[10px] font-mono font-bold px-1 py-0.2 rounded ${
                  up
                    ? 'text-emerald-400 bg-emerald-950/60'
                    : 'text-rose-400 bg-rose-950/60'
                }`}
              >
                {up ? (
                  <ArrowUpRight className="w-2.5 h-2.5 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-2.5 h-2.5 mr-0.5" />
                )}
                {up ? '+' : ''}
                {dog.changePercent.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
