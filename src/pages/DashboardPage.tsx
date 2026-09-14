import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { PoopIndexWidget } from '../components/dashboard/PoopIndexWidget';
import { QuestionableIntelligence } from '../components/dashboard/QuestionableIntelligence';
import { DailyReportModal } from '../components/dashboard/DailyReportModal';
import { SentimentGauge } from '../components/common/SentimentGauge';
import { StockTable } from '../components/market/StockTable';
import { MarketNews } from '../components/market/MarketNews';
import { 
  TrendingUp, 
  TrendingDown, 
  Flame, 
  BarChart2, 
  Zap,
  Activity,
  FileText
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { stocks, selectStock, setCurrentTab, triggerChaos, formatMoney } = useMarket();
  const [isReportOpen, setIsReportOpen] = useState(false);

  const validStocks = stocks.filter(s => !s.isDelisted);
  const totalMarketCap = validStocks.reduce((sum, s) => sum + s.marketCap, 0);
  const totalVolume = validStocks.reduce((sum, s) => sum + s.volume, 0);
  const advancers = validStocks.filter(s => s.change > 0).length;
  const decliners = validStocks.filter(s => s.change < 0).length;
  const unchanged = validStocks.filter(s => s.change === 0).length;

  const topGainers = [...validStocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 5);
  const topLosers = [...validStocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 5);
  const mostTraded = [...validStocks].sort((a, b) => b.volume - a.volume).slice(0, 5);

  const handleDogClick = (ticker: string) => {
    selectStock(ticker);
    setCurrentTab('dogs');
  };

  return (
    <div className="space-y-6">
      {/* Flagship Signature Feature: The Poop Index */}
      <PoopIndexWidget />

      {/* Row 1: Key Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 font-mono">
          <div className="flex justify-between text-slate-400 text-xs mb-1">
            <span>TOTAL MARKET CRAP</span>
            <span className="text-emerald-400 font-bold">50 EQUITIES</span>
          </div>
          <div className="text-2xl font-bold text-slate-100">
            {formatMoney(totalMarketCap)}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Aggregate capitalization of all 50 listed dogs
          </div>
        </div>

        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 font-mono">
          <div className="flex justify-between text-slate-400 text-xs mb-1">
            <span>24H POOP VOLUME</span>
            <BarChart2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100">
            {totalVolume.toLocaleString()} UNITS
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Total organic contracts settled in active session
          </div>
        </div>

        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 font-mono">
          <div className="flex justify-between text-slate-400 text-xs mb-1">
            <span>MARKET BREADTH</span>
            <span className="text-xs text-emerald-400 font-bold">{advancers} / {decliners}</span>
          </div>
          <div className="flex items-baseline space-x-2 text-2xl font-bold">
            <span className="text-emerald-400 flex items-center text-xl">
              <TrendingUp className="w-4 h-4 mr-1" /> {advancers}
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-rose-400 flex items-center text-xl">
              <TrendingDown className="w-4 h-4 mr-1" /> {decliners}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {unchanged} issues unchanged at tick parity
          </div>
        </div>

        {/* Daily Report Generator Button */}
        <div className="bg-gradient-to-br from-[#0c1322] to-[#070b13] border border-slate-800 rounded-lg p-4 flex flex-col justify-between font-mono">
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold">
            <span className="flex items-center">
              <FileText className="w-4 h-4 mr-1.5 text-blue-400" /> EXECUTIVE REPORT
            </span>
            <span className="text-[10px] text-slate-500">DISPATCH</span>
          </div>
          <div className="text-[11px] text-slate-400 font-sans my-1">
            Generate formal daily market analysis for canine board members.
          </div>
          <button
            onClick={() => setIsReportOpen(true)}
            className="w-full py-1.5 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/60 text-blue-300 rounded font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>GENERATE REPORT</span>
          </button>
        </div>
      </div>

      {/* Row 2: Sentiment Gauge, Top Gainers, Top Losers, Most Traded */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SentimentGauge />

        {/* Top Gainers */}
        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 flex flex-col justify-between font-mono text-xs">
          <div className="flex justify-between pb-2 border-b border-slate-800 mb-2">
            <span className="font-bold text-slate-200 uppercase flex items-center">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400 mr-1" /> Top Gainers
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">24H</span>
          </div>
          <div className="space-y-1.5">
            {topGainers.map(dog => (
              <div key={dog.ticker} onClick={() => handleDogClick(dog.ticker)} className="flex justify-between items-center p-1 rounded hover:bg-slate-800/60 cursor-pointer">
                <div className="flex items-center space-x-1.5">
                  <span>{dog.avatar}</span>
                  <span className="font-bold text-slate-200">{dog.ticker}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-300">{formatMoney(dog.currentPrice)}</span>
                  <span className="text-emerald-400 font-bold text-[10px]">+{dog.changePercent.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 flex flex-col justify-between font-mono text-xs">
          <div className="flex justify-between pb-2 border-b border-slate-800 mb-2">
            <span className="font-bold text-slate-200 uppercase flex items-center">
              <TrendingDown className="w-3.5 h-3.5 text-rose-400 mr-1" /> Top Losers
            </span>
            <span className="text-[10px] text-rose-400 font-bold">24H</span>
          </div>
          <div className="space-y-1.5">
            {topLosers.map(dog => (
              <div key={dog.ticker} onClick={() => handleDogClick(dog.ticker)} className="flex justify-between items-center p-1 rounded hover:bg-slate-800/60 cursor-pointer">
                <div className="flex items-center space-x-1.5">
                  <span>{dog.avatar}</span>
                  <span className="font-bold text-slate-200">{dog.ticker}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-300">{formatMoney(dog.currentPrice)}</span>
                  <span className="text-rose-400 font-bold text-[10px]">{dog.changePercent.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Traded */}
        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 flex flex-col justify-between font-mono text-xs">
          <div className="flex justify-between pb-2 border-b border-slate-800 mb-2">
            <span className="font-bold text-slate-200 uppercase flex items-center">
              <Activity className="w-3.5 h-3.5 text-blue-400 mr-1" /> Most Traded
            </span>
            <span className="text-[10px] text-blue-400 font-bold">VOL</span>
          </div>
          <div className="space-y-1.5">
            {mostTraded.map(dog => (
              <div key={dog.ticker} onClick={() => handleDogClick(dog.ticker)} className="flex justify-between items-center p-1 rounded hover:bg-slate-800/60 cursor-pointer">
                <div className="flex items-center space-x-1.5">
                  <span>{dog.avatar}</span>
                  <span className="font-bold text-slate-200">{dog.ticker}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-400 text-[10px]">{dog.volume.toLocaleString()}</span>
                  <span className="text-slate-200 font-bold text-[10px]">{formatMoney(dog.currentPrice)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Questionable Intelligence + Market Screener + News Wire */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center">
              <Flame className="w-4 h-4 text-amber-400 mr-2" />
              Consolidated 50-Dog Trading Pit
            </h2>
            <button
              onClick={() => setCurrentTab('market')}
              className="text-xs font-mono text-emerald-400 hover:underline"
            >
              View Full 50 Screener &rarr;
            </button>
          </div>
          <StockTable limit={10} />
        </div>

        <div className="lg:col-span-1 space-y-4">
          <QuestionableIntelligence />
          <MarketNews />
        </div>
      </div>

      {/* Daily Report Modal */}
      <DailyReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </div>
  );
};
