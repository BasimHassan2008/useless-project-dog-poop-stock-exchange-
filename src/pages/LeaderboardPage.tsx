import React from 'react';
import { useMarket } from '../context/MarketContext';
import { Trophy, Crown } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { leaderboard } = useMarket();

  const userRank = leaderboard.find(e => e.isUser)?.rank || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center">
            <Trophy className="w-5 h-5 text-amber-400 mr-2" />
            Global Canine Waste Traders Leaderboard
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Real-time global standings of premier canine asset managers, hedge funds, and degenerate retail sniffers.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#0b101c] border border-amber-500/40 px-3 py-1.5 rounded-lg">
          <Crown className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono text-slate-300">
            YOUR STANDING: <span className="font-bold text-amber-400">RANK #{userRank}</span>
          </span>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#0b101c] border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono text-slate-300">
            <thead>
              <tr className="border-b border-slate-800/80 bg-[#0d131f] text-[11px] text-slate-400 uppercase">
                <th className="py-3 px-4 text-center w-16">Rank</th>
                <th className="py-3 px-4">Canine Fund / Trader</th>
                <th className="py-3 px-4 text-right">Net Worth (INR)</th>
                <th className="py-3 px-4 hidden md:table-cell">Top Concentration</th>
                <th className="py-3 px-4 hidden lg:table-cell">Strategy Thesis</th>
                <th className="py-3 px-4 text-center">Division Badge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {leaderboard.map(entry => {
                let rankBadge = (
                  <span className="font-bold text-slate-500">#{entry.rank}</span>
                );
                if (entry.rank === 1) rankBadge = <span className="text-base">🥇</span>;
                else if (entry.rank === 2) rankBadge = <span className="text-base">🥈</span>;
                else if (entry.rank === 3) rankBadge = <span className="text-base">🥉</span>;

                return (
                  <tr
                    key={entry.name}
                    className={`transition-colors ${
                      entry.isUser
                        ? 'bg-emerald-950/40 border-l-4 border-emerald-500 hover:bg-emerald-950/60'
                        : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <td className="py-3 px-4 text-center font-bold">
                      {rankBadge}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{entry.avatar}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className={`font-bold ${entry.isUser ? 'text-emerald-400' : 'text-slate-100'}`}>
                              {entry.name}
                            </span>
                            {entry.isUser && (
                              <span className="text-[10px] bg-emerald-500 text-slate-950 font-extrabold px-1.5 py-0.2 rounded">
                                YOU
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 font-sans hidden sm:inline">
                            {entry.isUser ? 'Your Local Portfolio' : 'Verified DPSE Syndicate'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right font-bold text-sm text-slate-100">
                      ₹{entry.netWorth.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>

                    <td className="py-3 px-4 text-slate-300 hidden md:table-cell">
                      <span className="px-2 py-0.5 rounded bg-[#080c14] border border-slate-700/80 text-xs">
                        🐕 {entry.topHolding}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-400 text-[11px] font-sans hidden lg:table-cell">
                      {entry.strategy}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                        {entry.badge}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
