import { DogStock, MarketControlSettings, MarketEvent, CandlePoint, OrderBookLevel, RecentTrade } from '../types/market';

export const TRADERS_LIST = [
  'Warren Woofett',
  'Doge Capital',
  'Bark Street Bets',
  'Poo Morgan',
  'Goldman Sniffs',
  'Mutual Furnds',
  'The Dogfather',
  'Snoop Doge',
  'Anonymous Retriever',
  'Jeff Barkos',
  'Mark Sniffberg'
];

export const V2_MARKET_EVENTS: Omit<MarketEvent, 'id' | 'timestamp'>[] = [
  { title: '🥞 DOG ATE SECOND BREAKFAST', description: 'Bruno successfully convinced both humans in the household that the other forgot to feed him.', impactPercent: 14.2, badge: '🥞 DOUBLE RATION', severity: 'bullish' },
  { title: '🦴 PREHISTORIC BONE UNEARTHED', description: 'Cooper located a 3-year-old fossilized brisket bone under the cedar mulch.', impactPercent: 12.8, badge: '🦴 BONE RALLY', severity: 'bullish' },
  { title: '🐈 CAT INFILTRATION LEVEL 5', description: 'Neighborhood ginger cat perched brazenly atop the shared fence line.', impactPercent: 16.5, badge: '🐈 CAT DETECTED', severity: 'chaos' },
  { title: '🌧️ DAMP GRASS PANIC', description: 'Morning precipitation rendered lawn turf wet. Poodles and Frenchies refuse to step outside.', impactPercent: -14.0, badge: '🌧️ RAIN CRASH', severity: 'bearish' },
  { title: '🧹 VACUUM CLEANER ACTIVATION', description: 'The roar of the upright canister vacuum cleaner triggered mass tactical retreats under coffee tables.', impactPercent: -18.2, badge: '🚨 FLASH CRASH', severity: 'bearish' },
  { title: '🚚 CHEWY DELIVERY TRUCK ARRIVAL', description: 'The distinctive rumble of the parcel van sparked synchronized barking across sector 4.', impactPercent: 15.0, badge: '📦 BULK KIBBLE', severity: 'bullish' },
  { title: '🥩 ACCIDENTAL T-BONE DROP', description: 'Grill master fumbled a cooked steak directly into the waiting gullet of Winston.', impactPercent: 28.4, badge: '🚀 STEAK MOON', severity: 'bullish' },
  { title: '🛁 SURPRISE BATH TIME INTIMATION', description: 'Someone said the B-word near the bathroom, causing Loki to vocalize in high soprano.', impactPercent: -15.6, badge: '🛁 BATH PANIC', severity: 'bearish' },
  { title: '🛋️ SEVENTEEN-HOUR NAP CONSENSUS', description: 'Entire bulldog consortium initiated a static consolidation phase on velvet cushions.', impactPercent: 1.2, badge: '💤 MASS NAP', severity: 'info' },
  { title: '🐿️ SQUIRREL PROTOCOL BREACH', description: 'Unauthorized rodent entered sector 2 garden. Charlie initiated hypersonic rear-axle drift.', impactPercent: 19.8, badge: '🐿️ ZOOMIE SURGE', severity: 'bullish' },
  { title: '💩 UNPRECEDENTED DUAL-DEPOSIT', description: 'Bruno produced two distinct high-grade organic deposits prior to 09:00 market bell.', impactPercent: 22.4, badge: '💩 SUPER YIELD', severity: 'bullish' },
  { title: '🍕 SIDEWALK CRUST ARBITRAGE', description: 'Toby vacuumed up a discarded stuffed crust slice before owner could articulate "Drop it!".', impactPercent: 11.2, badge: '🍕 CARB RUN', severity: 'bullish' },
  { title: '🚪 OWNER FOOTSTEPS ON PORCH', description: 'Key rotation sound detected at front door lock. Tail wagging velocity exceeds 400 RPM.', impactPercent: 13.5, badge: '🎉 HOMECOMING', severity: 'bullish' },
  { title: '🦴 PEANUT BUTTER JAR ACCIDENT', description: 'Max inserted entire muzzle into nearly empty Jif container; refused to release asset.', impactPercent: 8.9, badge: '🥜 JIF RALLY', severity: 'bullish' },
  { title: '💩 GLOBAL POOP SUPPLY SHORTAGE', description: 'Suburban cold front delays morning yard sessions. Manure liquidity dries up across the pit.', impactPercent: -16.4, badge: '⚠️ SECTOR SQUEEZE', severity: 'bearish' },
  { title: '🗣️ CHAIN BARKING SYNDICATE', description: 'Simba initiated a coordinated multi-block acoustic barrage against an imaginary plastic bag.', impactPercent: 17.1, badge: '🔊 BARK SQUEEZE', severity: 'chaos' },
];

