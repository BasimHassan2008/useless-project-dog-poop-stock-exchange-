import React, { useState } from 'react';
import { DogStock, Timeframe, CandlePoint } from '../../types/market';
import { useMarket } from '../../context/MarketContext';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar 
} from 'recharts';
import { CandlestickChart as CandleIcon, LineChart as LineIcon, MapPin } from 'lucide-react';

interface StockChartProps {
  dog: DogStock;
}

export const StockChart: React.FC<StockChartProps> = ({ dog }) => {
  const { chartMode, setChartMode, formatMoney } = useMarket();
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');

  const historyData: CandlePoint[] = 
    timeframe === '1D' ? dog.candles1D :
    timeframe === '1W' ? dog.candles1W :
    timeframe === '1M' ? dog.candles1M :
    timeframe === '3M' ? dog.candles3M :
    timeframe === '1Y' ? dog.candles1Y :
    dog.candlesALL;

  const isUp = dog.change >= 0;
  const strokeColor = isUp ? '#22c55e' : '#ef4444';
  const fillColor = isUp ? '#10b981' : '#f43f5e';

  // Extract recent events for the timeline pin strip
  const timelineEvents = historyData.filter(d => d.event);

  const prices = historyData.map(d => d.close);
  const minPrice = Math.min(...prices, dog.currentPrice);
  const maxPrice = Math.max(...prices, dog.currentPrice);
  const padding = (maxPrice - minPrice) * 0.1 || 2;
  const yDomain = [+(minPrice - padding).toFixed(2), +(maxPrice + padding).toFixed(2)];

  const timeframes: Timeframe[] = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  return (
    <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 flex flex-col font-mono text-xs">
      {/* Chart Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-2 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-200 uppercase tracking-wider text-sm">
            {dog.ticker} / INR
          </span>
          <span className="text-[10px] text-slate-500 font-sans">
            {timeframe === '1D' ? 'Real-Time Organic Stream' : `${timeframe} Performance`}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Chart Type Toggle: LINE / CANDLESTICK */}
          <div className="flex items-center bg-[#080c14] border border-slate-800 rounded p-0.5">
            <button
              onClick={() => setChartMode('LINE')}
              className={`px-2 py-1 rounded flex items-center space-x-1 transition-colors ${
                chartMode === 'LINE' ? 'bg-slate-700 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LineIcon className="w-3 h-3" />
              <span className="text-[10px]">LINE</span>
            </button>
            <button
              onClick={() => setChartMode('CANDLESTICK')}
              className={`px-2 py-1 rounded flex items-center space-x-1 transition-colors ${
                chartMode === 'CANDLESTICK' ? 'bg-slate-700 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CandleIcon className="w-3 h-3" />
              <span className="text-[10px]">CANDLES</span>
            </button>
          </div>

          {/* Timeframe Selectors */}
          <div className="flex items-center space-x-0.5 bg-[#080c14] border border-slate-800 rounded p-0.5">
            {timeframes.map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 text-[10px] rounded transition-colors ${
                  timeframe === tf
                    ? 'bg-slate-700 text-emerald-400 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chart Rendering */}
      {chartMode === 'LINE' ? (
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id={`gradient-${dog.ticker}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={fillColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={fillColor} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={{ stroke: '#1e293b' }} />
              <YAxis domain={yDomain} stroke="#475569" fontSize={10} orientation="right" tickLine={false} axisLine={{ stroke: '#1e293b' }} tickFormatter={val => `₹${val}`} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as CandlePoint;
                    return (
                      <div className="bg-[#0f172a] border border-slate-700 p-2.5 rounded shadow-xl font-mono text-xs z-50">
                        <div className="text-[10px] text-slate-400 mb-1">{data.time}</div>
                        <div className="text-slate-100 font-bold flex justify-between gap-3">
                          <span>Price:</span>
                          <span className="text-emerald-400">₹{Number(data.close).toFixed(2)}</span>
                        </div>
                        <div className="text-slate-400 text-[11px] flex justify-between gap-3">
                          <span>Vol:</span>
                          <span>{Number(data.volume).toLocaleString()}</span>
                        </div>
                        {data.event && (
                          <div className="mt-1.5 pt-1.5 border-t border-slate-800 text-[10px] text-amber-400 font-sans">
                            📍 {data.event}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area type="monotone" dataKey="close" stroke={strokeColor} strokeWidth={2} fillOpacity={1} fill={`url(#gradient-${dog.ticker})`} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        /* Candlestick SVG Chart */
        <div className="w-full h-72 flex flex-col justify-between py-2 relative">
          <div className="h-full flex items-end justify-between gap-1 overflow-hidden px-2">
            {historyData.slice(-26).map((candle, idx) => {
              const candleUp = candle.close >= candle.open;
              const range = yDomain[1] - yDomain[0] || 1;
              const topY = ((yDomain[1] - candle.high) / range) * 100;
              const bottomY = ((yDomain[1] - candle.low) / range) * 100;
              const openY = ((yDomain[1] - candle.open) / range) * 100;
              const closeY = ((yDomain[1] - candle.close) / range) * 100;

              const bodyTop = Math.min(openY, closeY);
              const bodyHeight = Math.max(3, Math.abs(openY - closeY));
              const wickHeight = Math.max(1, bottomY - topY);

              return (
                <div key={`candle-${idx}`} className="flex-1 flex flex-col items-center h-full relative group cursor-pointer">
                  {/* Wick */}
                  <div 
                    className={`w-[1px] absolute ${candleUp ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    style={{ top: `${topY}%`, height: `${wickHeight}%` }}
                  />
                  {/* Body */}
                  <div 
                    className={`w-full max-w-[12px] absolute rounded-[1px] ${candleUp ? 'bg-emerald-500 border border-emerald-400' : 'bg-rose-500 border border-rose-400'}`}
                    style={{ top: `${bodyTop}%`, height: `${bodyHeight}%` }}
                  />

                  {/* Candle Tooltip */}
                  <div className="hidden group-hover:block absolute bottom-full mb-2 bg-[#0f172a] border border-slate-700 p-2 rounded text-[10px] whitespace-nowrap shadow-2xl z-50 pointer-events-none">
                    <div className="text-slate-400">{candle.time}</div>
                    <div>O: ₹{candle.open.toFixed(2)} H: ₹{candle.high.toFixed(2)}</div>
                    <div>L: ₹{candle.low.toFixed(2)} C: ₹{candle.close.toFixed(2)}</div>
                    {candle.event && <div className="text-amber-400 mt-1 font-sans">📍 {candle.event}</div>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800 px-2">
            <span>Low: {formatMoney(yDomain[0])}</span>
            <span>Current: {formatMoney(dog.currentPrice)}</span>
            <span>High: {formatMoney(yDomain[1])}</span>
          </div>
        </div>
      )}

      {/* Direct Chart Timeline Event Pins */}
      {timelineEvents.length > 0 && (
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center space-x-3 overflow-x-auto text-[10px] text-slate-400 pb-1 scrollbar-none">
          <span className="text-amber-400 font-bold whitespace-nowrap flex items-center">
            <MapPin className="w-3 h-3 mr-1 text-amber-400" />
            CHART EVENTS:
          </span>
          {timelineEvents.slice(-4).map((ev, i) => (
            <div key={i} className="bg-[#080c14] border border-slate-800 px-2 py-0.5 rounded whitespace-nowrap text-slate-300">
              <span className="text-slate-500 mr-1">{ev.time}</span>
              <span>{ev.event}</span>
            </div>
          ))}
        </div>
      )}

      {/* Volume Histogram */}
      <div className="w-full h-14 mt-2 pt-2 border-t border-slate-800/80">
        <div className="text-[9px] text-slate-500 mb-1">POOP / TRADING VOLUME HISTOGRAM</div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={historyData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
            <Bar dataKey="volume" fill="#334155" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
