import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { Sliders, Sparkles, AlertOctagon, Skull, Cat, Coffee } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MarketControlPage: React.FC = () => {
  const { marketControls, updateControls, triggerChaos, triggerCrisis } = useMarket();
  const [isShaking, setIsShaking] = useState(false);

  const handleChaosClick = () => {
    setIsShaking(true);
    triggerChaos();

    try {
      confetti({
        particleCount: 75,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#eab308', '#ef4444', '#a855f7'],
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      setIsShaking(false);
    }, 600);
  };

  const applyPreset = (preset: 'bull' | 'slump' | 'bacon' | 'zen') => {
    if (preset === 'bull') {
      updateControls({ volatility: 65, dogExcitement: 85, treatSupply: 90, parkAvailability: 85, poopProduction: 95, randomChaos: 30 });
    } else if (preset === 'slump') {
      updateControls({ volatility: 40, dogExcitement: 15, treatSupply: 20, parkAvailability: 10, poopProduction: 25, randomChaos: 20 });
    } else if (preset === 'bacon') {
      updateControls({ volatility: 95, dogExcitement: 100, treatSupply: 100, parkAvailability: 50, poopProduction: 80, randomChaos: 85 });
    } else if (preset === 'zen') {
      updateControls({ volatility: 15, dogExcitement: 20, treatSupply: 50, parkAvailability: 90, poopProduction: 50, randomChaos: 5 });
    }
  };

  return (
    <div className={`space-y-6 font-mono text-xs ${isShaking ? 'animate-shake' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center">
            <Sliders className="w-5 h-5 text-amber-400 mr-2" />
            Exchange Central God Mode & Canine Synthesis V2
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Directly manipulate environmental and biological variables governing the 50-dog exchange.
          </p>
        </div>

        <span className="text-[11px] text-amber-400 bg-amber-950/40 border border-amber-900/60 px-3 py-1 rounded">
          ⚠️ GOD MODE ACTIVE — REGULATORY IMMUNITY GRANTED
        </span>
      </div>

      {/* Giant Chaos Action Callout */}
      <div className="bg-gradient-to-r from-amber-950/70 via-yellow-950/40 to-amber-950/70 border-2 border-yellow-500/70 rounded-xl p-6 text-center relative overflow-hidden shadow-2xl">
        <div className="max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-widest bg-slate-900/80 px-3 py-1 rounded-full border border-amber-500/40">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Market Destabilization Core</span>
          </div>

          <h2 className="text-2xl font-black text-slate-100 tracking-tight">
            Force Immediate Market Chaos
          </h2>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            Clicking this button injects artificial multi-canine price spikes, flash crashes, generates breaking wire alerts, and rattles the entire trading floor.
          </p>

          <div className="pt-2">
            <button
              onClick={handleChaosClick}
              className="px-8 py-4 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-400 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-[0_0_30px_rgba(234,179,8,0.4)] active:scale-95 transition-all transform flex items-center justify-center space-x-2.5 mx-auto cursor-pointer"
            >
              <span className="text-xl">💩</span>
              <span>CAUSE MARKET CHAOS</span>
              <span className="text-xl">💥</span>
            </button>
          </div>
        </div>
      </div>

      {/* Market Crisis System (Section 21) */}
      <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <span className="font-bold text-rose-400 uppercase tracking-wider flex items-center">
            <AlertOctagon className="w-4 h-4 mr-1.5" />
            Catastrophic Market Crisis Triggers (Section 21)
          </span>
          <span className="text-[10px] text-slate-500">Inject Systemic Market Panics</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => triggerCrisis('POOP_SHORTAGE')}
            className="p-3 bg-[#080c14] hover:bg-rose-950/40 border border-slate-800 hover:border-rose-600 rounded text-left transition-colors cursor-pointer"
          >
            <div className="font-bold text-rose-400 flex items-center">
              💩 Global Poop Shortage
            </div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">Heavy Poop stocks drop -18.5%.</div>
          </button>

          <button
            onClick={() => triggerCrisis('BONE_CRISIS')}
            className="p-3 bg-[#080c14] hover:bg-amber-950/40 border border-slate-800 hover:border-amber-600 rounded text-left transition-colors cursor-pointer"
          >
            <div className="font-bold text-amber-400 flex items-center">
              🦴 Great Bone Crisis
            </div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">Bone Mining stocks drop -15.0%.</div>
          </button>

          <button
            onClick={() => triggerCrisis('CAT_INVASION')}
            className="p-3 bg-[#080c14] hover:bg-purple-950/40 border border-slate-800 hover:border-purple-600 rounded text-left transition-colors cursor-pointer"
          >
            <div className="font-bold text-purple-400 flex items-center">
              🐈 Cat Market Invasion
            </div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">Barking dogs surge +24% on alert.</div>
          </button>

          <button
            onClick={() => triggerCrisis('GLOBAL_NAP')}
            className="p-3 bg-[#080c14] hover:bg-blue-950/40 border border-slate-800 hover:border-blue-600 rounded text-left transition-colors cursor-pointer"
          >
            <div className="font-bold text-blue-400 flex items-center">
              🛋️ Global Nap Event
            </div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">Nobody trades. Everyone sleeps.</div>
          </button>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4">
        <div className="flex justify-between mb-2">
          <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
            Macro Environmental Presets
          </span>
          <span className="text-[10px] text-slate-500">One-Click Calibration</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button onClick={() => applyPreset('bull')} className="p-2.5 bg-[#080c14] hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500 rounded text-left transition-colors">
            <div className="font-bold text-emerald-400">🐂 Bull Frenzy</div>
            <div className="text-[10px] text-slate-400 font-sans">High treats & massive output.</div>
          </button>
          <button onClick={() => applyPreset('slump')} className="p-2.5 bg-[#080c14] hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500 rounded text-left transition-colors">
            <div className="font-bold text-rose-400">🌧️ Rainy Slump</div>
            <div className="text-[10px] text-slate-400 font-sans">Wet grass delays deposits.</div>
          </button>
          <button onClick={() => applyPreset('bacon')} className="p-2.5 bg-[#080c14] hover:bg-amber-950/40 border border-slate-800 hover:border-amber-500 rounded text-left transition-colors">
            <div className="font-bold text-amber-400">🥓 Bacon Apocalypse</div>
            <div className="text-[10px] text-slate-400 font-sans">100% ballistic zoomies.</div>
          </button>
          <button onClick={() => applyPreset('zen')} className="p-2.5 bg-[#080c14] hover:bg-blue-950/40 border border-slate-800 hover:border-blue-500 rounded text-left transition-colors">
            <div className="font-bold text-blue-400">🛋️ Zen Nap Mode</div>
            <div className="text-[10px] text-slate-400 font-sans">Deep couch consolidation.</div>
          </button>
        </div>
      </div>

      {/* 6 Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-200">📊 Market Volatility</span>
            <span className="text-emerald-400 font-bold">{marketControls.volatility}%</span>
          </div>
          <input type="range" min="0" max="100" value={marketControls.volatility} onChange={e => updateControls({ volatility: Number(e.target.value) })} className="w-full accent-emerald-500" />
          <div className="text-[10px] text-slate-400 font-sans">Expands overall standard deviation and base tick spreads.</div>
        </div>

        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-200">🐶 Dog Excitement / Zoomies</span>
            <span className="text-amber-400 font-bold">{marketControls.dogExcitement}%</span>
          </div>
          <input type="range" min="0" max="100" value={marketControls.dogExcitement} onChange={e => updateControls({ dogExcitement: Number(e.target.value) })} className="w-full accent-amber-500" />
          <div className="text-[10px] text-slate-400 font-sans">Directly boosts price pressure for high-barking and zoomie-heavy equities.</div>
        </div>

        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-200">🦴 Treat Supply & Kibble Liquidity</span>
            <span className="text-purple-400 font-bold">{marketControls.treatSupply}%</span>
          </div>
          <input type="range" min="0" max="100" value={marketControls.treatSupply} onChange={e => updateControls({ treatSupply: Number(e.target.value) })} className="w-full accent-purple-500" />
          <div className="text-[10px] text-slate-400 font-sans">Deficits trigger panic selling in treat-dependent dogs.</div>
        </div>

        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-200">🌳 Park & Grass Availability</span>
            <span className="text-teal-400 font-bold">{marketControls.parkAvailability}%</span>
          </div>
          <input type="range" min="0" max="100" value={marketControls.parkAvailability} onChange={e => updateControls({ parkAvailability: Number(e.target.value) })} className="w-full accent-teal-500" />
          <div className="text-[10px] text-slate-400 font-sans">Stabilizes roaming outdoor equities and garden security.</div>
        </div>

        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-200">💩 Organic Poop Production Yield</span>
            <span className="text-yellow-400 font-bold">{marketControls.poopProduction}%</span>
          </div>
          <input type="range" min="0" max="100" value={marketControls.poopProduction} onChange={e => updateControls({ poopProduction: Number(e.target.value) })} className="w-full accent-yellow-500" />
          <div className="text-[10px] text-slate-400 font-sans">Higher waste output drives positive fundamental price pressure.</div>
        </div>

        <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-200">⚡ Unregulated Random Chaos</span>
            <span className="text-rose-400 font-bold">{marketControls.randomChaos}%</span>
          </div>
          <input type="range" min="0" max="100" value={marketControls.randomChaos} onChange={e => updateControls({ randomChaos: Number(e.target.value) })} className="w-full accent-rose-500" />
          <div className="text-[10px] text-slate-400 font-sans">Injects stochastic shocks detached from canine logic.</div>
        </div>
      </div>
    </div>
  );
};
