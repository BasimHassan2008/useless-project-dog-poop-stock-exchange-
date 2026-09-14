import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { X, FileText, Printer, ArrowUpRight, ArrowDownRight, Dog } from 'lucide-react';

interface DailyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyReportModal: React.FC<DailyReportModalProps> = ({ isOpen, onClose }) => {
  const { stocks, poopIndex, formatMoney } = useMarket();

  if (!isOpen) return null;

  const validStocks = stocks.filter(s => !s.isDelisted);
  const sorted = [...validStocks].sort((a, b) => b.changePercent - a.changePercent);
  const topDog = sorted[0] || validStocks[0];
  const worstDog = sorted[sorted.length - 1] || validStocks[validStocks.length - 1];
  const totalVolumeKg = (validStocks.reduce((sum, s) => sum + s.volume, 0) * 0.18).toFixed(1);
  const totalMarketCap = validStocks.reduce((sum, s) => sum + s.marketCap, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0f172a] border border-slate-700 rounded-xl max-w-xl w-full p-6 shadow-2xl font-mono text-xs space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                DPSE OFFICIAL DAILY MARKET EXECUTIVE DISPATCH
              </h3>
              <span className="text-[10px] text-slate-500 font-sans">Canine Institutional Research Department</span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Formal Report Card */}
        <div className="bg-[#080c14] border border-slate-800 p-4 rounded-lg space-y-3">
          <div className="flex justify-between items-center text-slate-400 border-b border-slate-800/80 pb-2 text-[11px]">
            <span>SESSION DATE: {new Date().toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="text-emerald-400 font-bold">EXCHANGE STATUS: NORMAL</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div>
              <span className="text-slate-500 uppercase block text-[10px]">DPSE COMPOSITE BENCHMARK</span>
              <span className="font-bold text-slate-100 text-sm">{formatMoney(poopIndex.value)}</span>
              <span className={`ml-2 font-bold ${poopIndex.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {poopIndex.change >= 0 ? '+' : ''}{poopIndex.change}%
              </span>
            </div>

            <div>
              <span className="text-slate-500 uppercase block text-[10px]">TOTAL POOP VOLUME</span>
              <span className="font-bold text-slate-100 text-sm">{Number(totalVolumeKg).toLocaleString()} KG</span>
            </div>

            <div>
              <span className="text-slate-500 uppercase block text-[10px]">TOP SESSION PERFORMER</span>
              <span className="font-bold text-emerald-400 text-sm">{topDog.ticker} (+{topDog.changePercent.toFixed(1)}%)</span>
              <div className="text-[10px] text-slate-400 font-sans">{topDog.name} ({topDog.breed})</div>
            </div>

            <div>
              <span className="text-slate-500 uppercase block text-[10px]">WORST SESSION PERFORMER</span>
              <span className="font-bold text-rose-400 text-sm">{worstDog.ticker} ({worstDog.changePercent.toFixed(1)}%)</span>
              <div className="text-[10px] text-slate-400 font-sans">{worstDog.name} ({worstDog.breed})</div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-slate-500 uppercase block text-[10px] mb-1">CHIEF ANALYST DIGESTIVE COMMENTARY</span>
            <p className="text-slate-300 font-sans leading-relaxed text-xs italic bg-slate-900/60 p-2.5 rounded border border-slate-800">
              “Markets rallied strongly after several dogs demonstrated unusually productive morning activity following scrambled eggs and kibble. Sector rotations out of Cat Detection Systems into Heavy Poop Industries reflect increased organic accumulation ahead of the afternoon walk cycle.”
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-[10px] text-slate-500 font-sans">
            Classification: Highly Questionable Satire
          </span>
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-sans flex items-center space-x-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
