import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Shield, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const placeholderExamples = ["https://example.com", "https://github.com", "https://amazon.com", "https://cloudflare.com", "https://stripe.com"];

interface HeroProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

export const Hero = ({ onAnalyze, isAnalyzing }: HeroProps) => {
  const [url, setUrl] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % placeholderExamples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAnalyze = () => {
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-info/5 rounded-full blur-3xl animate-pulse-glow" style={{
      animationDelay: "1s"
    }} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
      backgroundSize: '50px 50px'
    }} />

      <div className="container relative z-10 px-4 py-20">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="text-center max-w-4xl mx-auto text-primary">
          {/* Logo */}
          <motion.div initial={{
          scale: 0.8,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          duration: 0.5
        }} className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-xl tracking-tight text-white font-serif font-extrabold">SKYNET
            <span className="text-primary">Scope</span>
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Uncover the{" "}
            <span className="text-gradient">Hidden Layers</span>
            <br />
            of Any Website
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Deep security analysis, performance metrics, and technical intelligence. 
            Scan any URL to reveal vulnerabilities, tech stacks, and optimization opportunities.
          </p>

          {/* URL Input Form */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} className="max-w-2xl mx-auto mb-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-info/20 to-primary/20 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative flex gap-2 p-2 bg-card rounded-xl border border-border">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder={placeholderExamples[placeholderIndex]} className="pl-12 h-14 bg-background border-0 text-lg font-mono input-glow focus-visible:ring-primary" onKeyDown={e => e.key === "Enter" && handleAnalyze()} />
                </div>
                <Button onClick={handleAnalyze} disabled={isAnalyzing} size="lg" className="h-14 px-8 bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold glow-primary">
                  {isAnalyzing ? <motion.div animate={{
                  rotate: 360
                }} transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}>
                      <Zap className="w-5 h-5" />
                    </motion.div> : <>
                      Analyze <ArrowRight className="ml-2 w-5 h-5" />
                    </>}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.6,
          delay: 0.5
        }} className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>25+ Analysis Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Real-time Scanning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-info animate-pulse" />
              <span>Open Source</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1
    }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity
      }} className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>;
};