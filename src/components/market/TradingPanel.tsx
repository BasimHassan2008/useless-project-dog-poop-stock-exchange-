import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { DogStock, OrderType } from '../../types/market';
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldAlert, 
  CheckCircle2, 
  AlertOctagon, 
  ScrollText, 
  Zap,
  Clock
} from 'lucide-react';

interface TradingPanelProps {
  dog: DogStock;
}

export const TradingPanel: React.FC<TradingPanelProps> = ({ dog }) => {
  const { 
    cash, 
    portfolio, 
    shorts, 
    options, 
    buyShares, 
    sellShares, 
    shortStock, 
    coverShort, 
    buyOption, 
    placeOrder, 
    isMarketOpen,
    formatMoney 
  } = useMarket();

  const [activeTab, setActiveTab] = useState<'BUY' | 'SELL' | 'SHORT' | 'OPTIONS'>('BUY');
  const [orderType, setOrderType] = useState<OrderType>('MARKET');
  const [shares, setShares] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<number>(+(dog.currentPrice * 0.95).toFixed(2));
  const [stopPrice, setStopPrice] = useState<number>(+(dog.currentPrice * 0.90).toFixed(2));

  // Options inputs
  const [optionType, setOptionType] = useState<'CALL' | 'PUT'>('CALL');
  const callStrike = +(dog.currentPrice * 1.10).toFixed(2);
  const putStrike = +(dog.currentPrice * 0.90).toFixed(2);
  const selectedStrike = optionType === 'CALL' ? callStrike : putStrike;
  const optionPremium = +(dog.currentPrice * 0.08 * 100).toFixed(2); // 100 shares contract

  const ownedHolding = portfolio[dog.ticker];
  const ownedShares = ownedHolding ? ownedHolding.shares : 0;
  const shortHolding = shorts[dog.ticker];
  const shortShares = shortHolding ? shortHolding.shares : 0;

  const estimatedTotal = +(shares * dog.currentPrice).toFixed(2);
  const shortMarginRequired = +(estimatedTotal * 1.2).toFixed(2);
  const maxAffordable = Math.floor(cash / dog.currentPrice);

  const presets = [1, 5, 10, 25, 50, 100];

  const handleExecute = () => {
    if (activeTab === 'BUY') {
      if (orderType === 'MARKET') {
        buyShares(dog.ticker, shares);
      } else {
        placeOrder(dog.ticker, 'BUY', orderType, shares, limitPrice, stopPrice);
      }
    } else if (activeTab === 'SELL') {
      if (orderType === 'MARKET') {
        sellShares(dog.ticker, shares);
      } else {
        placeOrder(dog.ticker, 'SELL', orderType, shares, limitPrice, stopPrice);
      }
    } else if (activeTab === 'SHORT') {
      if (shortShares > 0 && shares <= shortShares) {
        coverShort(dog.ticker, shares);
      } else {
        shortStock(dog.ticker, shares);
      }
    } else if (activeTab === 'OPTIONS') {
      buyOption(dog.ticker, optionType, selectedStrike, optionPremium);
    }
  };

  return (
    <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 flex flex-col font-mono text-xs">
      {/* Upper Navigation Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-[#080c14] border border-slate-800 rounded-md mb-3">
        <button
          onClick={() => setActiveTab('BUY')}
          className={`py-1.5 rounded font-bold transition-all text-center ${
            activeTab === 'BUY' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          BUY
        </button>
        <button
          onClick={() => setActiveTab('SELL')}
          className={`py-1.5 rounded font-bold transition-all text-center ${
            activeTab === 'SELL' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          SELL
        </button>
        <button
          onClick={() => setActiveTab('SHORT')}
          className={`py-1.5 rounded font-bold transition-all text-center ${
            activeTab === 'SHORT' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          SHORT
        </button>
        <button
          onClick={() => setActiveTab('OPTIONS')}
          className={`py-1.5 rounded font-bold transition-all text-center ${
            activeTab === 'OPTIONS' ? 'bg-amber-600 text-slate-950 font-black shadow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          OPTIONS
        </button>
      </div>

      {activeTab !== 'OPTIONS' ? (
        <>
          {/* Order Type Selector */}
          <div className="flex items-center justify-between py-1 border-b border-slate-800/80 mb-3 text-[11px]">
            <span className="text-slate-500 uppercase">Execution Type:</span>
            <div className="flex space-x-1">
              {(['MARKET', 'LIMIT', 'STOP'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    orderType === type ? 'bg-slate-700 text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Current Execution Price */}
          <div className="flex justify-between py-1 text-slate-400 mb-2">
            <span>Market Tick:</span>
            <span className="font-bold text-slate-100">{formatMoney(dog.currentPrice)}</span>
          </div>

          {/* Limit / Stop Price Inputs */}
          {orderType === 'LIMIT' && (
            <div className="mb-2">
              <label className="text-[10px] text-slate-400">Target Limit Price (₹):</label>
              <input
                type="number"
                step="0.1"
                value={limitPrice}
                onChange={e => setLimitPrice(Number(e.target.value))}
                className="w-full bg-[#080c14] border border-slate-700 rounded px-2 py-1 text-slate-100 text-xs mt-0.5"
              />
            </div>
          )}

          {orderType === 'STOP' && (
            <div className="mb-2">
              <label className="text-[10px] text-slate-400">Stop Trigger Price (₹):</label>
              <input
                type="number"
                step="0.1"
                value={stopPrice}
                onChange={e => setStopPrice(Number(e.target.value))}
                className="w-full bg-[#080c14] border border-slate-700 rounded px-2 py-1 text-slate-100 text-xs mt-0.5"
              />
            </div>
          )}

          {/* Shares Quantity Stepper & Slider */}
          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Shares:</span>
              <span className="text-slate-200 font-bold">{shares}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShares(Math.max(1, shares - 1))}
                className="w-8 h-8 rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 font-bold"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={shares}
                onChange={e => setShares(Math.max(1, Math.floor(Number(e.target.value))))}
                className="flex-1 h-8 bg-[#080c14] border border-slate-700 rounded text-center font-bold text-slate-100"
              />
              <button
                onClick={() => setShares(shares + 1)}
                className="w-8 h-8 rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 font-bold"
              >
                +
              </button>
            </div>

            {/* Slider */}
            <input
              type="range"
              min="1"
              max={Math.max(50, maxAffordable || 50)}
              value={shares}
              onChange={e => setShares(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />

            {/* Presets */}
            <div className="grid grid-cols-6 gap-1">
              {presets.map(p => (
                <button
                  key={p}
                  onClick={() => setShares(p)}
                  className="py-0.5 bg-slate-800/80 hover:bg-slate-700 text-[10px] rounded text-slate-300 border border-slate-700/60"
                >
                  +{p}
                </button>
              ))}
            </div>
          </div>

          {/* Cost & Account Breakdown */}
          <div className="bg-[#080c14] border border-slate-800 rounded p-2.5 space-y-1 text-[11px] mb-3">
            <div className="flex justify-between text-slate-400">
              <span>Gross Total:</span>
              <span className="font-bold text-slate-100">{formatMoney(estimatedTotal)}</span>
            </div>
            {activeTab === 'SHORT' && (
              <div className="flex justify-between text-purple-400">
                <span>120% Collateral:</span>
                <span>{formatMoney(shortMarginRequired)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span>Available Cash:</span>
              <span className="text-emerald-400">{formatMoney(cash)}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[10px]">
              <span>Owned Shares:</span>
              <span>{ownedShares} (Shorts: {shortShares})</span>
            </div>
          </div>

          {/* Short Warning Alert */}
          {activeTab === 'SHORT' && (
            <div className="bg-purple-950/40 border border-purple-800/70 p-2 rounded mb-3 text-[10px] text-purple-300 font-sans flex items-start space-x-1.5">
              <AlertOctagon className="w-3.5 h-3.5 flex-shrink-0 text-purple-400 mt-0.5" />
              <span>
                <strong>SHORT WARNING:</strong> You are betting against a {dog.breed}'s ability to produce organic waste.
              </span>
            </div>
          )}

          {/* Action Button */}
          {activeTab === 'BUY' && (
            <button
              onClick={handleExecute}
              disabled={!isMarketOpen || estimatedTotal > cash}
              className="w-full py-2.5 rounded font-bold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white shadow-lg cursor-pointer transition-all active:scale-[0.99]"
            >
              BUY {shares} {dog.ticker} ({formatMoney(estimatedTotal)})
            </button>
          )}

          {activeTab === 'SELL' && (
            <button
              onClick={handleExecute}
              disabled={!isMarketOpen || ownedShares < shares}
              className="w-full py-2.5 rounded font-bold text-xs uppercase tracking-wider bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 text-white shadow-lg cursor-pointer transition-all active:scale-[0.99]"
            >
              SELL {shares} {dog.ticker} ({formatMoney(estimatedTotal)})
            </button>
          )}

          {activeTab === 'SHORT' && (
            <button
              onClick={handleExecute}
              disabled={!isMarketOpen || (shortShares === 0 && shortMarginRequired > cash)}
              className="w-full py-2.5 rounded font-bold text-xs uppercase tracking-wider bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 text-white shadow-lg cursor-pointer transition-all active:scale-[0.99]"
            >
              {shortShares > 0 ? `COVER SHORT ${shares} ${dog.ticker}` : `SHORT THE DOG (${formatMoney(shortMarginRequired)})`}
            </button>
          )}
        </>
      ) : (
        /* Options Desk UI */
        <div className="space-y-3">
          <div className="text-[10px] text-slate-400 font-sans pb-1 border-b border-slate-800">
            Intentionally ridiculous high-leverage canine waste derivative contracts.
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setOptionType('CALL')}
              className={`p-2.5 rounded border text-left transition-all ${
                optionType === 'CALL'
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                  : 'bg-[#080c14] border-slate-800 text-slate-400'
              }`}
            >
              <div className="font-bold text-xs flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-1" /> CALL OPTION
              </div>
              <div className="text-[10px] mt-1 text-slate-400 font-sans">
                Betting that {dog.name} will somehow become even more productive.
              </div>
              <div className="text-[11px] font-bold text-emerald-400 mt-2">
                Strike: {formatMoney(callStrike)}
              </div>
            </button>

            <button
              onClick={() => setOptionType('PUT')}
              className={`p-2.5 rounded border text-left transition-all ${
                optionType === 'PUT'
                  ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                  : 'bg-[#080c14] border-slate-800 text-slate-400'
              }`}
            >
              <div className="font-bold text-xs flex items-center">
                <TrendingDown className="w-3.5 h-3.5 mr-1" /> PUT OPTION
              </div>
              <div className="text-[10px] mt-1 text-slate-400 font-sans">
                Contract for cynics who believe {dog.name} has already peaked.
              </div>
              <div className="text-[11px] font-bold text-rose-400 mt-2">
                Strike: {formatMoney(putStrike)}
              </div>
            </button>
          </div>

          <div className="bg-[#080c14] border border-slate-800 p-2.5 rounded space-y-1 text-[11px]">
            <div className="flex justify-between text-slate-400">
              <span>Contract Multiplier:</span>
              <span>100 Shares</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Contract Duration:</span>
              <span className="text-amber-400 flex items-center">
                <Clock className="w-3 h-3 mr-1" /> 2.0 Minutes
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Required Premium:</span>
              <span className="font-bold text-amber-400">{formatMoney(optionPremium)}</span>
            </div>
          </div>

          <button
            onClick={handleExecute}
            disabled={optionPremium > cash}
            className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 text-slate-950 font-black rounded uppercase text-xs tracking-wider shadow transition-all cursor-pointer"
          >
            BUY {dog.ticker} {optionType} CONTRACT ({formatMoney(optionPremium)})
          </button>
        </div>
      )}
    </div>
  );
};
