import React, { useMemo } from 'react';
import { useMarket } from '../../context/MarketContext';
import { DogStock } from '../../types/market';
import { generateOrderBook } from '../../services/marketEngine';

interface OrderBookProps {
  dog: DogStock;
}

export const OrderBook: React.FC<OrderBookProps> = ({ dog }) => {
  const { formatMoney } = useMarket();

  // Generate order book levels derived from live currentPrice
  const { bids, asks, spread } = useMemo(() => {
    return generateOrderBook(dog.currentPrice);
  }, [dog.currentPrice]);

  const maxBidVol = Math.max(...bids.map(b => b.shares), 1);
  const maxAskVol = Math.max(...asks.map(a => a.shares), 1);

  return (
    <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-3 flex flex-col font-mono text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
        <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
          Live Order Book
        </span>
        <span className="text-[10px] text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-900/60">
          Spread: {formatMoney(spread)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[10px]">
        {/* Asks (Sell Orders) */}
        <div>
          <div className="text-slate-500 font-semibold mb-1 uppercase tracking-wider flex justify-between">
            <span>Ask Price</span>
            <span>Qty</span>
          </div>
          <div className="space-y-1">
            {asks.slice(0, 5).reverse().map((ask, idx) => {
              const depthPct = (ask.shares / maxAskVol) * 100;
              return (
                <div key={`ask-${idx}`} className="relative flex justify-between p-1 rounded overflow-hidden">
                  <div 
                    className="absolute top-0 right-0 bottom-0 bg-rose-950/40 pointer-events-none rounded"
                    style={{ width: `${depthPct}%` }}
                  />
                  <span className="text-rose-400 font-bold z-10">{formatMoney(ask.price)}</span>
                  <span className="text-slate-300 z-10">{ask.shares} sh</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bids (Buy Orders) */}
        <div>
          <div className="text-slate-500 font-semibold mb-1 uppercase tracking-wider flex justify-between">
            <span>Bid Price</span>
            <span>Qty</span>
          </div>
          <div className="space-y-1">
            {bids.slice(0, 5).map((bid, idx) => {
              const depthPct = (bid.shares / maxBidVol) * 100;
              return (
                <div key={`bid-${idx}`} className="relative flex justify-between p-1 rounded overflow-hidden">
                  <div 
                    className="absolute top-0 right-0 bottom-0 bg-emerald-950/40 pointer-events-none rounded"
                    style={{ width: `${depthPct}%` }}
                  />
                  <span className="text-emerald-400 font-bold z-10">{formatMoney(bid.price)}</span>
                  <span className="text-slate-300 z-10">{bid.shares} sh</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
