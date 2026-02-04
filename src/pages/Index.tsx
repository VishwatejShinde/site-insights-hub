import { useState } from "react";
import { Hero } from "@/components/Hero";
import { PreviewGallery } from "@/components/PreviewGallery";
import { Features } from "@/components/Features";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { AnalysisResults } from "@/components/AnalysisResults";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useEffect } from "react";

const Index = () => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const { analyzeUrl, isLoading, error, result, reset } = useAnalysis();

  useEffect(() => {
    // Set page metadata
    document.title = "SiteScope - Website Security & OSINT Analysis Platform";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Analyze any website for security vulnerabilities, performance metrics, and technical intelligence. 25+ analysis tools including SSL check, DNS lookup, and vulnerability scanning.");
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Analyze any website for security vulnerabilities, performance metrics, and technical intelligence. 25+ analysis tools including SSL check, DNS lookup, and vulnerability scanning.";
      document.head.appendChild(meta);
    }
  }, []);

  const handleAnalyze = async (url: string) => {
    setCurrentUrl(url);
    await analyzeUrl(url);
  };

  const handleBack = () => {
    setCurrentUrl(null);
    reset();
  };

  const handleRetry = () => {
    if (currentUrl) {
      analyzeUrl(currentUrl);
    }
  };

  // Show results if we have a URL being analyzed or analyzed
  if (currentUrl) {
    return (
      <div className="min-h-screen bg-background">
        <AnalysisResults 
          result={result}
          isLoading={isLoading}
          error={error}
          onBack={handleBack}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero onAnalyze={handleAnalyze} isAnalyzing={isLoading} />
      <PreviewGallery />
      <Features />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
