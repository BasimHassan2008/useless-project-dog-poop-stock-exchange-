import React from 'react';
import { useMarket } from '../../context/MarketContext';

export const SentimentGauge: React.FC = () => {
  const { stocks } = useMarket();

  // Compute aggregate market sentiment score (0 - 100)
  const avgChangePercent = stocks.reduce((sum, s) => sum + s.changePercent, 0) / (stocks.length || 1);
  
  // Map -15% .. +15% to 0 .. 100
  let gaugeScore = Math.round(50 + (avgChangePercent * 3.33));
  gaugeScore = Math.max(5, Math.min(95, gaugeScore));

  let label = '😐 NORMAL';
  let labelColor = 'text-slate-300';

  if (gaugeScore < 25) {
    label = '💩 EXTREME POOP';
    labelColor = 'text-rose-400';
  } else if (gaugeScore < 42) {
    label = '📉 CONSTIPATED';
    labelColor = 'text-amber-400';
  } else if (gaugeScore > 75) {
    label = '🚀 ABSURD OPTIMISM';
    labelColor = 'text-emerald-400';
  } else if (gaugeScore > 58) {
    label = '🐂 BULL DIGESTION';
    labelColor = 'text-green-400';
  }

  return (
    <div className="bg-[#0f172a]/90 border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Market Sentiment Index
        </span>
        <span className={`text-xs font-mono font-bold ${labelColor}`}>
          {label} ({gaugeScore}/100)
        </span>
      </div>

      {/* Visual Gauge Bar */}
      <div className="relative w-full h-3.5 bg-slate-800 rounded-full overflow-hidden my-3 border border-slate-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-amber-500 via-slate-400 to-emerald-500 opacity-80" />
        
        {/* Needle Marker */}
        <div
          className="absolute top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#ffffff] transition-all duration-700 ease-out -ml-1 border border-slate-900"
          style={{ left: `${gaugeScore}%` }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 font-mono tracking-tight">
        <span className="text-rose-400 font-semibold">💩 EXTREME POOP</span>
        <span className="text-slate-400">😐 NORMAL</span>
        <span className="text-emerald-400 font-semibold">🚀 ABSURD OPTIMISM</span>
      </div>
    </div>
  );
};
