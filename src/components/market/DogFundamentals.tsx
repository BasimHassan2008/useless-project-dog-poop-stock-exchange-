import React from 'react';
import { DogStock } from '../../types/market';
import { useMarket } from '../../context/MarketContext';
import { Activity, HelpCircle, Sparkles } from 'lucide-react';

interface DogFundamentalsProps {
  dog: DogStock;
}

export const DogFundamentals: React.FC<DogFundamentalsProps> = ({ dog }) => {
  const { formatMoney } = useMarket();

  const ratios = [
    { label: 'P/E Ratio', full: 'Poop / Earnings', value: `${dog.peRatio}x`, desc: 'Valuation multiple: how many treats investors pay per kg of premium lawn deposits.' },
    { label: 'P/S Ratio', full: 'Poop / Snacks', value: `${dog.psRatio}x`, desc: 'Organic throughput generated per single biscuit consumed.' },
    { label: 'ROE', full: 'Return on Excrement', value: `${dog.roe}%`, desc: 'Net metabolic conversion efficiency across morning lawn walks.' },
    { label: 'EPS', full: 'Excrement Per Share', value: `${dog.eps} kg`, desc: 'Average daily organic waste dividend delivered per virtual share.' },
    { label: 'ROI', full: 'Return on Intestine', value: `${dog.roi}%`, desc: 'Fundamental intestinal efficiency ratio of kibble input to output.' },
    { label: 'EBITDA', full: 'Excrement Before Interest, Treats, Depr. & Anxiety', value: formatMoney(dog.ebitda), desc: 'Core operational canine digestion before subtraction of bath anxiety.' },
    { label: 'Free Crap Flow', full: 'Free Crap Flow', value: formatMoney(dog.freeCrapFlow), desc: 'Unencumbered organic volume available after routine fence patrols.' },
    { label: 'Entire Poop Value', full: 'Entire Enterprise Poop Value', value: formatMoney(dog.entirePoopValue), desc: 'Total theoretical acquisition value of dog including chew toys and leash rights.' },
  ];

  const biometrics = [
    { label: '💩 Poop Production', val: dog.poopProduction, color: 'bg-emerald-500' },
    { label: '🦴 Treat Dependency', val: dog.treatDependency, color: 'bg-amber-500' },
    { label: '🔊 Bark Index', val: dog.barkIndex, color: 'bg-rose-500' },
    { label: '🛋️ Nap Efficiency', val: dog.napEfficiency, color: 'bg-blue-500' },
    { label: '🌳 Park Attendance', val: dog.parkAttendance, color: 'bg-teal-500' },
    { label: '🧪 Digestion Efficiency', val: dog.digestionEfficiency, color: 'bg-purple-500' },
    { label: '⚡ Chaos Rating', val: dog.chaosRating, color: 'bg-red-500' },
    { label: '🤝 Owner Confidence', val: dog.ownerConfidence, color: 'bg-indigo-500' },
    { label: '🐈 Cat Hostility', val: dog.catHostility, color: 'bg-orange-500' },
    { label: '🐿️ Squirrel Detection', val: dog.squirrelDetection, color: 'bg-yellow-500' },
  ];

  return (
    <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 space-y-4 font-mono text-xs">
      {/* Upper: Ridiculous Financial Ratios */}
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
          <span className="font-bold text-slate-200 uppercase tracking-wider text-xs flex items-center">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
            Canine Financial Valuation Multiples
          </span>
          <span className="text-[10px] text-slate-500 font-sans">Hover metrics for full terminology</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {ratios.map(r => (
            <div
              key={r.label}
              className="bg-[#080c14] border border-slate-800 hover:border-slate-700 p-2 rounded group relative cursor-help transition-colors"
            >
              <div className="text-[10px] text-slate-500 flex items-center justify-between">
                <span>{r.label}</span>
                <HelpCircle className="w-3 h-3 text-slate-600 group-hover:text-slate-400" />
              </div>
              <div className="text-sm font-bold text-slate-100 mt-0.5">{r.value}</div>
              <div className="text-[9px] text-slate-400 font-sans truncate">{r.full}</div>

              {/* Tooltip */}
              <div className="hidden group-hover:block absolute bottom-full mb-2 left-0 w-48 bg-[#0f172a] border border-slate-700 p-2 rounded text-[10px] text-slate-300 font-sans shadow-2xl z-50 pointer-events-none">
                <div className="font-bold text-amber-400 mb-0.5 font-mono">{r.full}</div>
                {r.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lower: 10 Biological Fundamentals */}
      <div className="pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-slate-200 uppercase tracking-wider text-xs flex items-center">
            <Activity className="w-3.5 h-3.5 text-blue-400 mr-1.5" />
            Canine Biological Diagnostics (10 Core Pillars)
          </span>
          <span className="text-[10px] text-slate-500">Normalized Index (/100)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
          {biometrics.map(b => (
            <div key={b.label} className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>{b.label}:</span>
                <span className="font-bold text-slate-200">{b.val}/100</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
