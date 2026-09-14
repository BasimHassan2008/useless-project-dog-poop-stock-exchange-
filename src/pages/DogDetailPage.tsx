import React from 'react';
import { DogStock } from '../types/market';
import { useMarket } from '../context/MarketContext';
import { StockChart } from '../components/market/StockChart';
import { TradingPanel } from '../components/market/TradingPanel';
import { OrderBook } from '../components/market/OrderBook';
import { RecentTrades } from '../components/market/RecentTrades';
import { DogFundamentals } from '../components/market/DogFundamentals';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ArrowDownRight, 
  Dog, 
  ShieldCheck, 
  Layers
} from 'lucide-react';

interface DogDetailPageProps {
  dog: DogStock;
  onBack: () => void;
}

export const DogDetailPage: React.FC<DogDetailPageProps> = ({ dog, onBack }) => {
  const { formatMoney } = useMarket();
  const isUp = dog.change >= 0;

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to 50 Dog Directory
        </button>
        <span className="text-slate-500">
          EXCHANGE BOARD: <span className="text-slate-200 font-bold">DPSE / MAIN_BOARD</span>
        </span>
      </div>

      {/* Stock Banner Header */}
      <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-4xl shadow-md flex-shrink-0">
            {dog.avatar}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-slate-100">{dog.ticker}</h1>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-bold">
                {dog.name}
              </span>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                dog.sentiment === 'ABSURD OPTIMISM'
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  : dog.sentiment === 'EXTREME POOP'
                  ? 'bg-rose-950 text-rose-300 border border-rose-700'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {dog.sentiment}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              {dog.breed} • {dog.age} Years Old • <span className="text-emerald-400 font-bold">{dog.sector}</span>
            </p>
            <p className="text-[11px] text-amber-400/90 mt-1 font-mono">
              Personality: {dog.personality}
            </p>
          </div>
        </div>

        {/* Live Price & Change Callout */}
        <div className="text-left md:text-right border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
          <div className="text-3xl font-extrabold text-slate-100">
            {formatMoney(dog.currentPrice)}
          </div>
          <div className="flex items-center md:justify-end space-x-2 mt-1">
            <span className={`inline-flex items-center text-sm font-bold px-2 py-0.5 rounded ${
              isUp ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700' : 'bg-rose-950/80 text-rose-400 border border-rose-700'
            }`}>
              {isUp ? <ArrowUpRight className="w-4 h-4 mr-0.5" /> : <ArrowDownRight className="w-4 h-4 mr-0.5" />}
              {isUp ? '+' : ''}{formatMoney(dog.change)} ({isUp ? '+' : ''}{dog.changePercent.toFixed(2)}%)
            </span>
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            PREV CLOSE: {formatMoney(dog.previousPrice)}
          </span>
        </div>
      </div>

      {/* Row 1: Interactive Chart & Live Trading Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StockChart dog={dog} />
        </div>
        <div className="lg:col-span-1">
          <TradingPanel dog={dog} />
        </div>
      </div>

      {/* Row 2: Live Order Book & Institutional Trades Tape */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OrderBook dog={dog} />
        <RecentTrades filterTicker={dog.ticker} />
      </div>

      {/* Row 3: 10 Biological Fundamentals & Financial Valuation Multiples */}
      <DogFundamentals dog={dog} />

      {/* Canine Corporate Profile & History */}
      <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-5">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center">
          <Dog className="w-4 h-4 text-emerald-400 mr-2" />
          Canine Corporate Profile & Organic Overview
        </h3>
        <p className="text-slate-300 leading-relaxed font-sans text-xs">
          {dog.description}
        </p>
      </div>
    </div>
  );
};
