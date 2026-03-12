import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from './components/layout/Layout';
import { Footer } from './components/layout/Footer';
import { DashboardPage } from './components/pages/DashboardPage';
import { PredictPage } from './components/pages/PredictPage';
import { CommunityPage } from './components/pages/CommunityPage';
import { LaunchScreen } from './components/ui/LaunchScreen';

function App() {
  const location = useLocation();
  const [isLaunched, setIsLaunched] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a]">
      <AnimatePresence mode="wait">
        {!isLaunched ? (
          <LaunchScreen key="launch" onComplete={() => setIsLaunched(true)} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col min-h-screen w-full"
          >
            <Layout>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/predict" element={<PredictPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                </Routes>
              </AnimatePresence>
            </Layout>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
