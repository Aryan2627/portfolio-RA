import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, GraduationCap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';

const Explanation = () => {
  const { appData } = useData();
  const [level, setLevel] = useState('advanced');
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("Loading AI analysis...");

  const fetchExplanation = (newLevel) => {
    setLoading(true);
    fetch('http://localhost:5000/api/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level: newLevel })
    })
    .then(res => res.json())
    .then(data => {
      setExplanation(data.explanation);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchExplanation('advanced');
  }, []);

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    fetchExplanation(newLevel);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Explanation Assistant</h1>
        <p className="text-textMuted">Let Torvixo.ai translate complex multi-omics interactions into understandable insights.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <button 
            onClick={() => handleLevelChange('advanced')}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              level === 'advanced' 
                ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                : 'bg-slate-800 border-slate-700 text-textMuted hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BrainCircuit size={20} className={level === 'advanced' ? 'text-primary' : ''} />
                <span className="font-semibold">Research Level</span>
              </div>
              {level === 'advanced' && <ChevronRight size={18} className="text-primary" />}
            </div>
            <p className="text-xs opacity-80">Detailed scientific terminology suitable for papers and peers.</p>
          </button>

          <button 
            onClick={() => handleLevelChange('simple')}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              level === 'simple' 
                ? 'bg-secondary/20 border-secondary text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]' 
                : 'bg-slate-800 border-slate-700 text-textMuted hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <GraduationCap size={20} className={level === 'simple' ? 'text-secondary' : ''} />
                <span className="font-semibold">Student Level</span>
              </div>
              {level === 'simple' && <ChevronRight size={18} className="text-secondary" />}
            </div>
            <p className="text-xs opacity-80">Simplified analogies and basic concepts for easier understanding.</p>
          </button>
        </div>

        <div className="md:col-span-2">
          <motion.div 
            key={level}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-8 min-h-[300px] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full opacity-50"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className={level === 'advanced' ? 'text-primary' : 'text-secondary'} />
              <h2 className="text-xl font-semibold">
                {level === 'advanced' ? 'Scientific Interpretation' : 'Simplified Explanation'}
              </h2>
            </div>

            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-700 rounded w-11/12"></div>
                <div className="h-4 bg-slate-700 rounded w-4/5"></div>
                <div className="h-4 bg-slate-700 rounded w-full"></div>
                <div className="h-4 bg-slate-700 rounded w-3/4"></div>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                {appData.fileConfig && (
                  <div className="mb-4 p-3 bg-slate-800/50 rounded-lg text-sm text-slate-300 border border-slate-700">
                    <strong>Context:</strong> Analyzing {appData.fileConfig.name} ({appData.dashboardStats.totalProteins} proteins across {appData.dashboardStats.totalSamples} samples).
                  </div>
                )}
                <p className="text-lg leading-relaxed text-slate-300">
                  {explanation}
                </p>
                
                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <h4 className="text-sm font-semibold text-textMuted mb-3">Key Entities Identified</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs border border-blue-500/20">Gene X</span>
                    <span className="px-3 py-1 bg-violet-500/10 text-violet-400 rounded-full text-xs border border-violet-500/20">Pathway Y</span>
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/20">Disease Progression</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Explanation;
