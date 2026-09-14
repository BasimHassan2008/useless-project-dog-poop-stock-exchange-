import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { Activity } from 'lucide-react';

interface RecentTradesProps {
  filterTicker?: string;
}

export const RecentTrades: React.FC<RecentTradesProps> = ({ filterTicker }) => {
  const { recentTrades, formatMoney } = useMarket();

  const trades = filterTicker
    ? recentTrades.filter(t => t.ticker === filterTicker)
    : recentTrades;

  return (
    <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-3 flex flex-col font-mono text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
        <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] flex items-center">
          <Activity className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
          Live Trade Tape
        </span>
        <span className="text-[10px] text-slate-500 font-sans">Institutional Flow</span>
      </div>

      <div className="space-y-1 overflow-y-auto max-h-48 pr-1 text-[11px]">
        {trades.length === 0 ? (
          <div className="py-4 text-center text-slate-600 text-[10px]">Listening for executions...</div>
        ) : (
          trades.slice(0, 15).map(trade => {
            const isBuy = trade.side === 'BUY';
            return (
              <div key={trade.id} className="flex items-center justify-between p-1 rounded hover:bg-slate-800/40">
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-500 text-[10px]">{trade.time}</span>
                  <span className={`font-bold text-[10px] px-1 rounded ${
                    isBuy ? 'bg-emerald-950/70 text-emerald-400' : 'bg-rose-950/70 text-rose-400'
                  }`}>
                    {trade.side}
                  </span>
                  <span className="font-bold text-slate-200">{trade.ticker}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 text-[10px]">{trade.shares} sh</span>
                  <span className="text-slate-100 font-semibold">{formatMoney(trade.price)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
