import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Cpu, 
  Activity, 
  ShoppingCart, 
  Brain, 
  Zap, 
  Calendar, 
  Clock, 
  ChevronRight, 
  ArrowRight,
  BookOpen,
  Filter,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { INDUSTRY_RESEARCH_CATEGORIES } from "../data/portfolioData";

export default function IndustryResearchPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const iconMap = {
    Cpu: <Cpu className="w-5 h-5 text-sky-700" />,
    Activity: <Activity className="w-5 h-5 text-rose-600" />,
    ShoppingCart: <ShoppingCart className="w-5 h-5 text-emerald-600" />,
    Brain: <Brain className="w-5 h-5 text-purple-600" />,
    Zap: <Zap className="w-5 h-5 text-amber-600" />
  };

  const filteredCategories = activeCategory === "all" 
    ? INDUSTRY_RESEARCH_CATEGORIES 
    : INDUSTRY_RESEARCH_CATEGORIES.filter(c => c.id === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Industry Research</span>
        </nav>

        {/* Header */}
        <div className="border-b border-slate-200 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Macroeconomic & Sectoral Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Industry Research & Market Sector Analysis
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
            Analytical insights, sector perspectives, policy evaluations, and technological adoption curves across 5 primary strategic industries: IT & Technology, Healthcare & Pharma, FMCG, Artificial Intelligence, and SaaS/Startups.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded text-xs font-bold transition-colors cursor-pointer ${
              activeCategory === "all"
                ? "bg-slate-900 text-white shadow-2xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            All Sectors ({INDUSTRY_RESEARCH_CATEGORIES.reduce((acc, c) => acc + c.articles.length, 0)} Briefs)
          </button>

          {INDUSTRY_RESEARCH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>{cat.category}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 group-hover:bg-slate-200">
                {cat.articles.length}
              </span>
            </button>
          ))}
        </div>

        {/* Categories & Articles Display */}
        <div className="space-y-12">
          {filteredCategories.map((sector) => (
            <section key={sector.id} className="space-y-6">
              
              {/* Sector Header */}
              <div className="flex items-center space-x-3 bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
                <div className="p-2.5 rounded bg-slate-50 border border-slate-100">
                  {iconMap[sector.icon]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    {sector.category}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">{sector.tagline}</p>
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sector.articles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white border border-slate-200 rounded-lg p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Meta */}
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{article.date}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-slate-900 leading-snug tracking-tight mb-2 hover:text-sky-700 transition-colors">
                        {article.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {article.summary}
                      </p>

                      {/* Key Takeaways */}
                      <div className="bg-slate-50 p-3 rounded border border-slate-100 text-xs">
                        <span className="font-bold text-slate-800 text-[10px] uppercase tracking-wide block mb-2">
                          Key Analytical Insights:
                        </span>
                        <ul className="space-y-1.5 text-slate-600">
                          {article.keyPoints.map((pt, idx) => (
                            <li key={idx} className="flex items-start space-x-1.5 leading-snug">
                              <span className="text-sky-700 font-bold shrink-0">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Status */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">Analyst Briefing</span>
                      <span className="text-sky-700 font-semibold">Verified Analysis</span>
                    </div>
                  </article>
                ))}
              </div>

            </section>
          ))}
        </div>

      </div>
    </div>
  );
}
