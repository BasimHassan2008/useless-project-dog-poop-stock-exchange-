import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  DogStock, 
  PortfolioHolding, 
  ShortPosition,
  OptionContract,
  Order, 
  OrderSide,
  OrderType,
  MarketEvent, 
  MarketControlSettings, 
  LeaderboardEntry, 
  ToastNotification, 
  NavigationTab,
  RecentTrade,
  Achievement,
  UpcomingIPO,
  Currency
} from '../types/market';
import { INITIAL_DOGS_V2 } from '../data/initialDogs';
import { tickDogStockV2, generateRecentTrade, calculatePoopIndex } from '../services/marketEngine';
import { SoundService } from '../services/sound';

interface PoopIndexData {
  value: number;
  change: number;
  status: string;
  description: string;
}

interface MarketContextType {
  stocks: DogStock[];
  portfolio: Record<string, PortfolioHolding>;
  shorts: Record<string, ShortPosition>;
  options: OptionContract[];
  cash: number;
  orders: Order[];
  recentTrades: RecentTrade[];
  marketEvents: MarketEvent[];
  marketControls: MarketControlSettings;
  isMarketOpen: boolean;
  marketTime: string;
  tickSpeed: number;
  toasts: ToastNotification[];
  soundEnabled: boolean;
  ultraPoopMode: boolean;
  selectedStockTicker: string | null;
  currentTab: NavigationTab;
  currency: Currency;
  chartMode: 'LINE' | 'CANDLESTICK';
  poopIndex: PoopIndexData;
  achievements: Achievement[];
  ipos: UpcomingIPO[];
  showOnboarding: boolean;
  isDevModalOpen: boolean;
  
  // Stats
  portfolioValue: number;
  totalHoldingsValue: number;
  totalShortsValue: number;
  todayPL: number;
  todayPLPercent: number;
  totalPL: number;
  totalPLPercent: number;
  leaderboard: LeaderboardEntry[];
  
  // Actions
  buyShares: (ticker: string, shares: number) => boolean;
  sellShares: (ticker: string, shares: number) => boolean;
  shortStock: (ticker: string, shares: number) => boolean;
  coverShort: (ticker: string, shares: number) => boolean;
  buyOption: (ticker: string, type: 'CALL' | 'PUT', strikePrice: number, premium: number) => boolean;
  placeOrder: (ticker: string, side: OrderSide, type: OrderType, shares: number, limitPrice?: number, stopPrice?: number) => boolean;
  triggerChaos: () => void;
  triggerCrisis: (type: 'POOP_SHORTAGE' | 'BONE_CRISIS' | 'CAT_INVASION' | 'GLOBAL_NAP') => void;
  updateControls: (settings: Partial<MarketControlSettings>) => void;
  toggleMarketOpen: () => void;
  setTickSpeed: (speed: number) => void;
  toggleSound: () => void;
  setCurrency: (c: Currency) => void;
  setChartMode: (mode: 'LINE' | 'CANDLESTICK') => void;
  activateUltraPoopMode: () => void;
  resetSimulation: () => void;
  selectStock: (ticker: string | null) => void;
  setCurrentTab: (tab: NavigationTab) => void;
  subscribeIPO: (ipoId: string, shares: number) => boolean;
  dismissOnboarding: () => void;
  toggleDevModal: () => void;
  devAddCash: (amount: number) => void;
  devSetStockPrice: (ticker: string, price: number) => void;
  devForceRally: () => void;
  devForceCrash: () => void;
  formatMoney: (val: number) => string;
  addToast: (title: string, message: string, type?: ToastNotification['type']) => void;
  removeToast: (id: string) => void;
}

const STORAGE_KEYS = {
  STOCKS_V2: 'dpse_v2_stocks',
  PORTFOLIO: 'dpse_v2_portfolio',
  SHORTS: 'dpse_v2_shorts',
  OPTIONS: 'dpse_v2_options',
  CASH: 'dpse_v2_cash',
  ORDERS: 'dpse_v2_orders',
  ACHIEVEMENTS: 'dpse_v2_achievements',
  IPOS: 'dpse_v2_ipos',
  EVENTS: 'dpse_v2_events',
  CONTROLS: 'dpse_v2_controls',
  SETTINGS: 'dpse_v2_settings',
  ONBOARDING: 'dpse_v2_onboarding_done',
};

const DEFAULT_CONTROLS: MarketControlSettings = {
  volatility: 50,
  dogExcitement: 50,
  treatSupply: 50,
  parkAvailability: 50,
  poopProduction: 50,
  randomChaos: 25,
};

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_trade', title: 'FIRST TRADE', description: 'Executed your inaugural transaction on the exchange floor.', icon: '🏆', unlocked: false },
  { id: 'poop_investor', title: 'POOP INVESTOR', description: 'Bought virtual shares in a dedicated canine waste equity.', icon: '💩', unlocked: false },
  { id: 'short_seller', title: 'BEARISH SNIFFER', description: 'Short-sold a dog stock, betting against its digestion.', icon: '📉', unlocked: false },
  { id: 'options_trader', title: 'DERIVATIVES MASTER', description: 'Purchased your first high-leverage canine Call or Put option.', icon: '📜', unlocked: false },
  { id: 'to_the_moon', title: 'TO THE MOON', description: 'Achieved over +100% total profit across your portfolio.', icon: '🚀', unlocked: false },
  { id: 'buy_high_sell_low', title: 'BUY HIGH SELL LOW', description: 'Realized a 50% loss on an individual position.', icon: '🤡', unlocked: false },
  { id: 'dog_whisperer', title: 'DOG WHISPERER', description: 'Successfully completed 10 profitable trades.', icon: '🐕', unlocked: false },
  { id: 'financial_disaster', title: 'FINANCIAL DISASTER', description: 'Lost over 80% of your initial starting capital.', icon: '💀', unlocked: false },
  { id: 'poop_tycoon', title: 'POOP TYCOON', description: 'Reached ₹100,000 in net portfolio capitalization.', icon: '👑', unlocked: false },
  { id: 'professional_idiot', title: 'PROFESSIONAL IDIOT', description: 'Executed over 50 separate trades on the exchange.', icon: '🎪', unlocked: false },
];

