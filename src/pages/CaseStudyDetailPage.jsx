import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Download, 
  FileCheck2, 
  Clock, 
  Share2, 
  BookOpen, 
  Target, 
  Database, 
  Layers, 
  TrendingUp, 
  ShieldAlert, 
  Building2, 
  ChevronRight,
  ExternalLink,
  HelpCircle
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line 
} from "recharts";
import { CASE_STUDIES } from "../data/portfolioData";
import { generateConsultingPdf } from "../utils/pdfGenerator";

export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const study = CASE_STUDIES.find((item) => item.slug === slug || item.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!study) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg border border-slate-200 text-center shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Research Project Not Found</h2>
          <p className="text-xs text-slate-600 mb-6">
            The requested case study URL does not match any active research records.
          </p>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Actions Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Case Studies Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => generateConsultingPdf(study)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Executive PDF Report</span>
            </button>
          </div>
        </div>

        {/* Project Header Dossier Box */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-2xs mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-2.5 py-1 rounded border border-sky-100">
              {study.category}
            </span>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold ${
                study.statusType === "completed" 
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                  : "bg-amber-50 text-amber-800 border border-amber-200"
              }`}>
                {study.statusType === "completed" ? (
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                )}
                <span>{study.status}</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">| {study.completionDate}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
            {study.title}
          </h1>
          <p className="text-sm sm:text-base font-medium text-slate-600 mb-6">
            {study.subtitle}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 uppercase font-semibold text-[10px] block">Lead Analyst</span>
              <span className="text-slate-900 font-bold">Aryan Tiwari</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-semibold text-[10px] block">Methodology</span>
              <span className="text-slate-900 font-bold truncate block">{study.methodology.framework.split(":")[0]}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-semibold text-[10px] block">Read Duration</span>
              <span className="text-slate-900 font-bold">{study.readTime}</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-semibold text-[10px] block">Distribution</span>
              <span className="text-slate-900 font-bold">Verified Dossier</span>
            </div>
          </div>
        </div>

        {/* Executive Summary Card */}
        <section className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-2xs mb-8">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">
            <BookOpen className="w-5 h-5 text-sky-700" />
            <span>Executive Summary</span>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            {study.executiveSummary}
          </p>
        </section>

        {/* Research Objectives & Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Objectives */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                <Target className="w-4 h-4 text-sky-700" />
                <span>Research Objectives</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700">
                {study.researchObjectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-50 text-sky-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-sky-200">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Core Research Questions */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Key Research Hypotheses & Questions</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700">
                {study.researchQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 bg-slate-50 p-2.5 rounded border border-slate-100">
                    <span className="font-bold text-slate-500 text-[11px] shrink-0">Q{idx + 1}:</span>
                    <span className="leading-relaxed font-medium italic text-slate-800">"{q}"</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Methodology & Data Sourcing Framework */}
        <section className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-2xs mb-8">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
            <Database className="w-5 h-5 text-sky-700" />
            <span>Research Methodology & Data Collection Process</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-700 mb-6">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1.5 uppercase tracking-wide text-[11px]">
                Analytical Framework
              </span>
              <p className="leading-relaxed text-slate-600">{study.methodology.framework}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1.5 uppercase tracking-wide text-[11px]">
                Data Collection Process
              </span>
              <p className="leading-relaxed text-slate-600">{study.methodology.collectionProcess}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1.5 uppercase tracking-wide text-[11px]">
                Primary Observation & Verification
              </span>
              <p className="leading-relaxed text-slate-600">{study.methodology.primaryData}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-bold text-slate-900 block mb-1.5 uppercase tracking-wide text-[11px]">
                Secondary Sources & Public Registries
              </span>
              <p className="leading-relaxed text-slate-600">{study.methodology.secondaryData}</p>
            </div>
          </div>
        </section>

        {/* Market Analysis & TAM/SAM/SOM */}
        <section className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-2xs mb-8">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
            <TrendingUp className="w-5 h-5 text-sky-700" />
            <span>Market Analysis & Sizing Decomposition</span>
          </div>

          {/* Sizing Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-lg bg-slate-900 text-white">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
                Total Addressable Market (TAM)
              </span>
              <div className="text-sm font-bold leading-snug">{study.marketAnalysis.tamSamSom.tam}</div>
            </div>
            <div className="p-4 rounded-lg bg-sky-800 text-white">
              <span className="text-[10px] font-bold text-sky-200 uppercase tracking-wider block mb-1">
                Serviceable Addressable Market (SAM)
              </span>
              <div className="text-sm font-bold leading-snug">{study.marketAnalysis.tamSamSom.sam}</div>
            </div>
            <div className="p-4 rounded-lg bg-sky-700 text-white">
              <span className="text-[10px] font-bold text-sky-100 uppercase tracking-wider block mb-1">
                Serviceable Obtainable Market (SOM)
              </span>
              <div className="text-sm font-bold leading-snug">{study.marketAnalysis.tamSamSom.som}</div>
            </div>
          </div>

          {/* Key Drivers and Headwinds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="border border-emerald-200 bg-emerald-50/50 rounded-lg p-4">
              <span className="font-bold text-emerald-900 uppercase tracking-wide text-[11px] block mb-2">
                Structural Market Drivers & Tailwinds
              </span>
              <ul className="space-y-2 text-slate-700">
                {study.marketAnalysis.keyDrivers.map((driver, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-rose-200 bg-rose-50/50 rounded-lg p-4">
              <span className="font-bold text-rose-900 uppercase tracking-wide text-[11px] block mb-2">
                Market Friction, Constraints & Headwinds
              </span>
              <ul className="space-y-2 text-slate-700">
                {study.marketAnalysis.headwinds.map((headwind, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-rose-600 font-bold">✖</span>
                    <span>{headwind}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Data Visualisation and Charts */}
        <section className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-2xs mb-8">
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-base uppercase tracking-wider">
              <TrendingUp className="w-5 h-5 text-sky-700" />
              <span>Interactive Data Visualisations</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">Recharts Interactive Engine</span>
          </div>

          <div className="space-y-8">
            {/* Chart 1: Trajectory Trend */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3">
                Historical Progression & Forecast Trajectory
              </h4>
              <div className="h-72 w-full bg-slate-50 p-4 rounded-lg border border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={study.chartData.marketGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0f172a", color: "#ffffff", borderRadius: "6px", fontSize: "12px" }}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                    {Object.keys(study.chartData.marketGrowth[0] || {})
                      .filter(k => k !== "year")
                      .map((key, idx) => (
                        <Bar 
                          key={key} 
                          dataKey={key} 
                          fill={idx === 0 ? "#0284c7" : idx === 1 ? "#0f172a" : "#10b981"} 
                          radius={[4, 4, 0, 0]}
                        />
                      ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Sector Breakdown */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3">
                Segment Distribution & Relative Adoption Rates (%)
              </h4>
              <div className="h-72 w-full bg-slate-50 p-4 rounded-lg border border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={study.chartData.adoptionBySector} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" stroke="#64748b" fontSize={11} domain={[0, 100]} />
                    <YAxis dataKey="sector" type="category" stroke="#64748b" fontSize={10} width={130} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0f172a", color: "#ffffff", borderRadius: "6px", fontSize: "12px" }}
                    />
                    <Bar dataKey="rate" fill="#0284c7" name="Adoption / Share (%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Competitor Benchmarking Matrix */}
        <section className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-2xs mb-8">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
            <Building2 className="w-5 h-5 text-sky-700" />
            <span>Competitor Benchmarking & Strategic Positioning</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-800 font-bold">
                  <th className="py-3 px-4">Market Competitor / Player</th>
                  <th className="py-3 px-4">Market Share / Stature</th>
                  <th className="py-3 px-4">Core Strategic Strengths</th>
                  <th className="py-3 px-4">Vulnerabilities & Limitations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {study.competitorBenchmarking.map((comp, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">{comp.name}</td>
                    <td className="py-3 px-4 text-sky-700 font-semibold whitespace-nowrap">{comp.marketShare}</td>
                    <td className="py-3 px-4 text-slate-700 leading-relaxed">{comp.strength}</td>
                    <td className="py-3 px-4 text-slate-600 leading-relaxed">{comp.weakness}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Research Findings & Business Implications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Empirical Findings */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-4 border-b border-slate-100 pb-2">
              Key Research Findings & Observations
            </h3>
            <ul className="space-y-3 text-xs text-slate-700 leading-relaxed">
              {study.findings.map((finding, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="font-bold text-sky-700 shrink-0">•</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Implications */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-4 border-b border-slate-100 pb-2">
              Commercial & Strategic Implications
            </h3>
            <ul className="space-y-3 text-xs text-slate-700 leading-relaxed">
              {study.businessImplications.map((imp, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="font-bold text-slate-900 shrink-0">→</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Strategic Recommendations */}
        <section className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-2xs mb-8">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base uppercase tracking-wider mb-4 border-b border-slate-100 pb-3">
            <Target className="w-5 h-5 text-sky-700" />
            <span>Strategic Recommendations for Leadership</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {study.recommendations.map((rec, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-sky-50/60 border border-sky-100 flex flex-col justify-between">
                <div>
                  <span className="w-6 h-6 rounded bg-sky-700 text-white font-bold flex items-center justify-center text-xs mb-2">
                    0{idx + 1}
                  </span>
                  <p className="text-slate-800 leading-relaxed font-medium">{rec}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Limitations & Verified References */}
        <section className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-2xs mb-10 text-xs">
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-slate-900 font-bold uppercase tracking-wider mb-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Research Scope Limitations & Assumptions</span>
            </div>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded border border-slate-100">
              {study.limitations}
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-2 text-slate-900 font-bold uppercase tracking-wider mb-2">
              <Database className="w-4 h-4 text-slate-600" />
              <span>Verified Secondary Sources & Regulatory References</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
              {study.references.map((ref, idx) => (
                <li key={idx} className="leading-relaxed">{ref}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bottom Download CTA */}
        <div className="bg-slate-900 text-white rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm">Download Full Executive Dossier (PDF)</h4>
            <p className="text-xs text-slate-400">Includes complete methodology, formulas, references, and charts.</p>
          </div>
          <button
            onClick={() => generateConsultingPdf(study)}
            className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs rounded transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
        </div>

      </div>
    </div>
  );
}
