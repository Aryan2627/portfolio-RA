import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  Database, 
  Terminal, 
  FileSpreadsheet, 
  Activity, 
  CheckCircle2, 
  TrendingUp, 
  ChevronRight,
  Download,
  Filter,
  Layers,
  ArrowRight
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
import { DATA_ANALYSIS_PROJECTS } from "../data/portfolioData";
import { generateConsultingPdf } from "../utils/pdfGenerator";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState(DATA_ANALYSIS_PROJECTS[0].id);

  const currentProject = DATA_ANALYSIS_PROJECTS.find((p) => p.id === activeTab) || DATA_ANALYSIS_PROJECTS[0];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Data Analytics Projects</span>
        </nav>

        {/* Header */}
        <div className="border-b border-slate-200 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Quantitative & Business Intelligence Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Data Analysis, SQL & Business Intelligence Dashboards
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Demonstrating end-to-end data pipelines: ETL and data cleansing, complex SQL queries, statistical hypothesis testing, Python spectral analysis, and interactive Power BI decision dashboards.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {DATA_ANALYSIS_PROJECTS.map((project) => {
            const isSelected = project.id === activeTab;
            return (
              <button
                key={project.id}
                onClick={() => setActiveTab(project.id)}
                className={`p-4 rounded-lg text-left border transition-all cursor-pointer ${
                  isSelected 
                    ? "bg-white border-sky-600 shadow-md ring-1 ring-sky-600" 
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block mb-1">
                  {project.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mb-2">
                  {project.title}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {project.tools.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                  {project.tools.length > 2 && (
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1 py-0.5 rounded">
                      +{project.tools.length - 2}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Project Full Deep Dive */}
        <div className="space-y-8">
          
          {/* Main Title & Problem Overview */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                  {currentProject.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  {currentProject.title}
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  {currentProject.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {currentProject.tools.map((tool, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* KPI Metric Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6 p-4 rounded-lg bg-slate-900 text-white">
              {currentProject.dashboardMetrics.map((metric, idx) => (
                <div key={idx} className="border-r border-slate-800 last:border-none pr-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                    {metric.label}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-sky-400">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Problem Statement & Dataset Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700 pt-4 border-t border-slate-100">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-900 uppercase tracking-wide text-[11px] block mb-2">
                  Business Problem Statement
                </span>
                <p className="leading-relaxed text-slate-600">{currentProject.problemStatement}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-900 uppercase tracking-wide text-[11px] block mb-2">
                  Dataset Architecture & Preprocessing
                </span>
                <p className="leading-relaxed text-slate-600">{currentProject.datasetDescription}</p>
              </div>
            </div>
          </div>

          {/* Interactive Visual Dashboard Preview */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-2xs">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Interactive Analytical Dashboard & Visualizations
                </h3>
                <p className="text-xs text-slate-500">Live preview generated via Recharts / Telemetry Data</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                Validated Data Model
              </span>
            </div>

            <div className="h-80 w-full bg-slate-50 p-4 rounded-lg border border-slate-100">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentProject.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey={Object.keys(currentProject.chartData[0] || {})[0]} 
                    stroke="#64748b" 
                    fontSize={11} 
                  />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", color: "#ffffff", borderRadius: "6px", fontSize: "12px" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                  {Object.keys(currentProject.chartData[0] || {})
                    .slice(1)
                    .map((key, idx) => (
                      <Bar 
                        key={key} 
                        dataKey={key} 
                        fill={idx === 0 ? "#0284c7" : idx === 1 ? "#0f172a" : idx === 2 ? "#10b981" : "#f59e0b"} 
                        radius={[4, 4, 0, 0]}
                      />
                    ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Methodology & Analytical Steps */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
              Analytical Methodology & Workflow
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentProject.methodology.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-slate-50 rounded border border-slate-100 text-xs">
                  <span className="w-5 h-5 rounded bg-sky-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Observations and Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Key Observations */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                Key Analytical Observations & Insights
              </h3>
              <ul className="space-y-3 text-xs text-slate-700 leading-relaxed">
                {currentProject.keyObservations.map((obs, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-sky-700 font-bold shrink-0">•</span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Recommendations */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                Commercial & Operational Recommendations
              </h3>
              <ul className="space-y-3 text-xs text-slate-700 leading-relaxed">
                {currentProject.businessRecommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-slate-900 font-bold shrink-0">✔</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
