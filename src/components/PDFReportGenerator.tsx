import { useState, useRef } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnalysisFlowchart } from "./AnalysisFlowchart";
import type { AnalysisResult } from "@/types/analysis";
import jsPDF from "jspdf";

interface PDFReportGeneratorProps {
  result: AnalysisResult;
}

export const PDFReportGenerator = ({ result }: PDFReportGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = 210;
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      let y = margin;

      const addText = (text: string, size: number, bold = false, color: [number, number, number] = [255, 255, 255]) => {
        doc.setFontSize(size);
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.setTextColor(...color);
        const lines = doc.splitTextToSize(text, contentWidth);
        if (y + lines.length * (size * 0.5) > 280) {
          doc.addPage();
          y = margin;
        }
        doc.text(lines, margin, y);
        y += lines.length * (size * 0.45) + 2;
      };

      const addLine = () => {
        doc.setDrawColor(60, 80, 100);
        doc.line(margin, y, pageWidth - margin, y);
        y += 4;
      };

      const checkIcon = (val: boolean) => val ? "✓" : "✗";

      // Background
      doc.setFillColor(15, 20, 30);
      doc.rect(0, 0, 210, 297, "F");

      // Title
      addText("SITESCOPE ANALYSIS REPORT", 20, true, [0, 200, 200]);
      y += 2;
      addText(`Website: ${result.url}`, 11, false, [180, 180, 180]);
      addText(`Scanned: ${new Date(result.timestamp).toLocaleString()}`, 10, false, [120, 120, 120]);
      addText(`Domain: ${result.basicInfo.domain} | IP: ${result.basicInfo.ip || "Unknown"} | Protocol: ${result.basicInfo.protocol.toUpperCase()}`, 9, false, [120, 120, 120]);
      y += 4;
      addLine();

      // Grades Overview
      addText("GRADES OVERVIEW", 14, true, [0, 200, 200]);
      y += 2;
      addText(`Security Grade: ${result.security.grade}`, 12, true, [255, 255, 255]);
      addText(`SSL Grade: ${result.ssl.grade}`, 12, true, [255, 255, 255]);
      addText(`Response Time: ${result.performance.responseTime}ms`, 12, false, [180, 180, 180]);
      y += 4;
      addLine();

      // Security Headers
      addText("SECURITY HEADERS", 14, true, [0, 200, 200]);
      addText(`Score: ${result.headers.score}%`, 11, false, [180, 180, 180]);
      y += 2;
      const sh = result.headers.securityHeaders;
      addText(`${checkIcon(sh.strictTransportSecurity)} Strict-Transport-Security (HSTS)`, 10, false, sh.strictTransportSecurity ? [100, 200, 100] : [200, 100, 100]);
      addText(`${checkIcon(sh.xFrameOptions)} X-Frame-Options`, 10, false, sh.xFrameOptions ? [100, 200, 100] : [200, 100, 100]);
      addText(`${checkIcon(sh.xContentTypeOptions)} X-Content-Type-Options`, 10, false, sh.xContentTypeOptions ? [100, 200, 100] : [200, 100, 100]);
      addText(`${checkIcon(sh.contentSecurityPolicy)} Content-Security-Policy`, 10, false, sh.contentSecurityPolicy ? [100, 200, 100] : [200, 100, 100]);
      addText(`${checkIcon(sh.xXssProtection)} X-XSS-Protection`, 10, false, sh.xXssProtection ? [100, 200, 100] : [200, 100, 100]);
      addText(`${checkIcon(sh.referrerPolicy)} Referrer-Policy`, 10, false, sh.referrerPolicy ? [100, 200, 100] : [200, 100, 100]);
      y += 4;
      addLine();

      // SEO
      addText("SEO ANALYSIS", 14, true, [0, 200, 200]);
      addText(`Score: ${result.seo.score}%`, 11, false, [180, 180, 180]);
      y += 2;
      addText(`${checkIcon(result.seo.hasTitle)} Title Tag`, 10, false, result.seo.hasTitle ? [100, 200, 100] : [200, 100, 100]);
      addText(`${checkIcon(result.seo.hasDescription)} Meta Description`, 10, false, result.seo.hasDescription ? [100, 200, 100] : [200, 100, 100]);
      addText(`${checkIcon(result.seo.hasViewport)} Viewport Meta`, 10, false, result.seo.hasViewport ? [100, 200, 100] : [200, 100, 100]);
      addText(`${checkIcon(result.seo.hasCanonical)} Canonical URL`, 10, false, result.seo.hasCanonical ? [100, 200, 100] : [200, 100, 100]);
      addText(`${checkIcon(result.seo.hasRobotsTxt)} robots.txt`, 10, false, result.seo.hasRobotsTxt ? [100, 200, 100] : [200, 100, 100]);
      addText(`${checkIcon(result.seo.hasSitemap)} sitemap.xml`, 10, false, result.seo.hasSitemap ? [100, 200, 100] : [200, 100, 100]);
      y += 4;
      addLine();

      // DNS
      addText("DNS RECORDS", 14, true, [0, 200, 200]);
      y += 2;
      addText(`A Records: ${result.dns.aRecords.join(", ") || "None"}`, 10, false, [180, 180, 180]);
      addText(`MX Records: ${result.dns.mxRecords.join(", ") || "None"}`, 10, false, [180, 180, 180]);
      addText(`NS Records: ${result.dns.nsRecords.join(", ") || "None"}`, 10, false, [180, 180, 180]);
      y += 4;
      addLine();

      // Technologies
      addText("TECHNOLOGIES DETECTED", 14, true, [0, 200, 200]);
      y += 2;
      addText(result.technologies.length > 0 ? result.technologies.join(", ") : "No technologies detected", 10, false, [180, 180, 180]);
      y += 4;
      addLine();

      // Server Info
      addText("SERVER INFORMATION", 14, true, [0, 200, 200]);
      y += 2;
      addText(`Server: ${result.headers.server || "Hidden"}`, 10, false, [180, 180, 180]);
      addText(`Compression: ${result.performance.compression ? "Enabled" : "Disabled"}`, 10, false, [180, 180, 180]);
      addText(`Content Size: ${result.performance.contentLength ? Math.round(result.performance.contentLength / 1024) + " KB" : "Unknown"}`, 10, false, [180, 180, 180]);
      y += 4;
      addLine();

      // Security Issues
      if (result.security.issues.length > 0) {
        addText("SECURITY ISSUES", 14, true, [200, 100, 100]);
        y += 2;
        result.security.issues.forEach(issue => {
          addText(`• ${issue}`, 10, false, [200, 150, 150]);
        });
        y += 4;
        addLine();
      }

      // Recommendations
      if (result.security.recommendations.length > 0) {
        addText("RECOMMENDATIONS", 14, true, [0, 200, 200]);
        y += 2;
        result.security.recommendations.forEach((rec, i) => {
          addText(`${i + 1}. ${rec}`, 10, false, [180, 180, 180]);
        });
        y += 4;
        addLine();
      }

      // === PAGE 2: Flowchart & Theory ===
      doc.addPage();
      doc.setFillColor(15, 20, 30);
      doc.rect(0, 0, 210, 297, "F");
      y = margin;

      addText("HOW SITESCOPE ANALYSIS WORKS", 18, true, [0, 200, 200]);
      y += 4;

      addText("SiteScope performs a comprehensive, non-intrusive analysis of any website using a multi-layered approach. When you submit a URL, the backend engine executes several parallel checks to gather intelligence about the target website's security posture, performance, and configuration.", 10, false, [180, 180, 180]);
      y += 4;

      addText("The analysis leverages Google DNS-over-HTTPS (DoH) for DNS resolution, HTTP header inspection for security analysis, regex-based HTML scanning for technology detection and SEO auditing, and response timing for performance measurement — all without relying on third-party scraping services.", 10, false, [180, 180, 180]);
      y += 6;
      addLine();

      // Flowchart in text form
      addText("ANALYSIS PIPELINE", 14, true, [0, 200, 200]);
      y += 4;

      const steps = [
        { step: "1. URL INPUT", desc: "User submits URL → normalized with https:// prefix" },
        { step: "2. EDGE FUNCTION", desc: "Serverless Deno function triggered on backend" },
        { step: "3. DNS RESOLUTION", desc: "Google DoH API → A, MX, NS, TXT records queried" },
        { step: "4. HTTP FETCH", desc: "Website fetched with custom User-Agent, response timed" },
        { step: "5. HEADER ANALYSIS", desc: "HSTS, CSP, X-Frame-Options, XSS Protection inspected" },
        { step: "6. SEO AUDIT", desc: "Title, meta description, viewport, canonical, robots.txt, sitemap checked" },
        { step: "7. TECH DETECTION", desc: "Regex patterns match frameworks (React, Vue, Angular, etc.) & services" },
        { step: "8. PERFORMANCE", desc: "Response time, content length, compression measured" },
        { step: "9. SCORE AGGREGATION", desc: "Security grade (A+ to F), SEO %, header % calculated" },
        { step: "10. REPORT", desc: "Interactive dashboard with grades, records, and recommendations" },
      ];

      steps.forEach(({ step, desc }) => {
        // Draw box
        if (y > 270) { doc.addPage(); doc.setFillColor(15, 20, 30); doc.rect(0, 0, 210, 297, "F"); y = margin; }
        doc.setFillColor(20, 30, 45);
        doc.roundedRect(margin, y - 3, contentWidth, 14, 2, 2, "F");
        doc.setDrawColor(0, 200, 200);
        doc.roundedRect(margin, y - 3, contentWidth, 14, 2, 2, "S");

        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 200, 200);
        doc.text(step, margin + 4, y + 3);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(180, 180, 180);
        doc.text(desc, margin + 4, y + 9);
        y += 18;

        // Arrow between steps
        if (y < 270) {
          doc.setDrawColor(0, 200, 200);
          doc.setLineWidth(0.5);
          const cx = pageWidth / 2;
          doc.line(cx, y - 4, cx, y);
          doc.line(cx - 2, y - 2, cx, y);
          doc.line(cx + 2, y - 2, cx, y);
          y += 2;
        }
      });

      y += 6;
      addLine();

      // Tools Section
      addText("TOOLS & TECHNOLOGIES", 14, true, [0, 200, 200]);
      y += 4;
      const tools = [
        ["Google DNS-over-HTTPS", "Secure DNS resolution API for A, MX, NS, TXT records."],
        ["HTTP Header Inspection", "Analyzes response headers for security best practices."],
        ["Regex HTML Scanner", "Detects frameworks, CMS platforms, and analytics tools."],
        ["Edge Functions (Deno)", "Serverless compute for fast backend processing."],
        ["SEO Auditor", "Checks essential SEO elements and meta tags."],
        ["Performance Timer", "Measures response time, size, and compression."],
      ];

      tools.forEach(([name, desc]) => {
        if (y > 275) { doc.addPage(); doc.setFillColor(15, 20, 30); doc.rect(0, 0, 210, 297, "F"); y = margin; }
        addText(`▸ ${name}`, 10, true, [0, 200, 200]);
        addText(`  ${desc}`, 9, false, [150, 150, 150]);
        y += 1;
      });

      // Footer
      y += 6;
      addText("Generated by SiteScope — Website Security & OSINT Analysis Platform", 8, false, [80, 80, 80]);

      doc.save(`sitescope-report-${result.basicInfo.domain}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={generatePDF} disabled={isGenerating} variant="outline" size="sm" className="gap-2">
        {isGenerating ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        Download PDF
      </Button>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="w-4 h-4" />
            View Flowchart
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-lg">Analysis Flowchart & Methodology</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[70vh] pr-4">
            <AnalysisFlowchart />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};
