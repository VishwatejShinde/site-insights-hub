import { Hero } from "@/components/Hero";
import { PreviewGallery } from "@/components/PreviewGallery";
import { Features } from "@/components/Features";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <PreviewGallery />
      <Features />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
