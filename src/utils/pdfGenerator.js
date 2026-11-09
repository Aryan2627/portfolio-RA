import { jsPDF } from "jspdf";

/**
 * Generates an executive consulting-style PDF research brief for download
 * @param {Object} report - metadata for report or case study
 */
export function generateConsultingPdf(report) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // Header Bar (Navy Accent)
  doc.setFillColor(15, 23, 42); // #0f172a (dark navy/charcoal)
  doc.rect(0, 0, pageWidth, 28, "F");

  // Accent Line (Consulting Blue)
  doc.setFillColor(2, 132, 199); // #0284c7 (accent blue)
  doc.rect(0, 27, pageWidth, 2.5, "F");

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("RESEARCH & BUSINESS INTELLIGENCE DOSSIER", margin, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(190, 205, 225);
  doc.text("ANALYST: ARYAN TIWARI  |  B.TECH BIOTECHNOLOGY  |  JIIT NOIDA", margin, 21);

  // Document Tag / Category
  doc.setTextColor(2, 132, 199);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  const categoryText = (report.category || "RESEARCH REPORT").toUpperCase();
  doc.text(categoryText, margin, 42);

  // Report Title
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  const titleLines = doc.splitTextToSize(report.title || "Industry Research Analysis", contentWidth);
  doc.text(titleLines, margin, 50);

  let currentY = 52 + titleLines.length * 7;

  // Subtitle
  if (report.subtitle) {
    doc.setTextColor(71, 85, 105);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10.5);
    const subtitleLines = doc.splitTextToSize(report.subtitle, contentWidth);
    doc.text(subtitleLines, margin, currentY);
    currentY += subtitleLines.length * 5.5 + 4;
  }

  // Meta bar (Date, Status, Framework)
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  const statusLabel = report.status || (report.statusType === "in-progress" ? "In Progress / Proposed" : "Verified Public Research");
  doc.text(`PUBLISHED / UPDATED: ${report.date || report.completionDate || "2024-2025"}`, margin, currentY);
  doc.text(`STATUS: ${statusLabel.toUpperCase()}`, margin + 80, currentY);
  doc.text(`DISTRIBUTION: EXECUTIVE BRIEF`, margin + 140, currentY);
  currentY += 8;

  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 8;

  // Executive Summary Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, contentWidth, 36, 2, 2, "FD");

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("EXECUTIVE SUMMARY", margin + 4, currentY + 7);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const summaryText = report.executiveSummary || report.summary || "This analytical dossier provides evidence-grounded research, market sizing, competitive dynamics, and strategic recommendations for corporate and market decision-makers.";
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth - 8);
  doc.text(summaryLines.slice(0, 5), margin + 4, currentY + 14);

  currentY += 44;

  // Research Objectives / Key Sections
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("KEY RESEARCH OBJECTIVES & FOCUS AREAS", margin, currentY);
  currentY += 6;

  const objectives = report.researchObjectives || (report.keyPoints ? report.keyPoints.map(p => p) : [
    "Quantify structural market sizing and addressable commercial demand trajectories.",
    "Benchmark primary competitive forces, moats, and operational cost economics.",
    "Formulate rigorous strategic recommendations and evaluate capital allocation feasibility."
  ]);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  objectives.slice(0, 4).forEach((obj) => {
    doc.setFillColor(2, 132, 199);
    doc.circle(margin + 2, currentY - 1, 1, "F");
    const wrappedObj = doc.splitTextToSize(obj, contentWidth - 8);
    doc.text(wrappedObj, margin + 6, currentY);
    currentY += wrappedObj.length * 4.5 + 2;
  });

  currentY += 4;

  // Methodology and Credibility Box
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("METHODOLOGY & RESEARCH INTEGRITY DISCLOSURE", margin, currentY);
  currentY += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);

  const methodText = report.methodology?.framework || "Multi-source desk research synthesized with public regulatory filings (MCA/RoC), government databases (MeitY, IBEF, VAHAN), and earnings call disclosures.";
  const methodLines = doc.splitTextToSize(`Methodological Framework: ${methodText}`, contentWidth);
  doc.text(methodLines, margin, currentY);
  currentY += methodLines.length * 4.5 + 2;

  const integrityText = "Data Integrity Standard: In accordance with professional research analyst guidelines, statistics and findings in this dossier utilize verified public datasets. Projections and TAM estimates are explicitly marked as analytical estimates subject to market volatility.";
  const integrityLines = doc.splitTextToSize(integrityText, contentWidth);
  doc.text(integrityLines, margin, currentY);
  currentY += integrityLines.length * 4.5 + 6;

  // Key Findings / Recommendations
  if (report.recommendations && report.recommendations.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("STRATEGIC RECOMMENDATIONS", margin, currentY);
    currentY += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);

    report.recommendations.slice(0, 3).forEach((rec, idx) => {
      const recLine = doc.splitTextToSize(`${idx + 1}. ${rec}`, contentWidth);
      doc.text(recLine, margin, currentY);
      currentY += recLine.length * 4.5 + 2;
    });
  }

  // Footer on Page
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text("Aryan Tiwari Portfolio  |  Professional Research Associate & Market Intelligence Dossier", margin, pageHeight - 10);
  doc.text("Page 1 of 1 (Executive Summary)", pageWidth - margin - 45, pageHeight - 10);

  // Save or Open the document
  if (report.customPdfUrl) {
    window.open(report.customPdfUrl, "_blank");
    return;
  }

  // Generates interactive preview in new browser tab and allows saving
  const pdfBlob = doc.output("blob");
  const blobUrl = URL.createObjectURL(pdfBlob);
  window.open(blobUrl, "_blank");
}

