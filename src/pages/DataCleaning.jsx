import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wand2, 
  Trash2, 
  ActivitySquare, 
  Layers, 
  Maximize2, 
  CopyMinus,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useData } from '../context/DataContext';

export default function DataCleaning() {
  const { appData } = useData();
  const [activeStep, setActiveStep] = useState(0);

  const cleaningSteps = [
    { id: 'missing', name: 'Missing Values', icon: Trash2, desc: 'Impute missing values using K-Nearest Neighbors.', status: 'completed' },
    { id: 'outliers', name: 'Outlier Detection', icon: Maximize2, desc: 'Identify and remove biological anomalies.', status: 'completed' },
    { id: 'noise', name: 'Noise Removal', icon: ActivitySquare, desc: 'Smooth expression data and filter low counts.', status: 'processing' },
    { id: 'normalization', name: 'Normalization', icon: Wand2, desc: 'Log2 transformation and quantile normalization.', status: 'pending' },
    { id: 'batch', name: 'Batch Correction', icon: Layers, desc: 'Harmony-based batch effect removal.', status: 'pending' },
    { id: 'duplicates', name: 'Duplicate Removal', icon: CopyMinus, desc: 'Identify identical cell barcodes/samples.', status: 'pending' }
  ];

  // Mock data for before/after distribution
  const data = [
    { value: -4, before: 5, after: 1 },
    { value: -3, before: 15, after: 3 },
    { value: -2, before: 35, after: 10 },
    { value: -1, before: 80, after: 30 },
    { value: 0, before: 120, after: 150 },
    { value: 1, before: 85, after: 140 },
    { value: 2, before: 40, after: 60 },
    { value: 3, before: 20, after: 15 },
    { value: 4, before: 8, after: 2 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold mb-3 border border-purple-500/20">
            <Wand2 size={14} /> Pre-Processing Pipeline
          </motion.div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Data Cleaning</h1>
          <p className="text-xl text-textMuted font-light">Sanitize and normalize your dataset before AI analysis.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors">
            Configure Rules
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            Start Processing <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cleaning Pipeline Steps */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-bold mb-4">Cleaning Pipeline</h3>
          
          <div className="space-y-3 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-700">
            {cleaningSteps.map((step, idx) => {
              const isProcessing = step.status === 'processing';
              const isCompleted = step.status === 'completed';
              
              return (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`relative flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    activeStep === idx 
                      ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_15px_rgba(139,92,246,0.1)]' 
                      : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800'
                  }`}
                >
                  <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                    isCompleted ? 'bg-green-500/20 border-green-500 text-green-400' :
                    isProcessing ? 'bg-purple-500/20 border-purple-500 text-purple-400 animate-pulse' :
                    'bg-slate-800 border-slate-600 text-slate-400'
                  }`}>
                    {isCompleted ? <CheckCircle2 size={16} /> : <step.icon size={16} />}
                  </div>
                  
                  <div>
                    <h4 className={`font-semibold text-sm ${isProcessing ? 'text-purple-400' : 'text-white'}`}>
                      {step.name}
                    </h4>
                    <p className="text-xs text-textMuted mt-0.5">{step.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Visualizer */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-6 border border-white/5 relative overflow-hidden h-full flex flex-col"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <h3 className="text-xl font-bold">Data Distribution</h3>
                <p className="text-sm text-textMuted">Before / After Normalization</p>
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500/50 border border-slate-500" />
                  <span className="text-textMuted">Raw Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500/50 border border-purple-500" />
                  <span className="text-purple-400">Cleaned Data</span>
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-[300px] relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="value" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="before" stroke="#64748b" strokeWidth={2} fillOpacity={1} fill="url(#colorBefore)" />
                  <Area type="monotone" dataKey="after" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorAfter)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-4 mt-8 relative z-10">
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <p className="text-xs text-textMuted mb-1">Total Features Removed</p>
                <h4 className="text-xl font-bold text-red-400">
                  {Math.floor((appData.dashboardStats.totalProteins || 12040) * 0.1)}
                </h4>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <p className="text-xs text-textMuted mb-1">Missing Values Handled</p>
                <h4 className="text-xl font-bold text-green-400">
                  {appData.dashboardStats.missingValuesPercent || 14.2}%
                </h4>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <p className="text-xs text-textMuted mb-1">Batch Effect Correction</p>
                <h4 className="text-xl font-bold text-blue-400">
                  {appData.dashboardStats.batchEffectScore === 'High' ? 'Resolved' : 'Aligned'}
                </h4>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
