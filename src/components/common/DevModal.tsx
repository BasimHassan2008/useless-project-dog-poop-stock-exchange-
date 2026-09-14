import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { X, Wrench, DollarSign, TrendingUp, TrendingDown, Pause, Play, AlertOctagon } from 'lucide-react';

export const DevModal: React.FC = () => {
  const { 
    isDevModalOpen, 
    toggleDevModal, 
    devAddCash, 
    devForceCrash, 
    devForceRally, 
    devSetStockPrice, 
    stocks, 
    isMarketOpen, 
    toggleMarketOpen,
    formatMoney 
  } = useMarket();

  const [targetTicker, setTargetTicker] = useState('BRUNO');
  const [overridePrice, setOverridePrice] = useState('150.00');

  if (!isDevModalOpen) return null;

  const handleApplyPrice = () => {
    const val = Number(overridePrice);
    if (!isNaN(val) && val > 0) {
      devSetStockPrice(targetTicker, val);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#0f172a] border-2 border-red-600/60 rounded-xl max-w-lg w-full p-6 shadow-2xl font-mono text-xs space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Wrench className="w-5 h-5 text-red-400" />
            <div>
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">
                DEVELOPER MODE — ABSOLUTELY NOT FOR CHEATING
              </h3>
              <span className="text-[10px] text-slate-400">Triggered via CTRL + SHIFT + P</span>
            </div>
          </div>
          <button onClick={toggleDevModal} className="text-slate-400 hover:text-slate-200 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => devAddCash(10000)}
            className="p-3 bg-[#080c14] hover:bg-emerald-950/50 border border-slate-700 hover:border-emerald-500 rounded text-left transition-colors"
          >
            <div className="font-bold text-emerald-400 flex items-center">
              <DollarSign className="w-4 h-4 mr-1" /> +₹10,000 Cash
            </div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">Inject instant margin liquidity.</div>
          </button>

          <button
            onClick={toggleMarketOpen}
            className="p-3 bg-[#080c14] hover:bg-blue-950/50 border border-slate-700 hover:border-blue-500 rounded text-left transition-colors"
          >
            <div className="font-bold text-blue-400 flex items-center">
              {isMarketOpen ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
              {isMarketOpen ? 'Freeze Market' : 'Unfreeze Market'}
            </div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">Pause or resume the tick engine.</div>
          </button>

          <button
            onClick={devForceRally}
            className="p-3 bg-[#080c14] hover:bg-emerald-950/50 border border-slate-700 hover:border-emerald-500 rounded text-left transition-colors"
          >
            <div className="font-bold text-emerald-400 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" /> Force +25% Rally
            </div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">Pump all listed canine equities.</div>
          </button>

          <button
            onClick={devForceCrash}
            className="p-3 bg-[#080c14] hover:bg-rose-950/50 border border-slate-700 hover:border-rose-500 rounded text-left transition-colors"
          >
            <div className="font-bold text-rose-400 flex items-center">
              <TrendingDown className="w-4 h-4 mr-1" /> Force -22% Crash
            </div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">Trigger catastrophic sell-off.</div>
          </button>
        </div>

        {/* Set Stock Price Override */}
        <div className="bg-[#080c14] border border-slate-800 p-3 rounded space-y-2">
          <label className="text-slate-400 uppercase text-[10px] block">
            Direct Stock Price Override:
          </label>
          <div className="flex space-x-2">
            <select
              value={targetTicker}
              onChange={e => setTargetTicker(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1 text-xs"
            >
              {stocks.slice(0, 50).map(s => (
                <option key={s.ticker} value={s.ticker}>{s.ticker} ({formatMoney(s.currentPrice)})</option>
              ))}
            </select>
            <input
              type="number"
              value={overridePrice}
              onChange={e => setOverridePrice(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100 text-xs font-mono"
            />
            <button
              onClick={handleApplyPrice}
              className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded font-bold"
            >
              Set Price
            </button>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 font-sans text-center">
          Changes take effect immediately and are saved to your local browser storage.
        </div>
      </div>
    </div>
  );
};
