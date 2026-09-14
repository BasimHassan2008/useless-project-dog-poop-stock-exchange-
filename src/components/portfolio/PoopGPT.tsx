import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { Bot, Sparkles, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';

export const PoopGPT: React.FC = () => {
  const { portfolio, stocks, totalPLPercent, cash, portfolioValue } = useMarket();
  const [queryKey, setQueryKey] = useState(0);

  const holdings = Object.values(portfolio);
  const totalShares = holdings.reduce((sum, h) => sum + h.shares, 0);

  // Derive intelligent deadpan comments
  const generateAnalysis = () => {
    if (holdings.length === 0) {
      return {
        title: 'LIQUIDITY STAGNATION DETECTED',
        verdict: '100% Cash / Extreme Cynicism',
        body: 'You currently hold zero canine equities. While this shields you from vacuum cleaner flash crashes, it demonstrates a complete lack of faith in canine digestion. Consider buying at least one Labrador to initiate metabolic exposure.',
        recommendation: 'Allocate at least ₹500 into high-output organic waste.',
        risk: '0 / 100 (Uncomfortably Safe)',
      };
    }

    const topHolding = [...holdings].sort((a, b) => b.shares - a.shares)[0];
    const topStock = stocks.find(s => s.ticker === topHolding.ticker);
    const topWeight = portfolioValue > 0 ? ((topHolding.shares * (topStock?.currentPrice || 1)) / portfolioValue) * 100 : 0;

    let analysis = '';
    let verdict = 'Moderately Questionable';
    let riskScore = Math.min(99, Math.floor(50 + topWeight * 0.4));

    if (topStock?.ticker === 'BRUNO') {
      analysis += `You own ${topHolding.shares} shares of Bruno (${topWeight.toFixed(1)}% portfolio weight). Bold. You have essentially tied your life savings to a single Labrador's morning oatmeal schedule. `;
    } else if (topStock?.sector === 'Bark Communications') {
      analysis += `Your portfolio is heavily anchored in Bark Communications (${topStock.ticker}). Expect severe intraday noise volatility whenever a delivery truck arrives. `;
    } else {
      analysis += `Your primary asset is ${topHolding.ticker} (${topStock?.name}). You have diversified across breeds, but certainly not across stupidity. `;
    }

    if (totalPLPercent > 30) {
      verdict = 'Accidental Genius';
      analysis += `You are up ${totalPLPercent.toFixed(1)}%. Market intelligence suspects you may accidentally comprehend canine macroeconomics, or the market has lost all remaining sanity.`;
    } else if (totalPLPercent < -20) {
      verdict = 'Metabolic Catastrophe';
      analysis += `You are currently down ${totalPLPercent.toFixed(1)}%. Selling everything would technically be a strategy, though your financial advisor recommends touching physical grass first.`;
    } else {
      analysis += `Overall treat exposure is high. A sudden kibble embargo could wipe out 40% of your net worth.`;
    }

    return {
      title: 'POOPGPT ALGORITHMIC AUDIT',
      verdict,
      body: analysis,
      recommendation: topWeight > 50 
        ? `Diversify away from ${topStock?.ticker}. No single dog should command that much organic authority.`
        : 'Rebalance into Nap Industries to dampen zoomie volatility.',
      risk: `${riskScore} / 100 (${riskScore > 75 ? 'EXTREMELY QUESTIONABLE' : 'ELEVATED RISK'})`,
    };
  };

  const currentAnalysis = generateAnalysis();

  return (
    <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-5 font-mono text-xs relative overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-md bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-100 flex items-center space-x-1.5">
              <span>POOPGPT v4.2</span>
              <span className="text-[9px] bg-emerald-900/60 text-emerald-400 px-1.5 py-0.2 rounded">CANINE AI</span>
            </div>
            <span className="text-[10px] text-slate-500 font-sans">Autonomous Canine Portfolio Intelligence</span>
          </div>
        </div>

        <button
          onClick={() => setQueryKey(k => k + 1)}
          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center space-x-1"
          title="Re-run PoopGPT Audit"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="text-[10px]">Re-Audit</span>
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-[11px] bg-[#080c14] p-2.5 rounded border border-slate-800/80">
          <div>
            <span className="text-slate-500 uppercase block text-[9px]">DIAGNOSTIC VERDICT</span>
            <span className="font-bold text-amber-400">{currentAnalysis.verdict}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 uppercase block text-[9px]">PORTFOLIO RISK SCORE</span>
            <span className="font-bold text-rose-400">{currentAnalysis.risk}</span>
          </div>
        </div>

        <div className="text-slate-300 leading-relaxed font-sans text-xs bg-slate-900/50 p-3 rounded border border-slate-800">
          “{currentAnalysis.body}”
        </div>

        <div className="text-[11px] text-slate-400 font-sans flex items-start space-x-2 bg-emerald-950/20 p-2.5 rounded border border-emerald-900/30">
          <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-400 font-mono">POOPGPT RECOMMENDATION:</strong>
            <p className="text-slate-300 mt-0.5">{currentAnalysis.recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
