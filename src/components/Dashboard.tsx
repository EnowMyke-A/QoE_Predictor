import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, Settings, User, Video, MessageSquare, Network, 
  ChevronDown, Sparkles, TrendingUp, BarChart3, Info, Download,
  Activity, ShieldCheck
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { cn } from '../lib/utils';

const trendData = [
  { day: 'MON', value: 40 },
  { day: 'TUE', value: 55 },
  { day: 'WED', value: 45 },
  { day: 'THU', value: 70 },
  { day: 'FRI', value: 85 },
  { day: 'SAT', value: 90 },
  { day: 'SUN', value: 80 },
];

const factorData = [
  { name: 'BANDWIDTH', value: 45, color: '#006067' },
  { name: 'LATENCY', value: 30, color: '#004f55' },
  { name: 'PACKET STABILITY', value: 25, color: '#834718' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Analysis');

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="h-16 md:h-20 glass sticky top-0 z-50 px-6 md:px-10 flex items-center justify-between border-b border-outline-variant/5">
        <div className="flex items-center gap-8 md:gap-12">
          <h2 className="title-sm font-bold text-on-surface">QoE Insight Dashboard</h2>
          <nav className="flex items-center gap-4 md:gap-8">
            {['Analysis', 'Historical', 'Datasets'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "body-md transition-all relative py-2",
                  activeTab === tab ? "text-primary font-medium" : "text-on-surface-variant/60 hover:text-on-surface-variant"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-on-surface-variant/60 hover:text-primary transition-colors">
            <Bell size={20} />
          </button>
          <button className="text-on-surface-variant/60 hover:text-primary transition-colors">
            <Settings size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border-2 border-primary/10">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-[1600px] mx-auto w-full grid grid-cols-12 gap-6 md:gap-10">
        {/* Left Column: Configuration */}
        <div className="col-span-12 lg:col-span-4 space-y-6 md:space-y-10">
          <div className="space-y-2">
            <h1 className="headline-md">Configure Parameters</h1>
            <p className="body-md text-on-surface-variant/60">Adjust dataset constraints for ML prediction.</p>
          </div>

          {/* Video Experience Section */}
          <section className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 text-primary">
              <Video size={20} />
              <h3 className="title-sm">Video Experience</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="label-sm">Video Reliability</label>
                <div className="relative">
                  <select className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md appearance-none outline-none focus:ring-2 focus:ring-primary/10">
                    <option>High Performance</option>
                    <option>Standard</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="label-sm">Video Quality</label>
                <div className="relative">
                  <select className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md appearance-none outline-none focus:ring-2 focus:ring-primary/10">
                    <option>4K Ultra HD</option>
                    <option>1080p Full HD</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="label-sm">Buffering Class</label>
              <div className="flex gap-2">
                {['NONE', 'MILD', 'SEVERE'].map((cls) => (
                  <button
                    key={cls}
                    className={cn(
                      "px-4 py-1.5 rounded-full label-sm transition-all",
                      cls === 'NONE' ? "bg-primary text-white" : "bg-surface-container-highest/50 text-on-surface-variant/60 hover:bg-surface-container-highest"
                    )}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="label-sm">Loading Time (s)</label>
                <input type="text" defaultValue="1.2" className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md outline-none focus:ring-2 focus:ring-primary/10" />
              </div>
              <div className="space-y-2">
                <label className="label-sm">Buffer Duration (s)</label>
                <input type="text" defaultValue="0.5" className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md outline-none focus:ring-2 focus:ring-primary/10" />
              </div>
            </div>
          </section>

          {/* Messaging & Media Section */}
          <section className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 text-primary">
              <MessageSquare size={20} />
              <h3 className="title-sm">Messaging & Media</h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="label-sm">Delivery Speed</label>
                <div className="flex gap-1 p-1 bg-surface-container-highest/30 rounded-lg">
                  {['INSTANT', 'NORMAL', 'DELAYED'].map((speed) => (
                    <button
                      key={speed}
                      className={cn(
                        "flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all",
                        speed === 'INSTANT' ? "bg-surface-container-lowest shadow-sm" : "text-on-surface-variant/40 hover:text-on-surface-variant"
                      )}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="label-sm">Latency (s)</label>
                <input type="text" defaultValue="0.05" className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md outline-none focus:ring-2 focus:ring-primary/10" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="label-sm">Image Resolution Quality</label>
                <span className="label-sm text-primary">85%</span>
              </div>
              <div className="relative h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[85%] primary-gradient" />
                <div className="absolute top-1/2 left-[85%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary border-4 border-surface-container-lowest rounded-full shadow-md" />
              </div>
            </div>
          </section>

          {/* Network QoS Metrics Section */}
          <section className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] space-y-6 md:space-y-8">
            <div className="flex items-center gap-3 text-primary">
              <Network size={20} />
              <h3 className="title-sm">Network QoS Metrics</h3>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <label className="label-sm">Network Rel.</label>
                  <div className="h-1.5 w-48 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full w-[99.9%] bg-primary" />
                  </div>
                </div>
                <span className="label-sm font-bold">99.9%</span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="label-sm">Latency (ms)</label>
                  <input type="text" defaultValue="42" className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md outline-none focus:ring-2 focus:ring-primary/10" />
                </div>
                <div className="space-y-2">
                  <label className="label-sm">DL Speed (mbps)</label>
                  <input type="text" defaultValue="150.5" className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md outline-none focus:ring-2 focus:ring-primary/10" />
                </div>
                <div className="space-y-2">
                  <label className="label-sm">UL Speed (mbps)</label>
                  <input type="text" defaultValue="45.2" className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md outline-none focus:ring-2 focus:ring-primary/10" />
                </div>
                <div className="space-y-2">
                  <label className="label-sm">Jitter (ms)</label>
                  <input type="text" defaultValue="4" className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md outline-none focus:ring-2 focus:ring-primary/10" />
                </div>
                <div className="space-y-2">
                  <label className="label-sm">Packet Loss (%)</label>
                  <input type="text" defaultValue="0.01" className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md outline-none focus:ring-2 focus:ring-primary/10" />
                </div>
              </div>
            </div>
          </section>

          <button className="w-full h-16 primary-gradient text-white rounded-2xl title-sm flex items-center justify-center gap-3 shadow-ambient hover:opacity-95 transition-all active:scale-[0.98]">
            <Sparkles size={20} />
            Predict QoE
          </button>
        </div>

        {/* Right Column: Results */}
        <div className="col-span-12 lg:col-span-8 space-y-6 md:space-y-10">
          {/* Main Prediction Result */}
          <div className="bg-surface-container-lowest p-8 md:p-12 rounded-[2.5rem] shadow-ambient flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
            
            <span className="label-sm text-on-surface-variant/60 mb-8 md:mb-12">Current Prediction Result</span>
            
            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 md:mb-12">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-surface-container-low"
                />
                <circle
                  cx="50" cy="50" r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray="282.7"
                  strokeDashoffset="42.4"
                  className="text-primary"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="display-lg text-on-surface">85</span>
                <div className="px-4 py-1 bg-primary/10 text-primary rounded-full label-sm font-bold mt-2">
                  EXCELLENT
                </div>
              </div>
            </div>

            <p className="body-md text-on-surface-variant max-w-[500px] leading-relaxed">
              Based on your configuration, the network performance is projected to be optimal for high-bandwidth video streaming and real-time communication.
            </p>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* QoE Trend */}
            <div className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] space-y-6 md:space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="title-sm">QoE Trend</h3>
                <TrendingUp size={20} className="text-primary" />
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="#d1d5d9" strokeOpacity={0.5} />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#3e494a', fontWeight: 500 }} 
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{ fill: 'rgba(0, 96, 103, 0.05)' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 12px 40px rgba(25, 28, 30, 0.06)' }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={32}>
                      {trendData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index >= 4 ? '#006067' : '#94b8ba'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Factor Impact */}
            <div className="bg-surface-container-low p-6 md:p-8 rounded-[2rem] space-y-6 md:space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="title-sm">Factor Impact</h3>
                <BarChart3 size={20} className="text-primary" />
              </div>
              <div className="space-y-8">
                {factorData.map((factor) => (
                  <div key={factor.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="label-sm font-bold">{factor.name}</span>
                      <span className="label-sm text-on-surface-variant/60">{factor.value}%</span>
                    </div>
                    <div className="h-2 bg-surface-container-highest/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${factor.value}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: factor.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Optimization Roadmap */}
          <div className="bg-on-surface p-8 md:p-10 rounded-[2.5rem] space-y-6 md:space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -mr-48 -mt-48" />
            
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <Sparkles size={18} />
              </div>
              <h3 className="title-sm">Optimization Roadmap</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Network Target', desc: 'Reduce latency below 50ms for stable WebRTC.', icon: <Activity size={18} /> },
                { title: 'Bandwidth Cap', desc: 'Increase DL speed to 10 Mbps for 1080p playback.', icon: <Download size={18} /> },
                { title: 'Signal Strength', desc: 'Stabilize Jitter within 2ms range for gaming.', icon: <Network size={18} /> },
                { title: 'Protocol Choice', desc: 'Switch to QUIC protocol to handle 1% packet loss.', icon: <ShieldCheck size={18} /> },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 hover:bg-white/10 transition-colors p-6 rounded-2xl flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-primary transition-colors">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="body-md font-bold text-white">{item.title}</h4>
                    <p className="label-sm text-white/40 normal-case tracking-normal leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Notification Toast */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-8 right-8 bg-surface-container-lowest p-4 rounded-2xl shadow-ambient flex items-center gap-4 border border-outline-variant/5"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="body-md font-bold text-on-surface">Prediction Generated</h4>
                <p className="label-sm text-on-surface-variant/60 normal-case tracking-normal">Confidence Score: 98.4%</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
