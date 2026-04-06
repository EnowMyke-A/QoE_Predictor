import React, { useState, useEffect } from 'react';
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
  const [activeTab, setActiveTab] = useState('Prediction');
  const [screenWidth, setScreenWidth] = useState(1440);
  const [imageResolution, setImageResolution] = useState(3);
  const [notificationLatency, setNotificationLatency] = useState('UNDER 5s');

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply zoom level based on screen width
  const zoomLevel = screenWidth === 1440 ? '100%' : '90%';

  // Helper function to get resolution label
  const getResolutionLabel = (value: number) => {
    const labels = ['< 360p', '< 540p', '< 1080p', '< 2160p', '2160p +'];
    return labels[value - 1] || '< 1080p';
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Header */}
      <header className="h-16 md:h-20 glass sticky top-0 z-50 px-6 md:px-10 flex items-center justify-between border-b border-outline-variant/5">
        {/* Logo on the left */}
        <div className="flex items-center text-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl primary-gradient text-white shadow-ambient">
            <Activity size={18} />
          </div>
          <h1 className="text-[18px] font-[700]">QoE Dashboard</h1>
        </div>

        {/* Centered navigation */}
        <nav className="flex items-center gap-4 md:gap-8 absolute left-1/2 -translate-x-1/2">
          {["Prediction", "History", "Datasets"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "body-md transition-all relative py-2 cursor-pointer",
                activeTab === tab
                  ? "text-primary font-medium"
                  : "text-on-surface-variant/60 hover:text-on-surface-variant",
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

        {/* User actions on the right */}
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border-2 border-primary/10">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      <main 
        className="flex-1 p-6 md:p-10 max-w-[1600px] mx-auto w-full grid grid-cols-12 gap-6 md:gap-10"
        style={{ 
          transform: `scale(${zoomLevel === '90%' ? 0.9 : 1})`,
          transformOrigin: 'top left',
          width: zoomLevel === '90%' ? '111.11%' : '100%',
          height: zoomLevel === '90%' ? '111.11%' : 'auto'
        }}
      >
        {/* Left Column: Configuration */}
        <div className="col-span-12 lg:col-span-4 space-y-6 md:space-y-10">
          <div className="space-y-2">
            <h1 className="text-[24px]">Configure Parameters</h1>
            <p className="body-md text-on-surface-variant/60">
              Adjust dataset constraints for ML prediction.
            </p>
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
                    <option>Very Poor</option>
                    <option>Poor</option>
                    <option>Average</option>
                    <option>Good</option>
                    <option>Excellent</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="label-sm">Video Quality</label>
                <div className="relative">
                  <select className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md appearance-none outline-none focus:ring-2 focus:ring-primary/10">
                    <option>Unwatchable</option>
                    <option>Low</option>
                    <option>Standard</option>
                    <option>High</option>
                    <option>Ultra High</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="label-sm">Video Buffering</label>
                <div className="relative">
                  <select className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md appearance-none outline-none focus:ring-2 focus:ring-primary/10">
                    <option>Constant</option>
                    <option>Frequent</option>
                    <option>Occasional</option>
                    <option>Rare</option>
                    <option>None</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="label-sm">Loading Time</label>
                <div className="relative">
                  <select className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md appearance-none outline-none focus:ring-2 focus:ring-primary/10">
                    <option>Very Slow</option>
                    <option>Slow</option>
                    <option>Average</option>
                    <option>Fast</option>
                    <option>Instant</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="label-sm">Video Stuttering</label>
                <div className="relative">
                  <select className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md appearance-none outline-none focus:ring-2 focus:ring-primary/10">
                    <option>Severe</option>
                    <option>Frequent</option>
                    <option>Occasional</option>
                    <option>Minimal</option>
                    <option>None</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="label-sm">Buffer Duration</label>
                <div className="relative">
                  <select className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md appearance-none outline-none focus:ring-2 focus:ring-primary/10">
                    <option>Less than 5s</option>
                    <option>5s - 10s</option>
                    <option>10s - 30s</option>
                    <option>More than 30s</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40"
                  />
                </div>
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
              <div className="col-span-2 space-y-4">
                <label className="label-sm">Notification Latency</label>
                <div className="flex gap-1 p-1 bg-surface-container-highest/30 rounded-lg">
                  {["UNDER 5s", "5s - 10s", "ABOVE 10s"].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setNotificationLatency(speed)}
                      className={cn(
                        "flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer",
                        speed === notificationLatency
                          ? "bg-surface-container-lowest shadow-sm"
                          : "text-on-surface-variant/40 hover:text-on-surface-variant",
                      )}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="label-sm">Delivery Speed</label>
                <div className="relative">
                  <select className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md appearance-none outline-none focus:ring-2 focus:ring-primary/10">
                    <option>Stalled</option>
                    <option>Lagging</option>
                    <option>Normal</option>
                    <option>Fast</option>
                    <option>Instant</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="label-sm">Image Quality</label>
                <div className="relative">
                  <select className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md appearance-none outline-none focus:ring-2 focus:ring-primary/10">
                    <option>Very Poor</option>
                    <option>Poor</option>
                    <option>Fair</option>
                    <option>Good</option>
                    <option>Excellent</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40"
                  />
                </div>
              </div>
            </div>

            {/* Image Resolution Slider */}
            <div className="col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <label className="label-sm">Image Resolution</label>
                <span className="label-sm text-primary">{getResolutionLabel(imageResolution)}</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={imageResolution}
                  step="1"
                  onChange={(e) => setImageResolution(Number(e.target.value))}
                  className="w-full h-[5px] bg-surface-container-highest rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #006067 0%, #006067 ${(imageResolution - 1) * 25}%, #d1d5d9 ${(imageResolution - 1) * 25}%, #d1d5d9 100%)`
                  }}
                />
                <style jsx>{`
                  .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    background: #006067;
                    border: 2px solid white;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 96, 103, 0.2);
                  }
                  .slider::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    background: #006067;
                    border: 2px solid white;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 96, 103, 0.2);
                  }
                `}</style>
                <div className="flex justify-between mt-2 px-1">
                  <span className="text-[10px] text-on-surface-variant/60">{'< 360p'}</span>
                  <span className="text-[10px] text-on-surface-variant/60">{'< 540p'}</span>
                  <span className="text-[10px] text-on-surface-variant/60">{'< 1080p'}</span>
                  <span className="text-[10px] text-on-surface-variant/60">{'< 2160p'}</span>
                  <span className="text-[10px] text-on-surface-variant/60">{'2160p +'}</span>
                </div>
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
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="label-sm">Network Rel.</label>
                  <div className="relative">
                    <select className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md appearance-none outline-none focus:ring-2 focus:ring-primary/10">
                      <option>Very Poor</option>
                      <option>Poor</option>
                      <option>Average</option>
                      <option>Good</option>
                      <option>Excellent</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="label-sm">Packet Loss (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    defaultValue="0.01"
                    className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md outline-none focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="label-sm">DL Speed (mbps)</label>
                  <input
                    type="number"
                    min="0"
                    defaultValue="42"
                    className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md outline-none focus:ring-2 focus:ring-primary/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="label-sm">UL Speed (mbps)</label>
                  <input
                    type="number"
                    min="0"
                    defaultValue="150.5"
                    className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md outline-none focus:ring-2 focus:ring-primary/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="label-sm">Latency (ms)</label>
                  <input
                    type="number"
                    min="0"
                    defaultValue="45.2"
                    className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md outline-none focus:ring-2 focus:ring-primary/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="label-sm">Jitter (ms)</label>
                  <input
                    type="number"
                    min="0"
                    defaultValue="4"
                    className="w-full h-12 px-4 bg-surface-container-lowest rounded-lg body-md outline-none focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>
            </div>
          </section>

          <button className="w-full h-16 primary-gradient text-white rounded-2xl title-sm flex items-center justify-center gap-3 shadow-ambient hover:opacity-95 transition-all active:scale-[0.98] cursor-pointer">
            <Sparkles size={20} />
            Predict QoE
          </button>
        </div>

        {/* Right Column: Results */}
        <div className="col-span-12 lg:col-span-8 space-y-6 md:space-y-10">
          {/* Main Prediction Result */}
          <div className="bg-surface-container-lowest p-8 md:p-12 rounded-[2.5rem] shadow-ambient flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />

            <span className="label-2xl mb-8 md:mb-12 font-[600] text-primary">
              QoE Score Prediction
            </span>

            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 md:mb-12">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-surface-container-low"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray="282.7"
                  strokeDashoffset="42.4"
                  className="text-primary"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="display-lg text-on-surface mb-2">4 / 5</span>
                <div className="px-4 py-1 bg-primary/10 text-primary rounded-full label-sm font-bold mt-2">
                  EXCELLENT
                </div>
              </div>
            </div>

            <p className="body-md text-on-surface-variant max-w-[500px] leading-relaxed">
              Based on your configuration, the network performance is projected
              to be optimal for high-bandwidth video streaming and real-time
              communication.
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
                  <BarChart
                    data={trendData}
                    margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      vertical={false}
                      stroke="#d1d5d9"
                      strokeOpacity={0.5}
                    />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#3e494a", fontWeight: 500 }}
                      dy={10}
                    />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ fill: "rgba(0, 96, 103, 0.05)" }}
                      contentStyle={{
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 12px 40px rgba(25, 28, 30, 0.06)",
                      }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={32}>
                      {trendData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index >= 4 ? "#006067" : "#94b8ba"}
                        />
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
                      <span className="label-sm text-on-surface-variant/60">
                        {factor.value}%
                      </span>
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
          <div className="bg-on-surface p-8 md:p-10 rounded-[2.5rem] space-y-6 md:space-y-8 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -mr-48 -mt-48" />

            <div className="flex items-center gap-3 text-white">
              <h3 className="text-[24px] text-white">Optimization Suggestions</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Network Target",
                  desc: "Reduce latency below 50ms for stable WebRTC.",
                  icon: <Activity size={18} />,
                },
                {
                  title: "Bandwidth Cap",
                  desc: "Increase DL speed to 10 Mbps for 1080p playback.",
                  icon: <Download size={18} />,
                },
                {
                  title: "Signal Strength",
                  desc: "Stabilize Jitter within 2ms range for gaming.",
                  icon: <Network size={18} />,
                },
                {
                  title: "Protocol Choice",
                  desc: "Switch to QUIC protocol to handle 1% packet loss.",
                  icon: <ShieldCheck size={18} />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/5 hover:bg-white/10 transition-colors p-6 rounded-2xl flex gap-4 group"
                >
                  <div className="w-11 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-primary transition-colors">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="body-lg font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-white/40 normal-case tracking-normal leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Notification Toast */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-[-15px] right-[-15px] bg-surface-container-lowest p-4 rounded-2xl shadow-ambient flex items-center gap-4 border border-outline-variant/5"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="body-md font-bold text-on-surface">
                  Prediction Generated
                </h4>
                <p className="text-sm text-on-surface-variant/60 normal-case tracking-normal">
                  Confidence Score: 98.4%
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
