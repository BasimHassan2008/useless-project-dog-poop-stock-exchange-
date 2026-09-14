import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { Dog, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { showOnboarding, dismissOnboarding, formatMoney, cash } = useMarket();

  if (!showOnboarding) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-[#0f172a] border-2 border-emerald-500/60 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(34,197,94,0.25)] font-mono text-center space-y-6 relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 mx-auto flex items-center justify-center text-3xl shadow-xl">
          🐕
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/80">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WELCOME TO DPSE V2</span>
          </div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">
            Dog Poop Stock Exchange
          </h2>
          <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">
            “Where every dump is an investment.”
          </p>
        </div>

        <div className="bg-[#080c14] border border-slate-800 p-4 rounded-xl space-y-2 text-xs font-sans text-slate-300 text-left leading-relaxed">
          <p>
            Congratulations. You have successfully discovered a financial market that nobody asked for.
          </p>
          <div className="pt-2 border-t border-slate-800 font-mono text-[11px] space-y-1 text-slate-400">
            <div>
              • Starting Virtual Margin: <span className="font-bold text-emerald-400">{formatMoney(cash)}</span>
            </div>
            <div>
              • Dogs Listed: <span className="font-bold text-slate-200">50 Public Equities</span>
            </div>
            <div>
              • Objective: <span className="font-bold text-slate-200">Make money from dogs doing absolutely nothing useful.</span>
            </div>
          </div>
        </div>

        <button
          onClick={dismissOnboarding}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-950 flex items-center justify-center space-x-2 transition-all cursor-pointer transform active:scale-98"
        >
          <span>ENTER THE MARKET</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[10px] text-slate-500">
          ⚠️ Strictly satirical financial simulation. Zero real currency. No physical hardware.
        </p>
      </div>
    </div>
  );
};
