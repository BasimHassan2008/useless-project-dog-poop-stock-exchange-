import React from 'react';
import { useMarket } from '../context/MarketContext';
import { PoopGPT } from '../components/portfolio/PoopGPT';
import { 
  Briefcase, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  CircleDollarSign, 
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
  ScrollText,
  Clock
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const PortfolioPage: React.FC = () => {
  const { 
    portfolio, 
    shorts, 
    options, 
    stocks, 
    cash, 
    portfolioValue, 
    totalHoldingsValue, 
    todayPL, 
    todayPLPercent, 
    totalPL, 
    totalPLPercent,
    orders,
    coverShort,
    selectStock,
    setCurrentTab,
    formatMoney
  } = useMarket();

  const holdingsList = Object.values(portfolio);
  const shortsList = Object.values(shorts);
  const isTodayProfit = todayPL >= 0;
  const isTotalProfit = totalPL >= 0;

  // Best & worst performers
  const ratedHoldings = holdingsList.map(h => {
    const stock = stocks.find(s => s.ticker === h.ticker);
    const curPrice = stock ? stock.currentPrice : h.averagePrice;
    const pnl = (curPrice - h.averagePrice) * h.shares;
    const pnlPct = h.averagePrice > 0 ? (pnl / (h.averagePrice * h.shares)) * 100 : 0;
    return { ...h, pnl, pnlPct };
  });

  const bestPerformer = [...ratedHoldings].sort((a, b) => b.pnlPct - a.pnlPct)[0];
  const worstPerformer = [...ratedHoldings].sort((a, b) => a.pnlPct - b.pnlPct)[0];

  // Allocation data for donut
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#f97316', '#84cc16'];
  const allocationData = [
    { name: 'Virtual Margin', value: cash, color: '#475569' },
    ...holdingsList.map((h, i) => {
      const stock = stocks.find(s => s.ticker === h.ticker);
      const val = h.shares * (stock ? stock.currentPrice : h.averagePrice);
      return { name: h.ticker, value: +val.toFixed(2), color: COLORS[i % COLORS.length] };
    })
  ].filter(d => d.value > 0);

  const handleTrade = (ticker: string) => {
    selectStock(ticker);
    setCurrentTab('dogs');
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-slate-100 flex items-center">
          <Briefcase className="w-5 h-5 text-emerald-400 mr-2" />
          Canine Investment Portfolio V2
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Consolidated spot holdings, short derivatives, active options contracts, and risk analysis.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between text-slate-400 text-[11px] mb-1">
            <span>PORTFOLIO NET WORTH</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100">{formatMoney(portfolioValue)}</div>
          <div className="text-[10px] text-slate-500 mt-1">Cash + Equity + Shorts</div>
        </div>

        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between text-slate-400 text-[11px] mb-1">
            <span>AVAILABLE MARGIN</span>
            <CircleDollarSign className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{formatMoney(cash)}</div>
          <div className="text-[10px] text-slate-500 mt-1">Free Virtual Liquidity</div>
        </div>

        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between text-slate-400 text-[11px] mb-1">
            <span>SESSION P&L</span>
            {isTodayProfit ? <TrendingUp className="w-4 h-4 text-emerald-400" /> : <TrendingDown className="w-4 h-4 text-rose-400" />}
          </div>
          <div className={`text-2xl font-bold ${isTodayProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isTodayProfit ? '+' : ''}{formatMoney(todayPL)}
          </div>
          <div className={`text-[10px] ${isTodayProfit ? 'text-emerald-500/80' : 'text-rose-500/80'} mt-1`}>
            {isTodayProfit ? '+' : ''}{todayPLPercent.toFixed(2)}% today
          </div>
        </div>

        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between text-slate-400 text-[11px] mb-1">
            <span>TOTAL RETURN (ROI)</span>
            <span className="text-[10px] text-slate-500">BASE: ₹10K</span>
          </div>
          <div className={`text-2xl font-bold ${isTotalProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isTotalProfit ? '+' : ''}{formatMoney(totalPL)}
          </div>
          <div className={`text-[10px] ${isTotalProfit ? 'text-emerald-500/80' : 'text-rose-500/80'} mt-1`}>
            {isTotalProfit ? '+' : ''}{totalPLPercent.toFixed(2)}% all-time
          </div>
        </div>

        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between text-slate-400 text-[11px] mb-1">
            <span>PERFORMANCE EXTREMES</span>
            <span className="text-[10px] text-slate-500">P&L</span>
          </div>
          <div className="text-xs font-bold text-emerald-400">
            Top: {bestPerformer ? `${bestPerformer.ticker} (+${bestPerformer.pnlPct.toFixed(1)}%)` : 'N/A'}
          </div>
          <div className="text-xs font-bold text-rose-400 mt-1">
            Low: {worstPerformer ? `${worstPerformer.ticker} (${worstPerformer.pnlPct.toFixed(1)}%)` : 'N/A'}
          </div>
        </div>
      </div>

      {/* POOPGPT AI Portfolio Advisor Card */}
      <PoopGPT />

      {/* Holdings & Allocation Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spot Holdings Table */}
        <div className="lg:col-span-2 bg-[#0b101c] border border-slate-800 rounded-lg p-4 flex flex-col">
          <div className="flex justify-between pb-3 border-b border-slate-800 mb-3">
            <span className="font-bold text-slate-200 uppercase tracking-wider">
              Spot Canine Positions ({holdingsList.length})
            </span>
            <span className="text-slate-500">Holdings Value: {formatMoney(totalHoldingsValue)}</span>
          </div>

          {holdingsList.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              You hold no spot canine equities.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-800/80 text-slate-500 uppercase text-[10px]">
                    <th className="py-2 px-3">Asset</th>
                    <th className="py-2 px-3 text-right">Shares</th>
                    <th className="py-2 px-3 text-right">Avg Price</th>
                    <th className="py-2 px-3 text-right">Market Price</th>
                    <th className="py-2 px-3 text-right">Gross Value</th>
                    <th className="py-2 px-3 text-right">Unrealized P&L</th>
                    <th className="py-2 px-3 text-right">Weight</th>
                    <th className="py-2 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {holdingsList.map(h => {
                    const stock = stocks.find(s => s.ticker === h.ticker);
                    const curPrice = stock ? stock.currentPrice : h.averagePrice;
                    const val = +(h.shares * curPrice).toFixed(2);
                    const cost = +(h.shares * h.averagePrice).toFixed(2);
                    const pnl = +(val - cost).toFixed(2);
                    const pnlPct = cost > 0 ? +((pnl / cost) * 100).toFixed(2) : 0;
                    const weight = portfolioValue > 0 ? +((val / portfolioValue) * 100).toFixed(1) : 0;
                    const isProfit = pnl >= 0;

                    return (
                      <tr key={h.ticker} className="hover:bg-slate-800/50">
                        <td className="py-2.5 px-3">
                          <div className="flex items-center space-x-2">
                            <span>{stock?.avatar || '🐕'}</span>
                            <div>
                              <span className="font-bold text-slate-100">{h.ticker}</span>
                              <div className="text-[10px] text-slate-400 font-sans">{stock?.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-100">{h.shares}</td>
                        <td className="py-2.5 px-3 text-right text-slate-400">{formatMoney(h.averagePrice)}</td>
                        <td className="py-2.5 px-3 text-right text-slate-200">{formatMoney(curPrice)}</td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-100">{formatMoney(val)}</td>
                        <td className="py-2.5 px-3 text-right">
                          <div className={`font-bold ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isProfit ? '+' : ''}{formatMoney(pnl)}
                          </div>
                          <div className={`text-[10px] ${isProfit ? 'text-emerald-500/80' : 'text-rose-500/80'}`}>
                            {isProfit ? '+' : ''}{pnlPct}%
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-300 font-bold">{weight}%</td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => handleTrade(h.ticker)}
                            className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 text-[10px]"
                          >
                            Trade
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Allocation Donut */}
        <div className="lg:col-span-1 bg-[#0b101c] border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider pb-2 border-b border-slate-800 mb-2">
              Portfolio Weight Allocation
            </h3>
            <div className="w-full h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={allocationData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#0b101c" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [formatMoney(value), 'Weight']} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1 text-[10px] max-h-36 overflow-y-auto pr-1">
            {allocationData.map(item => (
              <div key={item.name} className="flex justify-between text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span>{formatMoney(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Short Positions Table (Section 16) */}
      {shortsList.length > 0 && (
        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between pb-3 border-b border-slate-800 mb-3">
            <span className="font-bold text-purple-400 uppercase tracking-wider flex items-center">
              <ShieldAlert className="w-4 h-4 mr-1.5" />
              Active Short Selling Positions (Canine Skepticism)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800/80 text-slate-500 uppercase text-[10px]">
                  <th className="py-2 px-3">Asset</th>
                  <th className="py-2 px-3 text-right">Short Shares</th>
                  <th className="py-2 px-3 text-right">Borrowed Price</th>
                  <th className="py-2 px-3 text-right">Current Price</th>
                  <th className="py-2 px-3 text-right">Margin Collateral</th>
                  <th className="py-2 px-3 text-right">Unrealized P&L</th>
                  <th className="py-2 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {shortsList.map(s => {
                  const stock = stocks.find(st => st.ticker === s.ticker);
                  const curPrice = stock ? stock.currentPrice : s.borrowedPrice;
                  const pnl = +((s.borrowedPrice - curPrice) * s.shares).toFixed(2);
                  const isProfit = pnl >= 0;

                  return (
                    <tr key={s.ticker} className="hover:bg-slate-800/50">
                      <td className="py-2.5 px-3 font-bold text-slate-200">🐕 {s.ticker}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-purple-400">{s.shares}</td>
                      <td className="py-2.5 px-3 text-right text-slate-400">{formatMoney(s.borrowedPrice)}</td>
                      <td className="py-2.5 px-3 text-right text-slate-200">{formatMoney(curPrice)}</td>
                      <td className="py-2.5 px-3 text-right text-slate-300">{formatMoney(s.collateral)}</td>
                      <td className="py-2.5 px-3 text-right font-bold">
                        <span className={isProfit ? 'text-emerald-400' : 'text-rose-400'}>
                          {isProfit ? '+' : ''}{formatMoney(pnl)}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => coverShort(s.ticker, s.shares)}
                          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-[10px] font-bold transition-colors"
                        >
                          Cover Short
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Options Contracts Table (Section 17) */}
      {options.length > 0 && (
        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4">
          <div className="flex justify-between pb-3 border-b border-slate-800 mb-3">
            <span className="font-bold text-amber-400 uppercase tracking-wider flex items-center">
              <ScrollText className="w-4 h-4 mr-1.5" />
              Active Canine Options Desk Contracts
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800/80 text-slate-500 uppercase text-[10px]">
                  <th className="py-2 px-3">Contract ID</th>
                  <th className="py-2 px-3">Asset & Type</th>
                  <th className="py-2 px-3 text-right">Strike Price</th>
                  <th className="py-2 px-3 text-right">Premium Paid</th>
                  <th className="py-2 px-3 text-center">Time to Expiry</th>
                  <th className="py-2 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {options.map(opt => (
                  <tr key={opt.id} className="hover:bg-slate-800/50">
                    <td className="py-2.5 px-3 text-slate-500 text-[10px]">{opt.id}</td>
                    <td className="py-2.5 px-3">
                      <span className="font-bold text-slate-100 mr-2">{opt.ticker}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        opt.type === 'CALL' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}>
                        {opt.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-200">{formatMoney(opt.strikePrice)}</td>
                    <td className="py-2.5 px-3 text-right text-slate-300">{formatMoney(opt.premium)}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-amber-400 font-bold flex items-center justify-center">
                        <Clock className="w-3 h-3 mr-1" /> {opt.expiresInSeconds}s
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        opt.status === 'ACTIVE' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {opt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