/**
 * Opens or downloads Aryan Tiwari's Official Professional Resume
 */
export function generateResumePdf() {
  const resumeUrl = "https://drive.google.com/file/d/1SvYf8gduvxqqfLHuB7Mq8aB-6DLXv7W-/view?usp=sharing";
  window.open(resumeUrl, "_blank", "noopener,noreferrer");
  return;
  
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // Top Navy Header Bar
  doc.setFillColor(15, 23, 42); // #0f172a
  doc.rect(0, 0, pageWidth, 30, "F");

  // Accent Line
  doc.setFillColor(2, 132, 199);
  doc.rect(0, 29, pageWidth, 1.5, "F");

  // Header Details
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("ARYAN TIWARI", margin, 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(226, 232, 240);
  doc.text("Research Associate | Market Research Analyst | Business Research Analyst", margin, 19);

  doc.setFontSize(8);
  doc.setTextColor(190, 205, 225);
  doc.text("Noida, India  |  Email: aryan.tiwari.research@example.com  |  LinkedIn: linkedin.com/in/aryan-tiwari-biotech-research", margin, 25);

  let currentY = 38;

  // Professional Summary
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text("PROFESSIONAL SUMMARY", margin, currentY);
  currentY += 4;
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const summary = "A Biotechnology graduate with exposure to FMCG operations, procurement technology, quality control, product development, and scientific research. Interested in market intelligence, industry research, competitive analysis, business strategy, and data-driven decision-making. Highly proficient in Advanced Excel, SQL, Python, Power BI, and consulting-style report writing.";
  const summaryLines = doc.splitTextToSize(summary, contentWidth);
  doc.text(summaryLines, margin, currentY);
  currentY += summaryLines.length * 4.2 + 4;

  // Education
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text("EDUCATION", margin, currentY);
  currentY += 4;
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 4;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text("B.Tech in Biotechnology", margin, currentY);
  doc.setFont("helvetica", "normal");
  doc.text("2022 – 2026", pageWidth - margin - 22, currentY);
  currentY += 4;
  doc.setTextColor(71, 85, 105);
  doc.text("Jaypee Institute of Information Technology (JIIT), Noida, Uttar Pradesh", margin, currentY);
  currentY += 4;
  doc.setFontSize(8);
  doc.text("Coursework: Quantitative Data Analysis, Bioprocess Engineering, Biostatistics, Molecular Biology, Operations.", margin, currentY);
  currentY += 6;

  // Experience
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text("PROFESSIONAL EXPERIENCE & INTERNSHIPS", margin, currentY);
  currentY += 4;
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 5;

  const experiences = [
    {
      role: "Customer Success Intern",
      company: "Procol",
      date: "June 2026 – August 2026",
      location: "Gurugram / Remote",
      bullet: "Enterprise procurement SaaS exposure; tracked customer onboarding workflows, e-auction platform metrics, and client adoption analytics."
    },
    {
      role: "Quality Control Intern",
      company: "IOL Chemicals and Pharmaceuticals Ltd.",
      date: "June 2025 – August 2025",
      location: "Barnala, Punjab",
      bullet: "Executed laboratory QC workflows under GLP and pharmacopeia standards; performed analytical purity testing and batch variance logging."
    },
    {
      role: "Compliance Intern",
      company: "Nestlé India Ltd.",
      date: "May 2024 – July 2024",
      location: "Moga, Punjab",
      bullet: "Utilized SAP, Advanced Excel, and Power BI; contributed to empirical root-cause analysis and reduction of false leakage in coffee packaging lines."
    }
  ];

  experiences.forEach((exp) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`${exp.role}  |  ${exp.company}`, margin, currentY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(exp.date, pageWidth - margin - 35, currentY);
    currentY += 4;

    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    const bulletLines = doc.splitTextToSize(`• ${exp.bullet}`, contentWidth - 4);
    doc.text(bulletLines, margin + 2, currentY);
    currentY += bulletLines.length * 3.8 + 2;
  });

  currentY += 2;

  // Academic Research & Achievements
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text("ACADEMIC RESEARCH & HONORS", margin, currentY);
  currentY += 4;
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 4.5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("Bio-upcycling of Post-Consumer PET Bottle Waste into Vanillin (Thesis)", margin, currentY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("Aug 2025 – Apr 2026", pageWidth - margin - 32, currentY);
  currentY += 3.8;

  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const thesisDesc = "Enzymatic cascade degradation using PETase and MHETase; biotransformation into vanillin using engineered E. coli; FTIR spectral peak analysis.";
  doc.text(doc.splitTextToSize(`• ${thesisDesc}`, contentWidth - 4), margin + 2, currentY);
  currentY += 6;

  doc.setFont("helvetica", "bold");
  doc.text("• Second Position in Poster Presentation", margin + 2, currentY);
  doc.setFont("helvetica", "normal");
  doc.text(" - International Biotechnology Conference (2025)", margin + 64, currentY);
  currentY += 4;

  doc.setFont("helvetica", "bold");
  doc.text("• Active Member, National Service Scheme (NSS)", margin + 2, currentY);
  doc.setFont("helvetica", "normal");
  doc.text(" - JIIT Noida (2022–2024)", margin + 70, currentY);
  currentY += 6;

  // Technical & Analytical Competencies
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text("TECHNICAL & RESEARCH COMPETENCIES", margin, currentY);
  currentY += 4;
  doc.line(margin, currentY, pageWidth - margin, currentY);
  currentY += 4.5;

  const skillsList = [
    { cat: "Primary Research", items: "CAPI, CATI, CAWI, PAPI, Face-to-Face (F2F) Interviews, IDIs, Focus Groups (FGDs), Key Informant (KII), Mystery Shopping, Ethnographic Fieldwork" },
    { cat: "Data Analytics", items: "Advanced Excel (XLOOKUP, Power Query), SQL (PostgreSQL, SQLite), Python (Pandas, NumPy, SciPy), Power BI (DAX), Statistics" },
    { cat: "Research & Strategy", items: "Secondary Desk Research, TAM/SAM/SOM Sizing, Porter's 5 Forces, SWOT Analysis, Competitor Benchmarking, Report Writing" },
    { cat: "Industry Domains", items: "Healthcare & Pharmaceuticals, FMCG Operations, B2B SaaS, Artificial Intelligence Ecosystem, Circular Bio-economy" }
  ];

  skillsList.forEach(s => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(`${s.cat}: `, margin + 2, currentY);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    const line = doc.splitTextToSize(s.items, contentWidth - 36);
    doc.text(line, margin + 34, currentY);
    currentY += line.length * 3.8 + 1.5;
  });

  // Footer
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text("Aryan Tiwari  |  Research Associate & Market Intelligence Candidate Portfolio  |  Verified Background", margin, pageHeight - 8);

  doc.save("Aryan_Tiwari_Research_Analyst_Resume.pdf");
}
