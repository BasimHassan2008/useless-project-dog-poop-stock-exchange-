import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { X, AlertTriangle, RotateCcw, Volume2, VolumeX, Gauge, Sparkles } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { 
    soundEnabled, 
    toggleSound, 
    tickSpeed, 
    setTickSpeed, 
    resetSimulation, 
    ultraPoopMode, 
    activateUltraPoopMode 
  } = useMarket();

  const [confirmingReset, setConfirmingReset] = useState(false);

  if (!isOpen) return null;

  const handleExecuteReset = () => {
    resetSimulation();
    setConfirmingReset(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#0f172a] border border-slate-700 rounded-xl max-w-md w-full p-5 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="text-base">⚙️</span>
            <h3 className="text-sm font-bold font-mono text-slate-100 uppercase tracking-wider">
              Exchange Configuration & Console
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section 1: Tick Engine Speed */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold text-slate-300 flex items-center">
            <Gauge className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
            Tick Engine Simulation Rate:
          </label>
          <div className="grid grid-cols-4 gap-2 font-mono text-xs">
            {[
              { label: 'PAUSE', speed: 0 },
              { label: '1x (Nominal)', speed: 1 },
              { label: '2x (Fast)', speed: 2 },
              { label: '5x (Hyper)', speed: 5 },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => setTickSpeed(item.speed)}
                className={`py-1.5 px-2 rounded border text-center transition-all ${
                  tickSpeed === item.speed
                    ? 'bg-slate-700 border-emerald-500 text-emerald-400 font-bold'
                    : 'bg-[#080c14] border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Audio Toggle */}
        <div className="flex items-center justify-between p-3 bg-[#080c14] border border-slate-800 rounded-lg">
          <div className="flex items-center space-x-2.5">
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            <div>
              <div className="text-xs font-mono font-bold text-slate-200">Terminal Auditory Synthesis</div>
              <div className="text-[11px] text-slate-400">Audio chimes for order execution, chaos, and market sirens</div>
            </div>
          </div>
          <button
            onClick={toggleSound}
            className={`px-3 py-1 text-xs font-mono rounded font-bold transition-colors ${
              soundEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {soundEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* Section 3: Ultra Poop Mode */}
        <div className="flex items-center justify-between p-3 bg-[#080c14] border border-slate-800 rounded-lg">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <div>
              <div className="text-xs font-mono font-bold text-yellow-400">Ultra Poop Mode (Golden Aura)</div>
              <div className="text-[11px] text-slate-400">Activate golden manure theme and prestige styling</div>
            </div>
          </div>
          <button
            onClick={activateUltraPoopMode}
            className={`px-3 py-1 text-xs font-mono rounded font-bold transition-colors ${
              ultraPoopMode ? 'bg-yellow-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {ultraPoopMode ? 'ACTIVE' : 'OFF'}
          </button>
        </div>

        {/* Section 4: Hard Simulation Reset */}
        <div className="pt-2 border-t border-slate-800">
          {!confirmingReset ? (
            <button
              onClick={() => setConfirmingReset(true)}
              className="w-full py-2.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/80 text-rose-400 rounded-lg text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESET SIMULATION (FACTORY DEFAULTS)</span>
            </button>
          ) : (
            <div className="bg-rose-950/70 border border-rose-600 rounded-lg p-3.5 space-y-3">
              <div className="flex items-start space-x-2 text-rose-300">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-xs font-mono">
                  <div className="font-bold text-rose-200">Are you absolutely sure?</div>
                  <div className="text-[11px] text-rose-300/90 mt-1 leading-relaxed">
                    This will permanently erase:
                    <ul className="list-disc list-inside mt-0.5 space-y-0.5">
                      <li>Your entire canine portfolio</li>
                      <li>Trade history and order logs</li>
                      <li>Virtual cash balance (reverted to ₹10,000)</li>
                      <li>Market price histories and leaderboards</li>
                    </ul>
                    This action cannot be undone.
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1 font-mono text-xs">
                <button
                  onClick={handleExecuteReset}
                  className="flex-1 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded transition-colors"
                >
                  YES, WIPE EVERYTHING
                </button>
                <button
                  onClick={() => setConfirmingReset(false)}
                  className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
