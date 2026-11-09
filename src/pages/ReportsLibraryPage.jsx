import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Download, 
  FileText, 
  Search, 
  Filter, 
  ChevronRight, 
  Eye, 
  CheckCircle2, 
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import { RESEARCH_REPORTS } from "../data/portfolioData";
import { generateConsultingPdf } from "../utils/pdfGenerator";

export default function ReportsLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState(RESEARCH_REPORTS[0]);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  const filteredReports = RESEARCH_REPORTS.filter((rep) => {
    return (
      rep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleOpenPreview = (report) => {
    setSelectedReport(report);
    setPreviewModalOpen(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Research Publications Library</span>
        </nav>

        {/* Section Header */}
        <div className="border-b border-slate-200 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Consulting Dossier Publications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Research Publication Library & PDF Dossiers
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Downloadable, consulting-grade industry dossiers featuring structured executive summaries, market sizing projections, competitive matrices, and empirical business implications.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by title, category, or industry domain..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded focus:outline-hidden focus:ring-2 focus:ring-sky-600"
            />
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all"
            >
              {/* Report Cover Representation */}
              <div className="bg-slate-900 p-6 text-white border-b-4 border-sky-600 relative">
                <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-sky-400 uppercase mb-3">
                  <span>{report.coverTag}</span>
                  <span className="text-slate-400">{report.pages} | {report.format}</span>
                </div>
                <h3 className="text-xl font-bold leading-tight mb-2">
                  {report.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  {report.subtitle}
                </p>
                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-3">
                  <span>Analyst: Aryan Tiwari</span>
                  <span>{report.date}</span>
                </div>
              </div>

              {/* Report Body & Executive Summary */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-sky-700 uppercase tracking-wider mb-2">
                    Executive Summary Preview
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {report.executiveSummary}
                  </p>

                  {/* Key Sections Covered */}
                  <div className="bg-slate-50 p-3.5 rounded border border-slate-100 text-xs mb-4">
                    <span className="font-bold text-slate-800 text-[10px] uppercase tracking-wide block mb-2">
                      Report Structure & Index:
                    </span>
                    <ul className="space-y-1 text-slate-600">
                      {report.keySections.slice(0, 4).map((sec, idx) => (
                        <li key={idx} className="flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3 h-3 text-sky-600 shrink-0" />
                          <span className="truncate">{sec}</span>
                        </li>
                      ))}
                      {report.keySections.length > 4 && (
                        <li className="text-[11px] text-slate-400 pl-4">
                          + {report.keySections.length - 4} additional sections
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Report Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleOpenPreview(report)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Preview</span>
                  </button>

                  <button
                    onClick={() => generateConsultingPdf(report)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 px-3.5 py-1.5 rounded transition-colors shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Dossier</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Quick Preview */}
        {previewModalOpen && selectedReport && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 p-6 sm:p-8">
              
              <div className="flex items-start justify-between border-b border-slate-200 pb-4 mb-4">
                <div>
                  <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider block">
                    {selectedReport.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {selectedReport.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{selectedReport.subtitle}</p>
                </div>
                <button
                  onClick={() => setPreviewModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 font-bold text-xl px-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[11px] mb-1">Executive Summary</h4>
                  <p className="bg-slate-50 p-3 rounded border border-slate-100">{selectedReport.executiveSummary}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase text-[11px] mb-1">Complete Table of Contents</h4>
                  <ol className="list-decimal list-inside space-y-1 bg-slate-50 p-3 rounded border border-slate-100">
                    {selectedReport.keySections.map((sec, idx) => (
                      <li key={idx} className="text-slate-800">{sec}</li>
                    ))}
                  </ol>
                </div>

                <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-900 text-[11px]">
                  <strong>Citation & Sourcing Note:</strong> This research dossier compiles verified government databases and corporate annual filings. Estimates are generated through bottom-up proxy market sizing.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setPreviewModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    generateConsultingPdf(selectedReport);
                    setPreviewModalOpen(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download Full PDF
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