export function tickDogStockV2(
  dog: DogStock,
  controls: MarketControlSettings,
  eventOverride?: { impactPercent: number; title: string }
): DogStock {
  if (dog.isDelisted) return dog;

  const baseVol = dog.volatility * (controls.volatility / 50);

  // Micro biological pricing
  const poopFactor = (controls.poopProduction - 50) / 100 * (dog.poopProduction / 100) * 0.035;
  const excitementFactor = (controls.dogExcitement - 50) / 100 * (dog.barkIndex / 100) * 0.04;
  const treatStress = (50 - controls.treatSupply) / 100 * (dog.treatDependency / 100) * 0.035;
  const napFactor = (controls.parkAvailability - 50) / 100 * (dog.napEfficiency / 100) * 0.02;

  const chaosFactor = controls.randomChaos > 20 
    ? (Math.random() - 0.5) * (controls.randomChaos / 100) * 0.14
    : 0;

  const randomDrift = (Math.random() - 0.495) * baseVol;

  let deltaPercent = randomDrift + poopFactor + excitementFactor - treatStress + napFactor + chaosFactor;

  if (eventOverride) {
    deltaPercent = eventOverride.impactPercent / 100;
  }

  deltaPercent = Math.max(-0.35, Math.min(0.40, deltaPercent));

  const newPrice = Math.max(0.50, +(dog.currentPrice * (1 + deltaPercent)).toFixed(2));
  const change = +(newPrice - dog.openingPrice).toFixed(2);
  const changePercent = +((change / dog.openingPrice) * 100).toFixed(2);
  const direction: 'up' | 'down' | 'same' = newPrice > dog.currentPrice ? 'up' : newPrice < dog.currentPrice ? 'down' : 'same';

  const dailyHigh = Math.max(dog.dailyHigh, newPrice);
  const dailyLow = Math.min(dog.dailyLow, newPrice);

  const addedVolume = Math.floor(Math.random() * 280 + 30 + (Math.abs(deltaPercent) * 2500));
  const volume = dog.volume + addedVolume;
  const marketCap = Math.round(newPrice * 10000);

  let sentiment: DogStock['sentiment'] = 'NORMAL';
  if (changePercent >= 12) sentiment = 'ABSURD OPTIMISM';
  else if (changePercent >= 2.5) sentiment = 'BULLISH';
  else if (changePercent <= -10) sentiment = 'EXTREME POOP';
  else if (changePercent <= -2.5) sentiment = 'BEARISH';

  // Add to 1D candle series
  const now = new Date();
  const timeLabel = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const newCandle: CandlePoint = {
    time: timeLabel,
    open: dog.currentPrice,
    high: Math.max(dog.currentPrice, newPrice),
    low: Math.min(dog.currentPrice, newPrice),
    close: newPrice,
    volume: addedVolume,
    event: eventOverride ? eventOverride.title : undefined,
  };

  const updatedCandles1D = [...dog.candles1D.slice(-34), newCandle];

  return {
    ...dog,
    previousPrice: dog.currentPrice,
    currentPrice: newPrice,
    dailyHigh,
    dailyLow,
    change,
    changePercent,
    volume,
    marketCap,
    sentiment,
    lastPriceChangeDirection: direction,
    lastPriceChangeTimestamp: Date.now(),
    candles1D: updatedCandles1D,
  };
}

export function generateOrderBook(currentPrice: number): { bids: OrderBookLevel[]; asks: OrderBookLevel[]; spread: number } {
  const bids: OrderBookLevel[] = [];
  const asks: OrderBookLevel[] = [];

  let bidPrice = +(currentPrice - 0.05).toFixed(2);
  let askPrice = +(currentPrice + 0.05).toFixed(2);

  for (let i = 0; i < 5; i++) {
    const bidShares = Math.floor(Math.random() * 80 + 10);
    const askShares = Math.floor(Math.random() * 80 + 10);

    bids.push({
      price: bidPrice,
      shares: bidShares,
      total: +(bidPrice * bidShares).toFixed(2),
    });

    asks.push({
      price: askPrice,
      shares: askShares,
      total: +(askPrice * askShares).toFixed(2),
    });

    bidPrice = +(bidPrice - (Math.random() * 0.15 + 0.05)).toFixed(2);
    askPrice = +(askPrice + (Math.random() * 0.15 + 0.05)).toFixed(2);
  }

  const spread = +((asks[0]?.price || 0) - (bids[0]?.price || 0)).toFixed(2);
  return { bids, asks, spread: Math.max(0.01, spread) };
}

export function generateRecentTrade(dog: DogStock): RecentTrade {
  const isBuy = Math.random() > 0.45;
  const shares = [5, 10, 15, 25, 50, 100][Math.floor(Math.random() * 6)];
  const variance = (Math.random() * 0.2 - 0.1);
  const price = Math.max(0.5, +(dog.currentPrice + variance).toFixed(2));
  const traderName = TRADERS_LIST[Math.floor(Math.random() * TRADERS_LIST.length)];
  const now = new Date();

  return {
    id: `trd-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    ticker: dog.ticker,
    side: isBuy ? 'BUY' : 'SELL',
    shares,
    price,
    traderName,
  };
}

export function calculatePoopIndex(stocks: DogStock[]): { value: number; change: number; status: string; description: string } {
  const validStocks = stocks.filter(s => !s.isDelisted);
  const totalProduction = validStocks.reduce((sum, s) => sum + s.poopProduction, 0) / (validStocks.length || 1);
  const avgPrice = validStocks.reduce((sum, s) => sum + s.currentPrice, 0);
  const avgChange = validStocks.reduce((sum, s) => sum + s.changePercent, 0) / (validStocks.length || 1);

  const rawIndex = (avgPrice * 1.5) + (totalProduction * 45);
  const value = +rawIndex.toFixed(2);
  const change = +avgChange.toFixed(2);

  let status = 'NOMINAL DIGESTION';
  let description = 'The canine economy is operating within baseline organic throughput expectations.';

  if (change >= 10) {
    status = 'EXTREMELY PRODUCTIVE';
    description = 'The canine economy is experiencing historically unnecessary levels of poop production.';
  } else if (change >= 3) {
    status = 'HEALTHY EXPANSION';
    description = 'Morning yard sessions indicate strong digestion and widespread organic accumulation.';
  } else if (change <= -8) {
    status = 'CONSTIPATED SLUMP';
    description = 'Severe digestive stagnation observed; damp grass and vacuum cleaners suppress output.';
  } else if (change <= -2.5) {
    status = 'CAUTIOUS WITHHOLDING';
    description = 'Canine assets are postponing outdoor deposits pending treat renegotiations.';
  }

  return { value, change, status, description };
}
