import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { NavigationTab, Currency } from '../../types/market';
import { 
  Dog, 
  Briefcase, 
  Clock, 
  Sliders, 
  Award, 
  HelpCircle, 
  Search, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Wallet,
  CircleDollarSign,
  TrendingUp,
  Activity,
  Globe,
  Shield,
  Sparkles,
  Trophy,
  Wrench
} from 'lucide-react';

interface NavbarProps {
  onOpenSettings: () => void;
  onOpenAchievements: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSettings, onOpenAchievements }) => {
  const {
    currentTab,
    setCurrentTab,
    isMarketOpen,
    toggleMarketOpen,
    marketTime,
    cash,
    portfolioValue,
    soundEnabled,
    toggleSound,
    ultraPoopMode,
    activateUltraPoopMode,
    stocks,
    selectStock,
    currency,
    setCurrency,
    formatMoney,
    toggleDevModal,
    addToast,
  } = useMarket();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  // Logo Easter Egg Handler (10 clicks)
  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    if (newCount === 10) {
      activateUltraPoopMode();
      setLogoClicks(0);
    }
  };

  // Search Easter Eggs (Section 40)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    const clean = val.trim().toLowerCase();
    if (clean === 'poop') {
      addToast('💩 MARKET INTEL', 'We found exactly what you were looking for.', 'chaos');
    } else if (clean === 'money') {
      addToast('💸 NO REAL CURRENCY', 'There is no money here. Only canine digestion.', 'warning');
    } else if (clean === 'bitcoin') {
      addToast('🪙 CRYPTO DETECTED', 'Wrong kind of dog. We deal strictly in organic output.', 'info');
    } else if (clean === 'elon') {
      addToast('🐕 MEME OVERLOAD', 'Please stop asking.', 'warning');
    } else if (clean === 'cat') {
      addToast('🚨 MARKET THREAT DETECTED', 'CAT SIGHTING ON EXCHANGE FLOOR! BARKING STOCKS PUMPING!', 'chaos');
    }
  };

  const filteredDogs = searchQuery.trim() === '' 
    ? [] 
    : stocks.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.breed.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity className="w-3.5 h-3.5 mr-1" /> },
    { id: 'market', label: 'Market (50)', icon: <TrendingUp className="w-3.5 h-3.5 mr-1" /> },
    { id: 'dogs', label: 'Dogs', icon: <Dog className="w-3.5 h-3.5 mr-1" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <Briefcase className="w-3.5 h-3.5 mr-1" /> },
    { id: 'orders', label: 'Orders', icon: <Clock className="w-3.5 h-3.5 mr-1" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Award className="w-3.5 h-3.5 mr-1" /> },
    { id: 'market-control', label: 'Market Control', icon: <Sliders className="w-3.5 h-3.5 mr-1 text-amber-400" /> },
    { id: 'economy', label: 'Canine Economy', icon: <Globe className="w-3.5 h-3.5 mr-1 text-blue-400" /> },
    { id: 'regulator', label: 'C.A.N.I.N.E.', icon: <Shield className="w-3.5 h-3.5 mr-1 text-purple-400" /> },
    { id: 'ipos', label: 'IPOs', icon: <Sparkles className="w-3.5 h-3.5 mr-1 text-yellow-400" /> },
    { id: 'about', label: 'About', icon: <HelpCircle className="w-3.5 h-3.5 mr-1" /> },
  ];

  return (
    <header className="bg-[#090d16] border-b border-slate-800 sticky top-0 z-30 select-none font-mono">
      <div className="px-4 py-2 flex items-center justify-between gap-3">
        {/* Logo & Terminal Title */}
        <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={handleLogoClick}>
          <div className="relative">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold border transition-all ${
              ultraPoopMode 
                ? 'bg-gradient-to-tr from-yellow-500 to-amber-300 border-yellow-300 shadow-[0_0_15px_#eab308]' 
                : 'bg-slate-800 border-slate-700 group-hover:border-emerald-500'
            }`}>
              🐕
            </div>
            <span className="absolute -bottom-1 -right-1 text-xs">💩</span>
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-sm tracking-wider text-slate-100">
                DPSE V2
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                TERMINAL
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-tight leading-none mt-0.5">
              Dog Poop Stock Exchange
            </p>
          </div>
        </div>

        {/* Universal Search Bar */}
        <div className="relative flex-1 max-w-xs hidden lg:block">
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search 50 dogs, tickers, breeds..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full bg-[#05080f] border border-slate-700/80 rounded pl-8 pr-2.5 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Search Dropdown */}
          {isSearchFocused && filteredDogs.length > 0 && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-[#0f172a] border border-slate-700 rounded shadow-2xl z-50 overflow-hidden text-xs">
              {filteredDogs.map(dog => (
                <div
                  key={dog.ticker}
                  onMouseDown={() => {
                    selectStock(dog.ticker);
                    setCurrentTab('dogs');
                    setSearchQuery('');
                  }}
                  className="flex items-center justify-between px-3 py-2 hover:bg-slate-800/80 cursor-pointer border-b border-slate-800/60 last:border-0"
                >
                  <div className="flex items-center space-x-2">
                    <span>{dog.avatar}</span>
                    <span className="font-bold text-slate-200">{dog.ticker}</span>
                    <span className="text-slate-400 text-[11px] font-sans">({dog.name})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-200">{formatMoney(dog.currentPrice)}</span>
                    <span className={`ml-2 ${dog.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {dog.change >= 0 ? '+' : ''}{dog.changePercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Financial Action Bar */}
        <div className="flex items-center space-x-2.5 text-xs">
          {/* Market Status & Clock */}
          <button
            onClick={toggleMarketOpen}
            className="hidden sm:flex items-center space-x-1.5 bg-[#05080f] border border-slate-800 rounded px-2.5 py-1 hover:border-slate-700 transition-colors"
          >
            <span className={`w-2 h-2 rounded-full ${isMarketOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <span className="font-bold text-slate-200 text-[11px]">
              {isMarketOpen ? 'OPEN' : 'CLOSED'}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 text-[11px]">{marketTime}</span>
          </button>

          {/* Cash & Net Worth */}
          <div className="flex items-center space-x-1.5 bg-[#05080f] border border-slate-800 rounded px-2.5 py-1">
            <CircleDollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400 uppercase text-[10px] hidden sm:inline">Cash:</span>
            <span className="font-bold text-emerald-400 text-[11px]">{formatMoney(cash)}</span>
          </div>

          <div className="hidden md:flex items-center space-x-1.5 bg-[#05080f] border border-slate-800 rounded px-2.5 py-1">
            <Wallet className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-slate-400 uppercase text-[10px]">Net:</span>
            <span className="font-bold text-slate-100 text-[11px]">{formatMoney(portfolioValue)}</span>
          </div>

          {/* Currency Switcher */}
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value as Currency)}
            className="bg-[#05080f] border border-slate-700 rounded px-1.5 py-1 text-[11px] text-slate-300 font-bold focus:outline-none"
          >
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
          </select>

          {/* Achievements Trigger */}
          <button
            onClick={onOpenAchievements}
            title="View Achievements"
            className="p-1 rounded bg-[#05080f] border border-slate-800 hover:border-slate-700 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Trophy className="w-3.5 h-3.5" />
          </button>

          {/* Developer Mode Quick Button */}
          <button
            onClick={toggleDevModal}
            title="Developer Console (Ctrl+Shift+P)"
            className="p-1 rounded bg-[#05080f] border border-slate-800 hover:border-slate-700 text-red-400 hover:text-red-300 transition-colors"
          >
            <Wrench className="w-3.5 h-3.5" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Mute' : 'Unmute'}
            className={`p-1 rounded border transition-colors ${
              soundEnabled ? 'border-emerald-700 bg-emerald-950/60 text-emerald-400' : 'border-slate-800 bg-[#05080f] text-slate-500'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            title="Exchange Settings"
            className="p-1 rounded bg-[#05080f] border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Tab Navigation Strip */}
      <nav className="px-3 border-t border-slate-800 bg-[#060a12] flex items-center space-x-1 overflow-x-auto py-1 text-[11px] scrollbar-none">
        {navItems.map(item => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                if (item.id !== 'dogs') selectStock(null);
              }}
              className={`flex items-center px-3 py-1 rounded font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
