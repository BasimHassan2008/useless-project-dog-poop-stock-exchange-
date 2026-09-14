import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { Sparkles, CheckCircle2, DollarSign, Clock, ShieldCheck } from 'lucide-react';

export const IpoPage: React.FC = () => {
  const { ipos, subscribeIPO, formatMoney, cash } = useMarket();
  const [sharesToBuy, setSharesToBuy] = useState<Record<string, number>>({
    'ipo-1': 100,
    'ipo-2': 50,
    'ipo-3': 25,
  });

  const handleSubscribe = (ipoId: string) => {
    const qty = sharesToBuy[ipoId] || 10;
    subscribeIPO(ipoId, qty);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center">
            <Sparkles className="w-5 h-5 text-amber-400 mr-2" />
            Initial Poop Offerings (IPO) Syndicate Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Subscribe to pre-market canine issuance before ceremonial maiden yard deposits.
          </p>
        </div>

        <div className="bg-[#0b101c] border border-slate-800 px-3 py-1.5 rounded text-emerald-400 font-bold">
          AVAILABLE MARGIN: {formatMoney(cash)}
        </div>
      </div>

      {/* Grid of IPOs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ipos.map(ipo => {
          const qty = sharesToBuy[ipo.id] || 10;
          const gross = +(ipo.ipoPrice * qty).toFixed(2);
          const isSubscribed = ipo.status === 'SUBSCRIBED';

          return (
            <div key={ipo.id} className="bg-[#0b101c] border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🐶</span>
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm">{ipo.name}</h3>
                      <span className="text-[10px] text-slate-400">{ipo.ticker} • {ipo.breed}</span>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    isSubscribed ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {ipo.status}
                  </span>
                </div>

                <p className="text-slate-300 font-sans text-xs leading-relaxed mb-4">
                  {ipo.description}
                </p>

                <div className="bg-[#080c14] border border-slate-800/80 p-3 rounded-lg space-y-1.5 text-[11px] mb-4">
                  <div className="flex justify-between text-slate-400">
                    <span>Offering Price:</span>
                    <span className="font-bold text-emerald-400">{formatMoney(ipo.ipoPrice)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Total Tranche:</span>
                    <span>{ipo.sharesOffered.toLocaleString()} Shares</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Canine Sector:</span>
                    <span className="text-slate-200">{ipo.sector}</span>
                  </div>
                </div>
              </div>

              <div>
                {!isSubscribed ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Subscription Qty:</span>
                      <input
                        type="number"
                        min="1"
                        value={qty}
                        onChange={e => setSharesToBuy(prev => ({ ...prev, [ipo.id]: Number(e.target.value) }))}
                        className="w-20 bg-[#080c14] border border-slate-700 rounded px-2 py-0.5 text-center text-slate-100 font-bold"
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Total Commitment:</span>
                      <span className="font-bold text-slate-100">{formatMoney(gross)}</span>
                    </div>
                    <button
                      onClick={() => handleSubscribe(ipo.id)}
                      disabled={gross > cash}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white font-bold rounded uppercase tracking-wider transition-all cursor-pointer"
                    >
                      SUBSCRIBE TO IPO ({formatMoney(gross)})
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-800/80 rounded text-center text-emerald-400 space-y-1">
                    <CheckCircle2 className="w-5 h-5 mx-auto" />
                    <div className="font-bold text-xs">SUBSCRIPTION CONFIRMED</div>
                    <p className="text-[10px] text-slate-400 font-sans">
                      Committed {ipo.subscribedShares} shares. Lottery allocation will execute prior to next trading cycle.
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
