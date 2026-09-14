import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { Clock, ArrowUpRight, ArrowDownRight, Search, CheckCircle2, Download } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { orders } = useMarket();
  const [filterType, setFilterType] = useState<'ALL' | 'BUY' | 'SELL'>('ALL');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesType = filterType === 'ALL' || order.side === filterType;
    const matchesSearch = search.trim() === '' ||
      order.ticker.toLowerCase().includes(search.toLowerCase()) ||
      order.dogName.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleExportCSV = () => {
    if (orders.length === 0) return;
    const header = 'Order ID,Side,Type,Ticker,Dog,Shares,Execution Price,Total INR,Timestamp,Status\n';
    const rows = orders.map(o => 
      `"${o.id}","${o.side}","${o.type}","${o.ticker}","${o.dogName}",${o.shares},${o.price},${o.total},"${o.timestamp}","${o.status}"`
    ).join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dpse_orders_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center">
            <Clock className="w-5 h-5 text-emerald-400 mr-2" />
            Execution & Order Audit Log
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Immutable trade ticket history stored securely in your browser's persistent storage.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={orders.length === 0}
          className="px-3 py-1.5 bg-[#0b101c] hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 rounded disabled:opacity-40 transition-colors inline-flex items-center space-x-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV Log</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0b101c] border border-slate-800 p-3 rounded-lg">
        <div className="flex items-center space-x-2">
          {(['ALL', 'BUY', 'SELL'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                filterType === type
                  ? 'bg-slate-700 text-emerald-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type === 'ALL' ? 'All Orders' : type === 'BUY' ? '🟢 Buys' : '🔴 Sells'}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-[#080c14] border border-slate-700 rounded pl-8 pr-3 py-1 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#0b101c] border border-slate-800 rounded-lg overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="py-16 text-center text-slate-500 font-mono text-xs">
            {orders.length === 0 ? 'No transactions executed yet in this session.' : 'No orders match your filter criteria.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono text-slate-300">
              <thead>
                <tr className="border-b border-slate-800/80 bg-[#0d131f] text-[11px] text-slate-400 uppercase">
                  <th className="py-2.5 px-4">Order ID</th>
                  <th className="py-2.5 px-4">Side</th>
                  <th className="py-2.5 px-4">Asset</th>
                  <th className="py-2.5 px-4 text-right">Shares</th>
                  <th className="py-2.5 px-4 text-right">Price</th>
                  <th className="py-2.5 px-4 text-right">Gross Total</th>
                  <th className="py-2.5 px-4 text-center">Timestamp</th>
                  <th className="py-2.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredOrders.map(order => {
                  const isBuy = order.side === 'BUY';
                  return (
                    <tr key={order.id} className="hover:bg-slate-800/50">
                      <td className="py-2.5 px-4 text-slate-500 text-[11px]">
                        {order.id}
                      </td>
                      <td className="py-2.5 px-4">
                        <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded ${
                          isBuy ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800' : 'bg-rose-950/60 text-rose-400 border border-rose-800'
                        }`}>
                          {isBuy ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                          {order.side}
                        </span>
                        <span className="ml-1 text-[9px] text-slate-500">[{order.type}]</span>
                      </td>
                      <td className="py-2.5 px-4">
                        <div className="font-bold text-slate-100">{order.ticker}</div>
                        <div className="text-[10px] text-slate-400 font-sans">{order.dogName}</div>
                      </td>
                      <td className="py-2.5 px-4 text-right font-bold text-slate-100">
                        {order.shares}
                      </td>
                      <td className="py-2.5 px-4 text-right text-slate-300">
                        ₹{order.price.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-4 text-right font-bold text-slate-100">
                        ₹{order.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2.5 px-4 text-center text-slate-400 text-[11px]">
                        {order.timestamp}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <span className="inline-flex items-center text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/60">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> FILLED
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
