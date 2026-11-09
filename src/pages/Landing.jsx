import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  BrainCircuit, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const handleStartTrial = () => {
    navigate('/auth?mode=signup');
  };

  const handleLogin = () => {
    navigate('/auth?mode=login');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#050505]/60 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          {/* Logo with mix-blend-mode trick or assuming transparent bg */}
          <img src="/logo.png" alt="Torvixo.ai" className="h-10 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" style={{ filter: 'contrast(1.1)' }} />
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#demo" className="hover:text-white transition-colors">Platform</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLogin}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Log In
          </button>
          <button 
            onClick={handleStartTrial}
            className="px-4 py-2 rounded-full text-sm font-bold bg-white text-black hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 flex flex-col items-center justify-center min-h-screen text-center">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-600/30 via-cyan-600/30 to-teal-600/30 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium text-white/80 uppercase tracking-wider">The next generation of proteomics AI</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-tight">
            Decode Proteins <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500">
              At Light Speed.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-light">
            Upload your mass spectrometry, peptide sequences, and biomarker data. Let our advanced AI orchestrate the analysis, build dashboards, and uncover biological insights in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleStartTrial}
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-lg overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] transition-all"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                Start Free Trial <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button 
              className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              Book Demo
            </button>
          </div>
        </motion.div>

        {/* Dashboard Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full max-w-6xl mx-auto mt-20 z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent rounded-2xl blur-xl" />
          <div className="relative aspect-video rounded-2xl border border-white/10 bg-[#0f0f11] overflow-hidden shadow-2xl flex flex-col">
            <div className="h-8 border-b border-white/10 flex items-center px-4 gap-2 bg-[#1a1a1d]">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 p-8 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Upload Data Section */}
      <section id="demo" className="py-24 px-8 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <div className="w-full aspect-square md:aspect-[4/3] rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 blur-[100px]" />
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                <Upload className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Upload Your Omics Data</h3>
              <p className="text-white/50 mb-8 max-w-xs">Drag and drop fastq, vcf, or expression matrices. We handle the rest.</p>
              <div className="w-full max-w-xs h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Frictionless Ingestion</h2>
            <p className="text-xl text-white/60 mb-8">
              Skip the bioinformatics pipelines. Just upload your raw or processed datasets, and our AI automatically structures, normalizes, and pre-processes the data for immediate insights.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Supports Mass Spectrometry & Peptide mapping",
                "Automated normalization & batch correction",
                "Secure, encrypted cloud storage pipeline"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-3 h-3 text-green-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="text-purple-400 font-bold hover:text-purple-300 flex items-center gap-2 group">
              See documentation <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Overview */}
      <section id="features" className="py-24 px-8 bg-[#0a0a0c]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Superpowered Analysis</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Everything you need to turn complex biological data into clear, actionable scientific conclusions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: BrainCircuit, title: "AI Feature Selection", desc: "Random Forest & Deep Learning models automatically highlight the most critical biomarkers." },
              { icon: BarChart3, title: "Dynamic Dashboards", desc: "Interactive UMAPs, Volcano plots, and Heatmaps generated in real-time." },
              { icon: Zap, title: "Real-time Interpretation", desc: "Chat with your data. Ask our LLM to explain clusters and pathway enrichments." }
            ].map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feat.title}</h3>
                <p className="text-white/60 leading-relaxed">{feat.desc}</p>
            </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Trusted by Researchers</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { text: "Torvixo.ai reduced our multi-omics analysis pipeline from 3 weeks to just under 4 hours. The AI insights are incredibly accurate.", author: "Dr. Sarah Chen", role: "Lead Bioinformatician, GenX Labs" },
              { text: "The interface is so intuitive. For the first time, our wet-lab scientists can explore complex scRNA-seq data without writing code.", author: "James Miller", role: "Principal Investigator, Nexus Bio" }
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 relative">
                <div className="text-6xl text-purple-500/20 absolute top-4 left-4 font-serif">"</div>
                <p className="text-xl text-white/80 mb-8 relative z-10">{t.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10" />
                  <div>
                    <div className="font-bold">{t.author}</div>
                    <div className="text-sm text-white/50">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-8 bg-[#0a0a0c]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-xl text-white/60 mb-16">Start for free, scale when you need.</p>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black">$0</span>
                <span className="text-white/50">/month</span>
              </div>
              <ul className="space-y-4 mb-8 text-white/70">
                <li>• Up to 5GB Data Storage</li>
                <li>• Basic ML Analysis</li>
                <li>• Community Support</li>
              </ul>
              <button 
                onClick={handleStartTrial}
                className="w-full py-4 rounded-full bg-white/10 hover:bg-white/20 font-bold transition-colors"
              >
                Start Free
              </button>
            </div>
            
            <div className="p-8 rounded-3xl bg-gradient-to-b from-purple-600/20 to-blue-600/20 border border-purple-500/50 relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-xs font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black">$99</span>
                <span className="text-white/50">/month</span>
              </div>
              <ul className="space-y-4 mb-8 text-white/70">
                <li>• Up to 100GB Data Storage</li>
                <li>• Advanced Deep Learning Models</li>
                <li>• Priority API Access</li>
                <li>• Export to Publication-Ready</li>
              </ul>
              <button 
                onClick={handleStartTrial}
                className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 font-bold transition-opacity"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-white/40">
        <p>© 2026 Torvixo.ai. All rights reserved.</p>
      </footer>
    </div>
  );
}
