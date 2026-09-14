import React from 'react';
import { Shield, AlertTriangle, FileWarning, CheckCircle2, ShieldAlert, Award, Ban } from 'lucide-react';

export const RegulatorPage: React.FC = () => {
  const metrics = [
    { label: 'Market Integrity', val: '97%', status: 'HIGH', color: 'text-emerald-400' },
    { label: 'Dog Safety Index', val: '84%', status: 'ADEQUATE', color: 'text-blue-400' },
    { label: 'Poop Transparency', val: '61%', status: 'QUESTIONABLE', color: 'text-amber-400' },
    { label: 'Financial Nonsense', val: '143%', status: 'CRITICAL OVERFLOW', color: 'text-rose-400' },
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-bold text-slate-100">
              C.A.N.I.N.E. REGULATORY AUTHORITY
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Canine Authority for Needless Investment & Nonsense Economics • Division of Waste Enforcement
          </p>
        </div>

        <div className="bg-amber-950/40 border border-amber-900/60 px-3 py-1.5 rounded text-amber-400 font-bold">
          AGENCY STATUS: BARELY FUNCTIONAL
        </div>
      </div>

      {/* 4 Regulatory Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="bg-[#0b101c] border border-slate-800 rounded-lg p-4 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase">{m.label}</span>
            <div className={`text-2xl font-bold ${m.color}`}>{m.val}</div>
            <span className="text-[10px] text-slate-400 font-sans block pt-1 border-t border-slate-850">
              Rating: {m.status}
            </span>
          </div>
        ))}
      </div>

      {/* Featured Delisting Notice: MR. BISCUIT */}
      <div className="bg-rose-950/30 border-2 border-rose-600/70 rounded-xl p-5 space-y-3 relative overflow-hidden">
        <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
          <Ban className="w-5 h-5 flex-shrink-0" />
          <span>🚨 OFFICIAL REGULATORY DELISTING NOTICE — CASE #4092-B</span>
        </div>

        <div className="bg-[#080c14] border border-rose-900/50 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">🐶</span>
              <span className="text-base font-bold text-slate-100">MR. BISCUIT (BSCT)</span>
              <span className="text-[10px] bg-rose-600 text-white font-black px-2 py-0.5 rounded">
                PERMANENTLY DELISTED
              </span>
            </div>
            <div className="text-xs text-slate-300 font-sans mt-2">
              <strong>Official Regulatory Reason:</strong> “Dog has adamantly refused to participate in the canine economy. Subject slept through 4 consecutive trading sessions and ignored 12 pieces of grilled chicken.”
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <span className="text-xs font-bold text-rose-500 font-mono block">TRADING FROZEN</span>
            <span className="text-[10px] text-slate-500">Asset liquidated by court order</span>
          </div>
        </div>
      </div>

      {/* Enforcement Bulletins */}
      <div className="bg-[#0b101c] border border-slate-800 rounded-lg p-5 space-y-4">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center">
          <FileWarning className="w-4 h-4 text-amber-400 mr-2" />
          Recent Regulatory Enforcement Dispatches
        </h3>

        <div className="space-y-3 font-sans text-xs">
          <div className="p-3 bg-[#080c14] border border-slate-800 rounded-lg">
            <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1">
              <span className="text-amber-400 font-bold">DISPATCH #812 • INSIDER TREAT INQUIRY</span>
              <span>10:42 AM</span>
            </div>
            <p className="text-slate-300">
              C.A.N.I.N.E. investigators executed an unannounced inspection of Bruno's kitchen pantry following allegations that unauthorized cheese slices were distributed prior to morning exchange opening.
            </p>
          </div>

          <div className="p-3 bg-[#080c14] border border-slate-800 rounded-lg">
            <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1">
              <span className="text-emerald-400 font-bold">DISPATCH #811 • LAWN DEPOSIT CERTIFICATION</span>
              <span>09:15 AM</span>
            </div>
            <p className="text-slate-300">
              Daisy successfully renewed ISO-9001 Low-Rider Soil Compaction certification after delivering 3 consecutive carpet-compliant backyard deposits.
            </p>
          </div>

          <div className="p-3 bg-[#080c14] border border-slate-800 rounded-lg">
            <div className="flex justify-between font-mono text-[10px] text-slate-400 mb-1">
              <span className="text-rose-400 font-bold">DISPATCH #810 • SQUIRREL CONSPIRACY SANCTIONS</span>
              <span>Yesterday</span>
            </div>
            <p className="text-slate-300">
              Rocky fined 4 rawhide chew sticks for excessive and unwarranted fence-line acoustic disturbances directed at innocent delivery couriers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
