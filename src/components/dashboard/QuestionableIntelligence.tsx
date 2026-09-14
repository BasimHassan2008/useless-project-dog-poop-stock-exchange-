import React from 'react';
import { Eye, ShieldAlert } from 'lucide-react';

export const QuestionableIntelligence: React.FC = () => {
  const rumors = [
    { icon: '🐕', text: 'Bruno has been unusually energetic near the pantry cupboard.' },
    { icon: '🦴', text: 'Max appears to have discovered a new biscuit stash behind the recliner.' },
    { icon: '🐈', text: 'Lucy has been staring intently at an unidentified vibration outside sector 4.' },
    { icon: '🛋️', text: 'Rocky has not moved a single muscle for 4 hours and 12 minutes.' },
    { icon: '🐿️', text: 'Charlie was observed conducting circular perimeter drifts around the coffee table.' },
    { icon: '🍕', text: 'Toby paused by the recycling bin for 14 consecutive seconds sniffing pizza grease.' },
    { icon: '🐺', text: 'Loki practiced high-octave howling at an imaginary fire engine.' },
  ];

  return (
    <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 font-mono text-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
          <span className="font-bold text-slate-200 uppercase tracking-wider text-xs flex items-center">
            <Eye className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
            Questionable Intelligence (Scent Leaks)
          </span>
          <span className="text-[10px] text-slate-500 font-sans">Unverified Rumors</span>
        </div>

        <div className="space-y-1.5 overflow-y-auto max-h-48 pr-1 text-[11px]">
          {rumors.map((r, i) => (
            <div key={i} className="flex items-start space-x-2 p-1.5 rounded bg-[#080c14] border border-slate-800/80">
              <span className="text-base flex-shrink-0">{r.icon}</span>
              <span className="text-slate-300 font-sans leading-snug">{r.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-amber-400 font-sans flex items-start space-x-1.5 bg-amber-950/30 p-2 rounded">
        <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0 text-amber-400 mt-0.5" />
        <span>
          <strong>DISCLAIMER:</strong> This information is completely useless and should absolutely not influence your trades.
        </span>
      </div>
    </div>
  );
};
