export type Currency = 'INR' | 'USD' | 'EUR';

export interface CandlePoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  event?: string;
}

export type SectorType = 
  | 'Heavy Poop Industries'
  | 'Treat Technology'
  | 'Bark Communications'
  | 'Nap Industries'
  | 'Park & Recreation'
  | 'Cat Detection Systems'
  | 'Bone Mining'
  | 'Premium Canine Assets';

export interface DogStock {
  ticker: string;
  name: string;
  breed: string;
  age: number;
  personality: string;
  sector: SectorType;
  description: string;
  avatar: string;
  color: string;
  startingPrice: number;
  currentPrice: number;
  previousPrice: number;
  dailyHigh: number;
  dailyLow: number;
  openingPrice: number;
  volume: number;
  marketCap: number; // Market Crap
  change: number;
  changePercent: number;
  lastPriceChangeDirection: 'up' | 'down' | 'same';
  lastPriceChangeTimestamp: number;
  isDelisted?: boolean;
  delistReason?: string;

  // 10 Detailed Biological & Environmental Fundamentals (/100)
  poopProduction: number;
  barkIndex: number;
  treatDependency: number;
  napEfficiency: number;
  ownerConfidence: number;
  parkAttendance: number;
  digestionEfficiency: number;
  chaosRating: number;
  catHostility: number;
  squirrelDetection: number;

  // Ridiculous Financial Ratios
  peRatio: number;          // Poop / Earnings
  psRatio: number;          // Poop / Snacks
  roe: number;              // Return on Excrement (%)
  eps: number;              // Excrement Per Share (kg)
  roi: number;              // Return on Intestine (%)
  ebitda: number;           // Excrement Before Interest, Treats, Depreciation & Anxiety
  freeCrapFlow: number;     // Free Crap Flow (₹)
  entirePoopValue: number;  // Enterprise Entire Poop Value (₹)

  volatility: number;
  sentiment: 'EXTREME POOP' | 'BEARISH' | 'NORMAL' | 'BULLISH' | 'ABSURD OPTIMISM';

  // Historical data
  candles1D: CandlePoint[];
  candles1W: CandlePoint[];
  candles1M: CandlePoint[];
  candles3M: CandlePoint[];
  candles1Y: CandlePoint[];
  candlesALL: CandlePoint[];
}

export interface PortfolioHolding {
  ticker: string;
  shares: number;
  averagePrice: number;
  totalCost: number;
}

export interface ShortPosition {
  ticker: string;
  shares: number;
  borrowedPrice: number;
  collateral: number;
  openedAt: string;
}

export interface OptionContract {
  id: string;
  ticker: string;
  type: 'CALL' | 'PUT';
  strikePrice: number;
  premium: number;
  sharesPerContract: number; // 100 shares
  purchasePrice: number;
  expiresInSeconds: number; // e.g. 120s
  status: 'ACTIVE' | 'EXPIRED' | 'EXERCISED';
  pnl?: number;
}

export type OrderType = 'MARKET' | 'LIMIT' | 'STOP';
export type OrderSide = 'BUY' | 'SELL' | 'SHORT' | 'COVER';

export interface Order {
  id: string;
  ticker: string;
  dogName: string;
  side: OrderSide;
  type: OrderType;
  shares: number;
  price: number;
  limitPrice?: number;
  stopPrice?: number;
  total: number;
  timestamp: string;
  status: 'FILLED' | 'PENDING' | 'CANCELLED' | 'REJECTED';
}

export interface OrderBookLevel {
  price: number;
  shares: number;
  total: number;
}

export interface RecentTrade {
  id: string;
  time: string;
  ticker: string;
  side: 'BUY' | 'SELL';
  shares: number;
  price: number;
  traderName: string;
}

export interface MarketEvent {
  id: string;
  title: string;
  description: string;
  ticker?: string;
  dogName?: string;
  impactPercent: number;
  timestamp: string;
  badge: string;
  severity: 'info' | 'bullish' | 'bearish' | 'chaos' | 'critical';
}

export interface MarketControlSettings {
  volatility: number;
  dogExcitement: number;
  treatSupply: number;
  parkAvailability: number;
  poopProduction: number;
  randomChaos: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  netWorth: number;
  topHolding: string;
  strategy: string;
  badge: string;
  winRate: number;
  riskScore: number;
  isUser?: boolean;
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'chaos';
  timestamp: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UpcomingIPO {
  id: string;
  ticker: string;
  name: string;
  breed: string;
  sector: SectorType;
  ipoPrice: number;
  sharesOffered: number;
  description: string;
  status: 'UPCOMING' | 'SUBSCRIBED' | 'LISTED';
  subscribedShares?: number;
}

export type Timeframe = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';
export type NavigationTab = 
  | 'dashboard' 
  | 'market' 
  | 'dogs' 
  | 'portfolio' 
  | 'orders' 
  | 'leaderboard' 
  | 'market-control' 
  | 'economy'
  | 'regulator'
  | 'ipos'
  | 'about';
