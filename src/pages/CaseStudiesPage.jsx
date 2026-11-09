import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Download, 
  ExternalLink, 
  Filter, 
  Search, 
  FileCheck2, 
  Clock, 
  Layers, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  FileSpreadsheet
} from "lucide-react";
import { CASE_STUDIES } from "../data/portfolioData";
import { generateConsultingPdf } from "../utils/pdfGenerator";

export default function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const categories = ["All", "AI & Emerging Tech", "Healthcare & Pharmaceuticals", "FMCG & Consumer Markets", "SaaS & Startups", "IT & Technology"];

  const filteredStudies = CASE_STUDIES.filter((study) => {
    const matchesCategory = selectedCategory === "All" || study.category === selectedCategory;
    const matchesStatus = statusFilter === "All" || 
      (statusFilter === "completed" && study.statusType === "completed") ||
      (statusFilter === "in-progress" && study.statusType === "in-progress");
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.executiveSummary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Research Case Studies</span>
        </nav>

        {/* Section Header */}
        <div className="border-b border-slate-200 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Structured Intelligence Dossiers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Research Case Studies & Industry Analyses
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Exhaustive, consulting-style market intelligence projects analyzing industry structures, regulatory shifts, enterprise adoption curves, competitive benchmarking, and commercial unit economics.
          </p>

          {/* Research Credibility Notice */}
          <div className="mt-6 p-4 rounded-lg bg-white border border-slate-200 flex items-start space-x-3 shadow-2xs">
            <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-900">Professional Research Integrity Standard: </strong>
              All findings synthesize verified public data (MeitY, IBEF, VAHAN, Department of Pharmaceuticals, RBI, and company statutory filings). Market estimates and TAM forecasts are clearly marked as analytical projections, and prospective projects are labeled as proposed or in progress until peer review.
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-lg border border-slate-200 shadow-2xs mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search Input */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, market segment, or methodology keyword..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded focus:outline-hidden focus:ring-2 focus:ring-sky-600 focus:border-transparent"
              />
            </div>

            {/* Status Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-600 shrink-0">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full py-2 px-3 text-xs border border-slate-300 rounded bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-600"
              >
                <option value="All">All Projects ({CASE_STUDIES.length})</option>
                <option value="completed">Completed / Published ({CASE_STUDIES.filter(s => s.statusType === 'completed').length})</option>
                <option value="in-progress">Proposed / In Progress ({CASE_STUDIES.filter(s => s.statusType === 'in-progress').length})</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-600 flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" /> Sector:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Results Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <span>Showing {filteredStudies.length} of {CASE_STUDIES.length} Research Case Studies</span>
          <span>Click any card to read full project methodology and data visualisations</span>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStudies.map((study) => (
            <div 
              key={study.id} 
              className="bg-white border border-slate-200 rounded-lg shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:border-slate-300"
            >
              <div className="p-6">
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">
                    {study.category}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                    study.statusType === "completed" 
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                      : "bg-amber-50 text-amber-800 border border-amber-200"
                  }`}>
                    {study.statusType === "completed" ? (
                      <FileCheck2 className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Clock className="w-3 h-3 text-amber-600" />
                    )}
                    <span>{study.status}</span>
                  </span>
                </div>

                {/* Title and Subtitle */}
                <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-sky-700 transition-colors">
                  <Link to={`/case-studies/${study.slug}`}>
                    {study.title}
                  </Link>
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-1 mb-3">
                  {study.subtitle}
                </p>

                {/* Executive Summary Snippet */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {study.executiveSummary}
                </p>

                {/* Key Research Questions preview */}
                <div className="bg-slate-50 rounded p-3 border border-slate-100 mb-4">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Core Analytical Question:
                  </div>
                  <p className="text-xs text-slate-600 italic">
                    "{study.researchQuestions[0]}"
                  </p>
                </div>

                {/* Framework & Meta Badges */}
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
                  <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {study.methodology.framework.split("+")[0].trim()}
                  </span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {study.readTime}
                  </span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    TAM: {study.marketAnalysis.tamSamSom.tam.split("(")[0]}
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="px-6 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/case-studies/${study.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 group-hover:underline"
                >
                  <span>Explore Full Research Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => generateConsultingPdf(study)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 py-1 px-2.5 bg-white border border-slate-200 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Download executive PDF dossier"
                >
                  <Download className="w-3 h-3 text-slate-500" />
                  <span>PDF Dossier</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-14 p-6 sm:p-8 bg-slate-900 text-white rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-bold">Require Tailored Market Intelligence or Industry Due Diligence?</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              I synthesize empirical market datasets, build competitor benchmarking matrices, and evaluate commercial strategy for investment funds and corporate strategy units.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/reports"
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors"
            >
              Browse Publications
            </Link>
            <a
              href="/#contact"
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded transition-colors"
            >
              Discuss Opportunities
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
