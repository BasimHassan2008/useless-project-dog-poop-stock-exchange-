import React, { useState, useMemo } from 'react';
import { useMarket } from '../../context/MarketContext';
import { DogStock, SectorType } from '../../types/market';
import { ArrowUpRight, ArrowDownRight, ArrowUpDown, ChevronUp, ChevronDown, ExternalLink, Filter } from 'lucide-react';

interface StockTableProps {
  onSelectDog?: (ticker: string) => void;
  limit?: number;
}

type SortField = 'ticker' | 'name' | 'currentPrice' | 'changePercent' | 'volume' | 'marketCap';
type SortOrder = 'asc' | 'desc';

export const StockTable: React.FC<StockTableProps> = ({ onSelectDog, limit }) => {
  const { stocks, selectStock, setCurrentTab, formatMoney } = useMarket();
  const [sortField, setSortField] = useState<SortField>('marketCap');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [sectorFilter, setSectorFilter] = useState<string>('ALL');
  const [tableSearch, setTableSearch] = useState<string>('');

  const sectors: (string | SectorType)[] = [
    'ALL',
    'Heavy Poop Industries',
    'Treat Technology',
    'Bark Communications',
    'Nap Industries',
    'Park & Recreation',
    'Cat Detection Systems',
    'Bone Mining',
    'Premium Canine Assets',
  ];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredAndSortedStocks = useMemo(() => {
    return stocks
      .filter(dog => {
        const matchesSector = sectorFilter === 'ALL' || dog.sector === sectorFilter;
        const matchesSearch = tableSearch.trim() === '' || 
          dog.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
          dog.ticker.toLowerCase().includes(tableSearch.toLowerCase()) ||
          dog.breed.toLowerCase().includes(tableSearch.toLowerCase());
        return matchesSector && matchesSearch;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (typeof valA === 'string') {
          return sortOrder === 'asc' 
            ? (valA as string).localeCompare(valB as string)
            : (valB as string).localeCompare(valA as string);
        }
        return sortOrder === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      })
      .slice(0, limit || stocks.length);
  }, [stocks, sortField, sortOrder, sectorFilter, tableSearch, limit]);

  const handleRowClick = (dog: DogStock) => {
    if (onSelectDog) {
      onSelectDog(dog.ticker);
    } else {
      selectStock(dog.ticker);
      setCurrentTab('dogs');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 text-slate-600 inline ml-1" />;
    return sortOrder === 'asc' 
      ? <ChevronUp className="w-3 h-3 text-emerald-400 inline ml-1" />
      : <ChevronDown className="w-3 h-3 text-emerald-400 inline ml-1" />;
  };

  return (
    <div className="bg-[#0b101c] border border-slate-800 rounded-lg overflow-hidden flex flex-col font-mono text-xs">
      {/* Table Toolbar */}
      {!limit && (
        <div className="p-3 border-b border-slate-800/80 bg-[#0d131f] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              50-Dog Canine Market Screener
            </span>
            <span className="text-[11px] text-slate-500">
              ({filteredAndSortedStocks.length} Assets Listed)
            </span>
          </div>

          <div className="flex items-center space-x-2.5">
            <input
              type="text"
              placeholder="Search ticker or breed..."
              value={tableSearch}
              onChange={e => setTableSearch(e.target.value)}
              className="bg-[#080c14] border border-slate-700 rounded px-2.5 py-1 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <select
              value={sectorFilter}
              onChange={e => setSectorFilter(e.target.value)}
              className="bg-[#080c14] border border-slate-700 rounded px-2 py-1 text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              {sectors.map(s => (
                <option key={s} value={s}>{s === 'ALL' ? 'All 8 Sectors' : s}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/90 bg-[#080c14]/70 text-[10px] uppercase tracking-wider text-slate-400 select-none">
              <th className="py-2.5 px-3 cursor-pointer hover:text-slate-200" onClick={() => handleSort('ticker')}>
                Ticker {getSortIcon('ticker')}
              </th>
              <th className="py-2.5 px-3 cursor-pointer hover:text-slate-200" onClick={() => handleSort('name')}>
                Dog & Sector {getSortIcon('name')}
              </th>
              <th className="py-2.5 px-3 text-right cursor-pointer hover:text-slate-200" onClick={() => handleSort('currentPrice')}>
                Price {getSortIcon('currentPrice')}
              </th>
              <th className="py-2.5 px-3 text-right cursor-pointer hover:text-slate-200" onClick={() => handleSort('changePercent')}>
                Change {getSortIcon('changePercent')}
              </th>
              <th className="py-2.5 px-3 text-right cursor-pointer hover:text-slate-200 hidden md:table-cell" onClick={() => handleSort('volume')}>
                Poop Vol {getSortIcon('volume')}
              </th>
              <th className="py-2.5 px-3 text-right cursor-pointer hover:text-slate-200 hidden lg:table-cell" onClick={() => handleSort('marketCap')}>
                Market Crap {getSortIcon('marketCap')}
              </th>
              <th className="py-2.5 px-3 text-right hidden xl:table-cell">24h High</th>
              <th className="py-2.5 px-3 text-right hidden xl:table-cell">24h Low</th>
              <th className="py-2.5 px-3 text-center hidden sm:table-cell">Sentiment</th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredAndSortedStocks.map(dog => {
              const isUp = dog.change >= 0;
              const isTickFresh = Date.now() - dog.lastPriceChangeTimestamp < 1200;
              const tickClass = isTickFresh 
                ? (dog.lastPriceChangeDirection === 'up' ? 'animate-flashGreen' : dog.lastPriceChangeDirection === 'down' ? 'animate-flashRed' : '')
                : '';

              return (
                <tr
                  key={dog.ticker}
                  onClick={() => handleRowClick(dog)}
                  className={`hover:bg-slate-800/60 cursor-pointer transition-colors ${tickClass}`}
                >
                  <td className="py-2 px-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-base">{dog.avatar}</span>
                      <span className="font-bold text-slate-100">{dog.ticker}</span>
                    </div>
                  </td>

                  <td className="py-2 px-3 whitespace-nowrap">
                    <div className="font-sans font-medium text-slate-200">{dog.name}</div>
                    <div className="text-[10px] text-slate-400">{dog.sector}</div>
                  </td>

                  <td className="py-2 px-3 text-right whitespace-nowrap font-bold text-slate-100">
                    {formatMoney(dog.currentPrice)}
                  </td>

                  <td className="py-2 px-3 text-right whitespace-nowrap">
                    <div className={`inline-flex items-center font-semibold text-[11px] px-1.5 py-0.2 rounded ${
                      isUp ? 'text-emerald-400 bg-emerald-950/40' : 'text-rose-400 bg-rose-950/40'
                    }`}>
                      {isUp ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                      {isUp ? '+' : ''}{dog.changePercent.toFixed(2)}%
                    </div>
                  </td>

                  <td className="py-2 px-3 text-right whitespace-nowrap text-slate-400 hidden md:table-cell">
                    {dog.volume.toLocaleString()}
                  </td>

                  <td className="py-2 px-3 text-right whitespace-nowrap text-slate-300 hidden lg:table-cell">
                    {formatMoney(dog.marketCap)}
                  </td>

                  <td className="py-2 px-3 text-right whitespace-nowrap text-emerald-500/90 hidden xl:table-cell">
                    {formatMoney(dog.dailyHigh)}
                  </td>

                  <td className="py-2 px-3 text-right whitespace-nowrap text-rose-500/90 hidden xl:table-cell">
                    {formatMoney(dog.dailyLow)}
                  </td>

                  <td className="py-2 px-3 text-center whitespace-nowrap hidden sm:table-cell">
                    <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                      dog.sentiment === 'ABSURD OPTIMISM'
                        ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                        : dog.sentiment === 'BULLISH'
                        ? 'bg-green-950/60 text-green-400 border border-green-800'
                        : dog.sentiment === 'EXTREME POOP'
                        ? 'bg-rose-900/60 text-rose-300 border border-rose-700'
                        : dog.sentiment === 'BEARISH'
                        ? 'bg-red-950/60 text-rose-400 border border-red-800'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {dog.sentiment}
                    </span>
                  </td>

                  <td className="py-2 px-3 text-center whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(dog);
                      }}
                      className="px-2.5 py-1 text-[11px] font-sans font-medium rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-600/40 transition-colors inline-flex items-center"
                    >
                      Trade <ExternalLink className="w-2.5 h-2.5 ml-1" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
