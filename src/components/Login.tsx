import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-surface relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[480px] flex flex-col items-center"
      >
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-xl primary-gradient text-white shadow-ambient">
            <Activity size={28} />
          </div>
          <h1 className="headline-md mb-2">QoE Insight</h1>
          <p className="body-md text-on-surface-variant opacity-70">Precision ML Quality Engine</p>
        </div>

        <div className="w-full bg-surface-container-lowest p-10 rounded-[2rem] shadow-ambient">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="label-sm text-on-surface-variant ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@precision.editorial"
                  className="w-full h-14 pl-12 pr-4 bg-surface-container-low rounded-lg body-md outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/10 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="label-sm text-on-surface-variant ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-4 bg-surface-container-low rounded-lg body-md outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/10 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-14 primary-gradient text-white rounded-lg title-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98] shadow-ambient"
            >
              Login
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <div className="mt-12 flex items-center gap-2 text-on-surface-variant/40">
          <div className="h-[1px] w-12 bg-outline-variant/10" />
          <ShieldCheck size={14} />
          <span className="label-sm">Secure Access</span>
          <div className="h-[1px] w-12 bg-outline-variant/10" />
        </div>
      </motion.div>
    </div>
  );
}
