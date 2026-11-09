import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Download, 
  ExternalLink, 
  BookOpen, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  MapPin, 
  Send, 
  Building, 
  CheckCircle2, 
  FileText,
  Search,
  Filter
} from "lucide-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { LinkedinIcon, GithubIcon } from "../components/SocialIcons";
import SelectedIndustrySection from "../components/SelectedIndustrySection";
import ScrollReveal from "../components/ScrollReveal";
import { 
  PERSONAL_INFO, 
  TECHNICAL_SKILLS, 
  EXPERIENCE_TIMELINE, 
  ACADEMIC_RESEARCH, 
  CASE_STUDIES, 
  DATA_ANALYSIS_PROJECTS 
} from "../data/portfolioData";
import { generateResumePdf, generateConsultingPdf } from "../utils/pdfGenerator";

export default function HomePage() {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [activeSkillCategory, setActiveSkillCategory] = useState("PRIMARY MARKET RESEARCH");

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setContactSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen text-slate-900">
      
      {/* 1. EXECUTIVE HERO BRIEF */}
      <section id="overview" className="bg-white border-b border-slate-200 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            
            {/* Professional Headline Tag */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold uppercase tracking-wider">
              <span>Candidate Dossier | Research Associate & Market Intelligence</span>
            </div>

            {/* Candidate Identity */}
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Aryan Tiwari
              </h1>
              <p className="text-base sm:text-lg font-medium text-slate-600 mt-2">
                Research & Business Intelligence | Market Research | Industry Analysis
              </p>
            </div>

            {/* Executive Summary */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal max-w-3xl">
              Biotechnology graduate combining analytical rigor, operational FMCG compliance, and primary/secondary market research methodologies to deliver commercial intelligence, market sizing, and corporate decision briefs.
            </p>

            {/* Institutional Credentials */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-600 pt-1">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-slate-800" />
                <span><strong>B.Tech Biotechnology</strong>, JIIT Noida (2022–2026)</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-slate-800" />
                <span>Nestlé India & Procol Alum</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-800" />
                <span>Noida / New Delhi NCR</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={generateResumePdf}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Executive CV (PDF)</span>
              </button>

              <a
                href="#industry-case-studies"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold rounded border border-slate-300 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                <span>View Industry Reports</span>
              </a>
            </div>

          </div>

          {/* Institutional Pillars (Clean White Card Layout) */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-xs uppercase font-bold text-sky-800 tracking-wider">Market Intelligence</div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">TAM/SAM/SOM modeling & structural growth drivers</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-xs uppercase font-bold text-sky-800 tracking-wider">Primary Field Research</div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">CAPI, CATI, CAWI, IDIs & qualitative moderation</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-xs uppercase font-bold text-sky-800 tracking-wider">Competitive Strategy</div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">Feature matrices, pricing teardowns & moats</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-xs uppercase font-bold text-sky-800 tracking-wider">Decision-Grade Reports</div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">Structured consulting memos & verified sourcing</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SELECTED INDUSTRY RESEARCH & MARKET INTELLIGENCE PROJECTS */}
      <ScrollReveal delay={100}>
        <SelectedIndustrySection />
      </ScrollReveal>

      {/* 3. METHODOLOGICAL COMPETENCIES (INTERACTIVE DYNAMIC TABS) */}
      <section id="skills" className="py-16 sm:py-20 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-2xl mb-8">
              <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block mb-1">
                Methodological Toolset
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Technical & Primary Research Competencies
              </h2>
            </div>
          </ScrollReveal>

          {/* Dynamic Category Switcher */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 mb-6">
            {Object.keys(TECHNICAL_SKILLS).map((catKey) => {
              const isSelected = activeSkillCategory === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setActiveSkillCategory(catKey)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    isSelected 
                      ? "bg-slate-900 text-white" 
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {catKey}
                </button>
              );
            })}
          </div>

          {/* Competency Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECHNICAL_SKILLS[activeSkillCategory].map((skill, idx) => (
              <ScrollReveal key={idx} delay={idx * 40}>
                <div className="bg-white border border-slate-200 rounded p-4 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-xs font-bold text-slate-900">{skill.name}</h4>
                      {skill.level && (
                        <span className="text-[10px] font-semibold text-sky-800 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-100">
                          {skill.level}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {skill.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* 4. PROFESSIONAL TIMELINE & ACADEMIC RESEARCH */}
      <section id="experience" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block mb-1">
              Career Timeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Professional Experience & Research
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-4">
            {EXPERIENCE_TIMELINE.map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx * 60}>
                <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {item.role} <span className="text-slate-400 font-normal">|</span> {item.company}
                      </h3>
                      <div className="text-xs text-slate-500">{item.location}</div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-600">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.skillsLearned.map((s, sIdx) => (
                      <span key={sIdx} className="text-[10px] bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="lg:col-span-4 space-y-5">
            {/* Thesis */}
            <ScrollReveal delay={100}>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-2.5">
                <span className="text-[10px] font-bold text-sky-800 uppercase tracking-wider block">
                  Academic Research Thesis
                </span>
                <h3 className="text-sm font-bold leading-snug text-slate-900">
                  {ACADEMIC_RESEARCH.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Enzymatic depolymerization of PET bottles using PETase and MHETase with microbial bioconversion to vanillin using <em>E. coli</em> and FTIR spectral validation.
                </p>
                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                  JIIT Noida | {ACADEMIC_RESEARCH.timeline}
                </div>
              </div>
            </ScrollReveal>

            {/* Honors */}
            <ScrollReveal delay={200}>
              <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide block">
                  Honors & Extra-Curriculars
                </span>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p>• <strong>Second Position in Poster Presentation:</strong> International Biotechnology Conference (2025)</p>
                  <p>• <strong>NSS Member (2022–2024):</strong> Community service & outreach</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

    </div>
  );
}
