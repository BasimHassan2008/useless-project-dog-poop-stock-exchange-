import React from 'react';
import { StockTable } from '../components/market/StockTable';
import { useMarket } from '../context/MarketContext';
import { TrendingUp, Layers } from 'lucide-react';

export const MarketPage: React.FC = () => {
  const { stocks, formatMoney } = useMarket();

  const sectorMap = stocks.reduce((acc, stock) => {
    if (!acc[stock.sector]) {
      acc[stock.sector] = { count: 0, totalCap: 0 };
    }
    acc[stock.sector].count += 1;
    acc[stock.sector].totalCap += stock.marketCap;
    return acc;
  }, {} as Record<string, { count: number; totalCap: number }>);

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center">
            <TrendingUp className="w-5 h-5 text-emerald-400 mr-2" />
            Canine Equities Screener (50 Issues)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Consolidated market order book, sector allocations, and real-time prices for all 50 publicly traded dogs.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs text-slate-400">
          <div className="bg-[#0b101c] border border-slate-800 px-3 py-1.5 rounded">
            <span>LISTED: </span>
            <span className="text-slate-100 font-bold">{stocks.length} Dogs</span>
          </div>
          <div className="bg-[#0b101c] border border-slate-800 px-3 py-1.5 rounded">
            <span>SECTORS: </span>
            <span className="text-emerald-400 font-bold">8 Industries</span>
          </div>
        </div>
      </div>

      {/* 8 Sector Quick Pills */}
      <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2 text-xs text-slate-400">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span className="uppercase font-bold tracking-wider">Active Canine Sectors</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(sectorMap).map(([sector, data]) => (
            <div
              key={sector}
              className="bg-[#080c14] border border-slate-700/60 rounded px-2.5 py-1.5 text-[11px] flex justify-between items-center"
            >
              <div className="truncate mr-1 text-slate-300 font-medium">{sector}</div>
              <div className="text-right flex-shrink-0">
                <span className="text-emerald-400 font-bold">{formatMoney(data.totalCap)}</span>
                <span className="text-slate-500 text-[9px] ml-1">({data.count})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full 50-Dog Table */}
      <StockTable />
    </div>
  );
};
