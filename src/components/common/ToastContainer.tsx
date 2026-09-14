import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, Sparkles, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useMarket();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let borderColor = 'border-slate-700';
        let bgGradient = 'from-slate-900 to-[#0b101c]';
        let icon = <Info className="w-4 h-4 text-blue-400" />;

        if (toast.type === 'success') {
          borderColor = 'border-emerald-600/50';
          bgGradient = 'from-emerald-950/90 to-[#0b101c]';
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
        } else if (toast.type === 'warning') {
          borderColor = 'border-amber-600/50';
          bgGradient = 'from-amber-950/90 to-[#0b101c]';
          icon = <AlertTriangle className="w-4 h-4 text-amber-400" />;
        } else if (toast.type === 'error') {
          borderColor = 'border-rose-600/50';
          bgGradient = 'from-rose-950/90 to-[#0b101c]';
          icon = <AlertOctagon className="w-4 h-4 text-rose-400" />;
        } else if (toast.type === 'chaos') {
          borderColor = 'border-yellow-500/70';
          bgGradient = 'from-yellow-950/90 to-[#0b101c]';
          icon = <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start p-3.5 rounded-lg border ${borderColor} bg-gradient-to-r ${bgGradient} backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-0`}
          >
            <div className="flex-shrink-0 mt-0.5 mr-3">{icon}</div>
            <div className="flex-1 min-w-0 mr-2">
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                {toast.title}
              </h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-snug break-words">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-slate-400 hover:text-slate-100 p-0.5 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
