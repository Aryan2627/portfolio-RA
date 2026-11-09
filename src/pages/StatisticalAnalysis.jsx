import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings2, 
  Download, 
  Search,
  Sigma,
  ScatterChart as ScatterIcon
} from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { useData } from '../context/DataContext';

export default function StatisticalAnalysis() {
  const { appData } = useData();
  
  // Dimensionality Reduction Data (PCA)
  const generateDimData = () => {
    const data = [];
    const numPoints = Math.min((appData.dashboardStats.totalProteins || 300), 1000);
    for (let i = 0; i < numPoints; i++) {
      const cluster = Math.floor(Math.random() * 3);
      let x, y;
      if (cluster === 0) {
        x = (Math.random() - 0.5) * 10 - 5;
        y = (Math.random() - 0.5) * 10 + 5;
      } else if (cluster === 1) {
        x = (Math.random() - 0.5) * 15 + 8;
        y = (Math.random() - 0.5) * 10 + 2;
      } else {
        x = (Math.random() - 0.5) * 12 + 2;
        y = (Math.random() - 0.5) * 12 - 8;
      }
      data.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)), cluster: `Cluster ${cluster + 1}` });
    }
    return data;
  };

  const [dimData] = useState(generateDimData());

  const clusterColors = {
    'Cluster 1': '#a855f7',
    'Cluster 2': '#10b981',
    'Cluster 3': '#f59e0b'
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/20">
            <Sigma size={14} /> Advanced Statistics
          </motion.div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Statistical Analysis</h1>
          <p className="text-xl text-textMuted font-light">
            Interactive exploration of {appData.fileConfig ? appData.fileConfig.name : 'your dataset'}.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2">
            <Download size={18} /> Export Figure (SVG/PNG)
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        {/* Left Sidebar / Parameters */}
        <div className="w-full lg:w-80 space-y-6 flex flex-col">
          <div className="glass-panel p-5 flex-1 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold flex items-center gap-2"><Settings2 size={18} className="text-indigo-400" /> PCA Parameters</h3>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-textMuted uppercase tracking-wider">Algorithm</label>
                <div className="grid grid-cols-1 gap-2">
                  <button className="py-2 bg-indigo-600 border border-indigo-500 rounded-lg text-sm font-semibold text-white">Principal Component Analysis (PCA)</button>
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="text-xs font-semibold text-textMuted uppercase tracking-wider">Components</label>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>n_components</span>
                    <span className="text-indigo-400 font-mono">2</span>
                  </div>
                  <input type="range" min="2" max="10" step="1" defaultValue="2" className="w-full accent-indigo-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Variance Explained</span>
                    <span className="text-indigo-400 font-mono">{appData.dashboardStats.explainedVariance || 89.4}%</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <ScatterIcon size={16} /> Re-Compute PCA
              </button>
            </motion.div>
          </div>
        </div>

        {/* Main Plot Area */}
        <div className="flex-1 glass-panel p-6 border border-white/5 relative overflow-hidden flex flex-col min-h-[500px]">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div>
              <h3 className="text-2xl font-bold">PCA Projection</h3>
              <p className="text-textMuted text-sm">
                Visualizing high-dimensional variance and cluster separation.
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search sample..." 
                className="bg-slate-900 border border-slate-700 rounded-full py-2 pl-9 pr-4 text-sm w-48 focus:w-64 transition-all outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex-1 relative z-10 w-full h-full min-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis type="number" dataKey="x" name="PC 1" stroke="#94a3b8" />
                <YAxis type="number" dataKey="y" name="PC 2" stroke="#94a3b8" />
                <ZAxis range={[60, 60]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', color: '#fff' }}
                  formatter={(value, name, props) => [value, name]}
                />
                <Scatter name="Clusters" data={dimData}>
                  {dimData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={clusterColors[entry.cluster]} fillOpacity={0.8} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