const INITIAL_IPOS: UpcomingIPO[] = [
  {
    id: 'ipo-1',
    ticker: 'FLUFF',
    name: 'Fluffy Inc.',
    breed: 'Samoyed',
    sector: 'Premium Canine Assets',
    ipoPrice: 42.00,
    sharesOffered: 15000,
    description: 'Fluffy has demonstrated promising long-term potential despite having no measurable economic output beyond excessive shedding.',
    status: 'UPCOMING',
  },
  {
    id: 'ipo-2',
    ticker: 'NUGT',
    name: 'Golden Nugget Holdings',
    breed: 'Chesapeake Bay Retriever',
    sector: 'Heavy Poop Industries',
    ipoPrice: 65.00,
    sharesOffered: 25000,
    description: 'Specializes in high-density marshland deposits with aggressive afternoon session output.',
    status: 'UPCOMING',
  },
  {
    id: 'ipo-3',
    ticker: 'BARK',
    name: 'Sonic Bark Networks',
    breed: 'Beagle Cross',
    sector: 'Bark Communications',
    ipoPrice: 110.00,
    sharesOffered: 10000,
    description: 'Autonomous perimeter howl relays providing real-time doorbell warning coverage.',
    status: 'UPCOMING',
  }
];

const BASE_LEADERBOARD: Omit<LeaderboardEntry, 'rank' | 'isUser'>[] = [
  { name: 'Sir Poops-a-Lot', avatar: '🎩', netWorth: 78920.50, topHolding: 'BRUNO', strategy: 'Heavy Organic Accumulation', badge: '🥇 WHALE', winRate: 74, riskScore: 82 },
  { name: 'Warren Woofett', avatar: '🐕', netWorth: 68188.00, topHolding: 'WINSTON', strategy: 'Value Sleeping & Inertia', badge: '🥈 VALUE HOUND', winRate: 88, riskScore: 24 },
  { name: 'Doge Capital LLC', avatar: '🚀', netWorth: 54421.20, topHolding: 'CHARLIE', strategy: 'Hypersonic Buttock Momentum', badge: '🥉 APEX', winRate: 61, riskScore: 94 },
  { name: 'Bark Street Bets', avatar: '🦍', netWorth: 41940.00, topHolding: 'MILO', strategy: 'Extreme Zoomie Leverage', badge: '💎 PAWS', winRate: 48, riskScore: 99 },
  { name: 'Goldman Sniffs', avatar: '💼', netWorth: 38150.00, topHolding: 'LUCY', strategy: 'High-Margin Flatulence Hedging', badge: '🏛️ INSTITUTION', winRate: 71, riskScore: 45 },
  { name: 'Poo Morgan Chase', avatar: '🏦', netWorth: 31800.00, topHolding: 'ROCKY', strategy: 'Perimeter Boundary Underwriting', badge: '🛡️ DEFENDER', winRate: 67, riskScore: 52 },
  { name: 'The Shiba Fund', avatar: '🦊', netWorth: 26400.00, topHolding: 'SIMBA', strategy: 'Micro-Cap Tyranny Swings', badge: '📊 QUANT', winRate: 59, riskScore: 78 },
  { name: 'Mutual Furnds Inc.', avatar: '🐾', netWorth: 21200.00, topHolding: 'TEDDY', strategy: 'Hypoallergenic Indexing', badge: '🧺 PASSIVE', winRate: 79, riskScore: 31 },
  { name: 'Jeff Barkos', avatar: '📦', netWorth: 18500.00, topHolding: 'OLLIE', strategy: 'Kibble Prime Logistics', badge: '📦 LOGISTICS', winRate: 64, riskScore: 60 },
  { name: 'Mark Sniffberg', avatar: '🕶️', netWorth: 14200.00, topHolding: 'LOKI', strategy: 'Vocal Social Metaverse', badge: '🌐 TECH', winRate: 53, riskScore: 88 },
];

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial 50 dogs
  const [stocks, setStocks] = useState<DogStock[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STOCKS_V2);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 50) return parsed;
      }
    } catch {
      // Ignore
    }
    return INITIAL_DOGS_V2;
  });

  const [portfolio, setPortfolio] = useState<Record<string, PortfolioHolding>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {};
  });

  const [shorts, setShorts] = useState<Record<string, ShortPosition>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SHORTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {};
  });

  const [options, setOptions] = useState<OptionContract[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OPTIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return [];
  });

  const [cash, setCash] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CASH);
      if (saved) return Number(saved);
    } catch {
      // Ignore
    }
    return 10000.00;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return [];
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return INITIAL_ACHIEVEMENTS;
  });

  const [ipos, setIpos] = useState<UpcomingIPO[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.IPOS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return INITIAL_IPOS;
  });

  const [marketControls, setMarketControls] = useState<MarketControlSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTROLS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return DEFAULT_CONTROLS;
  });

  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ONBOARDING) !== 'true';
    } catch {
      return true;
    }
  });

  const [marketEvents, setMarketEvents] = useState<MarketEvent[]>([
    {
      id: 'ev-init-1',
      title: '🔔 DPSE V2 BELL RINGS OPEN',
      description: 'The consolidated Dog Poop Stock Exchange opening bell rang following an authorized kibble bowl drop.',
      ticker: 'BRUNO',
      dogName: 'Bruno',
      impactPercent: 3.4,
      badge: '🟢 MARKET OPEN',
      severity: 'info',
      timestamp: '09:00:00',
    }
  ]);

  const [recentTrades, setRecentTrades] = useState<RecentTrade[]>([]);
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(true);
  const [tickSpeed, setTickSpeed] = useState<number>(1);
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(false);
  const [ultraPoopMode, setUltraPoopMode] = useState<boolean>(false);
  const [selectedStockTicker, setSelectedStockTicker] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [currency, setCurrency] = useState<Currency>('INR');
  const [chartMode, setChartMode] = useState<'LINE' | 'CANDLESTICK'>('CANDLESTICK');
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isDevModalOpen, setIsDevModalOpen] = useState<boolean>(false);

  // Market manipulation tracking counter per ticker
  const stockTradeCounts = useRef<Record<string, number>>({});

  // Market clock progression
  const [marketMinutes, setMarketMinutes] = useState<number>(9 * 60 + 30);

  // Toast dispatch
  const addToast = useCallback((title: string, message: string, type: ToastNotification['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastNotification = { id, title, message, type, timestamp: Date.now() };
    setToasts(prev => [newToast, ...prev].slice(0, 5));

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Achievement unlock helper
  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      const target = prev.find(a => a.id === id);
      if (target && !target.unlocked) {
        SoundService.playOrderSuccess();
        addToast(`🏆 ACHIEVEMENT UNLOCKED`, `${target.title}: ${target.description}`, 'chaos');
        return prev.map(a => a.id === id ? { ...a, unlocked: true, unlockedAt: new Date().toLocaleTimeString() } : a);
      }
      return prev;
    });
  }, [addToast]);

  // Sync sound settings
  useEffect(() => {
    SoundService.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabledState(prev => {
      const next = !prev;
      if (next) {
        SoundService.playTick();
        addToast('🔊 Audio Enabled', 'Terminal auditory cues are active.', 'info');
      } else {
        addToast('🔇 Audio Muted', 'Terminal sounds have been muted.', 'info');
      }
      return next;
    });
  }, [addToast]);

  // Currency Formatter
  const formatMoney = useCallback((val: number): string => {
    if (currency === 'USD') {
      const usdVal = +(val / 84).toFixed(2);
      return `$${usdVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else if (currency === 'EUR') {
      const eurVal = +(val / 91).toFixed(2);
      return `€${eurVal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `₹${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, [currency]);

  // Persist core state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STOCKS_V2, JSON.stringify(stocks));
      localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
      localStorage.setItem(STORAGE_KEYS.SHORTS, JSON.stringify(shorts));
      localStorage.setItem(STORAGE_KEYS.OPTIONS, JSON.stringify(options));
      localStorage.setItem(STORAGE_KEYS.CASH, String(cash));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
      localStorage.setItem(STORAGE_KEYS.IPOS, JSON.stringify(ipos));
      localStorage.setItem(STORAGE_KEYS.CONTROLS, JSON.stringify(marketControls));
    } catch {
      // Ignore storage quota
    }
  }, [stocks, portfolio, shorts, options, cash, orders, achievements, ipos, marketControls]);

  // Clock progression
  useEffect(() => {
    if (!isMarketOpen || tickSpeed === 0) return;
    const interval = setInterval(() => {
      setMarketMinutes(prev => (prev + 1 >= 16 * 60 ? 9 * 60 : prev + 1));
    }, 1500 / tickSpeed);
    return () => clearInterval(interval);
  }, [isMarketOpen, tickSpeed]);

  const marketTime = useMemo(() => {
    const hours = Math.floor(marketMinutes / 60);
    const mins = marketMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }, [marketMinutes]);

  // The Poop Index calculation
  const poopIndex = useMemo(() => {
    return calculatePoopIndex(stocks);
  }, [stocks]);

  // Keyboard shortcut for Dev mode: CTRL + SHIFT + P
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault();
        setIsDevModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main Tick Simulation Loop
  const stocksRef = useRef(stocks);
  stocksRef.current = stocks;
  const controlsRef = useRef(marketControls);
  controlsRef.current = marketControls;
  const ordersRef = useRef(orders);
  ordersRef.current = orders;

  useEffect(() => {
    if (!isMarketOpen || tickSpeed === 0) return;
    const intervalTime = Math.max(900, Math.floor(2800 / tickSpeed));

    const interval = setInterval(() => {
      const currentStocks = [...stocksRef.current];
      // Tick 6 to 12 random stocks for lively 50-stock exchange action
      const countToTick = Math.floor(Math.random() * 7) + 6;
      const shuffledIndices = currentStocks.map((_, i) => i).sort(() => 0.5 - Math.random());
      const selectedIndices = new Set(shuffledIndices.slice(0, countToTick));

      const updated = currentStocks.map((dog, idx) => {
        if (selectedIndices.has(idx)) {
          return tickDogStockV2(dog, controlsRef.current);
        }
        return dog;
      });

      setStocks(updated);

      // Stream fake recent trade
      const tradedDog = updated[shuffledIndices[0]];
      if (tradedDog) {
        const trade = generateRecentTrade(tradedDog);
        setRecentTrades(prev => [trade, ...prev].slice(0, 25));
      }

      // Check pending limit & stop orders
      const pendingOrders = ordersRef.current.filter(o => o.status === 'PENDING');
      if (pendingOrders.length > 0) {
        pendingOrders.forEach(po => {
          const s = updated.find(st => st.ticker === po.ticker);
          if (!s) return;

          let shouldFill = false;
          if (po.type === 'LIMIT') {
            if (po.side === 'BUY' && po.limitPrice && s.currentPrice <= po.limitPrice) shouldFill = true;
            if (po.side === 'SELL' && po.limitPrice && s.currentPrice >= po.limitPrice) shouldFill = true;
          } else if (po.type === 'STOP') {
            if (po.side === 'SELL' && po.stopPrice && s.currentPrice <= po.stopPrice) shouldFill = true;
          }

          if (shouldFill) {
            setOrders(prev => prev.map(ord => ord.id === po.id ? { ...ord, status: 'FILLED', price: s.currentPrice } : ord));
            addToast('⚡ Order Triggered', `${po.type} ${po.side} for ${po.shares} ${po.ticker} executed at ₹${s.currentPrice.toFixed(2)}.`, 'success');
            SoundService.playOrderSuccess();
          }
        });
      }

      // Options expiration decay
      setOptions(prev => {
        return prev.map(opt => {
          if (opt.status !== 'ACTIVE') return opt;
          const remaining = opt.expiresInSeconds - 3;
          if (remaining <= 0) {
            const underlying = updated.find(s => s.ticker === opt.ticker);
            const curPrice = underlying ? underlying.currentPrice : opt.strikePrice;
            let payoff = 0;
            if (opt.type === 'CALL' && curPrice > opt.strikePrice) {
              payoff = (curPrice - opt.strikePrice) * opt.sharesPerContract;
            } else if (opt.type === 'PUT' && curPrice < opt.strikePrice) {
              payoff = (opt.strikePrice - curPrice) * opt.sharesPerContract;
            }

            if (payoff > 0) {
              setCash(c => +(c + payoff).toFixed(2));
              addToast('📜 Option In-The-Money!', `${opt.ticker} ${opt.type} expired ITM! Exercised for ₹${payoff.toFixed(2)} payoff.`, 'success');
              return { ...opt, status: 'EXERCISED', expiresInSeconds: 0, pnl: payoff - opt.premium };
            } else {
              addToast('📜 Option Expired OTM', `${opt.ticker} ${opt.type} option expired worthless.`, 'warning');
              return { ...opt, status: 'EXPIRED', expiresInSeconds: 0, pnl: -opt.premium };
            }
          }
          return { ...opt, expiresInSeconds: remaining };
        });
      });

    }, intervalTime);

    return () => clearInterval(interval);
  }, [isMarketOpen, tickSpeed, addToast]);

  // Derived Portfolio calculations
  const totalHoldingsValue = useMemo(() => {
    return Object.entries(portfolio).reduce((total, [ticker, holding]) => {
      const stock = stocks.find(s => s.ticker === ticker);
      const price = stock ? stock.currentPrice : holding.averagePrice;
      return total + (holding.shares * price);
    }, 0);
  }, [portfolio, stocks]);

  const totalShortsValue = useMemo(() => {
    return Object.entries(shorts).reduce((total, [ticker, s]) => {
      const stock = stocks.find(st => st.ticker === ticker);
      const curPrice = stock ? stock.currentPrice : s.borrowedPrice;
      const unrlzdPL = (s.borrowedPrice - curPrice) * s.shares;
      return total + s.collateral + unrlzdPL;
    }, 0);
  }, [shorts, stocks]);

  const portfolioValue = useMemo(() => {
    return +(cash + totalHoldingsValue + totalShortsValue).toFixed(2);
  }, [cash, totalHoldingsValue, totalShortsValue]);

  const todayPL = useMemo(() => {
    let sum = 0;
    Object.entries(portfolio).forEach(([ticker, holding]) => {
      const stock = stocks.find(s => s.ticker === ticker);
      if (stock) {
        sum += (stock.currentPrice - stock.openingPrice) * holding.shares;
      }
    });
    Object.entries(shorts).forEach(([ticker, s]) => {
      const stock = stocks.find(st => st.ticker === ticker);
      if (stock) {
        sum += (stock.openingPrice - stock.currentPrice) * s.shares;
      }
    });
    return +sum.toFixed(2);
  }, [portfolio, shorts, stocks]);

  const todayPLPercent = useMemo(() => {
    if (portfolioValue === 0) return 0;
    return +((todayPL / (portfolioValue - todayPL || 1)) * 100).toFixed(2);
  }, [todayPL, portfolioValue]);

  const totalPL = useMemo(() => {
    return +(portfolioValue - 10000).toFixed(2);
  }, [portfolioValue]);

  const totalPLPercent = useMemo(() => {
    return +(((portfolioValue - 10000) / 10000) * 100).toFixed(2);
  }, [portfolioValue]);

  // Dynamic Leaderboard
  const leaderboard = useMemo<LeaderboardEntry[]>(() => {
    const userEntry: LeaderboardEntry = {
      rank: 0,
      name: 'YOU (Trader Doge)',
      avatar: ultraPoopMode ? '👑' : '🐶',
      netWorth: portfolioValue,
      topHolding: Object.keys(portfolio).sort((a, b) => (portfolio[b]?.shares || 0) - (portfolio[a]?.shares || 0))[0] || 'CASH',
      strategy: totalPL >= 0 ? 'Organic Value Stacking' : 'Bag Holding Specialist',
      badge: totalPLPercent >= 50 ? '🚀 TOP TRADER' : '🎮 YOU',
      winRate: orders.length > 0 ? 68 : 0,
      riskScore: 65,
      isUser: true,
    };

    const combined = [...BASE_LEADERBOARD, userEntry].sort((a, b) => b.netWorth - a.netWorth);
    return combined.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
  }, [portfolioValue, portfolio, totalPL, totalPLPercent, orders.length, ultraPoopMode]);

  // Check achievements on stats change
  useEffect(() => {
    if (orders.length >= 1) unlockAchievement('first_trade');
    if (orders.length >= 50) unlockAchievement('professional_idiot');
    if (totalPLPercent >= 100) unlockAchievement('to_the_moon');
    if (portfolioValue <= 1000) unlockAchievement('financial_disaster');
    if (portfolioValue >= 100000) unlockAchievement('poop_tycoon');

    // Treat magnate check: own 5 treat-dependent dogs
    const treatCount = Object.keys(portfolio).filter(t => {
      const s = stocks.find(st => st.ticker === t);
      return s && s.treatDependency >= 85;
    }).length;
    if (treatCount >= 5) unlockAchievement('treat_magnate');

    // Easter egg milestones
    if (Math.round(portfolioValue) === 69420) {
      addToast('😏 NICE', 'Portfolio has reached exactly ₹69,420. Legendary status unlocked.', 'chaos');
    }
  }, [orders.length, totalPLPercent, portfolioValue, portfolio, stocks, unlockAchievement, addToast]);

  // Record trade count and check for manipulation
  const trackManipulation = useCallback((ticker: string) => {
    const count = (stockTradeCounts.current[ticker] || 0) + 1;
    stockTradeCounts.current[ticker] = count;
    if (count === 8) {
      addToast(
        '⚠️ C.A.N.I.N.E. REGULATORY WARNING',
        `Market manipulation detected: You have interacted with ${ticker} ${count} times. The imaginary regulators are concerned.`,
        'warning'
      );
    }
  }, [addToast]);

  // Trading: BUY
  const buyShares = useCallback((ticker: string, shares: number): boolean => {
    if (shares <= 0 || !Number.isInteger(shares)) {
      addToast('❌ Invalid Quantity', 'Share quantity must be a positive whole number.', 'error');
      SoundService.playError();
      return false;
    }
    if (!isMarketOpen) {
      addToast('🛑 Market Closed', 'Exchange floor is closed.', 'error');
      SoundService.playError();
      return false;
    }

    const stock = stocks.find(s => s.ticker === ticker);
    if (!stock || stock.isDelisted) {
      addToast('❌ Trading Prohibited', stock?.delistReason || 'Asset unavailable.', 'error');
      return false;
    }

    const totalCost = +(stock.currentPrice * shares).toFixed(2);
    if (totalCost > cash) {
      addToast('⚠️ Insufficient Funds', `Required ${formatMoney(totalCost)} but only have ${formatMoney(cash)}.`, 'error');
      SoundService.playError();
      return false;
    }

    setCash(prev => +(prev - totalCost).toFixed(2));
    setPortfolio(prev => {
      const existing = prev[ticker];
      if (existing) {
        const newShares = existing.shares + shares;
        const newCost = +(existing.totalCost + totalCost).toFixed(2);
        return {
          ...prev,
          [ticker]: { ticker, shares: newShares, averagePrice: +(newCost / newShares).toFixed(2), totalCost: newCost }
        };
      }
      return { ...prev, [ticker]: { ticker, shares, averagePrice: stock.currentPrice, totalCost } };
    });

    const order: Order = {
      id: `ord-${Date.now()}`,
      ticker,
      dogName: stock.name,
      side: 'BUY',
      type: 'MARKET',
      shares,
      price: stock.currentPrice,
      total: totalCost,
      timestamp: new Date().toLocaleTimeString(),
      status: 'FILLED',
    };
    setOrders(prev => [order, ...prev]);

    unlockAchievement('poop_investor');
    trackManipulation(ticker);
    SoundService.playOrderSuccess();
    addToast('✅ Order Executed', `Bought ${shares} shares of ${stock.ticker} at ${formatMoney(stock.currentPrice)}.`, 'success');
    return true;
  }, [stocks, cash, isMarketOpen, formatMoney, unlockAchievement, trackManipulation, addToast]);

  // Trading: SELL
  const sellShares = useCallback((ticker: string, shares: number): boolean => {
    if (shares <= 0 || !Number.isInteger(shares)) {
      addToast('❌ Invalid Quantity', 'Must be a positive integer.', 'error');
      SoundService.playError();
      return false;
    }
    if (!isMarketOpen) {
      addToast('🛑 Market Closed', 'Exchange floor is closed.', 'error');
      return false;
    }

    const holding = portfolio[ticker];
    if (!holding || holding.shares < shares) {
      addToast('⚠️ Position Deficit', `You own ${holding?.shares || 0} shares of ${ticker}. Naked shorting is prohibited!`, 'error');
      SoundService.playError();
      return false;
    }

    const stock = stocks.find(s => s.ticker === ticker);
    if (!stock) return false;

    const proceeds = +(stock.currentPrice * shares).toFixed(2);
    setCash(prev => +(prev + proceeds).toFixed(2));

    setPortfolio(prev => {
      const existing = prev[ticker];
      const remainingShares = existing.shares - shares;
      if (remainingShares <= 0) {
        const copy = { ...prev };
        delete copy[ticker];
        return copy;
      }
      const remainingCost = +(existing.averagePrice * remainingShares).toFixed(2);
      return { ...prev, [ticker]: { ...existing, shares: remainingShares, totalCost: remainingCost } };
    });

    const order: Order = {
      id: `ord-${Date.now()}`,
      ticker,
      dogName: stock.name,
      side: 'SELL',
      type: 'MARKET',
      shares,
      price: stock.currentPrice,
      total: proceeds,
      timestamp: new Date().toLocaleTimeString(),
      status: 'FILLED',
    };
    setOrders(prev => [order, ...prev]);

    // Check if user realized loss
    if (stock.currentPrice < holding.averagePrice * 0.5) {
      unlockAchievement('buy_high_sell_low');
    }

    trackManipulation(ticker);
    SoundService.playOrderSuccess();
    addToast('💰 Shares Sold', `Sold ${shares} shares of ${stock.ticker} for ${formatMoney(proceeds)}.`, 'success');
    return true;
  }, [portfolio, stocks, isMarketOpen, formatMoney, unlockAchievement, trackManipulation, addToast]);

  // Short Selling: SHORT
  const shortStock = useCallback((ticker: string, shares: number): boolean => {
    if (shares <= 0) return false;
    const stock = stocks.find(s => s.ticker === ticker);
    if (!stock || stock.isDelisted) return false;

    const requiredCollateral = +(stock.currentPrice * shares * 1.2).toFixed(2);
    if (requiredCollateral > cash) {
      addToast('⚠️ Margin Insufficient', `Shorting ${shares} shares of ${ticker} requires ${formatMoney(requiredCollateral)} margin collateral.`, 'error');
      SoundService.playError();
      return false;
    }

    setCash(prev => +(prev - requiredCollateral).toFixed(2));
    setShorts(prev => {
      const existing = prev[ticker];
      if (existing) {
        const newShares = existing.shares + shares;
        const newCollateral = +(existing.collateral + requiredCollateral).toFixed(2);
        const newAvg = +( (existing.borrowedPrice * existing.shares + stock.currentPrice * shares) / newShares ).toFixed(2);
        return { ...prev, [ticker]: { ticker, shares: newShares, borrowedPrice: newAvg, collateral: newCollateral, openedAt: existing.openedAt } };
      }
      return { ...prev, [ticker]: { ticker, shares, borrowedPrice: stock.currentPrice, collateral: requiredCollateral, openedAt: new Date().toLocaleTimeString() } };
    });

    const order: Order = {
      id: `short-${Date.now()}`,
      ticker,
      dogName: stock.name,
      side: 'SHORT',
      type: 'MARKET',
      shares,
      price: stock.currentPrice,
      total: requiredCollateral,
      timestamp: new Date().toLocaleTimeString(),
      status: 'FILLED',
    };
    setOrders(prev => [order, ...prev]);

    unlockAchievement('short_seller');
    trackManipulation(ticker);
    SoundService.playOrderSuccess();
    addToast('📉 Short Position Established', `You are betting against ${stock.name}'s digestive capabilities.`, 'chaos');
    return true;
  }, [stocks, cash, formatMoney, unlockAchievement, trackManipulation, addToast]);

  // Cover Short
  const coverShort = useCallback((ticker: string, shares: number): boolean => {
    const s = shorts[ticker];
    if (!s || s.shares < shares) return false;
    const stock = stocks.find(st => st.ticker === ticker);
    if (!stock) return false;

    const curCost = +(stock.currentPrice * shares).toFixed(2);
    const borrowVal = +(s.borrowedPrice * shares).toFixed(2);
    const pnl = +(borrowVal - curCost).toFixed(2);
    const collateralReleased = +(s.collateral * (shares / s.shares)).toFixed(2);

    const netReturn = +(collateralReleased + pnl).toFixed(2);
    setCash(prev => +(prev + Math.max(0, netReturn)).toFixed(2));

    setShorts(prev => {
      const remaining = s.shares - shares;
      if (remaining <= 0) {
        const copy = { ...prev };
        delete copy[ticker];
        return copy;
      }
      return { ...prev, [ticker]: { ...s, shares: remaining, collateral: +(s.collateral - collateralReleased).toFixed(2) } };
    });

    const order: Order = {
      id: `cover-${Date.now()}`,
      ticker,
      dogName: stock.name,
      side: 'COVER',
      type: 'MARKET',
      shares,
      price: stock.currentPrice,
      total: curCost,
      timestamp: new Date().toLocaleTimeString(),
      status: 'FILLED',
    };
    setOrders(prev => [order, ...prev]);

    SoundService.playOrderSuccess();
    addToast('🛡️ Short Covered', `Closed short of ${shares} ${ticker}. Net P&L: ${pnl >= 0 ? '+' : ''}${formatMoney(pnl)}.`, pnl >= 0 ? 'success' : 'warning');
    return true;
  }, [shorts, stocks, formatMoney, addToast]);

  // Options Desk: Buy Option
  const buyOption = useCallback((ticker: string, type: 'CALL' | 'PUT', strikePrice: number, premium: number): boolean => {
    if (premium > cash) {
      addToast('⚠️ Insufficient Cash', `Option premium requires ${formatMoney(premium)}.`, 'error');
      SoundService.playError();
      return false;
    }

    setCash(prev => +(prev - premium).toFixed(2));
    const newContract: OptionContract = {
      id: `opt-${Date.now()}`,
      ticker,
      type,
      strikePrice,
      premium,
      sharesPerContract: 100,
      purchasePrice: strikePrice,
      expiresInSeconds: 120, // 2 minutes duration
      status: 'ACTIVE',
    };
    setOptions(prev => [newContract, ...prev]);

    unlockAchievement('options_trader');
    trackManipulation(ticker);
    SoundService.playOrderSuccess();
    addToast('📜 Derivative Contract Secured', `Purchased ${ticker} ${type} (Strike: ₹${strikePrice}) for ₹${premium}.`, 'chaos');
    return true;
  }, [cash, formatMoney, unlockAchievement, trackManipulation, addToast]);

  // Place Limit / Stop Order
  const placeOrder = useCallback((ticker: string, side: OrderSide, type: OrderType, shares: number, limitPrice?: number, stopPrice?: number): boolean => {
    if (type === 'MARKET') {
      if (side === 'BUY') return buyShares(ticker, shares);
      if (side === 'SELL') return sellShares(ticker, shares);
      if (side === 'SHORT') return shortStock(ticker, shares);
      if (side === 'COVER') return coverShort(ticker, shares);
      return false;
    }

    const stock = stocks.find(s => s.ticker === ticker);
    if (!stock) return false;

    const order: Order = {
      id: `pending-${Date.now()}`,
      ticker,
      dogName: stock.name,
      side,
      type,
      shares,
      price: stock.currentPrice,
      limitPrice,
      stopPrice,
      total: +(stock.currentPrice * shares).toFixed(2),
      timestamp: new Date().toLocaleTimeString(),
      status: 'PENDING',
    };
    setOrders(prev => [order, ...prev]);

    addToast(`📌 ${type} Order Placed`, `${type} ${side} order placed for ${shares} ${ticker} at target condition.`, 'info');
    return true;
  }, [buyShares, sellShares, shortStock, coverShort, stocks, addToast]);

  // IPO Subscription
  const subscribeIPO = useCallback((ipoId: string, shares: number): boolean => {
    const ipo = ipos.find(i => i.id === ipoId);
    if (!ipo) return false;

    const totalCost = +(ipo.ipoPrice * shares).toFixed(2);
    if (totalCost > cash) {
      addToast('⚠️ Insufficient Cash', 'Cannot subscribe without requisite virtual cash.', 'error');
      return false;
    }

    setCash(prev => +(prev - totalCost).toFixed(2));
    setIpos(prev => prev.map(i => i.id === ipoId ? { ...i, status: 'SUBSCRIBED', subscribedShares: shares } : i));

    SoundService.playOrderSuccess();
    addToast('🎉 IPO Subscription Lodged', `Subscribed to ${shares} shares of ${ipo.name} (${ipo.ticker})! Allocation lottery underway.`, 'success');
    return true;
  }, [ipos, cash, addToast]);

  // Market Chaos Trigger
  const triggerChaos = useCallback(() => {
    SoundService.playChaos();
    const shuffled = [...stocks].sort(() => 0.5 - Math.random());
    const shockCount = Math.floor(Math.random() * 8) + 6;
    const shockedTickers = new Set(shuffled.slice(0, shockCount).map(s => s.ticker));

    const updated = stocks.map(dog => {
      if (shockedTickers.has(dog.ticker)) {
        const shock = (Math.random() * 0.40 - 0.20);
        return tickDogStockV2(dog, marketControls, {
          impactPercent: +(shock * 100).toFixed(1),
          title: '💩 EMERGENCY HOUSEHOLD CHAOS',
        });
      }
      return dog;
    });

    setStocks(updated);
    addToast('💩 MARKET CHAOS DISPATCHED', 'Extreme stochastic disturbances rocked multiple canine sectors simultaneously!', 'chaos');
  }, [stocks, marketControls, addToast]);

  // Market Crisis Trigger
  const triggerCrisis = useCallback((type: 'POOP_SHORTAGE' | 'BONE_CRISIS' | 'CAT_INVASION' | 'GLOBAL_NAP') => {
    SoundService.playMarketCrash();
    if (type === 'POOP_SHORTAGE') {
      setStocks(prev => prev.map(s => s.sector === 'Heavy Poop Industries' ? tickDogStockV2(s, marketControls, { impactPercent: -18.5, title: '💩 GLOBAL POOP SHORTAGE' }) : s));
      addToast('🚨 CRISIS: GLOBAL POOP SHORTAGE', 'Manure yields down 18.5% across heavy industrial kennels.', 'warning');
    } else if (type === 'BONE_CRISIS') {
      setStocks(prev => prev.map(s => s.sector === 'Bone Mining' ? tickDogStockV2(s, marketControls, { impactPercent: -15.0, title: '🦴 GREAT BONE CRISIS' }) : s));
      addToast('🚨 CRISIS: GREAT BONE CRISIS', 'Prehistoric marrow supplies depleted.', 'warning');
    } else if (type === 'CAT_INVASION') {
      setStocks(prev => prev.map(s => s.sector === 'Bark Communications' ? tickDogStockV2(s, marketControls, { impactPercent: 24.0, title: '🐈 CAT INVASION RALLY' }) : s));
      addToast('🚨 CRISIS: CAT INVASION', 'Barking volume up 24% following fence line siege.', 'chaos');
    } else if (type === 'GLOBAL_NAP') {
      setStocks(prev => prev.map(s => s.sector === 'Nap Industries' ? tickDogStockV2(s, marketControls, { impactPercent: 0.2, title: '🛋️ GLOBAL NAP' }) : s));
      addToast('🛋️ GLOBAL NAP EVENT', 'Nobody is trading. Everyone is sleeping.', 'info');
    }
  }, [marketControls, addToast]);

  // Dev mode actions
  const devAddCash = useCallback((amount: number) => {
    setCash(prev => +(prev + amount).toFixed(2));
    addToast('💰 Dev Cash Injected', `Added ₹${amount.toLocaleString()} virtual liquidity.`, 'success');
  }, [addToast]);

  const devSetStockPrice = useCallback((ticker: string, price: number) => {
    setStocks(prev => prev.map(s => s.ticker === ticker ? { ...s, currentPrice: price, previousPrice: s.currentPrice } : s));
    addToast('🔧 Dev Price Set', `${ticker} price manually adjusted to ₹${price}.`, 'info');
  }, [addToast]);

  const devForceRally = useCallback(() => {
    setStocks(prev => prev.map(s => tickDogStockV2(s, marketControls, { impactPercent: 25.0, title: '🚀 FORCED EXCHANGE RALLY' })));
    addToast('🚀 Dev Force Rally', 'Pumped all listed canine equities by +25%.', 'success');
  }, [marketControls, addToast]);

  const devForceCrash = useCallback(() => {
    SoundService.playMarketCrash();
    setStocks(prev => prev.map(s => tickDogStockV2(s, marketControls, { impactPercent: -22.0, title: '💥 FORCED FLASH CRASH' })));
    addToast('💥 Dev Force Crash', 'Dumped all listed canine equities by -22%.', 'warning');
  }, [marketControls, addToast]);

  const updateControls = useCallback((settings: Partial<MarketControlSettings>) => {
    setMarketControls(prev => ({ ...prev, ...settings }));
  }, []);

  const toggleMarketOpen = useCallback(() => {
    setIsMarketOpen(prev => !prev);
  }, []);

  const activateUltraPoopMode = useCallback(() => {
    setUltraPoopMode(prev => {
      const next = !prev;
      SoundService.playBark();
      if (next) addToast('👑 ULTRA POOP MODE ACTIVE', 'Golden poop aura and canine VIP status unlocked!', 'chaos');
      return next;
    });
  }, [addToast]);

  const dismissOnboarding = useCallback(() => {
    setShowOnboarding(false);
    try {
      localStorage.setItem(STORAGE_KEYS.ONBOARDING, 'true');
    } catch {
      // Ignore
    }
  }, []);

  const toggleDevModal = useCallback(() => {
    setIsDevModalOpen(prev => !prev);
  }, []);

  const resetSimulation = useCallback(() => {
    try {
      localStorage.clear();
    } catch {
      // Ignore
    }
    setStocks(INITIAL_DOGS_V2);
    setPortfolio({});
    setShorts({});
    setOptions([]);
    setCash(10000.00);
    setOrders([]);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setIpos(INITIAL_IPOS);
    setMarketControls(DEFAULT_CONTROLS);
    addToast('🔄 Economy Annihilated', 'Bruno does not remember you. Factory state restored.', 'info');
  }, [addToast]);

  const selectStock = useCallback((ticker: string | null) => {
    setSelectedStockTicker(ticker);
  }, []);

  return (
    <MarketContext.Provider value={{
      stocks,
      portfolio,
      shorts,
      options,
      cash,
      orders,
      recentTrades,
      marketEvents,
      marketControls,
      isMarketOpen,
      marketTime,
      tickSpeed,
      toasts,
      soundEnabled,
      ultraPoopMode,
      selectedStockTicker,
      currentTab,
      currency,
      chartMode,
      poopIndex,
      achievements,
      ipos,
      showOnboarding,
      isDevModalOpen,
      portfolioValue,
      totalHoldingsValue,
      totalShortsValue,
      todayPL,
      todayPLPercent,
      totalPL,
      totalPLPercent,
      leaderboard,
      buyShares,
      sellShares,
      shortStock,
      coverShort,
      buyOption,
      placeOrder,
      triggerChaos,
      triggerCrisis,
      updateControls,
      toggleMarketOpen,
      setTickSpeed,
      toggleSound,
      setCurrency,
      setChartMode,
      activateUltraPoopMode,
      resetSimulation,
      selectStock,
      setCurrentTab,
      subscribeIPO,
      dismissOnboarding,
      toggleDevModal,
      devAddCash,
      devSetStockPrice,
      devForceRally,
      devForceCrash,
      formatMoney,
      addToast,
      removeToast,
    }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = (): MarketContextType => {
  const ctx = useContext(MarketContext);
  if (!ctx) throw new Error('useMarket must be used within MarketProvider');
  return ctx;
};
