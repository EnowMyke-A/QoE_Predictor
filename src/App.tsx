import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="min-h-screen bg-surface">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Login onLogin={() => setIsLoggedIn(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
