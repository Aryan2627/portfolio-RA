import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import ProteomicsPipeline from '../components/ProteomicsPipeline';
const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [fasta, setFasta] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Proteomics");
  const [showProteomicsPipeline, setShowProteomicsPipeline] = useState(false);
  const { processUploadedFile } = useData();

  const omicsCategories = [
    "Genomics", "Proteomics", "Metabolomics", "Transcriptomics", 
    "Epigenomics", "Lipidomics", "Microbiomics", "Pharmacogenomics", 
    "Multi-omics", "Clinical Data Analysis", "Bioimage", 
    "Structural Biology", "System Biology", "Drug Discovery", 
    "Agriculture Genomics"
  ];

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'text/tab-separated-values': ['.tsv']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!file) return;
    
    if (selectedCategory === "Proteomics") {
      setShowProteomicsPipeline(true);
      return;
    }

    setUploading(true);
    try {
      const stats = await processUploadedFile(file);
      setUploading(false);
      setResult({ stats });
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert('Failed to analyze dataset');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Upload Data</h1>
        <p className="text-textMuted">Upload your multi-omics datasets (CSV, TSV) for automated cleaning and integration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {showProteomicsPipeline ? (
            <ProteomicsPipeline onComplete={() => window.location.href = '/dashboard'} />
          ) : !result ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-8"
            >
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-textMuted">Paste FASTA Sequence</label>
                <textarea 
                  value={fasta}
                  onChange={(e) => setFasta(e.target.value)}
                  className="w-full h-32 bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder=">SEQUENCE_1&#10;MTEITAAMVKELRESTGAGMMDCKNALSETNGDFDKAVQLLREKGLGKAAKKADRLAAEGLVSVKVSDDF"
                />
              </div>

              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-primary bg-primary/10' : 'border-slate-600 hover:border-primary/50 hover:bg-slate-800/50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 text-primary">
                  <UploadCloud size={32} />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  {isDragActive ? 'Drop your dataset here' : 'Drag & drop your dataset'}
                </h3>
                <p className="text-sm text-textMuted mb-6">Supports CSV, TSV up to 50MB</p>
                
                <button className="px-6 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors font-medium">
                  Browse Files
                </button>
              </div>

              {file && (
                <div className="mt-6 flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3">
                    <File className="text-secondary" />
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-textMuted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleUpload}
                    disabled={uploading}
                    className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      selectedCategory === "Proteomics" ? 'Run Proteomics Pipeline' : 'Analyze Dataset'
                    )}
                  </button>
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-sm font-medium mb-4 text-textMuted uppercase tracking-wider">Select Analysis Category</h3>
                <div className="flex flex-wrap gap-2">
                  {omicsCategories.map((cat, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 border text-sm rounded-full transition-colors ${
                        selectedCategory === cat 
                          ? 'bg-primary text-slate-900 border-primary font-medium' 
                          : 'bg-slate-800 border-slate-700 text-white hover:border-primary hover:bg-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <CheckCircle size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Analysis Complete</h2>
                  <p className="text-textMuted">AI has scanned your dataset for issues.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <p className="text-sm text-textMuted mb-1">Rows</p>
                  <p className="text-2xl font-semibold">{result.stats.rows}</p>
                </div>
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                  <p className="text-sm text-textMuted mb-1">Columns</p>
                  <p className="text-2xl font-semibold">{result.stats.columns}</p>
                </div>
                <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                  <p className="text-sm text-red-400 mb-1">Missing Values</p>
                  <p className="text-2xl font-semibold text-red-400">{result.stats.missingValues}</p>
                </div>
                <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/30">
                  <p className="text-sm text-orange-400 mb-1">Outliers</p>
                  <p className="text-2xl font-semibold text-orange-400">{result.stats.outliers}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <AlertCircle size={18} className="text-primary" />
                  AI Suggested Fixes
                </h3>
                <div className="space-y-3">
                  {result.stats.suggestedFixes.map((fix, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <span className="text-sm">{fix}</span>
                      <button className="px-3 py-1 text-xs bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors">
                        Apply Fix
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Apply All & Proceed to Dashboard
                </button>
                <button 
                  onClick={() => {setResult(null); setFile(null);}}
                  className="px-6 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors"
                >
                  Upload New
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="font-semibold mb-4 text-lg">Supported Formats</h3>
            <ul className="space-y-3 text-sm text-textMuted">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                Transcriptomics (RNA-Seq counts)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                Proteomics (Abundance matrices)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                Metabolomics (Peak intensities)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                Clinical Meta-data
              </li>
            </ul>
          </div>

          <div className="glass-panel p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <h3 className="font-semibold mb-2 text-primary">Need sample data?</h3>
            <p className="text-sm text-textMuted mb-4">Try our pre-loaded breast cancer multi-omics dataset to explore the platform's capabilities.</p>
            <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors border border-slate-700 hover:border-slate-600">
              Load Sample Dataset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
