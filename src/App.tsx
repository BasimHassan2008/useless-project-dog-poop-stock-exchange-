import React, { useState } from 'react';
import { MarketProvider, useMarket } from './context/MarketContext';
import { TopMarketBar } from './components/common/TopMarketBar';
import { Navbar } from './components/common/Navbar';
import { TickerTape } from './components/common/TickerTape';
import { ToastContainer } from './components/common/ToastContainer';
import { DashboardPage } from './pages/DashboardPage';
import { MarketPage } from './pages/MarketPage';
import { DogsPage } from './pages/DogsPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { OrdersPage } from './pages/OrdersPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { MarketControlPage } from './pages/MarketControlPage';
import { EconomyPage } from './pages/EconomyPage';
import { RegulatorPage } from './pages/RegulatorPage';
import { IpoPage } from './pages/IpoPage';
import { AboutPage } from './pages/AboutPage';
import { SettingsModal } from './pages/SettingsModal';
import { AchievementsModal } from './components/common/AchievementsModal';
import { OnboardingModal } from './components/common/OnboardingModal';
import { DevModal } from './components/common/DevModal';

const AppContent: React.FC = () => {
  const { currentTab, ultraPoopMode } = useMarket();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col bg-[#080c14] text-slate-100 ${ultraPoopMode ? 'ultra-poop-mode' : ''}`}>
      {/* Permanent Top Metric Strip */}
      <TopMarketBar />

      {/* Top Navigation Bar */}
      <Navbar 
        onOpenSettings={() => setIsSettingsOpen(true)} 
        onOpenAchievements={() => setIsAchievementsOpen(true)}
      />

      {/* Live Continuous Ticker Tape */}
      <TickerTape />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentTab === 'dashboard' && <DashboardPage />}
        {currentTab === 'market' && <MarketPage />}
        {currentTab === 'dogs' && <DogsPage />}
        {currentTab === 'portfolio' && <PortfolioPage />}
        {currentTab === 'orders' && <OrdersPage />}
        {currentTab === 'leaderboard' && <LeaderboardPage />}
        {currentTab === 'market-control' && <MarketControlPage />}
        {currentTab === 'economy' && <EconomyPage />}
        {currentTab === 'regulator' && <RegulatorPage />}
        {currentTab === 'ipos' && <IpoPage />}
        {currentTab === 'about' && <AboutPage />}
      </main>

      {/* Global Bloomberg-Terminal Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060910] py-4 px-6 text-center text-[11px] font-mono text-slate-500">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
          <div>
            DPSE TERMINAL v2.4.0 • POWERED BY DIGESTIVE MARKOV CHAINS
          </div>
          <div>
            ⚠️ STRICTLY SATIRICAL • NO REAL MONEY • NO PHYSICAL HARDWARE
          </div>
          <div className="text-slate-400">
            © 2026 DOG POOP STOCK EXCHANGE
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
      />

      <OnboardingModal />

      <DevModal />

      {/* Toast Alert Notifications */}
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <MarketProvider>
      <AppContent />
    </MarketProvider>
  );
};

export default App;
