import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Download, Mail, FileText, CheckCircle2 } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "./SocialIcons";
import { PERSONAL_INFO } from "../data/portfolioData";
import { generateResumePdf } from "../utils/pdfGenerator";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Primary Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Analyst Profile */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded bg-sky-600 text-white font-bold flex items-center justify-center text-base">
                AT
              </div>
              <div>
                <h3 className="text-white font-bold text-base tracking-tight">{PERSONAL_INFO.name}</h3>
                <p className="text-xs text-sky-400 font-semibold tracking-wide uppercase">Research & Business Intelligence</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              {PERSONAL_INFO.education.degree} graduate from {PERSONAL_INFO.education.institution}. Specialized in commercial research, market sizing, competitive benchmarking, and quantitative analytics.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-500 transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-500 transition-colors"
                title="GitHub Repositories"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a 
                href={`mailto:${PERSONAL_INFO.email}`} 
                className="w-8 h-8 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-500 transition-colors"
                title="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Research Modules */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Research Portfolios
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/case-studies" className="hover:text-white transition-colors">
                  Research Case Studies (8 Projects)
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-white transition-colors">
                  Data Analytics & SQL Pipelines
                </Link>
              </li>
              <li>
                <Link to="/industry-research" className="hover:text-white transition-colors">
                  Industry Briefs & Sector Dynamics
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-white transition-colors">
                  Publication Library & PDF Downloads
                </Link>
              </li>
              <li>
                <a href="/#skills" className="hover:text-white transition-colors">
                  Technical & Methodological Competencies
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Analytical Focus */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Core Methodologies
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>TAM / SAM / SOM Market Sizing</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Competitive Feature & Price Benchmarking</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Secondary Regulatory & Financial Filing Audits</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Statistical Hypothesis Testing & EDA</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Executive Consulting Report Writing</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Verification & Resume */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Analyst Credentials
            </h4>
            <p className="text-xs text-slate-300">
              All published research synthesizes verified public statistics and empirical industry records without fabricated findings.
            </p>
            <div className="pt-2">
              <button
                onClick={generateResumePdf}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-600 rounded transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Analyst CV</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Available for Research Associate, Market Intelligence & Business Research roles.
            </p>
          </div>

        </div>

        {/* Closing statement & Banner */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs font-semibold text-slate-300">
              "{PERSONAL_INFO.closingStatement}"
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              © {new Date().getFullYear()} Aryan Tiwari. Built with analytical rigor for corporate recruitment.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
