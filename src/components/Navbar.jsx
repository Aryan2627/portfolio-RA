import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Download, Menu, X, ArrowUpRight } from "lucide-react";
import { generateResumePdf } from "../utils/pdfGenerator";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Overview", to: "/" },
    { name: "Industry Projects", to: "/#industry-case-studies" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded bg-slate-900 text-white font-bold text-xs flex items-center justify-center tracking-wider">
              AT
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>Aryan Tiwari</span>
              </div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Research Associate & Market Intelligence
              </div>
            </div>
          </Link>

          {/* Clean Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                location.pathname === "/" && !location.hash
                  ? "text-sky-700 bg-slate-50 font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Overview
            </Link>
            <a
              href="/#industry-case-studies"
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors"
            >
              Industry Projects
            </a>
            <a
              href="/#skills"
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors"
            >
              Competencies
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-2.5">
            <button
              onClick={generateResumePdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Resume (PDF)</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-5 pt-3 pb-6 space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded"
            >
              {link.name}
            </Link>
          ))}
          <a
            href="/#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded"
          >
            Competencies
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              generateResumePdf();
            }}
            className="w-full mt-2 py-2 text-xs font-semibold text-slate-800 bg-slate-100 rounded flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Download Resume
          </button>
        </div>
      )}
    </header>
  );
}
