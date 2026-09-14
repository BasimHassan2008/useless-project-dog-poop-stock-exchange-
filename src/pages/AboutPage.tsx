import React from 'react';
import { BookOpen, ShieldAlert, Sparkles, Dog } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const dictionary = [
    { term: 'Market Crap', definition: 'Formerly known as Market Cap. The total aggregate valuation of a dog based on share price multiplied by estimated annual organic deposit volume.' },
    { term: 'Poop Volume', definition: 'The 24-hour liquidity metric measuring how many virtual shares or deposits have changed hands in the open trading pit.' },
    { term: 'BULL MARKET 🐂', definition: 'A market state characterized by voracious appetite, continuous tail-wagging, and aggressive upward price momentum.' },
    { term: 'BEAR MARKET 🐻', definition: 'Occurs primarily on rainy mornings when dogs refuse to set foot on wet grass, inducing market-wide constipation.' },
    { term: 'Poop Split', definition: 'When an asset becomes too expensive, the board divides the shares in two, similar to breaking a chew stick in half.' },
    { term: 'Inside Dog Trading', definition: 'Illegally trading equities based on privileged scent intelligence (e.g. sniffing out that bacon was cooked 10 minutes before public announcement).' },
    { term: 'Market Splash', definition: 'A catastrophic market crash typically precipitated by the sight of a vacuum cleaner or unexpected bathtime protocol.' },
    { term: 'Initial Poop Offering (IPO)', definition: 'The auspicious moment a new puppy is first listed on the public exchange and performs its maiden ceremonial yard deposit.' },
    { term: 'Extremely Terrible Fund (ETF)', definition: 'A pooled investment vehicle composed of 12 distinct barking dogs packaged together into an unmanageable mutual liability.' },
    { term: 'Return on Intestine (ROI)', definition: 'The fundamental efficiency ratio comparing the volume of gourmet kibble consumed against the quality and timeliness of lawn yield.' },
    { term: 'Poop/Earnings Ratio (P/E)', definition: 'A valuation multiple: how many treats an investor must pay per kilogram of premium garden mulch produced.' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-2">
      {/* Hero Header */}
      <div className="bg-[#0b101c] border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
            <Dog className="w-3.5 h-3.5" />
            <span>DPSE OFFICIAL ARCHIVES & WHITEPAPER</span>
          </div>

          <h1 className="text-3xl font-extrabold font-mono text-slate-100">
            Why does this exist?
          </h1>

          <div className="text-sm text-slate-300 font-sans leading-relaxed space-y-3 pt-1">
            <p className="text-base text-slate-200 font-medium italic border-l-2 border-emerald-500 pl-3">
              “The Dog Poop Stock Exchange is a completely unnecessary financial infrastructure designed to answer one important question:
            </p>
            <p className="text-xl font-mono font-bold text-amber-400">
              What if dogs had publicly traded poop economies?
            </p>
            <p className="text-slate-400">
              We don't know.<br />
              Nobody asked.<br />
              <span className="text-slate-100 font-semibold">We built it anyway.</span>
            </p>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Initial Poop Offering Section */}
      <div className="bg-[#0b101c] border border-slate-800 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-bold font-mono text-slate-100 flex items-center">
          <Sparkles className="w-5 h-5 text-amber-400 mr-2" />
          Initial Poop Offering (IPO)
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          Because apparently normal IPOs weren't ridiculous enough. Every dog listed on the DPSE undergoes rigorous underwriting audits by neighborhood squirrels, mail carriers, and kitchen floor inspectors before issuing public equity.
        </p>
      </div>

      {/* Financial Terminology Lexicon */}
      <div className="bg-[#0b101c] border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold font-mono text-slate-100 flex items-center">
          <BookOpen className="w-5 h-5 text-blue-400 mr-2" />
          Canine Financial Terminology & Glossary
        </h2>
        <p className="text-xs text-slate-400 font-mono">
          Essential vocabulary for navigating the Bloomberg-level complexity of canine manure arbitrage:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {dictionary.map(item => (
            <div
              key={item.term}
              className="bg-[#080c14] border border-slate-800 p-3.5 rounded-lg space-y-1 hover:border-slate-700 transition-colors"
            >
              <div className="font-mono text-xs font-bold text-emerald-400">
                {item.term}
              </div>
              <div className="text-[11px] text-slate-300 font-sans leading-relaxed">
                {item.definition}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="bg-amber-950/30 border border-amber-900/40 rounded-xl p-5 flex items-start space-x-3 text-xs">
        <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-mono font-bold text-amber-400 uppercase">
            Official Simulation Disclosure & Safety Notice
          </h4>
          <p className="text-slate-300 font-sans leading-relaxed">
            The Dog Poop Stock Exchange is strictly a comedic financial simulation running entirely inside your client browser. It requires zero real currency, does not communicate with external financial APIs, and involves NO physical hardware (no Arduino, ESP32, sensors, servos, or GPIO pins). All market events, tickers, and price swings are generated programmatically for harmless satirical entertainment.
          </p>
        </div>
      </div>
    </div>
  );
};
