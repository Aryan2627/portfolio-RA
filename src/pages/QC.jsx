import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  Microscope,
  BarChart2,
  GitMerge,
  ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, ZAxis } from 'recharts';
import { useData } from '../context/DataContext';

export default function QC() {
  const { appData } = useData();
  // Mock data for Density Plot
  const densityData = [
    { intensity: 0, sample1: 0, sample2: 0, sample3: 0 },
    { intensity: 2, sample1: 10, sample2: 12, sample3: 5 },
    { intensity: 4, sample1: 45, sample2: 40, sample3: 20 },
    { intensity: 6, sample1: 80, sample2: 75, sample3: 85 },
    { intensity: 8, sample1: 120, sample2: 110, sample3: 130 },
    { intensity: 10, sample1: 160, sample2: 155, sample3: 150 },
    { intensity: 12, sample1: 110, sample2: 115, sample3: 100 },
    { intensity: 14, sample1: 60, sample2: 65, sample3: 70 },
    { intensity: 16, sample1: 20, sample2: 25, sample3: 15 },
    { intensity: 18, sample1: 5, sample2: 8, sample3: 2 },
    { intensity: 20, sample1: 0, sample2: 0, sample3: 0 },
  ];

  // Mock data for Correlation Heatmap (using Scatter)
  const generateHeatmapData = () => {
    const data = [];
    const samples = ['S1', 'S2', 'S3', 'S4', 'S5'];
    for(let i = 0; i < samples.length; i++) {
      for(let j = 0; j < samples.length; j++) {
        // High correlation along diagonal and some noise
        const correlation = i === j ? 1 : 0.7 + (Math.random() * 0.25);
        data.push({
          x: j,
          y: i,
          z: correlation * 100,
          labelX: samples[j],
          labelY: samples[i],
          value: correlation.toFixed(2)
        });
      }
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  const missingPercent = appData.dashboardStats.missingValuesPercent || 12.4;

  // Metrics
  const metrics = [
    { title: "Sample Quality Score", value: (100 - missingPercent).toFixed(1), status: "Excellent", icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { title: "Replicate Consistency", value: "R² = 0.94", status: "High", icon: GitMerge, color: "text-cyan-400", bg: "bg-cyan-400/10" },
    { title: "Instrument Variance", value: "2.4%", status: "Nominal", icon: Microscope, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-3 border border-blue-500/20">
            <Activity size={14} /> Proteomics Integrity
          </motion.div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Quality Control</h1>
          <p className="text-xl text-textMuted font-light">Assess replicate consistency, missingness, and instrument drift.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors">
            Download QC Report
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            Approve Dataset <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx}
            className="glass-panel p-6 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 ${metric.bg}`} />
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${metric.bg} ${metric.color}`}>
                <metric.icon size={20} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${metric.bg} ${metric.color}`}>
                {metric.status}
              </span>
            </div>
            <p className="text-sm text-textMuted font-medium">{metric.title}</p>
            <h3 className="text-3xl font-black mt-1 tracking-tight">{metric.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Density Plot */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6"
        >
          <h3 className="text-lg font-bold mb-1">Log2 Intensity Distribution</h3>
          <p className="text-sm text-textMuted mb-6">Density plots across primary samples</p>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={densityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorS1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorS2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorS3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="intensity" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="sample1" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorS1)" />
                <Area type="monotone" dataKey="sample2" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorS2)" />
                <Area type="monotone" dataKey="sample3" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorS3)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Correlation Heatmap */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold mb-1">Replicate Correlation Heatmap</h3>
              <p className="text-sm text-textMuted">Pearson correlation across samples</p>
            </div>
            <BarChart2 className="text-slate-400" />
          </div>
          
          <div className="h-72 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis type="number" dataKey="x" name="Sample X" stroke="#94a3b8" tickFormatter={(v) => `S${v+1}`} tickLine={false} axisLine={false} tickCount={5} domain={[0, 4]} />
                <YAxis type="number" dataKey="y" name="Sample Y" stroke="#94a3b8" tickFormatter={(v) => `S${v+1}`} tickLine={false} axisLine={false} tickCount={5} domain={[0, 4]} />
                <ZAxis type="number" dataKey="z" range={[200, 600]} name="Correlation" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.5rem' }}
                  formatter={(value, name, props) => {
                    if(name === 'Correlation') return [`${props.payload.value}`, 'Pearson R'];
                    return [];
                  }}
                />
                <Scatter data={heatmapData} fill="#8b5cf6" opacity={0.8} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Missingness Map / Mock Data block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold mb-1">Missing Values Map</h3>
              <p className="text-sm text-textMuted">Protein quantification missingness across cohorts</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-textMuted flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-700" /> Present</span>
              <span className="text-xs text-textMuted flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500/50" /> Missing</span>
            </div>
          </div>
          
          {/* Missingness Grid Mockup using CSS */}
          <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-700/50 flex flex-col gap-0.5 bg-slate-900">
            {[...Array(8)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex flex-1 gap-0.5">
                {[...Array(60)].map((_, colIndex) => {
                  // Simulate random missingness, more in later rows
                  const isMissing = Math.random() < (0.05 + (rowIndex * 0.02));
                  return (
                    <div 
                      key={colIndex} 
                      className={`flex-1 ${isMissing ? 'bg-red-500/60' : 'bg-slate-700/50'}`}
                    />
                  )
                })}
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center gap-2 text-sm text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <AlertTriangle size={16} />
            <span>Overall missingness is <strong>{missingPercent}%</strong>. K-NN imputation is recommended for downstream PCA.</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
