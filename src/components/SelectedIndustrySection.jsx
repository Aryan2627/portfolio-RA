import React from "react";
import { Download, ShieldCheck, FileText } from "lucide-react";
import { SELECTED_INDUSTRY_PROJECTS } from "../data/selectedIndustryProjects";
import { generateConsultingPdf } from "../utils/pdfGenerator";
import ScrollReveal from "./ScrollReveal";

export default function SelectedIndustrySection() {
  return (
    <section id="industry-case-studies" className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold uppercase tracking-wider mb-2">
              <span>Sector Research Practice</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Selected Industry Research & Market Intelligence Projects
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              "Exploring emerging markets, competitive landscapes, industry developments, regulatory environments, and strategic business opportunities through structured research and data-driven analysis."
            </p>
          </div>
        </ScrollReveal>

        {/* Clean Corporate List / Card Rows with Imagery */}
        <div className="space-y-5 mb-10">
          {SELECTED_INDUSTRY_PROJECTS.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 50}>
              <div
                className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 transition-all flex flex-col md:flex-row items-stretch shadow-2xs group"
              >
                {/* Sector Image Thumbnail */}
                <div className="w-full md:w-56 lg:w-64 shrink-0 relative overflow-hidden bg-slate-100">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-44 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                    {project.caseNumber}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="text-sky-800 uppercase tracking-wide font-bold">
                        {project.industryCategory}
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="text-emerald-700 font-medium">
                        {project.statusBadge}
                      </span>
                      <span className="text-slate-300 hidden sm:inline">|</span>
                      <span className="text-slate-400 font-mono hidden sm:inline">
                        {project.completionDate}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-2">
                      {project.subtitle}
                    </p>

                    {/* Methodologies */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {project.methodologies.map((m, mIdx) => (
                        <span 
                          key={mIdx}
                          className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] text-slate-600 font-medium"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                    <button
                      onClick={() => generateConsultingPdf(project)}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-sky-700 hover:bg-sky-800 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer"
                      title="Open Full PDF Report"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export PDF</span>
                    </button>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Methodology Disclosure Note */}
        <ScrollReveal delay={250}>
          <div className="p-4 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 flex items-start space-x-3">
            <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-normal">
              <strong className="text-slate-800">Methodological Standard: </strong>
              All industry intelligence dossiers synthesize secondary regulatory databases (MeitY, MoRTH, FSSAI, CDSCO, Indian Patent Office) alongside industry earnings disclosures. Estimates and addressable market projections follow bottom-up proxy sizing standards.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
