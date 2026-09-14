import { DogStock, CandlePoint, SectorType } from '../types/market';

function generateCandles(basePrice: number, volatility: number, count: number, timeframe: string): CandlePoint[] {
  const candles: CandlePoint[] = [];
  let prevClose = basePrice * (1 - (Math.random() * 0.08 - 0.04));
  const now = new Date();

  const eventsPool = [
    'Ate morning kibble',
    'Spotted neighbour cat',
    'Zoomies across carpet',
    'Took tactical nap',
    'Received bacon treat',
    'Vacuum cleaner activated',
    'Barking at delivery truck',
    'Lawn deposit verified',
    'Refused wet grass',
    'Stole sock from laundry',
  ];

  for (let i = count; i >= 0; i--) {
    const change = (Math.random() - 0.49) * volatility * prevClose;
    const open = prevClose;
    const close = Math.max(0.5, +(open + change).toFixed(2));
    const high = +(Math.max(open, close) + Math.random() * (volatility * 0.5 * open)).toFixed(2);
    const low = +(Math.max(0.4, Math.min(open, close) - Math.random() * (volatility * 0.5 * open))).toFixed(2);
    const volume = Math.floor(Math.random() * 8000 + 1200);

    let timeLabel = '';
    if (timeframe === '1D') {
      const d = new Date(now.getTime() - i * 15 * 60 * 1000);
      timeLabel = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeframe === '1W') {
      const d = new Date(now.getTime() - i * 6 * 60 * 60 * 1000);
      timeLabel = d.toLocaleDateString([], { weekday: 'short', hour: '2-digit' });
    } else if (timeframe === '1M') {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      timeLabel = d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else if (timeframe === '3M') {
      const d = new Date(now.getTime() - i * 3 * 24 * 60 * 60 * 1000);
      timeLabel = d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else if (timeframe === '1Y') {
      const d = new Date(now.getTime() - i * 10 * 24 * 60 * 60 * 1000);
      timeLabel = d.toLocaleDateString([], { month: 'short', year: '2-digit' });
    } else {
      const d = new Date(now.getTime() - i * 15 * 24 * 60 * 60 * 1000);
      timeLabel = d.toLocaleDateString([], { month: 'short', year: '2-digit' });
    }

    const hasEvent = i % 7 === 0;
    const event = hasEvent ? eventsPool[Math.floor(Math.random() * eventsPool.length)] : undefined;

    candles.push({
      time: timeLabel,
      open,
      high,
      low,
      close,
      volume,
      event,
    });

    prevClose = close;
  }
  return candles;
}

interface DogSeed {
  ticker: string;
  name: string;
  breed: string;
  age: number;
  personality: string;
  sector: SectorType;
  description: string;
  avatar: string;
  color: string;
  basePrice: number;
  poop: number;
  bark: number;
  treat: number;
  nap: number;
  vol: number;
  park: number;
  digest: number;
  chaos: number;
  cat: number;
  squirrel: number;
  owner: number;
}

const SEED_DOGS: DogSeed[] = [
  { ticker: 'BRUNO', name: 'Bruno', breed: 'Labrador Retriever', age: 4, personality: 'Ravenous & Loyal', sector: 'Heavy Poop Industries', description: 'Heavy morning volume producer with extreme correlation to breakfast timing.', avatar: '🐕‍🦺', color: '#3b82f6', basePrice: 147.23, poop: 94, bark: 58, treat: 88, nap: 72, vol: 0.045, park: 89, digest: 94, chaos: 37, cat: 76, squirrel: 98, owner: 91 },
  { ticker: 'MAX', name: 'Max', breed: 'Golden Retriever', age: 3, personality: 'Naive & Sunny', sector: 'Treat Technology', description: 'Relies heavily on peanut butter derivatives and lawn trimmings.', avatar: '🦮', color: '#eab308', basePrice: 89.42, poop: 82, bark: 44, treat: 96, nap: 68, vol: 0.052, park: 84, digest: 88, chaos: 42, cat: 30, squirrel: 80, owner: 85 },
  { ticker: 'LUCY', name: 'Lucy', breed: 'French Bulldog', age: 5, personality: 'Snorting Magnate', sector: 'Cat Detection Systems', description: 'Alerts entire apartment complex whenever neighborhood feline looks through glass.', avatar: '🐶', color: '#ec4899', basePrice: 212.88, poop: 78, bark: 65, treat: 85, nap: 89, vol: 0.038, park: 55, digest: 74, chaos: 48, cat: 99, squirrel: 60, owner: 94 },
  { ticker: 'ROCKY', name: 'Rocky', breed: 'German Shepherd', age: 6, personality: 'Tactical Guardian', sector: 'Bark Communications', description: 'High-frequency perimeter barking creates massive moat around flowerbeds.', avatar: '🐕', color: '#f97316', basePrice: 64.21, poop: 89, bark: 94, treat: 65, nap: 60, vol: 0.075, park: 92, digest: 91, chaos: 55, cat: 95, squirrel: 95, owner: 88 },
  { ticker: 'BELLA', name: 'Bella', breed: 'Poodle', age: 4, personality: 'Aristocratic & Snobbish', sector: 'Premium Canine Assets', description: 'Refuses damp grass. Only produces deposits on manicured luxury turf.', avatar: '🐩', color: '#a855f7', basePrice: 176.32, poop: 68, bark: 51, treat: 92, nap: 79, vol: 0.032, park: 62, digest: 82, chaos: 24, cat: 45, squirrel: 65, owner: 96 },
  { ticker: 'COOPER', name: 'Cooper', breed: 'Beagle', age: 3, personality: 'Scent Detective', sector: 'Bone Mining', description: 'Tracks ancient buried dinosaur ribeyes through 4 feet of suburban topsoil.', avatar: '🐶', color: '#14b8a6', basePrice: 124.75, poop: 79, bark: 88, treat: 95, nap: 63, vol: 0.062, park: 95, digest: 85, chaos: 65, cat: 60, squirrel: 94, owner: 74 },
  { ticker: 'DAISY', name: 'Daisy', breed: 'Dachshund', age: 5, personality: 'Stubborn Low-Rider', sector: 'Heavy Poop Industries', description: 'Precision low-clearance lawn compaction with carpet avoidance technology.', avatar: '🐕', color: '#f43f5e', basePrice: 95.10, poop: 71, bark: 78, treat: 82, nap: 85, vol: 0.048, park: 70, digest: 79, chaos: 38, cat: 85, squirrel: 88, owner: 81 },
  { ticker: 'CHARLIE', name: 'Charlie', breed: 'Corgi', age: 2, personality: 'Wiggle-Butt Racer', sector: 'Park & Recreation', description: 'Hypersonic living room drifts and aerodynamic buttock propulsion.', avatar: '🦊', color: '#fb923c', basePrice: 268.40, poop: 84, bark: 72, treat: 91, nap: 67, vol: 0.055, park: 96, digest: 90, chaos: 78, cat: 50, squirrel: 85, owner: 96 },
  { ticker: 'MILO', name: 'Milo', breed: 'Jack Russell', age: 3, personality: 'Unfiltered Missile', sector: 'Bark Communications', description: '100% caffeine equivalent energy. Uncontrollable intraday volume spikes.', avatar: '🐶', color: '#06b6d4', basePrice: 38.15, poop: 65, bark: 98, treat: 89, nap: 25, vol: 0.098, park: 98, digest: 70, chaos: 99, cat: 92, squirrel: 99, owner: 55 },
  { ticker: 'TEDDY', name: 'Teddy', breed: 'Maltipoo', age: 2, personality: 'Fluffy Impersonator', sector: 'Premium Canine Assets', description: 'Microscopic boutique deposits designed specifically for designer hardwood.', avatar: '🐩', color: '#8b5cf6', basePrice: 328.60, poop: 55, bark: 45, treat: 98, nap: 82, vol: 0.028, park: 58, digest: 78, chaos: 18, cat: 35, squirrel: 52, owner: 93 },
  { ticker: 'LOKI', name: 'Loki', breed: 'Siberian Husky', age: 4, personality: 'Dramatic Vocalist', sector: 'Bark Communications', description: 'Howls in D-minor whenever the fridge opens. Sells off 30% during baths.', avatar: '🐺', color: '#38bdf8', basePrice: 138.90, poop: 86, bark: 99, treat: 92, nap: 52, vol: 0.088, park: 94, digest: 88, chaos: 85, cat: 88, squirrel: 92, owner: 61 },
  { ticker: 'SIMBA', name: 'Simba', breed: 'Pomeranian', age: 2, personality: 'Pocket Tyrant', sector: 'Cat Detection Systems', description: 'Weighs 2.8kg but acts like apex savannah predator. Relentless cat tracker.', avatar: '🦁', color: '#f59e0b', basePrice: 83.45, poop: 52, bark: 97, treat: 90, nap: 70, vol: 0.072, park: 65, digest: 68, chaos: 80, cat: 98, squirrel: 75, owner: 77 },
  { ticker: 'TOBY', name: 'Toby', breed: 'Boxer', age: 5, personality: 'Drool Artisan', sector: 'Heavy Poop Industries', description: 'Generates extraordinary saliva liquidity alongside monumental backyard deposits.', avatar: '🐶', color: '#84cc16', basePrice: 116.80, poop: 91, bark: 61, treat: 84, nap: 76, vol: 0.046, park: 88, digest: 92, chaos: 62, cat: 70, squirrel: 88, owner: 87 },
  { ticker: 'BAILEY', name: 'Bailey', breed: 'Australian Shepherd', age: 4, personality: 'Workaholic Herder', sector: 'Park & Recreation', description: 'Rounds up children, cats, and robot vacuum cleaners into organized drop zones.', avatar: '🐕‍🦺', color: '#6366f1', basePrice: 198.30, poop: 87, bark: 64, treat: 79, nap: 88, vol: 0.039, park: 99, digest: 93, chaos: 45, cat: 75, squirrel: 94, owner: 95 },
  { ticker: 'WINSTON', name: 'Winston', breed: 'English Bulldog', age: 7, personality: 'Heavy Sloth', sector: 'Nap Industries', description: 'Sleeps 22 hours daily. Market moves strictly when bacon is sizzled on stovetop.', avatar: '🐶', color: '#d97706', basePrice: 222.10, poop: 88, bark: 20, treat: 94, nap: 99, vol: 0.015, park: 20, digest: 82, chaos: 12, cat: 15, squirrel: 22, owner: 90 },
  { ticker: 'OSCAR', name: 'Oscar', breed: 'Shih Tzu', age: 5, personality: 'Imperial Fluff', sector: 'Nap Industries', description: 'Reclines on velvet throw pillows; produces compact royal droppings.', avatar: '🐶', color: '#c084fc', basePrice: 142.50, poop: 62, bark: 42, treat: 91, nap: 95, vol: 0.025, park: 45, digest: 74, chaos: 20, cat: 30, squirrel: 40, owner: 89 },
  { ticker: 'BUSTER', name: 'Buster', breed: 'Rottweiler', age: 5, personality: 'Gentle Giant', sector: 'Heavy Poop Industries', description: 'Massive jaw strength, massive digestive throughput, surprisingly afraid of toasters.', avatar: '🐕', color: '#78350f', basePrice: 165.00, poop: 96, bark: 70, treat: 82, nap: 75, vol: 0.042, park: 85, digest: 95, chaos: 40, cat: 65, squirrel: 85, owner: 92 },
  { ticker: 'ZEUS', name: 'Zeus', breed: 'Great Dane', age: 4, personality: 'Horse Impersonator', sector: 'Heavy Poop Industries', description: 'Weighs 75kg. Requires industrial dump trucks for quarterly lawn clearance.', avatar: '🐕', color: '#475569', basePrice: 210.00, poop: 99, bark: 55, treat: 89, nap: 85, vol: 0.035, park: 75, digest: 98, chaos: 35, cat: 40, squirrel: 70, owner: 93 },
  { ticker: 'DUKE', name: 'Duke', breed: 'Doberman Pinscher', age: 3, personality: 'Sleek Operative', sector: 'Cat Detection Systems', description: 'Patrols fence line at mach 1. Instant cat identification protocol.', avatar: '🐕', color: '#1e293b', basePrice: 185.20, poop: 84, bark: 82, treat: 75, nap: 65, vol: 0.054, park: 90, digest: 89, chaos: 50, cat: 97, squirrel: 95, owner: 89 },
  { ticker: 'OLLIE', name: 'Ollie', breed: 'Boston Terrier', age: 3, personality: 'Tuxedo Gentleman', sector: 'Treat Technology', description: 'Wears an imaginary tuxedo while inhaling cheese cubes under the table.', avatar: '🐶', color: '#334155', basePrice: 108.40, poop: 70, bark: 50, treat: 95, nap: 80, vol: 0.044, park: 72, digest: 76, chaos: 58, cat: 60, squirrel: 75, owner: 88 },
  { ticker: 'MURPHY', name: 'Murphy', breed: 'Cavalier King Charles', age: 4, personality: 'Lap Warmer', sector: 'Nap Industries', description: 'Master of emotional manipulation and continuous couch consolidation.', avatar: '🐶', color: '#ea580c', basePrice: 195.00, poop: 58, bark: 35, treat: 88, nap: 96, vol: 0.022, park: 50, digest: 72, chaos: 15, cat: 25, squirrel: 45, owner: 97 },
  { ticker: 'FINN', name: 'Finn', breed: 'Border Collie', age: 3, personality: 'Quantum Brain', sector: 'Park & Recreation', description: 'Knows 300 words and calculates parabolic frisbee trajectories mid-air.', avatar: '🐕', color: '#0f172a', basePrice: 245.80, poop: 83, bark: 68, treat: 70, nap: 40, vol: 0.048, park: 100, digest: 91, chaos: 52, cat: 70, squirrel: 99, owner: 98 },
  { ticker: 'TUCKER', name: 'Tucker', breed: 'Goldendoodle', age: 2, personality: 'Curled Enthusiast', sector: 'Treat Technology', description: 'Hypoallergenic curls combined with ravenous biscuit appetites.', avatar: '🐩', color: '#fde047', basePrice: 172.10, poop: 76, bark: 52, treat: 96, nap: 74, vol: 0.038, park: 88, digest: 84, chaos: 44, cat: 42, squirrel: 78, owner: 91 },
  { ticker: 'LEO', name: 'Leo', breed: 'Chow Chow', age: 5, personality: 'Aloof Sovereign', sector: 'Premium Canine Assets', description: 'Blue tongue, extreme independence, ignores owner calls 94% of the time.', avatar: '🦁', color: '#b45309', basePrice: 280.00, poop: 75, bark: 40, treat: 80, nap: 88, vol: 0.029, park: 45, digest: 81, chaos: 22, cat: 55, squirrel: 50, owner: 86 },
  { ticker: 'BEAR', name: 'Bear', breed: 'Newfoundland', age: 6, personality: 'Aquatic Mammoth', sector: 'Heavy Poop Industries', description: 'Rescues family from 2 inches of bathwater. Massive organic fertilizer yields.', avatar: '🐻', color: '#1c1917', basePrice: 215.40, poop: 98, bark: 48, treat: 85, nap: 90, vol: 0.031, park: 80, digest: 97, chaos: 30, cat: 35, squirrel: 60, owner: 94 },
  { ticker: 'MANGO', name: 'Mango', breed: 'Chihuahua', age: 3, personality: 'Vibrating Fury', sector: 'Bark Communications', description: 'Body weight 1.9kg, tremors 8.4 on Richter scale. Barks at sunlight beams.', avatar: '🐕', color: '#f59e0b', basePrice: 48.20, poop: 42, bark: 100, treat: 88, nap: 60, vol: 0.095, park: 40, digest: 65, chaos: 92, cat: 90, squirrel: 85, owner: 65 },
  { ticker: 'COOKIE', name: 'Cookie', breed: 'Cocker Spaniel', age: 4, personality: 'Sweet Scavenger', sector: 'Treat Technology', description: 'Uses soulful puppy eyes to extort cheddar cheese from kitchen inhabitants.', avatar: '🐶', color: '#d97706', basePrice: 134.60, poop: 72, bark: 48, treat: 98, nap: 78, vol: 0.036, park: 75, digest: 80, chaos: 36, cat: 40, squirrel: 72, owner: 93 },
  { ticker: 'BOBBY', name: 'Bobby', breed: 'Basset Hound', age: 6, personality: 'Droopy Low-Center', sector: 'Bone Mining', description: 'Ears drag on ground while sniffing out 3-year-old hot dog relics.', avatar: '🐶', color: '#713f12', basePrice: 112.30, poop: 80, bark: 75, treat: 90, nap: 92, vol: 0.034, park: 65, digest: 83, chaos: 28, cat: 45, squirrel: 88, owner: 85 },
  { ticker: 'SHADOW', name: 'Shadow', breed: 'Belgian Malinois', age: 3, personality: 'Airborne SWAT', sector: 'Cat Detection Systems', description: 'Can scale an 8-foot fence to intercept an intruder or stray tennis ball.', avatar: '🐕', color: '#292524', basePrice: 235.00, poop: 88, bark: 85, treat: 72, nap: 35, vol: 0.065, park: 98, digest: 92, chaos: 60, cat: 99, squirrel: 98, owner: 92 },
  { ticker: 'LUCKY', name: 'Lucky', breed: 'Pitbull Terrier', age: 4, personality: 'Velvet Hippo', sector: 'Park & Recreation', description: 'Smiles uncontrollably; desires 100% of human lap space at all times.', avatar: '🐕', color: '#64748b', basePrice: 154.20, poop: 89, bark: 52, treat: 88, nap: 82, vol: 0.041, park: 92, digest: 90, chaos: 45, cat: 50, squirrel: 80, owner: 95 },
  { ticker: 'MOCHA', name: 'Mocha', breed: 'Cattle Dog', age: 3, personality: 'Ankle Nipping Quant', sector: 'Park & Recreation', description: 'Applies statistical arbitrage to herd family members into dining room.', avatar: '🐕', color: '#0369a1', basePrice: 168.90, poop: 82, bark: 74, treat: 78, nap: 55, vol: 0.051, park: 96, digest: 87, chaos: 58, cat: 80, squirrel: 92, owner: 89 },
  { ticker: 'CODY', name: 'Cody', breed: 'Alaskan Malamute', age: 5, personality: 'Arctic Bulldozer', sector: 'Heavy Poop Industries', description: 'Pulls heavy sleds, sheds 40kg of fur in spring, deposits like an avalanche.', avatar: '🐺', color: '#94a3b8', basePrice: 188.40, poop: 94, bark: 80, treat: 86, nap: 76, vol: 0.045, park: 91, digest: 95, chaos: 44, cat: 70, squirrel: 86, owner: 90 },
  { ticker: 'HARLEY', name: 'Harley', breed: 'St. Bernard', age: 6, personality: 'Alpine Rescuer', sector: 'Heavy Poop Industries', description: 'Carries imaginary barrel of brandy; creates ground-shaking backyard craters.', avatar: '🐕', color: '#9a3412', basePrice: 198.70, poop: 97, bark: 45, treat: 85, nap: 94, vol: 0.026, park: 70, digest: 96, chaos: 25, cat: 30, squirrel: 55, owner: 94 },
  { ticker: 'RILEY', name: 'Riley', breed: 'Weimaraner', age: 4, personality: 'Grey Ghost', sector: 'Cat Detection Systems', description: 'Stares into middle distance with intense supernatural focus.', avatar: '🐕', color: '#64748b', basePrice: 175.50, poop: 83, bark: 68, treat: 82, nap: 68, vol: 0.046, park: 90, digest: 88, chaos: 52, cat: 94, squirrel: 92, owner: 88 },
  { ticker: 'BROWNIE', name: 'Brownie', breed: 'Bullmastiff', age: 5, personality: 'Gentle Fortress', sector: 'Nap Industries', description: 'Static defensive posture. Requires forklift to reposition after 2pm.', avatar: '🐶', color: '#78350f', basePrice: 182.00, poop: 93, bark: 30, treat: 87, nap: 97, vol: 0.021, park: 40, digest: 91, chaos: 18, cat: 35, squirrel: 40, owner: 91 },
  { ticker: 'MONTY', name: 'Monty', breed: 'Bernese Mountain Dog', age: 4, personality: 'Swiss Hugger', sector: 'Premium Canine Assets', description: 'Three-color tri-coat perfection with warm disposition and steady poop flow.', avatar: '🐕', color: '#451a03', basePrice: 255.00, poop: 92, bark: 42, treat: 88, nap: 84, vol: 0.030, park: 85, digest: 93, chaos: 26, cat: 40, squirrel: 70, owner: 97 },
  { ticker: 'GUS', name: 'Gus', breed: 'Mini Schnauzer', age: 4, personality: 'Bearded Inspector', sector: 'Bark Communications', description: 'Distinguished mustache masks aggressive barking at delivery cardboard boxes.', avatar: '🐶', color: '#52525b', basePrice: 94.80, poop: 64, bark: 92, treat: 84, nap: 72, vol: 0.061, park: 75, digest: 76, chaos: 62, cat: 85, squirrel: 88, owner: 84 },
  { ticker: 'JACK', name: 'Jack', breed: 'Whippet', age: 3, personality: 'Speed Noodle', sector: 'Park & Recreation', description: 'Runs 60 km/h for 4 minutes, then remains horizontal for remaining 23 hours 56 minutes.', avatar: '🐕', color: '#cbd5e1', basePrice: 162.30, poop: 70, bark: 25, treat: 80, nap: 94, vol: 0.040, park: 97, digest: 82, chaos: 48, cat: 80, squirrel: 99, owner: 92 },
  { ticker: 'LOUIE', name: 'Louie', breed: 'Papillon', age: 3, personality: 'Butterfly Ears', sector: 'Premium Canine Assets', description: 'Ear plumage rivals haute couture runways; tiny, exquisite garden deposits.', avatar: '🐶', color: '#fb7185', basePrice: 228.00, poop: 48, bark: 65, treat: 92, nap: 76, vol: 0.037, park: 60, digest: 70, chaos: 35, cat: 50, squirrel: 72, owner: 95 },
  { ticker: 'ARCHIE', name: 'Archie', breed: 'Scottish Terrier', age: 5, personality: 'Highland Laird', sector: 'Bone Mining', description: 'Beard, brows, and relentless determination to dig to China under the patio.', avatar: '🐕', color: '#171717', basePrice: 145.20, poop: 68, bark: 78, treat: 83, nap: 74, vol: 0.047, park: 72, digest: 78, chaos: 42, cat: 82, squirrel: 90, owner: 87 },
  { ticker: 'KOBE', name: 'Kobe', breed: 'Akita Inu', age: 4, personality: 'Samurai Dignity', sector: 'Premium Canine Assets', description: 'Regal silence. Only deposits in private secluded woodland sanctuaries.', avatar: '🐕', color: '#ea580c', basePrice: 295.00, poop: 86, bark: 32, treat: 74, nap: 82, vol: 0.024, park: 80, digest: 89, chaos: 20, cat: 75, squirrel: 82, owner: 96 },
  { ticker: 'TIGER', name: 'Tiger', breed: 'Airedale Terrier', age: 4, personality: 'King of Terriers', sector: 'Bone Mining', description: 'Excavates sprinkler systems under the mistaken belief they are prehistoric bones.', avatar: '🐕', color: '#b45309', basePrice: 139.40, poop: 80, bark: 75, treat: 85, nap: 66, vol: 0.053, park: 88, digest: 85, chaos: 55, cat: 85, squirrel: 95, owner: 86 },
  { ticker: 'APOLLO', name: 'Apollo', breed: 'Rhodesian Ridgeback', age: 5, personality: 'Lion Stalker', sector: 'Cat Detection Systems', description: 'Bred to hunt African lions; now uses skills to detect neighborhood tabby.', avatar: '🐕', color: '#c2410c', basePrice: 218.60, poop: 88, bark: 60, treat: 79, nap: 82, vol: 0.038, park: 92, digest: 91, chaos: 38, cat: 98, squirrel: 91, owner: 93 },
  { ticker: 'BANDIT', name: 'Bandit', breed: 'Havanese', age: 3, personality: 'Silk Clown', sector: 'Treat Technology', description: 'Steals napkins, paper towels, and chicken nuggets with magician stealth.', avatar: '🐶', color: '#fbcfe8', basePrice: 128.50, poop: 54, bark: 55, treat: 97, nap: 81, vol: 0.039, park: 68, digest: 72, chaos: 52, cat: 42, squirrel: 65, owner: 91 },
  { ticker: 'MARLEY', name: 'Marley', breed: 'Labradoodle', age: 3, personality: 'Joyous Disaster', sector: 'Treat Technology', description: 'Knocks over lamps while expressing unconditional affection for dry snacks.', avatar: '🦮', color: '#fef08a', basePrice: 158.00, poop: 81, bark: 58, treat: 96, nap: 70, vol: 0.046, park: 90, digest: 85, chaos: 68, cat: 55, squirrel: 82, owner: 89 },
  { ticker: 'ROCCO', name: 'Rocco', breed: 'Cane Corso', age: 4, personality: 'Roman Centurion', sector: 'Heavy Poop Industries', description: 'Imposing gladiator physique, yet trembles when a plastic grocery bag drifts by.', avatar: '🐕', color: '#18181b', basePrice: 232.00, poop: 95, bark: 68, treat: 80, nap: 80, vol: 0.036, park: 84, digest: 95, chaos: 34, cat: 70, squirrel: 75, owner: 93 },
  { ticker: 'DEXTER', name: 'Dexter', breed: 'Brittany Spaniel', age: 4, personality: 'Bird Obsessive', sector: 'Bone Mining', description: 'Points at birds for 45 continuous minutes without blinking once.', avatar: '🐶', color: '#fdba74', basePrice: 148.90, poop: 78, bark: 60, treat: 82, nap: 62, vol: 0.049, park: 95, digest: 84, chaos: 46, cat: 65, squirrel: 96, owner: 88 },
  { ticker: 'BENJI', name: 'Benji', breed: 'Wheaten Terrier', age: 3, personality: 'Bouncy Greeter', sector: 'Park & Recreation', description: 'Performs trademark "Wheaten Greetin" vertical bounce 4 feet into the air.', avatar: '🐶', color: '#fde68a', basePrice: 136.20, poop: 74, bark: 65, treat: 88, nap: 72, vol: 0.047, park: 92, digest: 81, chaos: 54, cat: 60, squirrel: 85, owner: 90 },
  { ticker: 'OREO', name: 'Oreo', breed: 'Dalmatian', age: 4, personality: 'Spotted Siren', sector: 'Bark Communications', description: 'Bred to run behind fire carriages; now sirens at microwave completion beeps.', avatar: '🐕', color: '#ffffff', basePrice: 184.50, poop: 85, bark: 88, treat: 85, nap: 65, vol: 0.056, park: 94, digest: 88, chaos: 58, cat: 78, squirrel: 90, owner: 87 },
  { ticker: 'BINGO', name: 'Bingo', breed: 'Street Legend Mutt', age: 4, personality: 'Urban Sovereign', sector: 'Bone Mining', description: 'Immune to veterinary bills, eats discarded chicken bones with zero consequences.', avatar: '🐕', color: '#a16207', basePrice: 92.40, poop: 90, bark: 70, treat: 90, nap: 78, vol: 0.058, park: 98, digest: 99, chaos: 64, cat: 80, squirrel: 94, owner: 99 },
];

export const INITIAL_DOGS_V2: DogStock[] = SEED_DOGS.map(seed => {
  const currentPrice = seed.basePrice;
  const previousPrice = +(seed.basePrice * (1 - (Math.random() * 0.06 - 0.03))).toFixed(2);
  const change = +(currentPrice - previousPrice).toFixed(2);
  const changePercent = +((change / previousPrice) * 100).toFixed(2);
  const marketCap = Math.round(currentPrice * 10000);
  const volume = Math.floor(Math.random() * 45000 + 8000);

  // Derive humorous valuation ratios
  const peRatio = +(currentPrice / (seed.poop * 0.12)).toFixed(1);
  const psRatio = +(currentPrice / (seed.treat * 0.15)).toFixed(1);
  const roe = +(seed.digest * 0.28).toFixed(1);
  const eps = +(seed.poop * 0.08).toFixed(2);
  const roi = +((seed.digest / (seed.treat || 1)) * 100).toFixed(1);
  const ebitda = Math.round(marketCap * 0.18);
  const freeCrapFlow = Math.round(marketCap * 0.09);
  const entirePoopValue = Math.round(marketCap * 1.15);

  let sentiment: DogStock['sentiment'] = 'NORMAL';
  if (changePercent >= 12) sentiment = 'ABSURD OPTIMISM';
  else if (changePercent >= 2.5) sentiment = 'BULLISH';
  else if (changePercent <= -10) sentiment = 'EXTREME POOP';
  else if (changePercent <= -2.5) sentiment = 'BEARISH';

  return {
    ticker: seed.ticker,
    name: seed.name,
    breed: seed.breed,
    age: seed.age,
    personality: seed.personality,
    sector: seed.sector,
    description: seed.description,
    avatar: seed.avatar,
    color: seed.color,
    startingPrice: previousPrice,
    currentPrice,
    previousPrice,
    dailyHigh: +(currentPrice * 1.04).toFixed(2),
    dailyLow: +(currentPrice * 0.96).toFixed(2),
    openingPrice: previousPrice,
    volume,
    marketCap,
    change,
    changePercent,
    lastPriceChangeDirection: change >= 0 ? 'up' : 'down',
    lastPriceChangeTimestamp: Date.now(),
    poopProduction: seed.poop,
    barkIndex: seed.bark,
    treatDependency: seed.treat,
    napEfficiency: seed.nap,
    ownerConfidence: seed.owner,
    parkAttendance: seed.park,
    digestionEfficiency: seed.digest,
    chaosRating: seed.chaos,
    catHostility: seed.cat,
    squirrelDetection: seed.squirrel,
    peRatio,
    psRatio,
    roe,
    eps,
    roi,
    ebitda,
    freeCrapFlow,
    entirePoopValue,
    volatility: seed.vol,
    sentiment,
    candles1D: generateCandles(currentPrice, seed.vol, 28, '1D'),
    candles1W: generateCandles(currentPrice, seed.vol, 14, '1W'),
    candles1M: generateCandles(currentPrice, seed.vol, 30, '1M'),
    candles3M: generateCandles(currentPrice, seed.vol, 40, '3M'),
    candles1Y: generateCandles(currentPrice, seed.vol, 50, '1Y'),
    candlesALL: generateCandles(currentPrice, seed.vol, 60, 'ALL'),
  };
});
