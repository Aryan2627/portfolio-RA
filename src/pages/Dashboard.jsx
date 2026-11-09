import { useState, useEffect } from 'react';
import { 
  Activity, 
  Database, 
  Cpu, 
  UploadCloud, 
  Users, 
  CheckCircle, 
  Zap, 
  Clock, 
  ArrowRight,
  Target,
  FlaskConical,
  BarChart2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';

const Dashboard = () => {
  const { appData } = useData();
  const [data, setData] = useState({
    pcaData: [],
    correlationData: [],
    summary: { totalGenes: 0, totalProteins: appData.dashboardStats.totalProteins || 12405, totalMetabolites: 0, significantPathways: 0 },
    significantFeature: 'Loading...',
    explainedVariance: appData.dashboardStats.explainedVariance || 89.4
  });

  const widgets = [
    { title: "Protein Count", value: appData.fileConfig ? appData.dashboardStats.totalProteins : 12405, icon: FlaskConical, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Significant Biomarkers", value: appData.fileConfig ? appData.dashboardStats.significantBiomarkers : 342, icon: Target, color: "text-violet-500", bg: "bg-violet-500/10" },
    { title: "Samples Analyzed", value: appData.fileConfig ? appData.dashboardStats.totalSamples : 120, icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "PCA Summary", value: `${appData.fileConfig ? appData.dashboardStats.explainedVariance : 89.4}% Var`, icon: BarChart2, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  ];

  const recentProjects = [
    { name: appData.fileConfig ? appData.fileConfig.name : "Breast Cancer scRNA", date: appData.fileConfig ? "Just now" : "2 hours ago", status: appData.fileConfig ? "Analyzing" : "Completed", type: "Proteomics" },
    { name: "Alzheimer's Cohort", date: "5 hours ago", status: "Analyzing", type: "Multi-omics" },
    { name: "Liver Toxicity Study", date: "1 day ago", status: "Failed QC", type: "Proteomics" }
  ];

  const teamActivity = [
    { user: "Dr. Sarah Chen", action: "shared findings on", target: "Breast Cancer scRNA", time: "10m ago" },
    { user: "James Miller", action: "uploaded new dataset", target: "PBMC Control", time: "1h ago" },
    { user: "AI Pipeline", action: "completed clustering for", target: "Alzheimer's Cohort", time: "3h ago" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-3 border border-blue-500/20">
            <Zap size={14} /> System Online
          </motion.div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Dashboard</h1>
          <p className="text-xl text-textMuted font-light">This is the control center.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors flex items-center gap-2">
            <Database size={18} /> Dataset Library
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <UploadCloud size={18} /> Upload Data
          </button>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {widgets.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="glass-panel p-5 flex items-center gap-4 relative overflow-hidden group border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity ${stat.bg}`} />
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} shadow-inner`}>
              <stat.icon size={24} />
            </div>
            <div className="z-10">
              <p className="text-sm text-textMuted font-medium">{stat.title}</p>
              <h3 className="text-2xl font-black tracking-tight">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* AI Insights & Dataset Health */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="glass-panel p-6 border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />
              <div className="flex items-center gap-2 mb-4">
                <Cpu size={20} className="text-purple-400" />
                <h3 className="text-lg font-bold">AI Insights Summary</h3>
              </div>
              <p className="text-sm text-textMuted leading-relaxed mb-4">
                The latest Random Forest iteration identified <span className="text-purple-400 font-semibold">{appData.fileConfig ? appData.dashboardStats.significantBiomarkers : 12} novel biomarkers</span> in the {appData.fileConfig ? appData.fileConfig.name : 'Breast Cancer cohort'}. Clustering quality improved by 14% after removing batch effects. 
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-textMuted">Pattern Recognition Confidence</span>
                  <span className="text-green-400 font-bold">94%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-purple-500 to-green-500 h-1.5 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={20} className="text-blue-400" />
                <h3 className="text-lg font-bold">Dataset Health</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-textMuted">Missing Values</span>
                    <span className="text-emerald-400">{appData.fileConfig ? appData.dashboardStats.missingValuesPercent : '0.2'}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${100 - (appData.fileConfig ? appData.dashboardStats.missingValuesPercent : 0.2)}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-textMuted">Batch Effect Score</span>
                    <span className="text-yellow-400">{appData.fileConfig ? appData.dashboardStats.batchEffectScore : 'Moderate'}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-textMuted">Data Normalization</span>
                    <span className="text-blue-400">Complete</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Projects */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Database size={20} className="text-slate-400" /> Recent Projects
              </h3>
              <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">View All</button>
            </div>
            <div className="space-y-3">
              {recentProjects.map((project, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${project.status === 'Completed' ? 'bg-green-500' : project.status === 'Analyzing' ? 'bg-blue-500 animate-pulse' : 'bg-red-500'}`} />
                    <div>
                      <h4 className="font-semibold text-textMain group-hover:text-blue-400 transition-colors">{project.name}</h4>
                      <p className="text-xs text-textMuted">{project.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-textMuted hidden sm:block">{project.date}</span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Active Analyses */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Activity size={20} className="text-orange-400" /> Active Analyses
            </h3>
            <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm">UMAP & Clustering</h4>
                <span className="text-xs font-bold text-blue-400">78%</span>
              </div>
              <p className="text-xs text-textMuted mb-3">{appData.fileConfig ? appData.fileConfig.name : "Alzheimer's Cohort Dataset"}</p>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full relative">
                  <div className="absolute inset-0 bg-white/20 animate-[shimmer_1.5s_infinite]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Findings */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-green-400" /> Recent Findings
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <p className="text-sm font-medium mb-1 text-white">Pathway Enrichment Detected</p>
                <p className="text-xs text-textMuted">TNF-alpha signaling via NF-kB is highly upregulated in Cluster 2.</p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <p className="text-sm font-medium mb-1 text-white">Outlier Identified</p>
                <p className="text-xs text-textMuted">Sample SRR10293 exhibits abnormal expression variance. Excluded from PCA.</p>
              </div>
            </div>
          </motion.div>

          {/* Team Activity */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="glass-panel p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Users size={20} className="text-pink-400" /> Team Activity
            </h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              {teamActivity.map((activity, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-slate-800 bg-pink-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <p className="text-xs">
                      <span className="font-semibold text-white">{activity.user}</span> {activity.action} <span className="text-blue-400">{activity.target}</span>
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-textMuted mt-1">
                      <Clock size={10} /> {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
