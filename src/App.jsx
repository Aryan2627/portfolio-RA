import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import CaseStudyDetailPage from "./pages/CaseStudyDetailPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import IndustryResearchPage from "./pages/IndustryResearchPage";
import IndustryCaseStudyDetailPage from "./pages/IndustryCaseStudyDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-sky-600 selection:text-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
            <Route path="/industry-case-studies/:slug" element={<IndustryCaseStudyDetailPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/industry-research" element={<IndustryResearchPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
