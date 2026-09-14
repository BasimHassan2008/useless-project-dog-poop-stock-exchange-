import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { X, Trophy, Award, Lock, CheckCircle2 } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose }) => {
  const { achievements } = useMarket();

  if (!isOpen) return null;

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#0f172a] border border-slate-700 rounded-xl max-w-xl w-full p-6 shadow-2xl font-mono text-xs space-y-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                CANINE TRADING ACHIEVEMENTS ({unlockedCount}/{achievements.length})
              </h3>
              <span className="text-[10px] text-slate-500 font-sans">Milestones in useless financial speculation</span>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="space-y-2 overflow-y-auto pr-1 flex-1">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className={`p-3 rounded-lg border flex items-center justify-between gap-3 transition-colors ${
                ach.unlocked
                  ? 'bg-emerald-950/30 border-emerald-700/60'
                  : 'bg-[#080c14] border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{ach.icon}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold ${ach.unlocked ? 'text-slate-100' : 'text-slate-400'}`}>
                      {ach.title}
                    </span>
                    {ach.unlocked ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        UNLOCKED
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-500">
                        LOCKED
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                    {ach.description}
                  </p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                {ach.unlocked ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-600 ml-auto" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
