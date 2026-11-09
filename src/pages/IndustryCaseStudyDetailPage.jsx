import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Download, 
  FileCheck2, 
  Clock, 
  Target, 
  Database, 
  TrendingUp, 
  ShieldCheck, 
  Building2, 
  ChevronRight,
  HelpCircle,
  FileSpreadsheet,
  Layers,
  BookOpen,
  Scale,
  Award
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { SELECTED_INDUSTRY_PROJECTS } from "../data/selectedIndustryProjects";
import { generateConsultingPdf } from "../utils/pdfGenerator";

export default function IndustryCaseStudyDetailPage() {
  const { slug } = useParams();

  const project = SELECTED_INDUSTRY_PROJECTS.find(
    (p) => p.slug === slug || p.id === slug
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-xl border border-slate-200 text-center shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Assignment Not Found</h2>
          <p className="text-xs text-slate-600 mb-6">
            The requested industry research case study could not be located.
          </p>
          <Link
            to="/#industry-case-studies"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Research Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & PDF Action */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            to="/#industry-case-studies"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Selected Industry Projects</span>
          </Link>

          <button
            onClick={() => generateConsultingPdf(project)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Report</span>
          </button>
        </div>

        {/* Consulting Report Cover Header */}
        <div className="bg-slate-950 text-white rounded-2xl overflow-hidden shadow-lg border border-slate-800 mb-8">
          
          {/* Hero Banner Image */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded bg-slate-900/90 text-[11px] font-black text-sky-400 border border-slate-700 uppercase tracking-widest">
                {project.caseNumber}
              </span>
              <span className="px-3 py-1 rounded bg-emerald-950/90 border border-emerald-700 text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>{project.statusBadge}</span>
              </span>
            </div>

            {/* Industry Category Title Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
                {project.industryCategory}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {project.title}
              </h1>
            </div>
          </div>

          {/* Subtitle & Metadata Bar */}
          <div className="p-6 sm:p-8 space-y-4">
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
              {project.subtitle}
            </p>

            {/* Consulting Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 uppercase font-semibold text-[10px] block">Lead Analyst</span>
                <span className="text-white font-bold">Aryan Tiwari</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-semibold text-[10px] block">Distribution</span>
                <span className="text-white font-bold truncate block">{project.researchFirmReference.split("|")[0]}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-semibold text-[10px] block">Reading Time</span>
                <span className="text-white font-bold">{project.readTime}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-semibold text-[10px] block">Completed Date</span>
                <span className="text-white font-bold">{project.completionDate}</span>
              </div>
            </div>

            {/* Research Coverage Topics Pill Container */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Mandated Research Coverage Scope:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {project.researchCoverage.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <span className="text-sky-400 font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 1. Research Overview & Industry Background */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8 space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-base uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
              <BookOpen className="w-5 h-5 text-sky-700" />
              <span>1. Research Overview</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {project.researchOverview}
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-base uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
              <Layers className="w-5 h-5 text-sky-700" />
              <span>2. Industry Background & Structural Drivers</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {project.industryBackground}
            </p>
          </div>
        </section>

        {/* 2. Research Objectives & Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
              <Target className="w-4 h-4 text-sky-700" />
              <span>3. Research Objectives</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-700">
              {project.researchObjectives.map((obj, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-sky-50 text-sky-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-sky-200">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>4. Key Research Questions</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-700">
              {project.researchQuestions.map((q, idx) => (
                <li key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="font-bold text-slate-500 text-[10px] uppercase block mb-1">
                    Hypothesis {idx + 1}
                  </span>
                  <p className="italic font-medium text-slate-800 leading-relaxed">"{q}"</p>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 3. Methodology, Data Sources & Collection */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base uppercase tracking-wider mb-6 border-b border-slate-100 pb-2">
            <Database className="w-5 h-5 text-sky-700" />
            <span>5. Research Methodology & Data Sources</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.methodologies.map((m, idx) => (
              <span key={idx} className="px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                {m}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-bold text-slate-900 uppercase block mb-1.5 text-[11px]">Primary Observation</span>
              <p className="leading-relaxed text-slate-600">{project.dataSourcesAndCollection.primaryData}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-bold text-slate-900 uppercase block mb-1.5 text-[11px]">Secondary Registries</span>
              <p className="leading-relaxed text-slate-600">{project.dataSourcesAndCollection.secondaryData}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="font-bold text-slate-900 uppercase block mb-1.5 text-[11px]">Collection Process</span>
              <p className="leading-relaxed text-slate-600">{project.dataSourcesAndCollection.collectionProcess}</p>
            </div>
          </div>
        </section>

        {/* 4. Market Dynamics & TAM/SAM/SOM */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base uppercase tracking-wider mb-6 border-b border-slate-100 pb-2">
            <TrendingUp className="w-5 h-5 text-sky-700" />
            <span>6. Market Dynamics & Sizing Decomposition</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-slate-900 text-white">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block mb-1">
                Total Addressable Market (TAM)
              </span>
              <div className="text-sm font-bold leading-snug">{project.marketDynamics.tamSamSom.tam}</div>
            </div>
            <div className="p-4 rounded-xl bg-sky-800 text-white">
              <span className="text-[10px] font-bold text-sky-200 uppercase tracking-widest block mb-1">
                Serviceable Addressable Market (SAM)
              </span>
              <div className="text-sm font-bold leading-snug">{project.marketDynamics.tamSamSom.sam}</div>
            </div>
            <div className="p-4 rounded-xl bg-sky-700 text-white">
              <span className="text-[10px] font-bold text-sky-100 uppercase tracking-widest block mb-1">
                Serviceable Obtainable Market (SOM)
              </span>
              <div className="text-sm font-bold leading-snug">{project.marketDynamics.tamSamSom.som}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-200">
              <span className="font-bold text-emerald-900 uppercase block mb-2">Market Drivers</span>
              <ul className="space-y-1.5 text-slate-700">
                {project.marketDynamics.keyDrivers.map((d, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-rose-50/50 border border-rose-200">
              <span className="font-bold text-rose-900 uppercase block mb-2">Market Constraints</span>
              <ul className="space-y-1.5 text-slate-700">
                {project.marketDynamics.headwinds.map((h, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-rose-600 font-bold">✖</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Market Segmentation Matrix */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base uppercase tracking-wider mb-6 border-b border-slate-100 pb-2">
            <Layers className="w-5 h-5 text-sky-700" />
            <span>7. Market Segmentation Matrix</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3">Segment Category</th>
                  <th className="py-2.5 px-3">Market Share</th>
                  <th className="py-2.5 px-3">Growth Trajectory</th>
                  <th className="py-2.5 px-3">Margin Profile</th>
                  <th className="py-2.5 px-3">Key Requirement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {project.marketSegmentation.map((seg, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-slate-900">{seg.segment}</td>
                    <td className="py-3 px-3 text-sky-700 font-semibold">{seg.share}</td>
                    <td className="py-3 px-3 text-emerald-700 font-semibold">{seg.growthRate}</td>
                    <td className="py-3 px-3 text-slate-600">{seg.marginProfile}</td>
                    <td className="py-3 px-3 text-slate-600">{seg.keyRequirement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Interactive Visual Dashboard Preview */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-2">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-base uppercase tracking-wider">
              <TrendingUp className="w-5 h-5 text-sky-700" />
              <span>8. Interactive Trend Visualisation</span>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Verified Forecast</span>
          </div>

          <div className="h-72 w-full bg-slate-50 p-4 rounded-xl border border-slate-100">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={project.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", color: "#ffffff", borderRadius: "6px", fontSize: "12px" }} />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                {Object.keys(project.chartData[0] || {})
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
        </section>

        {/* 7. Competitive Landscape */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base uppercase tracking-wider mb-6 border-b border-slate-100 pb-2">
            <Building2 className="w-5 h-5 text-sky-700" />
            <span>9. Competitive Landscape & Positioning</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                  <th className="py-2.5 px-3">Industry Competitor</th>
                  <th className="py-2.5 px-3">Market Position</th>
                  <th className="py-2.5 px-3">Strategic Moats</th>
                  <th className="py-2.5 px-3">Limitations / Exposure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {project.competitiveLandscape.map((comp, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-slate-900">{comp.name}</td>
                    <td className="py-3 px-3 text-sky-700 font-semibold">{comp.marketShare}</td>
                    <td className="py-3 px-3 text-slate-700 leading-relaxed">{comp.strength}</td>
                    <td className="py-3 px-3 text-slate-600 leading-relaxed">{comp.weakness}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. Regulatory and Policy Analysis */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
            <Scale className="w-5 h-5 text-sky-700" />
            <span>10. Regulatory & Policy Environment</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
            {project.regulatoryAndPolicyAnalysis}
          </p>
        </section>

        {/* 9. Key Research Findings & Business Implications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3 border-b border-slate-100 pb-2">
              11. Key Empirical Findings
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
              {project.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="font-bold text-sky-700">•</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3 border-b border-slate-100 pb-2">
              12. Business & Market Implications
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
              {project.businessImplications.map((imp, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="font-bold text-slate-900">→</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 10. Strategic Recommendations */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex items-center space-x-2 text-slate-900 font-bold text-base uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
            <Award className="w-5 h-5 text-sky-700" />
            <span>13. Strategic Recommendations for Decision-Makers</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {project.strategicRecommendations.map((rec, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-sky-50/70 border border-sky-100">
                <span className="w-6 h-6 rounded bg-sky-700 text-white font-bold flex items-center justify-center text-xs mb-2">
                  0{idx + 1}
                </span>
                <p className="text-slate-800 leading-relaxed font-medium">{rec}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 11. References & Public Sources */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-10 text-xs">
          <div className="flex items-center space-x-2 text-slate-900 font-bold uppercase tracking-wider mb-3">
            <Database className="w-4 h-4 text-slate-600" />
            <span>14. Verified Public References & Regulatory Gazettes</span>
          </div>
          <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
            {project.referencesAndSources.map((ref, idx) => (
              <li key={idx} className="leading-relaxed">{ref}</li>
            ))}
          </ul>
        </section>

        {/* Bottom Report Download Callout */}
        <div className="p-6 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm">Download Complete Research Dossier (PDF)</h4>
            <p className="text-xs text-slate-400">Compiled by Aryan Tiwari for corporate strategy and investment diligence.</p>
          </div>
          <button
            onClick={() => generateConsultingPdf(project)}
            className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
        </div>

      </div>
    </div>
  );
}
